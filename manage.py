from flask_script import Manager, Shell
from flask_migrate import MigrateCommand

import App

app = App.create_app()

manager = Manager(app)
manager.add_command('db', MigrateCommand)
manager.add_command('create_user',lambda  :print('username:'))
if __name__ == '__main__':
    manager.run()
