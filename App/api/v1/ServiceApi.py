
import time

import requests
from flask import session
import json
from flask_restful import Resource, reqparse, request
from App.models import QrCode, OldManInfo, PhoneNumber, db, UCallFreeId, ApplyCard
from App.utils import ORMUtils, CommonUtils, Constants, dbutils


class OpenIdFromSession(Resource):
    def get(self):
        return session.get('openid')


class MsgNotification(Resource):
    def post(self):
        try:
            d = request.data
            data = json.loads(d,strict=False)
            mobile = data['mobile']
            content = data['content']
            # mobiles = str(mobile).split(',')
            for m in mobile:
                if m is '' or m is None:
                    continue
                msg = {
                    "orgid": "123",
                    "password": "123",
                    "mobile": m,
                    "content": Constants.MSG_TEMPLATE_STRING + content
                }
                data_json = json.dumps(msg, ensure_ascii=False)
                data_json = data_json.encode('utf-8')
                headers = {'Content-Type': 'application/json'}
                resp = requests.post(Constants.MSG_NOTIFICATION_SEND_URL, data=data_json, headers=headers)
                with open('flask.log', 'a+') as f:
                    f.write('\nsend notification data is :%s \n' % (resp.text))
                    f.close()
                # if resp.status_code != 200:
                #     return '发送短信失败1'
            return '发送短信成功'
        except Exception as e:
            return '发送短信失败2,' + e.__repr__()


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
        # import sys
        # from importlib import reload
        # reload(sys)
        # sys.setdefaultencoding("utf8")
        try:
            d = request.data
            data = json.loads(d,strict=False)
            qrcodeid = data['qr_code_id']
            old_man_info = data['old_man_info']
            phone_numbers = data['phone_number']
            ucallFreeId = data['ucallFreeId']

            # with open('flask.log', 'a+') as f:
            #     f.write('\n[%s] request data is :%s,%s,%s' % (time.strftime('%Y-%m-%d %H:%M:%S',time.localtime(time.time())),qrcodeid,old_man_info,phone_numbers))
            #     f.close()
            # print(qrcodeid, old_man_info, phone_numbers)
            try:
                qrCode = QrCode.query.get(qrcodeid)
                if qrCode.old_man_info is None or qrCode.old_man_info is '':
                    raise Exception('找不到OldManinfo,oldmaninfo:'+qrCode.old_man_info)
                # 更新数据
                db.session.query(OldManInfo).filter(OldManInfo.id == qrCode.old_man_info) \
                    .update({
                        "name": old_man_info['name'],
                        "address": old_man_info['address'],
                        "age": old_man_info['age'] if old_man_info['age'] else 0,
                        "medical_history": old_man_info['medical_history'],
                        "allergy": old_man_info['allergy'],
                        "blood_type": old_man_info['blood_type'],
                        "drugs": old_man_info['drugs'],
                        "treatment": old_man_info['treatment'],
                        "message": old_man_info['message']
                    })
                db.session.commit()
                # OldManInfo.query.filter_by(id=qrCode.old_man_info) \
                #     .update({
                #     "name":old_man_info['name'],
                #     "address":old_man_info['address'],
                #     "age":old_man_info['age'],
                #     "medical_history":old_man_info['medical_history'],
                #     "allergy":old_man_info['allergy'],
                #     "blood_type":old_man_info['blood_type'],
                #     "drugs":old_man_info['drugs'],
                #     "treatment":old_man_info['treatment']
                # })

            except Exception as e:
                db.session.rollback()  # 回退数据
                with open('flask.log', 'a+') as f:
                    f.write('\nupdate OldManInfo exception :%s' % (e))
                    f.close()
                # 创建数据
                try:
                    # 创建QrCode对象
                    oldManInfo = OldManInfo(name=old_man_info['name'],
                                            address=old_man_info['address'],
                                            age=old_man_info['age'] if old_man_info['age'] else 0,
                                            medical_history=old_man_info['medical_history'],
                                            allergy=old_man_info['allergy'],
                                            blood_type=old_man_info['blood_type'],
                                            drugs=old_man_info['drugs'],
                                            treatment=old_man_info['treatment'],
                                            message=old_man_info['message'])
                    # print("*"*100)
                    oldManInfo.save()
                    # print("oldManInfo:",oldManInfo)
                    with open('flask.log', 'a+') as f:
                        f.write('\ncreate OldManInfo info :%s' % (oldManInfo))
                        f.close()

                    if QrCode.query.get(qrcodeid) is None:
                        # 将ucall和qrCode绑定
                        # 如果已存在UCallFreeId则直接关联，若不存在，则创建一个新的UCallFreeId
                        if not dbutils.isRecordExist(UCallFreeId, "ucallFreeId = '{}'".format(ucallFreeId)):
                            ucall = UCallFreeId(ucallFreeId=ucallFreeId)
                            ucall.save()
                        qrCode1 = QrCode(qr_code_id=qrcodeid, uId=ucallFreeId, old_man_info=oldManInfo.id)
                        qrCode1.save()

                    else:
                        qrCode2 = QrCode.query.get(qrcodeid)
                        qrCode2.old_man_info=oldManInfo.id
                        qrCode2.uId = ucallFreeId
                        qrCode2.save()

                except Exception as e:
                    db.session.rollback()
                    with open('flask.log', 'a+') as f:
                        f.write('\ncreate OldManInfo exception :%s' % (e))
                        f.close()
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
                delete, add = CommonUtils.compareArrays(oldNumbers, phone_numbers)
                with open('flask.log', 'a+') as f:
                    f.write('\ndelete and add phonenumbers :%s,%s' % (delete,add))
                    f.close()
                for d in delete:
                    p1=PhoneNumber.query.filter_by(phone_number=d, q_id=qrcodeid).first()
                    p1.delete()
                for a in add:
                    p2=PhoneNumber(phone_number=a, q_id=qrcodeid)
                    p2.save()
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
        except Exception as e:
            with open('flask.log', 'a+') as f:
                f.write('\nfinal  exception :%s' % (e))
                f.close()


