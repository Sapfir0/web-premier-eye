import os


def recursiveSearch(directory, listOfImages=None):
    if listOfImages is None:
        listOfImages = []
    for files in os.listdir(directory):
        path = os.path.join(directory, files)
        if os.path.isdir(path):
            recursiveSearch(path, listOfImages)
        else:
            listOfImages.append(files)
    return listOfImages


def getOutputDir(filename):
    def getDateOrHours(filename: str):
        date1 = filename.split("_")[1].split(".")[0]
        parsedData = date1[0:8]
        hours1 = date1[8:10]
        return parsedData, hours1
    numberOfCam = filename.split("_")[0]
    date, hours = getDateOrHours(filename)
    outputFile = os.path.join(cfg.UPLOAD_FOLDER, numberOfCam, date, hours, filename)
    return outputFile
