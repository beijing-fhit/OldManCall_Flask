# import urllib.parse
# from flask_restful import Resource, url_for
# from flask import redirect, request, session, render_template, make_response


# from App.ext import api

# class Index(Resource):
#     def get(self):
#         # params = dict(request.args)
#         # print(params)
#         # if "openid" in params and "ucallfreeid" in params:
#         #     session['openid'] = params.get('openid')[0]
#         #     session['ucallfreeid'] = params.get('ucallfreeid')[0]
#         #     session['qrcodeid'] = params.get('qrcodeid')[0]
#         #     return make_response(render_template('index.html'))
#         # else:
#         return redirect(url_for('code'))


# class UrlFrom(Resource):
#     def get(self):
        # 接受url中的参数，如果有参数则将参数中的openID，ucallfreeid和qrcodeid写入session，然后
        # params=urllib.parse.urlsplit(request.url).query
        # print(dict(urllib.parse.parse_qsl(params)))# 调用parse_qs则表示多值得参数
        # openid = session.get('openid')
        # ucallfreeid = session.get('ucallfreeid')
        # qrcodeid = session.get('qrcodeid')
        #
        # # params = dict(request.args)
        # # print(params)
        # return {'openid': openid, 'ucallfreeid': ucallfreeid, 'qrcodeid': qrcodeid}
        #
        # if openid and ucallfreeid and qrcodeid:
        #     return 'mp'
        # else:
        #     return 'web'

# def addResource(app):
#     api = Api(app)
#     api.add_resource(Index, '/', endpoint='index')
