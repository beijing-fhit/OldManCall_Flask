from flask import session, json
from flask_restful import Resource, reqparse, request
from App.models import QrCode, OldManInfo, PhoneNumber
from App.utils import ORMUtils, CommonUtils


class OpenIdFromSession(Resource):
    def get(self):
        return session.get('openid')


# data_resource_fields = {
#     'qr_code_id': fields.String(attribute='qr_code_id'),
#     'old_man_info': fields.String(attribute='old_man_info'),
#     'phone_number': fields.List(fields.String,attribute='phone_number')
# }
# base_resoure_fields = {
#     'status_code': fields.Integer(default=0),
#     'data': {},
#     'message': ''
# }

# 继承
# get_resource_fields = base_resoure_fields.copy()

# get
parser = reqparse.RequestParser()
parser.add_argument('qrcodeid', required=True, help='qrcodeid参数不能为空，{error_msg}')


class QRCodeInfo(Resource):
    def get(self):
        args = parser.parse_args()
        qrcodeid = args['qrcodeid']
        try:
            qrCode = QrCode.query.filter_by(qr_code_id=qrcodeid).first()
            # phone_number = [ORMUtils.serialize(p) for p in qrCode.phone_number]
            phone_number = [p.phone_number for p in qrCode.phone_number]

            old_man_info_id = qrCode.old_man_info
            old_man_info = ORMUtils.serialize(OldManInfo.query.filter_by(id=old_man_info_id).first())

            data = {'qr_code_id': qrcodeid, 'old_man_info': old_man_info, 'phone_number': phone_number}
            res = {
                'status_code': 0,
                'data': data,
                'message': '获取信息成功'
            }
            return res
        except Exception as e:
            print('获取绑定信息失败', e)
            res = {
                'status_code': -1,
                'data': None,
                'message': '未找到相应的绑定信息'
            }
            return res

    def post(self):
        d = request.data
        data = json.loads(d)
        with open('flask.log', 'w') as f:
            f.write('\nrequest data is :%s' % (request.data))
            f.close()
        qrcodeid = data['qr_code_id']
        old_man_info = data['old_man_info']
        phone_numbers = data['phone_number']
        print(qrcodeid, old_man_info, phone_numbers)
        try:
            qrCode = QrCode.query.get(qrcodeid)
            # 更新数据
            OldManInfo.query.filter_by(id=qrCode.old_man_info) \
                .update(
                name=old_man_info['name'],
                address=old_man_info['address'],
                age=old_man_info['age'],
                medical_history=old_man_info['medical_history'],
                allergy=old_man_info['allergy'],
                blood_type=old_man_info['blood_type'],
                drugs=old_man_info['drugs'],
                treatment=old_man_info['treatment']
            )


        except Exception as e:
            with open('flask.log', 'w') as f:
                f.write('\nupdate OldManInfo exception :%s' % (e))
                f.close()
            # 创建数据
            try:

                # 创建QrCode对象
                oldManInfo = OldManInfo(name=old_man_info['name'],
                                        address=old_man_info['address'],
                                        age=old_man_info['age'],
                                        medical_history=old_man_info['medical_history'],
                                        allergy=old_man_info['allergy'],
                                        blood_type=old_man_info['blood_type'],
                                        drugs=old_man_info['drugs'],
                                        treatment=old_man_info['treatment'])
                # print("*"*100)
                oldManInfo.save()
                # print("oldManInfo:",oldManInfo)
                qrCode = QrCode(qr_code_id=qrcodeid, old_man_info=oldManInfo.id)
                qrCode.save()
            except Exception as e:
                with open('flask.log', 'w') as f:
                    f.write('\ncreate OldManInfo exception :%s' % (e))
                    f.close()
                print("创建QrCode失败：", e)
                res = {
                    'status_code': -1,
                    'message': '绑定信息失败'
                }
                return res
        try:
            # 创建PhoneNumber对象
            # phoneNumbers = phone_numbers.split(',')
            # 对比数据库里的和传进来的电话号码，数据库里多余的要删除，参数里面有不一样的要添加
            # oldNumbers = qrCode.phone_number # 注意在flask中使用一对多关系，获取到的是一个对象集合，需要获取到具体的值，才能用来做数值比较，否则就是对象之间作比较了，则永远捕不会相等，所以采用下面的写法
            qrCode = QrCode.query.filter_by(qr_code_id=qrcodeid).first()  # 这重新查询一次
            oldNumbers = [p.phone_number for p in qrCode.phone_number.all()]
            print("电话号码old :", qrCode, qrCode.phone_number.all())
            delete, add = CommonUtils.compareArrays(oldNumbers, phone_numbers)
            print('电话号码：', delete, ",", add)
            for d in delete:
                PhoneNumber.query.filter_by(phone_number=d, q_id=qrcodeid).delete()
            for a in add:
                PhoneNumber(phone_number=a, q_id=qrcodeid).save()

            res = {
                'status_code': 0,
                'message': '信息保存成功'
            }
            return res
        except Exception as e:
            print("创建PhoneNumber失败:", e)
            res = {
                'status_code': -1,
                'message': '信息保存失败'
            }
            return res
