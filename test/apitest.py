import unittest
from application.controllers.base import routes
from application.controllers.gallery import routes


class MyTestCase(unittest.TestCase):
    def test_something(self):
        self.assertEqual(True, False)


if __name__ == '__main__':
    unittest.main()
