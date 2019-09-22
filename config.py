import os
from dotenv import load_dotenv
from pathlib import Path
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
pyfrontDir = os.path.abspath(os.path.dirname(__file__))
basedir = os.path.splitext(pyfrontDir)[0]
load_dotenv(os.path.join(basedir, '.env'))
APP_PATH = Path(__file__).parents[0]
UPLOAD_FOLDER = os.path.join(APP_PATH, "application", "static", "uploads")
if not os.path.exists(UPLOAD_FOLDER):
    os.mkdir(UPLOAD_FOLDER)


class Config(object):
    FLASK_RUN_HOST = os.environ.get('FLASK_RUN_HOST')
    REDIS_URL = os.environ.get('REDIS_URL') or 'redis://'
    DATABASE_URL = os.environ.get("DATABASE_URL") or 'sqlite:///' + os.path.join(pyfrontDir, 'app.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False




