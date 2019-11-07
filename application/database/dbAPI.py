from sqlalchemy import select
from sqlalchemy import and_
from application.database.models.Images import Images as Image
from application.database.models.Images import  engine
from application.database.models.Objects_ import Objects_ as Object_


def getImageByFilename(filename):
    conn = engine.connect()
    selectStmt = select([Image]).where(Image.filename == filename)
    res = conn.execute(selectStmt).fetchone()  # можно сделать fetchall и если будет больше одного результата, вернуть фолс
    return res


def getAllFilenames():
    conn = engine.connect()
    selectStmt = select([Image.filename])
    res = conn.execute(selectStmt).fetchall()
    stringRes = [i[0] for i in res]
    return stringRes


def getInfoAboutObjects(filename):
    conn = engine.connect()
    selectStmt = select([Object_]).where(and_(Object_.imageId == Image.id, Image.filename == filename))
    objectsInfo = conn.execute(selectStmt).fetchall()  # т.к. объектов может быть много
    return objectsInfo
