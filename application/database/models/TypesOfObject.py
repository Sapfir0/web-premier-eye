from sqlalchemy import Column, Integer, DateTime, String
from application.database import Base
from datetime import datetime


class TypesOfObject(Base):
    __tablename__ = "typesOfObject"

    id = Column(Integer, primary_key=True, unique=True, autoincrement=True)
    name = Column(String(50))

    def __init__(self, name):
        self.name = name
