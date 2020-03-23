import logging

from flask import Flask

from App import settings, ext, views,log,urls
from App.api.v1 import WebHookAPI


def create_app():
    # 创建flask对象
    app = Flask(__name__, static_folder=settings.STATIC_FOLDER, template_folder=settings.TEMPLATE_FOLDER)
    # 加载settings配置文件
    app.config.from_object(settings.envs.get('product'))  # 开发环境
    # app.config.from_object(settings.envs.get('product')) # 线上环境
    # 初始化第三方插件
    ext.init_ext(app)
    # 初始化蓝图
    # views.init_blue(app)

    # 使用flask-restful初始化蓝图
    # 初始化路由
    urls.init_urls(app)
    # 初始化日志系统
    log.init_log(app)
    WebHookAPI.init_webhook(app)
    return app
