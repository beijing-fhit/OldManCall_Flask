# coding = utf-8
from urllib import parse

import requests
from flask import redirect, render_template, session, make_response

from flask_restful import Resource, reqparse


parser = reqparse.RequestParser()
parser.add_argument('code',  required=True, help='请先获取code')


class Code(Resource):
    def get(self):
        url = 'https://agency.ucallclub.com/wechart/Oauth2?'
        redirect_url = 'https://mustberich.cn/openid'
        # redirect_url = 'http://127.0.0.1:5000/openid'
        a = {'redirect_uri': redirect_url}
        encode_url = parse.urlencode(a)
        response=make_response(redirect(url + encode_url))
        # response.headers['Access-Control-Allow-Origin']="*"
        return response


class OpenId(Resource):

    def get(self):
        try:
            request_openid_url = 'https://agency.ucallclub.com/wechart/Access_token?code='
            args = parser.parse_args()
            code = args['code']
            # if code is None:
            #     return '请先获取code'
            # if code == '':
            #     return '请先获取code'
            resp = requests.get(request_openid_url + code)
            if resp.status_code == 200:
                # 获取到openid
                openid = resp.json()['openid']
                session['openid'] = openid
                return make_response('获取openID成功',200)
            # return make_response(render_template('index.html'))
            return make_response('获取openID失败',200)
        except Exception as e:
            return make_response('获取openID失败:%s'%e,200)
