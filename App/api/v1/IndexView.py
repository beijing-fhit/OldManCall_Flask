
from flask_restful import Resource, url_for
from flask import redirect

# from App.ext import api

class Index(Resource):
    def get(self):
        return redirect(url_for('code'))


# def addResource(app):
#     api = Api(app)
#     api.add_resource(Index, '/', endpoint='index')
