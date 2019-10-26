from sqlalchemy import Column, Integer
from application.database import Base


class Person(Base):
    __tablename__ = "person"

    id = Column(Integer, primary_key=True, unique=True, autoincrement=True)
    objectId = Column(Integer)

    def __init__(self, objectId):
        self.objectId = objectId
