# import base64
# import random
# import time
#
# from flask import Blueprint, Flask, request
#
# main = Blueprint('main', __name__)
#
#
# def init_blue(app: Flask):
#     app.register_blueprint(blueprint=main)
#
#
# @main.route('/')
# def index():
#     return 'hello world!'
#
#
# # 登录程序
# users = {
#     'levine': ['123456']
# }
#
#
#
# def gen_token(uid):
#     # uid,随机数，时间戳+7200s，用冒号链接,注意，需要添加encode()转成bytes
#     token = base64.b64encode(':'.join([str(uid), str(random.Random()), str(time.time() + 7200)]).encode())
#     users[uid].append(token.decode())
#     return token
#
#
# def verify_token(token):
#     # 判断token是否相等
#     _token = base64.b64decode(token)
#
#     _token = _token.decode() # 转成str
#     if not users.get(_token.split(':')[0])[-1] == token:
#         return -1  # 用户名不存在，或者token不存在或者token不相等
#     # 判断是否过期
#     if float(_token.split(':')[-1]) >= time.time():
#         return 1
#     else:
#         return 0
#
#
# @main.route('/login', methods=['GET', 'POST'])
# def login():
#     # 获取请求头中的Authorization的值，并使用base64进行解密，然后用“:”分割得到用户名和密码
#     # 注意，需要添加decode()将bytes转成str
#     uid, pw = base64.b64decode(request.headers['Authorization'].split(' ')[-1]).decode().split(':')
#     if users.get(uid)[0] == pw:  # 用户名和密码正确，则生成一个token并返回
#         return gen_token(uid)
#     else:
#         return 'error'
#
#
# @main.route('/test', methods=['GET', 'POST'])
# def test():
#     token = request.args.get('token')
#     print("token:" + token, 'type:', type(token))
#     print(verify_token(token))
#     print(users)
#     if verify_token(token) == 1:
#         return 'data'
#     else:
#         return 'error'
