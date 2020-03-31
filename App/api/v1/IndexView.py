import urllib.parse
from flask_restful import Resource, url_for
from flask import redirect, request


# from App.ext import api

class Index(Resource):
    def get(self):
        # 接受
        params=urllib.parse.urlsplit(request.url).query
        print(dict(urllib.parse.parse_qs(params)))

        print(dict(request.args))

        return redirect(url_for('code'))


# def addResource(app):
#     api = Api(app)
#     api.add_resource(Index, '/', endpoint='index')
