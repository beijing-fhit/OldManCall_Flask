from flask import request
from flask_restful import Resource


class WebHook(Resource):
    def get(self):
        print(request.data)