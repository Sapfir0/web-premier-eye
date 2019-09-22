from application import createApp
from config import Config as cfg
import os

app = createApp()

if __name__ == "__main__":
    port = int(os.environ.get('PORT', 5000))

    app.run(cfg.FLASK_RUN_HOST,  debug=True, port=port)
