import unittest
import config as cfg
import requests


class Camera(unittest.TestCase):
    routeUrl = cfg.serverUrl + "gallery/camera"

    camersCount = 5
    def test_IsAllCamerasAvailable(self):
        for camera in range(self.camersCount):
            r = requests.get(f"{self.routeUrl}/{camera}")
            if r.status_code != 200:
                self.assertTrue()


if __name__ == '__main__':
    unittest.main()



