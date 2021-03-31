from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Plant

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {"users": [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()


# @user_routes.route('/<int:id>/plants')
# def get_users_plants(id):
#     plants = Plant.query.filter_by(Plant.user_id=id).all()
#     return {'plants': [plant.to_dict() for plant in plants]
