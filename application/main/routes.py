from flask import render_template, url_for, send_from_directory, request, redirect
from application.main import bp
import os
from rq import Queue
from redis import Redis
import config as cfg
from werkzeug.utils import secure_filename
import application.errors.handlers as errors


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


def allowedFile(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in cfg.ALLOWED_EXTENSIONS


@bp.route('/gallery/<filename>')
def getImage(filename):
    return send_from_directory(cfg.UPLOAD_FOLDER, filename)


@bp.route('/gallery')
def seeAllImages():
    imgList = []
    for img in os.listdir(cfg.UPLOAD_FOLDER):
        uploadName = os.path.split(cfg.UPLOAD_FOLDER)[1]
        path = os.path.join(uploadName, img)
        if path.index("\\"):
            path = path.replace("\\", "/")
        imgList.append(path)
    return render_template('gallery.html', results=imgList)


@bp.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return errors.not_found_error(problem="Upload image was failure.")
    file = request.files['file']
    if file.filename == '':
        return errors.not_found_error(problem="Upload image was failure.")
    if file and allowedFile(file.filename):
        filename = secure_filename(file.filename)
        file.save(os.path.join(cfg.UPLOAD_FOLDER, filename))
        return redirect(f"/gallery/{filename}")
    else:
        return errors.not_found_error(problem="Upload image was failure.")


@bp.route('/favicon.ico')
def favicon():
    print(os.path.join(cfg.pyfrontDir, 'static', 'img'))
    return send_from_directory(os.path.join(cfg.pyfrontDir, 'static', 'img'),
                               'favicon.ico', mimetype='image/vnd.microsoft.icon')
