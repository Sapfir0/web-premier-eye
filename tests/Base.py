import unittest
from pathlib import Path

import requests


class Base(unittest.TestCase):
    APP_PATH = Path(__file__).parents[0]
    serverUrl = "http://localhost:8050/"

    def test_ServerIsOk(self): # чет не робит без слова тест
        r = requests.get(self.serverUrl)
        self.assertEqual(r.status_code, 200)


if __name__ == '__main__':
    unittest.main()

