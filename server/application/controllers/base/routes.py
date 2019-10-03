from flask import jsonify, render_template, redirect, request, url_for, send_from_directory
from werkzeug.utils import secure_filename
from application.controllers.base import blueprint

import os
from config import Config as cfg


# sanity check route
@blueprint.route('/ping', methods=['GET'])
def ping_pong():
    return jsonify('pong!')


@blueprint.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(cfg.APP_PATH, 'static', 'images'),
                               'favicon.ico', mimetype='image/vnd.microsoft.icon')


@blueprint.route('/gallery/<filename>')
def getImage(filename):
    return send_from_directory(cfg.UPLOAD_FOLDER, filename)


@blueprint.route('/gallery')
def seeAllImages():
    imgList = []
    for img in os.listdir(cfg.UPLOAD_FOLDER):
        uploadName = os.path.split(cfg.UPLOAD_FOLDER)[1]
        path = os.path.join(uploadName, img)
        if path.index("\\"):
            path = path.replace("\\", "/")
        imgList.append(path)
    return render_template('gallery.html', results=imgList)


@blueprint.route('/upload', methods=['POST'])
def upload_file():
    def allowedFile(filename):
        return '.' in filename and filename.rsplit('.', 1)[1].lower() in cfg.ALLOWED_EXTENSIONS

    if 'file' not in request.files:
        raise Exception
    file = request.files['file']
    if file.filename == '':
        raise Exception
    if file and allowedFile(file.filename):
        filename = secure_filename(file.filename)
        file.save(os.path.join(cfg.UPLOAD_FOLDER, filename))
        return redirect(f"/gallery/{filename}")
    else:
        raise Exception


# @blueprint.route('/page_<error>')
# def route_errors(error):
#     return render_template('errors/page_{}.html'.format(error))


# @blueprint.errorhandler(403)
# def access_forbidden(error):
#     return render_template(''), 403
#
#
# @blueprint.errorhandler(404)
# def not_found_error(error):
#     return render_template('errors/page_404.html'), 404
#
#
# @blueprint.errorhandler(500)
# def internal_error(error):
#     return render_template('errors/page_500.html'), 500
