from application import createApp
from config import Config as cfg

app = createApp(cfg)
DEBUG = True

if __name__ == '__main__':
    app.run(debug=DEBUG, port=cfg.PORT)