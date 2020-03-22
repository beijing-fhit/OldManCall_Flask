from flask import request
from flask_restful import Resource


class WebHook(Resource):
    def post(self):# github中会使用post方法来请求
        return  request.data
