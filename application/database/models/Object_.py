from sqlalchemy import Table, Column, Integer, String, MetaData, Enum, ForeignKey, Float, UnicodeText, literal_column, DateTime, Boolean, or_
from application.database import Base
import datetime

class Object_(Base):
    __tablename__ = "object"

    id = Column(Integer, primary_key=True, unique=True, autoincrement=True)
    scores = Column(Float)
    LDx = Column(Integer)  # Left Down
    LDy = Column(Integer)
    RUx = Column(Integer)  # Right Up
    RUy = Column(Integer)
    CDx = Column(Integer)  # Center Down
    CDy = Column(Integer)
    typeOfObject = Column(String)
    imageId = Column(Integer, ForeignKey('image.id'))
    # createdAt = Column(DateTime, default=datetime.datetime.now())
    # updatedAt = Column(DateTime, default=datetime.datetime.now())

    def __init__(self, scores, coord, coordCD, typeOfObject, imageId):
        self.scores = scores
        self.LDx = coord[0]
        self.LDy = coord[1]
        self.RUx = coord[2]
        self.RUy = coord[3]
        self.CDx = coordCD[0]
        self.CDy = coordCD[1]
        self.typeOfObject = typeOfObject
        self.imageId = imageId
