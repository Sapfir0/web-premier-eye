from sqlalchemy import select
from sqlalchemy import and_
from application.database.models.Image import Image, engine
from application.database.models.Object_ import Object_


def getImageByFilename(filename):
    conn = engine.connect()
    selectStmt = select([Image]).where(Image.filename == filename)
    res = conn.execute(selectStmt).fetchone()  # можно сделать fetchall и если будет больше одного результата, вернуть фолс
    return res


def getInfoAboutObjects(filename):
    conn = engine.connect()
    selectStmt = select([Object_]).where(and_(Image.filename == filename, Object_.imageId == Image.id))
    objectsInfo = conn.execute(selectStmt).fetchall()  # т.к. объектов может быть много
    return objectsInfo
