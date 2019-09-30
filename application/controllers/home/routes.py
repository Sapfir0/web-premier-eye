from application.controllers.home import blueprint
from flask import render_template
from flask_login import login_required


@blueprint.route('/index')
@login_required
def index():
    return render_template('index.html')


@blueprint.route('/<template>')
@login_required
def route_template(template):
    return render_template(template + '.html')


@blueprint.errorhandler(403)
def access_forbidden(error):
    return render_template(''), 403


@blueprint.errorhandler(404)
def not_found_error(error):
    return render_template('errors/page_404.html'), 404


@blueprint.errorhandler(500)
def internal_error(error):
    return render_template('errors/page_500.html'), 500
