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