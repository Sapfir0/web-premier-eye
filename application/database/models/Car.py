from sqlalchemy import Column, Integer, String, ForeignKey
from application.database import Base


class Car(Base):
    __tablename__ = "car"

    id = Column(Integer, primary_key=True, unique=True, autoincrement=True)
    carNumber = Column(String)
    objectId = Column(Integer, ForeignKey('object.id'))

    def __init__(self, carNumber, objectId):
        self.carNumber = carNumber
        self.objectId = objectId

