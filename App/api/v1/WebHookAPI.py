import hmac
import os
from flask import request, jsonify
from flask_restful import Resource

from App import settings


class WebHook(Resource):
    def post(self):# github中会使用post方法来请求
        '''用于github的webhook的post请求，拿到请求后
            验证其secret，IP地址是否是在github调用白名单内，
            以及最终的部署命令
            '''
        signature = request.headers.get('X-Hub-Signature')
        sha, signature = signature.split('=')
        secret = str.encode(settings.Config.GITHUB_WEBHOOK_KEY)
        hashhex = hmac.new(secret, request.data, digestmod='sha1').hexdigest()
        if hmac.compare_digest(hashhex, signature):
            # repo = Repo(current_app.config.get('REPO_PATH'))
            # origin = repo.remotes.origin
            # origin.pull('--rebase')
            # commit = request.json['after'][0:6]
            # print('Repository updated with commit {}'.format(commit))
            # 使用shell来执行提交命令
            depoly()
            return jsonify({}), 200

def depoly():
    '''首先下本地需要执行pip freeze > requirements.txt然后在远端将这里面的包安装'''
    # 1.启动python虚拟环境并切换到仓库目录
    # 2.从远程仓库pull最新代码
    # 3.从requirements.txt中安装最新的库
    # 4.数据库迁移（一般只是在第一次中使用，故可省略）
    # 5.重启gunicorn服务器