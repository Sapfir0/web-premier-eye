from application.database.Object_  import Object_
from sqlalchemy import Table, Column, Integer, String, MetaData, ForeignKey, Float, UnicodeText, literal_column, DateTime, Boolean, or_
from application.database import Base


class Car(Base):
    __tablename__ = "car"

    id = Column(Integer, primary_key=True, unique=True, autoincrement=True)
    carNumber = Column(String)
    objectId = Column(Integer, ForeignKey('object.id'))

    def __init__(self, carNumber, objectId):
        self.carNumber = carNumber
        self.objectId = objectId

