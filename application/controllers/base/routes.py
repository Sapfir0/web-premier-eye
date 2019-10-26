from flask import jsonify, redirect, request, send_from_directory
from werkzeug.utils import secure_filename
from application.controllers.base import blueprint

import os
import json

from application.services.jsonWorking import parseJson, addObjectToSession
from config import Config as cfg
from application.services.directory import recursiveSearch, getOutputDir

from application.database.Image import Image, session


@blueprint.route('/', methods=['GET'])
def hi():
    return "Server is up!"


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

    rawJson: str = request.files['json'].read().decode("utf-8")
    # один из типов получение джсона(тут немного странный), я записываю джсон в файл на другой стороне, а тут ситываю
    deserializedJson: dict = json.loads(rawJson)

    image = Image(outputPath, *parseJson(deserializedJson))
    session.add(image)  # TODO вынести работу с БД в другой поток, она долгая
    # print(deserializedJson)
    addObjectToSession(deserializedJson)

    session.commit()
    session.flush()

    return redirect(f"/gallery/{filename}")
