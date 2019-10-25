from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import scoped_session, sessionmaker
from config import Config as cfg

engine_parameters = {
    "convert_unicode": True,
    "pool_pre_ping": True,
    "pool_recycle": 3600,
    "echo": False,
}


engine = create_engine(cfg.DATABASE, **engine_parameters)

session = scoped_session(sessionmaker(autocommit=False, autoflush=False, bind=engine))

Base = declarative_base()
Base.query = session.query_property()
Base.metadata.create_all(bind=engine)
