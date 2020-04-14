# coding = utf-8
from urllib import parse

import requests
from flask import redirect, session

from flask_restful import Resource, reqparse
from App.utils import Constants

parser = reqparse.RequestParser()
parser.add_argument('code',  required=True, help='请先获取code')

# 这个方法已经没有用了，现在是前后分离项目，直接在前端重定向
class Code(Resource):
    def get(self):
        url = 'https://agency.ucallclub.com/wechart/Oauth2?'
        redirect_url = 'https://mustberich.cn/openid'
        # redirect_url = 'http://127.0.0.1:5000/openid'
        a = {'redirect_uri': redirect_url}
        encode_url = parse.urlencode(a)
        # response=make_response(redirect(url + encode_url))
        # response.headers['Access-Control-Allow-Origin']="*"
        return redirect(url + encode_url)


class OpenId(Resource):

    def get(self):
        try:
            request_openid_url = 'https://agency.ucallclub.com/wechart/Access_token?code='
            args = parser.parse_args()
            code = args['code']
            resp = requests.get(request_openid_url + code)
            if resp.status_code == 200:
                # 获取到openid
                openid = resp.json()['openid']
                session['openid'] = openid
                return {
                    'status_code': 0,
                    'data': openid,
                    'message': '获取信息成功'
                }
            # return make_response(render_template('index.html'))
            return  {
                'status_code': -1,
                'data': None,
                'message': '获取openid失败'
            }
        except Exception as e:
            return   {
                'status_code': 0,
                'data': None,
                'message': '获取openid失败,%s' % e
            }

parser = reqparse.RequestParser()
parser.add_argument('lat', required=True, help='lat(纬度)参数不能为空，{error_msg}')
parser.add_argument('lon', required=True, help='lon(经度)参数不能为空，{error_msg}')


class LocationDesc(Resource):
    def get(self):
        try:
            args = parser.parse_args()
            lat = args['lat']
            lon = args['lon']
            a = lat + ',' + lon
            resp = requests.post(Constants.TENCENT_MAP_URL,
                                 {"location": a,
                                  "key": Constants.TENCENT_MAP_KEY
                                  })
            if resp.status_code == 200:
                return resp.json()
            else:
                return '无法获取地址'
        except Exception as e:
            return '获取地址失败，%s' % e
