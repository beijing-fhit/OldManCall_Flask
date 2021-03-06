

from flask import Flask

from App import settings, ext, views,log,urls


def create_app():
    # 创建flask对象
    # app = Flask(__name__, static_folder=settings.STATIC_FOLDER, template_folder=settings.TEMPLATE_FOLDER)
    # SPA项目不用为flask指定静态资源文件路径
    app = Flask(__name__)
    # 加载settings配置文件
    # app.config.from_object(settings.envs.get('develop'))  # 开发环境
    # app.config.from_object(settings.envs.get('testing'))  # 线上环境（这里名称可能有误，但确实是线上环境）
    app.config.from_object(settings.envs.get('staging'))  # 测试环境（这里名称可能有误，但确实是测试环境）
    # app.config.from_object(settings.envs.get('product')) # 线上环境(自己的服务器环境)
    # app.config.from_object(settings.envs.get('docker')) # docker环境
    # 初始化第三方插件
    ext.init_ext(app)
    # 初始化蓝图
    # views.init_blue(app)
    # 使用flask-restful初始化蓝图
    # 初始化路由
    urls.init_urls(app)
    return app
