# 查找某个对象中是否有某个记录
from sqlalchemy import text

from App.ext import db


# 根据条件,查询单表中是否存在某个记录
def isRecordExist(model, condition):
    # 注意：在不使用text函数情况下，需要使用“==”和","l
    # exists = db.session.query(db.exists().where(PhoneNumber.phoneNumber =='13550217062', id == 7)).scalar()
    # 在使用text函数的情况下：
    # exists = dbutils.isRecordExist(PhoneNumber, "phoneNumber = '13550217062' and  id = 7")
    q = db.session.query(model).filter(text(condition))
    exists = db.session.query(
        q.exists()
    ).scalar()
    return exists


# 序列化model
def serialize(model):
    from sqlalchemy.orm import class_mapper
    columns = [c.key for c in class_mapper(model.__class__).columns]
    return dict((c, getattr(model, c)) for c in columns)
