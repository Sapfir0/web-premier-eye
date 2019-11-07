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

