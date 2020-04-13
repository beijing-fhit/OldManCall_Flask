# 配置BASE_DIR和模板文件的路径
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

TEMPLATE_FOLDER = os.path.join(BASE_DIR, 'frontend/dist')
STATIC_FOLDER = os.path.join(BASE_DIR, 'frontend/dist/static')


# 将json格式的数据库参数转化为标准的数据库URI
def parse_db_uri(db_info):
    engine = db_info.get('ENGINE') or 'mysql'
    driver = db_info.get('DRIVER') or 'pymysql'
    user = db_info.get('USER') or 'root'
    password = db_info.get('PASSWORD') or 'root'
    host = db_info.get('HOST') or 'localhost'
    port = db_info.get('PORT') or '3306'
    name = db_info.get('NAME') or 'test'
    return '{}+{}://{}:{}@{}:{}/{}'.format(engine, driver, user, password, host, port, name)


# 基础参数配置
class Config:
    DEBUG = False

    TESTING = False

    SECRET_KEY = 'o5\x8f\xf5TI\x8e0\xd2\x9b\xff|\x8d\x01\x03\xf3\xc4\xfa+\x87\xa0\x98\r\x86'

    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # JSON_AS_ASCII = False

    GITHUB_WEBHOOK_KEY='ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDenBQYR9OGH+98RA9LL68M2EqKKcSA5NhLQ38JDOd2JzPOBKy34y2oKprRhp/33noPfTCiigns84akCHDoBIZ9jtd/zYVmfMifsWrMgOZMGT5I+yGVzDb3QAXemyE1eCJoPIEWmvZut7Nbz2CsxBZZKxFV0SLOo5lnpHMYL5jtNOsZe+V+g6fxcjy391BtdlHw1NT712ltibLvGi810Paklxn80jmG0LUwECjo25ylCUQ7+0S4v216JCB4IDd8LHgwhAltjvWiXZuNbwegYxKW9QPO/Wv6/mokOS1cbeSoWWftna8+R1Eq8o9VU95ofEPwthjI8oXMvc0AK3EpTe5n summer@DESKTOP-IPUF6C0'
    # 需要数据库初始化时，设为True
    INIT_DB=False
    # 需要数据库迁移时，设为True
    MIGRATE_DB=False



# 开发环境参数配置
class DevelopConfig(Config):
    DEBUG = True
    SQLALCHEMY_ECHO = True  # 回显sql语句
    # 注意：不同环境下的数据库名称NAME应该不一样
    DATABASE = {
        'ENGINE': 'mysql',
        'DRIVER': 'pymysql',
        'USER': 'root',
        'PASSWORD': '123456',
        'HOST': 'localhost',
        'PORT': '3306',
        'NAME': 'OldManInfoFlask'
    }
    SQLALCHEMY_DATABASE_URI = parse_db_uri(DATABASE)


# 测试环境参数配置
class TestingConfig(Config):
    TESTING = True
    DATABASE = {
        'ENGINE': 'mysql',
        'DRIVER': 'pymysql',
        'USER': 'root',
        'PASSWORD': 'Fhit123!@#',
        'HOST': 'localhost',
        'PORT': '3306',
        'NAME': 'OldManInfoTesting'
    }
    SQLALCHEMY_DATABASE_URI = parse_db_uri(DATABASE)


# 演示环境参数配置
class StagingConfig(Config):
    DATABASE = {
        'ENGINE': 'mysql',
        'DRIVER': 'pymysql',
        'USER': 'root',
        'PASSWORD': '123456',
        'HOST': 'localhost',
        'PORT': '3306',
        'NAME': 'OldManInfoFlaskStaging'
    }
    SQLALCHEMY_DATABASE_URI = parse_db_uri(DATABASE)


# 演示环境参数配置
class ProductConfig(Config):
    DATABASE = {
        'ENGINE': 'mysql',
        'DRIVER': 'pymysql',
        'USER': 'root',
        'PASSWORD': 'Licai19941022800',
        'HOST': 'localhost',
        'PORT': '3306',
        'NAME': 'OldManInfoFlaskProduct'
    }
    SQLALCHEMY_DATABASE_URI = parse_db_uri(DATABASE)

# linux上的docker环境参数配置
class DockerConfig(Config):
    DATABASE = {
        'ENGINE': 'mysql',
        'DRIVER': 'pymysql',
        'USER': 'root',
        'PASSWORD': '123456',
        'HOST': 'mustberich.cn',
        'PORT': '4306',
        'NAME': 'OldManInfoFlaskForDocker'
    }
    SQLALCHEMY_DATABASE_URI = parse_db_uri(DATABASE)


envs = {
    'develop': DevelopConfig,
    'testing': TestingConfig,
    'staging': StagingConfig,
    'product': ProductConfig,
    'docker': DockerConfig
}
