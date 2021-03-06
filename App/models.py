import datetime

from .ext import db


# Create your models here.
# 创建一个基类，用于对象的CRUD操作
class Base:
    def save(self):
        try:
            db.session.add(self)  # self实例化对象代表就是u对象
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            raise Exception('保存model异常：'+e)

    # 定义静态类方法接收List参数
    @staticmethod
    def save_all(List):
        try:
            db.session.add_all(List)
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            raise Exception('批量保存model异常：'+e)

        # 定义静态类方法接收List参数
        @staticmethod
        def delete_all(List):
            try:
                db.session.delete_all(List)
                db.session.commit()
            except Exception as e:
                db.session.rollback()
                raise Exception('批量删除model异常：'+e)

    # 定义删除方法
    def delete(self):
        try:
            db.session.delete(self)
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            raise Exception('删除model异常：'+e)


class OldManInfo(db.Model,Base):
    __tablename__='oldmaninfo'
    id = db.Column(db.Integer,primary_key=True,autoincrement=True)
    created_time = db.Column(db.DateTime, default=datetime.datetime.now())
    name = db.Column(db.String(10))
    address = db.Column(db.String(30),nullable=True)
    age = db.Column(db.Integer,nullable=True) # 注意不传的话，会是个空字符串，会报错
    medical_history = db.Column(db.String(100),nullable=True)
    allergy = db.Column(db.String(100),nullable=True)
    blood_type = db.Column(db.String(10),nullable=True)
    drugs = db.Column(db.String(30),nullable=True)
    treatment = db.Column(db.String(30),nullable=True)
    message = db.Column(db.String(150), nullable=True)

    def __init__(self,name,address=None,age=None,medical_history=None,allergy=None,blood_type=None,drugs=None,treatment=None,message=None):
        self.name=name
        self.address=address
        self.age=age
        self.medical_history=medical_history
        self.allergy=allergy
        self.blood_type=blood_type
        self.drugs=drugs
        self.treatment=treatment
        self.message=message

    def __repr__(self):
        return self.name

    def __str__(self):
        return {
            "id": self.id,
            "name": self.name,
            "address":self.address,
            "age":self.age,
            "medical_history":self.medical_history,
            "allergy":self.allergy,
            "blood_type":self.blood_type,
            "drugs":self.drugs,
            "treatment":self.treatment,
            "message":self.message,
        }

# 一个二维码id对应多个电话号码
class PhoneNumber(db.Model,Base):
    __tablename__='phonenumber'
    id = db.Column(db.Integer,primary_key=True,autoincrement=True)
    phone_number = db.Column(db.String(50))
    q_id = db.Column(db.String(50),db.ForeignKey('qrcode.qr_code_id'))

    def __init__(self,phone_number,q_id):
        self.phone_number=phone_number
        self.q_id=q_id

    def __repr__(self):
        return self.phone_number


# 用于获取一个qrcode所对应的的所有电话号码
# class PhoneNumberMethod:
#     def get_phone_numbers(self):
#         try:
#             phone_numbers = PhoneNumber.quary.filter_by(phone_number=self.phone_number,q_id=self.qr_code_id).order_by("pk")
#             return phone_numbers
#         except :
#             return []


class QrCode(db.Model,Base):
    __tablename__='qrcode'
    qr_code_id = db.Column(db.String(50),primary_key=True)
    uId = db.Column(db.Integer, db.ForeignKey('ucallfreeid.uCallFreeId'))
    phone_number = db.relationship('PhoneNumber',backref='qrcode',lazy='dynamic')
    old_man_info = db.Column(db.Integer, db.ForeignKey('oldmaninfo.id',ondelete='CASCADE'))# 这里的old_man_info是OldManInfo的表名，可以在__tablename__中指定表名

    def __init__(self, qr_code_id, uId, old_man_info):
        self.qr_code_id=qr_code_id
        self.uId = uId
        self.old_man_info=old_man_info

    def __repr__(self):
        return self.qr_code_id


class UCallFreeId(db.Model, Base):
    __tablename__ = "ucallfreeid"
    uCallFreeId = db.Column(db.Integer, primary_key=True)
    qrCode = db.relationship('QrCode', backref='ucallfreeid', lazy='dynamic')

    def __init__(self, ucallFreeId):
        self.uCallFreeId = ucallFreeId

    def __repr__(self):
        return self.uCallFreeId


class ApplyCard(db.Model, Base):
    __tablename__ = "applycard"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    uCallFreeId = db.Column(db.String(10))
    phoneNumber = db.Column(db.String(30))
    address = db.Column(db.String(50))
    postCode = db.Column(db.String(15))
    name = db.Column(db.String(15))

    def __init__(self, ucallFreeId, phoneNumber, address, postCode, name):
        self.uCallFreeId = ucallFreeId
        self.phoneNumber = phoneNumber
        self.address = address
        self.postCode = postCode
        self.name = name

    def __repr__(self):
        return self.name