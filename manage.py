from flask_script import Manager
from flask_migrate import MigrateCommand

import App

app = App.create_app()

manage = Manager(app)
manage.add_command('db', MigrateCommand)

if __name__ == '__main__':
    manage.run()
