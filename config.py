from os import environ
import os
from pathlib import Path


class Config(object):
    SECRET_KEY = 'key'
    #SQLALCHEMY_DATABASE_URI = 'sqlite:///database.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
    APP_PATH = Path(__file__).parents[0]
    UPLOAD_FOLDER = os.path.join(APP_PATH, "application", "static", "uploads")
    if not os.path.exists(UPLOAD_FOLDER):
        os.mkdir(UPLOAD_FOLDER)

    # THEME SUPPORT
    #  if set then url_for('static', filename='', theme='')
    #  will add the theme name to the static URL:
    #    /static/<DEFAULT_THEME>/filename
    # DEFAULT_THEME = "themes/dark"
    DEFAULT_THEME = None


class ProductionConfig(Config):
    DEBUG = False

    # Security
    SESSION_COOKIE_HTTPONLY = True
    REMEMBER_COOKIE_HTTPONLY = True
    REMEMBER_COOKIE_DURATION = 3600

    # PostgreSQL database
    SQLALCHEMY_DATABASE_URI = 'postgresql://{}:{}@{}:{}/{}'.format(
        environ.get('GENTELELLA_DATABASE_USER', 'gentelella'),
        environ.get('GENTELELLA_DATABASE_PASSWORD', 'your-password'),
        environ.get('GENTELELLA_DATABASE_HOST', 'localhost'),
        environ.get('GENTELELLA_DATABASE_PORT', 5432),
        environ.get('GENTELELLA_DATABASE_NAME', 'gentelella')
    )


class DebugConfig(Config):
    DEBUG = True


config_dict = {
    'Production': ProductionConfig,
    'Debug': DebugConfig
}
