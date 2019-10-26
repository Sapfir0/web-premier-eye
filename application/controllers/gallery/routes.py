from flask import jsonify, send_from_directory
from application.controllers.base import blueprint

import os

from config import Config as cfg
from application.services.directory import recursiveSearch, getOutputDir
from application.database.Image import Image, session, engine
from application.database.Object_ import Object_


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
    from sqlalchemy import select
    from sqlalchemy import and_

    conn = engine.connect()
    select_stmt = select([Image]).where(Image.filename == filename)
    res = conn.execute(select_stmt).fetchone()
    if res is None:
        raise ValueError("Image not found")
    imageInfo = dict(res)
    if imageInfo['hasObjects']:
        objectN = select([Object_]).where(and_(Image.filename == filename, Object_.imageId == Image.id))
        objectInfo = conn.execute(objectN).fetchall()  # т.к. объектов может быть много
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
