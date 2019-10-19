from flask import jsonify, render_template, redirect, request, url_for, send_from_directory
from werkzeug.utils import secure_filename
from application.controllers.base import blueprint

import os
from config import Config as cfg
from application.controllers.base.directory import recursiveSearch
from application.controllers.base.directory import getOutputDir


@blueprint.route('/', methods=['GET'])
def hi():
    return "Server is up!"


@blueprint.route('/gallery/<filename>')
def getImage(filename):
    outputPath = os.path.join(cfg.UPLOAD_FOLDER, getOutputDir(filename))
    if os.path.exists(os.path.split(outputPath)[0]):
        return send_from_directory(os.path.split(outputPath)[0], filename)
    else:
        return "Error while loading image", 404


@blueprint.route('/gallery', methods=['GET'])
def seeAllImages():
    return jsonify(recursiveSearch(cfg.UPLOAD_FOLDER))


@blueprint.route('/gallery/camera/<cameraId>', methods=['GET'])
def getLastData(cameraId):
    cameraPath = os.path.join(cfg.UPLOAD_FOLDER, cameraId)
    if not os.path.exists(cameraPath):
        return "Error while loading image", 404
    imgList = recursiveSearch(cameraPath)
    return jsonify(imgList)


@blueprint.route('/upload', methods=['POST'])
def upload_file():
    def allowedFile(filename):
        return '.' in filename and filename.rsplit('.', 1)[1].lower() in cfg.ALLOWED_EXTENSIONS

    if 'file' not in request.files:
        raise Exception("No image")
    file = request.files['file']
    if file.filename == '':
        raise Exception
    if file and allowedFile(file.filename):
        filename = secure_filename(file.filename)
        outputPath = os.path.join(cfg.UPLOAD_FOLDER, getOutputDir(filename))
        if not os.path.exists(os.path.split(outputPath)[0]):
            os.makedirs(os.path.split(outputPath)[0])
        file.save(outputPath)
        return redirect(f"/gallery/{filename}")
    else:
        raise Exception




