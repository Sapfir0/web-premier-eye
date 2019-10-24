from flask import jsonify, render_template, redirect, request, url_for, send_from_directory
from werkzeug.utils import secure_filename
from application.controllers.base import blueprint

import os
import json
import datetime
from config import Config as cfg
from application.controllers.base.directory import recursiveSearch
from application.controllers.base.directory import getOutputDir

from application.database.Image import Image, session, engine
from application.database.Car import Car
from application.database.Person import Person
from application.database.Object_ import Object_


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


@blueprint.route('/gallery/<filename>/info')
def getJsonInfo(filename):
    from sqlalchemy import select
    conn = engine.connect()
    select_stmt = select([Image]) \
        .where(Image.filename == filename)
    res = conn.execute(select_stmt).fetchone()
    return jsonify(dict(res))

def parseJson(deserjson):
    """
    Фактически, эта функция занимается приведением типов, т.к. в джсоне все прилетает строками,
    и мы тут восстанавиваем правильные типы и возвращаем словарь
    :param jsonPremier:
    :return:
    """
    hasObjects = '0' in deserjson  # 0 - первый найденный на кадре объект, опеределено на другой стороне
    #dateTime = datetime.datetime.strptime(deserjson['fixationDatetime'], '%Y-%m-%d %H:%M:%S')
    dateTime = deserjson['fixationDatetime']
    numberOfCam = int(deserjson['numberOfCam'])
    filename: str = deserjson['filename']
    return filename, numberOfCam, dateTime, hasObjects


def addObjectToSession(deserjson):
    from application.database.Object_ import typeOfObject as t
    countOfImagesInDB = session.query(Image).count() + 1  # imageId
    # +1 т.к. у нас возвращается текущее колво строк, а мы будем инсертить еще одну
    countOfObjectsInDB = session.query(Object_).count() + 1  # objectId
    for key, value in deserjson.items():
        if key.isdigit():
            if value['type'] == 'car':  # TODO кал
                Object = Object_(value['scores'], value['coordinates'], value['CD'], t.car, countOfImagesInDB)
                car = Car(value['licenseNumber'], countOfObjectsInDB)
                session.add(car)
            elif value['type'] == 'person':
                Object = Object_(value['scores'], value['coordinates'], value['CD'], t.person, countOfImagesInDB)
                person = Person(countOfObjectsInDB)
                session.add(person)
            else:
                raise Exception("Undefined object")
            session.add(Object)


@blueprint.route('/upload', methods=['POST'])
def upload_file():
    def allowedFile(filename):
        return '.' in filename and filename.rsplit('.', 1)[1].lower() in cfg.ALLOWED_EXTENSIONS

    if 'file' not in request.files and request.files['file'].filename == '':
        raise Exception("No image")
    if 'json' not in request.files:
        raise Exception("No image info in json")

    file = request.files['file']
    if not file and not allowedFile(file.filename):
        raise Exception

    filename = secure_filename(file.filename)
    outputPath = os.path.join(cfg.UPLOAD_FOLDER, getOutputDir(filename))
    if not os.path.exists(os.path.split(outputPath)[0]):
        os.makedirs(os.path.split(outputPath)[0])
    file.save(outputPath)

    rowjson: str = request.files['json'].read().decode("utf-8")
    # один из типов получение джсона(тут немного странный), я записываю джсон в файл на другой стороне, а тут ситываю
    deserjson: dict = json.loads(rowjson)

    args = parseJson(deserjson)
    hasObjects = '0' in deserjson  # 0 - первый найденный на кадре объект, опеределено на другой стороне
    image = Image(outputPath, deserjson['filename'], deserjson['numberOfCam'], deserjson['fixationDatetime'], hasObjects)
    session.add(image)  # TODO вынести работу с БД в другой поток, она долгая
    print(deserjson)
    addObjectToSession(deserjson)

    session.commit()
    session.flush()

    return redirect(f"/gallery/{filename}")
