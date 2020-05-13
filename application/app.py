from application import createApp
from application.config import Config as cfg

app = createApp(cfg)

if __name__ == '__main__':
    app.run(port=cfg.PORT, host=cfg.HOST)