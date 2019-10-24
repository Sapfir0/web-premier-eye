from sqlalchemy import Table, Column, Integer, String, MetaData, ForeignKey, Float, UnicodeText, literal_column, \
    DateTime, Boolean, or_, DATETIME, TIMESTAMP
from application.database import Base
from application.database import session
from application.database import engine
from datetime import datetime


class Image(Base):
    __tablename__ = "image"

    def init_db(self):
        Base.metadata.create_all(bind=engine)
        session.commit()

    id = Column(Integer, primary_key=True, unique=True, autoincrement=True)
    path = Column(String)
    filename = Column(String)
    numberOfCam = Column(Integer)
    #fixationDatetime = Column(DateTime, unique=True)  # TODO вылетает ошибка типов
    fixationDatetime = Column(String, unique=True)
    hasObjects = Column(Boolean)

    def __init__(self, imagePath: str, filename: str, numberOfCam: int, fixationDatetime, hasObjects: bool):
        self.init_db()
        print("Записываю дату", type(fixationDatetime), fixationDatetime)
        print(isinstance(fixationDatetime, datetime))
        self.path = imagePath
        self.filename = filename
        self.numberOfCam = numberOfCam
        self.fixationDatetime = fixationDatetime,
        self.hasObjects = hasObjects