def is_family_member_params():
    parser = reqparse.RequestParser()
    parser.add_argument('qrCodeId', required=True, help='qrcodeid参数不能为空，{error_msg}')
    parser.add_argument('ucallFreeId', required=True, help='ucallFreeId参数不能为空，{error_msg}')
    parser.add_argument('phoneNumber', required=True, help='phoneNumber参数不能为空，{error_msg}')
    return parser.parse_args()


# 查询某个电话号码是否在家属联系人列表中
class IsFamilyMember(Resource):
    def get(self):
        args = is_family_member_params()
        qrcodeid = args['qrCodeId']
        phoneNumber = args['phoneNumber']
        ucallFreeId = args['ucallFreeId']
        try:
            qrCode = QrCode.query.filter_by(qr_code_id=qrcodeid).first()
            phone_number = [p.phone_number for p in qrCode.phone_number]
            if phoneNumber in phone_number:
                qrCode.uId = ucallFreeId
                qrCode.save()
            # phone_number = [ORMUtils.serialize(p) for p in qrCode.phone_number]
            res = {
                'status_code': 0,
                'isFamilyMember': (phoneNumber in phone_number),
                'message': '获取信息成功'
            }
            return res
        except Exception as e:
            db.session.rollback()
            res = {
                'status_code': -1,
                'isFamilyMember': False,
                'message': '未找到相应的绑定信息'
            }
            return res


def parse_post_parmas():
    parser_post = reqparse.RequestParser()
    parser_post.add_argument('ucallFreeId', required=True, help='ucallFreeId参数不能为空，{error_msg}')
    parser_post.add_argument('phoneNumber', required=True, help='phoneNumber参数不能为空，{error_msg}')
    parser_post.add_argument('address', required=True, help='address参数不能为空，{error_msg}')
    parser_post.add_argument('postCode', required=True, help='postCode参数不能为空，{error_msg}')
    parser_post.add_argument('name', required=True, help='name参数不能为空，{error_msg}')
    return parser_post.parse_args()


def parse_get_params():
    parser_get = reqparse.RequestParser()
    parser_get.add_argument('ucallFreeId',required=True, help='ucallFreeId参数不能为空，{error_msg}')
    return parser_get.parse_args()


# 申请老年卡
class ApplyCardResource(Resource):
    def get(self):
        parse_get = parse_get_params()
        ucallFreeId = parse_get['ucallFreeId']
        try:
            applyCards = ApplyCard.query.filter_by(uCallFreeId=ucallFreeId)
            if applyCards is not None:
                return {
                    "statusCode": 0,
                    "data": [ORMUtils.serialize(applyCard) for applyCard in applyCards],
                    "message": "查询成功!"
                        }
            else:
                return {
                    "statusCode": -1,
                    "data": None,
                    "message": "未找到相关信息!"
                }
        except Exception as e:
            with open('flask.log', 'a+') as f:
                f.write('\nget apply card info exception:%s \n' % e)
                f.close()
            return {
                    "statusCode": -1,
                    "data": None,
                    "message": "未找到相关信息!"
                }
    def post(self):
        parser_post = parse_post_parmas()
        try:
            ucallFreeId = parser_post['ucallFreeId']
            phoneNumber = parser_post['phoneNumber']
            name = parser_post['name']
            postCode = parser_post['postCode']
            address = parser_post['address']
            applyCard = ApplyCard(ucallFreeId=ucallFreeId,
                                  phoneNumber=phoneNumber,
                                  name=name,
                                  postCode=postCode,
                                  address=address)
            applyCard.save()
            return {
                "statusCode": 0,
                "message": "申请成功!"
            }
        except Exception as e:
            with open('flask.log', 'a+') as f:
                f.write('\napply card exception:%s \n' % e)
                f.close()

            return {
                "statusCode": 0,
                "message": "申请失败!"
            }