from importlib import import_module
from flask import Flask, url_for



def registerBlueprints(app):
    modules = ('base', 'home')
    for moduleName in modules:
        module = import_module(f'application.controllers.{moduleName}.routes')
        app.register_blueprint(module.blueprint)



def createApp(config):
    staticFolder = 'static'
    templateFolder = ''
    app = Flask(__name__, static_folder=staticFolder)
    app.config.from_object(__name__)
    registerBlueprints(app)
    return app