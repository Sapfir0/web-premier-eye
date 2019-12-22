import unittest
from tests.Base import Base
import requests


class Gallery(Base):
    routeUrl = Base.serverUrl + "gallery"

    def GetAllImagesNotEmpty(self):
        r = requests.get(self.routeUrl)
        self.assertTrue(r.content)

    def GetAllImagesHaveSameElements(self):
        r = requests.get(self.routeUrl)
        self.assertTrue(r.content)


if __name__ == '__main__':
    unittest.main()


