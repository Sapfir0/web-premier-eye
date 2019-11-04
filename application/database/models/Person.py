from sqlalchemy import Column, Integer, DateTime
from application.database import Base
from datetime import datetime


class Person(Base):
    __tablename__ = "person"

    id = Column(Integer, primary_key=True, unique=True, autoincrement=True)
    objectId = Column(Integer)
    createdAt = Column(DateTime, default=datetime.now())
    updatedAt = Column(DateTime, default=datetime.now())

    def __init__(self, objectId):
        self.objectId = objectId
