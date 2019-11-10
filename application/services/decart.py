import sqlalchemy as sql
from datetime import datetime
from application.database.models.Images import Images, session


def getConcentration(highlightedRect, startTime: datetime, endTime: datetime):
    """
    :param highlightedRect: координаты прямоугольника, в котором начинаем искать объекты
    :param startTime:
    :param endTime:
    :return:
    """
    foundedObjects = []

    a = Images.fixationDatetime >= startTime
    b = Images.fixationDatetime <= endTime
    for obj in session.query(Images).filter(sql.and_(a, b)).all():
        minRect = [obj.LDy, obj.LDx, obj.RUy, obj.RUx]
        if hasOnePointInside(highlightedRect, minRect):
            foundedObjects.append(obj)

    return foundedObjects  # массив координат всех объектов в кадре


def hasOnePointInside(bigRect, minRect):  # хотя бы одна точка лежит внутри
    minY, minX, maxY, maxX = bigRect
    y1, x1, y2, x2 = minRect

    a = (minY <= y1 <= maxY)
    b = (minX <= x1 <= maxX)
    c = (minY <= y2 <= maxY)
    d = (minX <= x2 <= maxX)

    if a or b or c or d:
        return True
    return False


def isCompletelyInside(bigRect, minRect):  # объект полностью внутри прямоугольника
    y1, x1, y2, x2 = bigRect
    minX = x1
    minY = y1  # вроде верно
    maxX = x2
    maxY = y2

    y1, x1, y2, x2 = minRect

    a = (minY <= y1 <= maxY)
    b = (minX <= x1 <= maxX)
    c = (minY <= y2 <= maxY)
    d = (minX <= x2 <= maxX)

    if a and b and c and d:
        return True  # объект полностью внутри большого прямоугольника
    return False


def isPartiallyInside(bigRect, minRect, innerPercent=0.5):  # объект частично внутри прямоугольника
    bigLUy, bigLUx, bigRDy, bigRDx = bigRect
    minLUy, minLUx, minRDy, minRDx = minRect
    fullSquare = (minLUy - minRDy) * (minRDx - minLUx)  # не уверен что правильно
    # Не уверен в ифах
    if bigLUy < minLUy:
        minLUy = bigLUy
    if bigRDy < minRDy:
        minRDy = bigRDy
    if bigLUx > minLUx:
        minLUx = bigLUx
    if bigRDx > minRDx:
        minRDx = bigRDx
    inObjSquare = (minLUy - minRDy) * (minRDx - minLUx)
    return inObjSquare / fullSquare >= innerPercent

