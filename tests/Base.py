import unittest
import requests


class Base(unittest.TestCase):
    serverUrl = "http://localhost:8050/"

    def testServerIsOk(self): # чет не робит без слова тест
        r = requests.get(self.serverUrl)
        self.assertEqual(r.status_code, 200)


if __name__ == '__main__':
    unittest.main()

