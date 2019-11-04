import datetime
from application.database.models.Cars import Car
from application.database.models.Persons import Persons
from application.database.models.Objects_ import Object_
from application.database.models.Images import Image, session
from application.services.coordinatesCenter import getCenterOfDown


def parseJson(deserjson):
    """
    Фактически, эта функция занимается приведением типов, т.к. в джсоне все прилетает строками,
    и мы тут восстанавиваем правильные типы и возвращаем словарь
    :param jsonPremier:
    :return:
    """
    hasObjects = '0' in deserjson  # 0 - первый найденный на кадре объект, опеределено на другой стороне
    dateTime = datetime.datetime.strptime(deserjson['fixationDatetime'], '%Y-%m-%d %H:%M:%S')
    numberOfCam = int(deserjson['numberOfCam'])
    filename: str = deserjson['filename']
    return filename, numberOfCam, dateTime, hasObjects


def addObjectToSession(deserializedJson):
    countOfImagesInDB = session.query(Image).count() + 1  # imageId
    # +1 т.к. у нас возвращается текущее колво строк, а мы будем инсертить еще одну
    countOfObjectsInDB = session.query(Object_).count() + 1  # objectId TODO
    for key, value in deserializedJson.items():
        if key.isdigit():
            CDcoordinates = getCenterOfDown(value['coordinates'])
            if value['type'] == 'car':  # TODO кал
                Object = Object_(value['scores'], value['coordinates'], CDcoordinates,  "car", countOfImagesInDB)
                car = Car(value['licenseNumber'], countOfObjectsInDB)
                session.add(car)
            elif value['type'] == 'person':
                Object = Object_(value['scores'], value['coordinates'], CDcoordinates, "person", countOfImagesInDB)
                person = Persons(countOfObjectsInDB)
                session.add(person)
            else:
                raise Exception("Undefined object")
            session.add(Object)
