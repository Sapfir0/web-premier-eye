from enum import Enum
import os


class databasesDialect(Enum):
    sqlite = "sqlite"
    mysql = "mysql"


class DatabaseConfig(object):
    DATABASE = ''
    APP_PATH = ''

    def __init__(self, APP_PATH):
        self.DATABASE = self.getDatabasePath(databasesDialect.mysql)
        self.APP_PATH = APP_PATH

    def getDatabasePath(self, dialect: databasesDialect):
        if dialect.sqlite == dialect:  # не будет работать очевидно
            database = "sqlite:///" + os.path.join(self.APP_PATH, 'data.db')
        elif dialect.mysql == dialect:
            username = os.environ.get("DB_USERNAME")
            password = os.environ.get("DB_PASSWORD")
            host = os.environ.get("DB_HOST")
            databaseName = os.environ.get("DB_NAME")
            database = f"mysql+mysqldb://{username}:{password}@{host}/{databaseName}"
        else:
            raise Exception("Undefined database")
        return database
