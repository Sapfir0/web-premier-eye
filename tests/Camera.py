import unittest
from tests.Base import Base
import requests


class Camera(Base):
    routeUrl = Base.serverUrl + "gallery/camera"

    camersCount = 5
    def IsAllCamerasAvailable(self):
        for camera in range(self.camersCount):
            r = requests.get(f"{self.routeUrl}/{camera}")
            if r.status_code != 200:
                self.assertTrue()


if __name__ == '__main__':
    unittest.main()



