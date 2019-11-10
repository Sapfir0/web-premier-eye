import unittest
import sys, os
sys.path.append(os.path.split(os.getcwd())[0])
from application.controllers.base import routes as baseRoutes
from application.controllers.gallery import routes as galleryRoutes
import requests
from config import Config as cfg

class MyTestCase(unittest.TestCase):
    def test(self):
        for route in baseRoutes.values(): #, galleryRoutes.values()
            url = f"http://127.0.0.1:8050{route}"
            response = requests.get(url)
            self.assertTrue(response.ok)


if __name__ == '__main__':
    unittest.main()
