# from flask_bootstrap import Bootstrap
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_restful import Api

# from flask_debugtoolbar import DebugToolbarExtension


db = SQLAlchemy()
migrate = Migrate()
api = Api()


def init_ext(app):
    # 初始化第三方插件
    db.init_app(app)
    migrate.init_app(app=app, db=db)
    # Bootstrap(app)
    # DebugToolbarExtension(app)


