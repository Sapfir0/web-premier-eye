from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from application.database import Base
from datetime import datetime


class Car(Base):
    __tablename__ = "car"

    id = Column(Integer, primary_key=True, unique=True, autoincrement=True)
    carNumber = Column(String(15))
    objectId = Column(Integer)
    createdAt = Column(DateTime, default=datetime.now())
    updatedAt = Column(DateTime, default=datetime.now())

    def __init__(self, carNumber, objectId):
        self.carNumber = carNumber
        self.objectId = objectId

