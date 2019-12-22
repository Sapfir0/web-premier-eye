import unittest
from tests.Base import Base
import requests


class UploadImage(Base):
    def uploadImageWithInfoAreCorrectly(self):
        serverUrl = "http://localhost:8050/"
        routeUrl = serverUrl + "upload"

        imageName = "1_20190718144434.jpg"
        imagePath = "./test/test/res/1_20190718144434.jpg"
        jsonPath = "./test/test/res/test.json"
        files = [
            ('file', (imageName, open(imagePath, 'rb'), 'image/jpg')),
            ('json', ("test.json", open(jsonPath, 'rb'), 'application/json'))]

        r = requests.post(routeUrl, files=files)

        self.assertEqual(r.status_code, 200)


    def TimeTestInCorrectSituation(self):
        pass

    def NoImageJsonHere(self):
        pass

    def NoJsonImageHere(self):
        pass

    def NoImageNoJson(self):
        pass

    def IncorrectJson(self):
        pass

    def IncorrectImageFilename(self):
        pass

    def ImageFilenameFromTheFutureMustBeDenied(self):
        pass

    def IncorrectImageExtension(self):
        pass

    def JsonNotInUtf8(self):
        pass

    def IncorrectPostBodySpecifier(self):
        pass

if __name__ == '__main__':
    unittest.main()
