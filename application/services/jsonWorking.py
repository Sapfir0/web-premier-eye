import datetime
from application.database.models.Cars import Cars
from application.database.models.Persons import Persons
from application.database.models.Objects_ import Objects_
from application.database.models.Images import Images, session
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
    countOfImagesInDB = session.query(Images).count() + 1  # imageId
    # +1 т.к. у нас возвращается текущее колво строк, а мы будем инсертить еще одну
    countOfObjectsInDB = session.query(Objects_).count() + 1  # objectId TODO
    for key, value in deserializedJson.items():
        if key.isdigit():
            if value['type'] == 'car':  # TODO кал
                Object = Objects_(value['scores'], value['coordinates'], "car", countOfImagesInDB)
                car = Cars(value['licenseNumber'], countOfObjectsInDB)
                session.add(car)
            elif value['type'] == 'person':
                Object = Objects_(value['scores'], value['coordinates'], "person", countOfImagesInDB)
                person = Persons(countOfObjectsInDB)
                session.add(person)
            else:
                raise Exception("Undefined object")
            session.add(Object)
