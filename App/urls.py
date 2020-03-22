from flask import Flask
from flask_restful import Api
from App.api.v1.IndexView import Index
from App.api.v1.ServiceApi import OpenIdFromSession, QRCodeInfo
from App.api.v1.WechatApi import Code, OpenId
from .api.v1.WebHookAPI import WebHook
from .ext import api

def init_urls(app: Flask):
    addResource(api)
    api.init_app(app)# init_app只能在add_resource方法后才能有效


version = 'v1'


# 全局路由
def addResource(api: Api):
    api.add_resource(WebHook,'/github/webhook/','/github/webhook',endpoint='github_webhook')
    api.add_resource(Index, '/', endpoint='index')
    api.add_resource(Code, '/code', endpoint='code')
    api.add_resource(OpenId, '/openid', endpoint='openid')
    api.add_resource(OpenIdFromSession,'/getopenid',endpoint='getopenid')
    api.add_resource(QRCodeInfo,'/qr_code_info',endpoint='qr_code_info')
