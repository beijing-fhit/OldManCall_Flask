from flask import request
from flask_restful import Resource


class WebHook(Resource):
    def get(self):
        print("开始部署")
        print("*"*100)
        print(request.data)
        print("部署结束")