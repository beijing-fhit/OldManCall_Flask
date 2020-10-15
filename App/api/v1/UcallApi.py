"""
这个接口是用于通过ucallfreeid来获取qrCodeid,从而获取petInfo的信息
"""
from flask_restful import Resource, reqparse

# from App.ext import db
from App.utils import dbutils
from App.models import UCallFreeId, OldManInfo


# 定义找不到qrCodeId对应的绑定信息的返回值
def response_ucall_info_not_found(message="未找到相应的绑定信息"):
    return {
        "statusCode": -1,
        "data": None,
        "message": message
    }


# get参数
def parse_get():
    parser_get = reqparse.RequestParser()
    parser_get.add_argument('ucallFreeId', required=True, help='ucallFreeId参数不能为空:{error_msg}')
    return parser_get.parse_args()


# 返回qrCodeId对应的绑定信息
def response_info(data):
    return {
        "statusCode": 0,
        "data": data,
        "message": '查询成功'
    }


class UCallApi(Resource):
    def get(self):
        try:
            args = parse_get()
            ucallFreeId = args['ucallFreeId']
            if not dbutils.isRecordExist(UCallFreeId, "uCallFreeId = '{}'".format(ucallFreeId)):
                return response_ucall_info_not_found()
            ucall = UCallFreeId.query.get(ucallFreeId)
            # 获取信息列表
            qrCodeInfo = []
            for qrCode in ucall.qrCode:
                oldManInfo = OldManInfo.query.get(qrCode.old_man_info)
                # 因为是一对多的关系，qrCode.phoneNumber得到的是PhoneNumber对象，需要遍历各个对象的值
                p = [(p.phone_number if p.phone_number is not None else "") for p in qrCode.phone_number]
                phoneNumber = ",".join(p)  # 将list转成str
                qrCodeInfo.append({
                    "qrCodeId": qrCode.qr_code_id,
                    "oldManInfo": dbutils.serialize(oldManInfo),
                    "phoneNumber": phoneNumber
                })

            return response_info(qrCodeInfo)
        except Exception as e:
            print('异常：', e)
            return response_ucall_info_not_found('异常：%s,%s' % (e, '请优先检查ucallFreeId参数'))


