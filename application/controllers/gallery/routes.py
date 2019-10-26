import os

from flask import jsonify, send_from_directory
from application.controllers.base import blueprint
from application.services.directory import recursiveSearch, getOutputDir
from application.database.dbAPI import getInfoAboutObjects, getImageByFilename
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
    return jsonify(recursiveSearch(cfg.UPLOAD_FOLDER))


@blueprint.route('/gallery/<filename>/info')
def getJsonInfo(filename):
    res = getImageByFilename(filename)

    if res is None:
        raise ValueError("Image not found")
    imageInfo = dict(res)

    if imageInfo['hasObjects']:
        objectInfo = getInfoAboutObjects(filename)
        imageInfo.update({"objects": []})
        for i, obj in enumerate(objectInfo):
            imageInfo['objects'].append(dict(obj))
    # print(dict(imageInfo))
    return jsonify(dict(imageInfo))


@blueprint.route('/gallery/camera/<cameraId>', methods=['GET'])
def getLastData(cameraId):
    cameraPath = os.path.join(cfg.UPLOAD_FOLDER, cameraId)
    if not os.path.exists(cameraPath):
        return "Error while loading image", 404
    imgList = recursiveSearch(cameraPath)
    return jsonify(imgList)
