from flask import jsonify, render_template, redirect, request, url_for, send_from_directory
from werkzeug.utils import secure_filename
from application.controllers.base import blueprint

import os
from config import Config as cfg


@blueprint.route('/gallery/<filename>')
def getImage(filename):
    outputPath = os.path.join(cfg.UPLOAD_FOLDER, getOutputDir(filename))
    if os.path.exists(os.path.split(outputPath)[0]):
        return send_from_directory(os.path.split(outputPath)[0], filename)
    else:
        return "Error while loading image", 404


@blueprint.route('/gallery', methods=['GET'])
def seeAllImages():
    return NotImplemented


@blueprint.route('/', methods=['GET'])
def hi():
    return "Hey Man"


@blueprint.route('/gallery/camera/<cameraId>', methods=['GET'])
def getLastData(cameraId):
    cameraPath = os.path.join(cfg.UPLOAD_FOLDER, cameraId)
    if not os.path.exists(cameraPath):
        return "Error while loading image", 404
    imgList = recursiveSearch(cameraPath)
    return jsonify(imgList)


def recursiveSearch(directory, listOfImages=None):
    if listOfImages is None:
        listOfImages = []
    for files in os.listdir(directory):
        path = os.path.join(directory, files)
        if os.path.isdir(path):
            recursiveSearch(path, listOfImages)
        else:
            listOfImages.append(files)
    return listOfImages



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


def getOutputDir(filename):
    def getDateOrHours(filename: str):
        date1 = filename.split("_")[1].split(".")[0]
        parsedData = date1[0:8]
        hours1 = date1[8:10]
        return parsedData, hours1
    numberOfCam = filename.split("_")[0]
    date, hours = getDateOrHours(filename)
    outputFile = os.path.join(cfg.UPLOAD_FOLDER, numberOfCam, date, hours, filename)
    return outputFile


