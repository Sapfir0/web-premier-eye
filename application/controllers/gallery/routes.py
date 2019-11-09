import os

from flask import jsonify, send_from_directory, request
from application.controllers.base import blueprint
from application.services.directory import recursiveSearch, getOutputDir
from config import Config as cfg
from application.controllers.gallery import routes
import application.database.dbAPI as db
from datetime import datetime


@blueprint.route(routes['getImage'])
def getImage(filename):
    outputPath = os.path.join(cfg.UPLOAD_FOLDER, getOutputDir(filename))
    if os.path.exists(os.path.split(outputPath)[0]):
        return send_from_directory(os.path.split(outputPath)[0], filename)
    else:
        return "Error while loading image", 404


@blueprint.route(routes['getAllImages'], methods=['GET'])
def getAllImages():
    return jsonify(recursiveSearch(cfg.UPLOAD_FOLDER))


@blueprint.route(routes['getJsonInfo'])
def getJsonInfo(filename):
    res = db.getImageByFilename(filename)

    if res is None:
        raise ValueError("Image not found")
    imageInfo = dict(res)

    if imageInfo['hasObjects']:
        objectInfo = db.getInfoAboutObjects(filename)
        imageInfo.update({"objects": []})
        for i, obj in enumerate(objectInfo):
            imageInfo['objects'].append(dict(obj))
    return jsonify(dict(imageInfo))


@blueprint.route(routes['getInfoFromCamera'], methods=['GET'])
def getInfoFromCamera(cameraId):
    cameraPath = os.path.join(cfg.UPLOAD_FOLDER, cameraId)
    if not os.path.exists(cameraPath):
        return "Error while loading image", 404
    imgList = recursiveSearch(cameraPath)
    return jsonify(imgList)


@blueprint.route('/gallery/cameraDelta<cameraId>', methods=['POST'])
def getImageBetweenDatesFromCamera(cameraId):
    req = request.form
    pattern = '%Y-%m-%d %H:%M:%S'
    start = datetime.strptime(req['startDate'], pattern)
    end = datetime.strptime(req['endDate'], pattern)
    obj = db.getImageBetweenDatesFromCamera(cameraId, start, end)
    print("foo", type(obj), obj)
    return jsonify(obj)
