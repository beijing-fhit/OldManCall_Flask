# # coding=utf-8
# import requests
# # 请求登录接口
# # r = requests.get('http://127.0.0.1:5000/login', auth=('levine', '123456'))
# # print(r.text)
#
# # 请求数据
# token='bGV2aW5lOjxyYW5kb20uUmFuZG9tIG9iamVjdCBhdCAweDAwMDAwMUU2ODU0RUI4Mzg+OjE1ODM3NTIwOTIuMzMzNDMwOA=='
# r = requests.get('http://127.0.0.1:5000/test',params={'token':token} )
# print(r.text)

# import os
# print(__file__)
# print(os.path.dirname(__file__))
# print(os.path.abspath(__file__))
# print(os.path.dirname(os.path.abspath(__file__)))
# print(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
import requests

from App.utils import Constants

resp = requests.post(Constants.MSG_NOTIFICATION_SEND_URL,
                     json={
                         'orgid': '123',
                         'password': '123',
                         'mobile': '13550217062',
                         'content': '【北京峰华】您的验证码是: 1102 sfsdf'
                     })
print(resp.text)
