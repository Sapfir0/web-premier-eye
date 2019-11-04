import os
from pathlib import Path


class Config(object):
    FLASK_RUN_HOST = os.environ.get('FLASK_RUN_HOST')
    ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
    PORT = int(os.environ.get('FLASK_RUN_PORT', 5000))
    HOST = '0.0.0.0'
    APP_PATH = Path(__file__).parents[0]

    UPLOAD_FOLDER = os.path.join(APP_PATH, "application", "static", "uploads")
    if not os.path.exists(UPLOAD_FOLDER):
        os.makedirs(UPLOAD_FOLDER)





    # def createDatabase(self):
    #     import subprocess
    #     from distutils.util import get_platform
    #     platform = get_platform()
    #     if platform.startswith("linux"):
    #
    #         with subprocess.Popen(["mysql",], stderr=subprocess.PIPE, stdout=subprocess.PIPE ) as cur:
    # create database eye;
    # create user 'eye-worker'@'localhost' identified with mysql_native_password by '123456';
    # grant all privileges on eye.* to 'eye-worker'@'localhost';
    #     else:
    #         print("Auto creating database if failed.")



