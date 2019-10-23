from application.database.Object_ import Object_
from sqlalchemy import Table, Column, Integer, String, MetaData, ForeignKey, Float, UnicodeText, literal_column, DateTime, Boolean
from application.database import Base


class Person(Base):
    __tablename__ = "person"

    id = Column(Integer, primary_key=True, unique=True, autoincrement=True)
    objectId = Column(Integer)

    def __init__(self, objectId):
        self.objectId = objectId
