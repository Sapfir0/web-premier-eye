from flask import jsonify, render_template, redirect, request, url_for, send_from_directory
from werkzeug.utils import secure_filename
from application.controllers.base import blueprint

import os
from config import Config as cfg


@blueprint.route('/gallery/<filename>')
def getImage(filename):
    return send_from_directory(cfg.UPLOAD_FOLDER, filename)


@blueprint.route('/gallery', methods=['GET'])
def seeAllImages():
    imgList = [img for img in os.listdir(cfg.UPLOAD_FOLDER)]
    return jsonify(imgList)


# @blueprint.route('/lastData', methods=['GET'])
# def getLastData():
#
#     return jsonify(imgList)


@blueprint.route('/upload', methods=['POST'])
def upload_file():
    def allowedFile(filename):
        return '.' in filename and filename.rsplit('.', 1)[1].lower() in cfg.ALLOWED_EXTENSIONS

    print(request.form)
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


