from flask import render_template, url_for, send_from_directory, request, redirect
from application.main import bp
import os
from rq import Queue
from redis import Redis
import config
from werkzeug.utils import secure_filename
import flask_uploads

@bp.route('/', methods=['GET'])
def index():
    return render_template('index.html')


# redisConn = Redis(host='redis', port="6379")
# queue = Queue(connection=redisConn)


@bp.route('/startDetection', methods=['GET'])
def startDetection():
    import application.services.docker_handlers as dc
    job = queue.enqueue(dc.runDockerContainer("sapfir0/premier-eye"))


@bp.route("/api/getUpdateKey", methods=['GET'])
def getUpdateKey():
    return NotImplemented  # может вовзращать просто последнюю версию, чтобы сервисы обращзались сюда и обновлялись


@bp.route("/service/checkConnections", methods=['POST'])
def checkConnections():
    return NotImplemented


from pathlib import Path
APP_PATH = Path(__file__).parents[1]

UPLOAD_FOLDER = os.path.join(APP_PATH, "static", "uploads")
#MAX_CONTENT_LENGTH = 16 * 1024 * 1024
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@bp.route('/upload')
def upload_form():
    return render_template('upload.html')


@bp.route('/galery/<filename>')
def getImage(filename):
    return send_from_directory(UPLOAD_FOLDER, filename)


@bp.route('/galery')
def seeAllImages():
    imgList = []
    for img in os.listdir(UPLOAD_FOLDER):
        uploadName = os.path.split(UPLOAD_FOLDER)[1]
        path = os.path.join(uploadName, img)
        if path.index("\\"):
            path = path.replace("\\", "/")
        imgList.append(path)

    return render_template('foo.html', results=imgList)


@bp.route('/upload', methods=['POST'])
def upload_file():
    if request.method == 'POST':
        if 'file' not in request.files:
            return redirect(request.url)
        file = request.files['file']
        if file.filename == '':
            return redirect(request.url)
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(UPLOAD_FOLDER, filename))
            return redirect('/upload')
        else:
            return redirect(request.url)


@bp.route('/favicon.ico')
def favicon():
    print(os.path.join(config.pyfrontDir, 'static', 'img'))
    return send_from_directory(os.path.join(config.pyfrontDir, 'static', 'img'),
                               'favicon.ico', mimetype='image/vnd.microsoft.icon')
