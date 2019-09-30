from bcrypt import checkpw
from flask import jsonify, render_template, redirect, request, url_for, send_from_directory
from flask_login import (
    current_user,
    login_required,
    login_user,
    logout_user
)
from werkzeug.utils import secure_filename

from application import db, login_manager
from application.controllers.base import blueprint
from application.controllers.base.forms import LoginForm, CreateAccountForm
from application.models.models import User

import os
from config import Config as cfg


@blueprint.route('/')
def route_default():
    return redirect(url_for('base_blueprint.login'))


@blueprint.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(cfg.APP_PATH, 'static', 'images'),
                               'favicon.ico', mimetype='image/vnd.microsoft.icon')


@blueprint.route('/gallery/<filename>')
def getImage(filename):
    return send_from_directory(cfg.UPLOAD_FOLDER, filename)


@blueprint.route('/gallery')
def seeAllImages():
    imgList = []
    for img in os.listdir(cfg.UPLOAD_FOLDER):
        uploadName = os.path.split(cfg.UPLOAD_FOLDER)[1]
        path = os.path.join(uploadName, img)
        if path.index("\\"):
            path = path.replace("\\", "/")
        imgList.append(path)
    return render_template('gallery.html', results=imgList)


@blueprint.route('/upload', methods=['POST'])
def upload_file():
    def allowedFile(filename):
        return '.' in filename and filename.rsplit('.', 1)[1].lower() in cfg.ALLOWED_EXTENSIONS

    if 'file' not in request.files:
        return -1
    file = request.files['file']
    if file.filename == '':
        return -1
    if file and allowedFile(file.filename):
        filename = secure_filename(file.filename)
        file.save(os.path.join(cfg.UPLOAD_FOLDER, filename))
        return redirect(f"/gallery/{filename}")
    else:
        return -1


@blueprint.route('/<template>')
@login_required
def route_template(template):
    return render_template(template + '.html')


@blueprint.route('/fixed_<template>')
@login_required
def route_fixed_template(template):
    return render_template('fixed/fixed_{}.html'.format(template))


@blueprint.route('/page_<error>')
def route_errors(error):
    return render_template('errors/page_{}.html'.format(error))

## Login & Registration


@blueprint.route('/login', methods=['GET', 'POST'])
def login():
    login_form = LoginForm(request.form)
    create_account_form = CreateAccountForm(request.form)
    if 'login' in request.form:
        username = request.form['username']
        password = request.form['password']
        user = User.query.filter_by(username=username).first()
        if user and checkpw(password.encode('utf8'), user.password):
            login_user(user)
            return redirect(url_for('base_blueprint.route_default'))
        return render_template('errors/page_403.html')
    if not current_user.is_authenticated:
        return render_template(
            'login/login.html',
            login_form=login_form,
            create_account_form=create_account_form
        )
    return redirect(url_for('home_blueprint.index'))


@blueprint.route('/create_user', methods=['POST'])
def create_user():
    user = User(**request.form)
    db.session.add(user)
    db.session.commit()
    return jsonify('success')


@blueprint.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('base_blueprint.login'))


@blueprint.route('/shutdown')
def shutdown():
    func = request.environ.get('werkzeug.server.shutdown')
    if func is None:
        raise RuntimeError('Not running with the Werkzeug Server')
    func()
    return 'Server shutting down...'

## Errors


@login_manager.unauthorized_handler
def unauthorized_handler():
    return render_template('errors/page_403.html'), 403


@blueprint.errorhandler(403)
def access_forbidden(error):
    return render_template(''), 403


@blueprint.errorhandler(404)
def not_found_error(error):
    return render_template('errors/page_404.html'), 404


@blueprint.errorhandler(500)
def internal_error(error):
    return render_template('errors/page_500.html'), 500
