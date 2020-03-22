
from flask import request
from flask_restful import Resource


class WebHook(Resource):
    def post(self):# github中会使用post方法来请求
        dict=request.data
        from flask import json
        return  json.loads(dict)
