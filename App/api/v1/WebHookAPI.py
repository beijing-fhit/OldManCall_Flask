import hmac
import os
from flask import request
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
            if depoly():
                return "params accepted successfully!"
            else:
                return "出现错误"
def depoly():
    try:

        '''首先下本地需要执行pip freeze > requirements.txt然后在远端将这里面的包安装'''
        # 1.启动python虚拟环境并切换到仓库目录
        os.system('/bin/bash --rcfile /home/OldManInfo_env/bin/activate')
        # 2.从远程仓库pull最新代码
        # 由于切换到另一个工作目录是在子进程中完成的，不会影响主进程的目录，故需要在切换后使用其他命令
        cmd0 ='cd /home/OldManInfo_Flask'
        cmd1='git pull origin master'
        # 3.从requirements.txt中安装最新的库
        cmd2='pip install -r requirements.txt'
        # 4.数据库迁移（一般只是在第一次中使用，故可省略）
        cmd3='python manage.py db init'
        cmd4='python manage.py db migrate'
        cmd5='python manage.py db upgrade'
        # 5.重启gunicorn服务器（如果在gunicorn.conf.py中配置了reload参数，则会自动重启）
        cmd="&&".join([cmd0,cmd1,cmd2])+("&& %s"%cmd3 if settings.Config.INIT_DB else "")\
        +("&& %s && %s"%(cmd4,cmd5) if settings.Config.MIGRATE_DB else "")
        # 写入文件
        with open('flask.log','w') as f:
            f.write('\ncommand is :%s'%cmd)
            f.close()
        os.system(cmd)
        return True
    except Exception as e:
        # print('exception:',e)
        # 写入文件
        with open('flask.log', 'w') as f:
            f.write('\nexception is :',  e)
            f.close()
        return False