# coding=utf-8
from flask_script import Manager, Shell, Server
from flask_migrate import MigrateCommand

import App
from App import settings

app = App.create_app()
manager = Manager(app)

# 重新定义端口,runserver其实就是用的这个命令
# -----测试环境使用----start-----
server = Server(port=settings.RUN_PORT)
manager.add_command('runserver', server)
# -----测试环境使用----end-------

manager.add_command('db', MigrateCommand)

if __name__ == '__main__':
    manager.run()
