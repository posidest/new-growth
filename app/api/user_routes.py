from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User, Plant, Follow

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


@user_routes.route('/follows', methods=['POST'])
@login_required
def add_follow():
    data = request.get_json()
    follow = Follow(user_id=current_user.id, friend_id=data['friend_id'])
    db.session.add(follow)
    db.session.commit()
    return follow.to_dict()


@user_routes.route('/<int:id>/follows')
def get_follows(id):
    follows = Follow.query.filter(Follow.user_id == id)
    return {'follows': [follow.to_dict() for follow in follows]}

# @user_routes.route('/<int:id>/plants')
# def get_users_plants(id):
#     plants = Plant.query.filter_by(Plant.user_id=id).all()
#     return {'plants': [plant.to_dict() for plant in plants]


@user_routes.route('/<int:id>/edit', methods=['POST'])
@login_required
def editProfile(id):
    data = request.get_json()
    user = db.session.query(User).get(id)
    if current_user.id == id:
        user.avatar = data['avatar']
        user.bio = data['bio']
        user.zone = data['zone']
        db.session.commit()
        return user.to_dict()


@user_routes.route('/plants/<int:id>/edit', methods=['POST'])
@login_required
def editPlant(id):
    data = request.get_json()
    plant = db.session.query(Plant).get(id)
    if current_user.id == plant.user_id:
        plant.plant_pic = data['plant_pic']
        plant.name = data['name']
        plant.nickname = data['nickname']
        plant.description = data['description']
        db.session.commit()
        return plant.to_dict()


@user_routes.route('/plants', methods=['POST'])
@login_required
def add_plant():
    data = request.get_json()
    plant = Plant(user_id=current_user.id, plant_pic=data['plant_pic'],
                  name=data['name'], nickname=data['nickname'], description=data['description'], profile_id=data['profile_id'])
    db.session.add(plant)
    db.session.commit()
    return plant.to_dict()


@user_routes.route('/<int:id>/plants')
def get_plants(id):
    plants = Plant.query.filter(
        Plant.user_id == id).order_by(Plant.id.desc()).all()
    return {'plant': [plant.to_dict() for plant in plants]}


@user_routes.route('/plants/<int:id>')
def get_plant(id):
    plant = db.session.query(Plant).get(id)
    return plant.to_dict()


@user_routes.route('/<int:id>')
def get_user(id):
    user = db.session.query(User).get(id)
    return user.to_dict()


@user_routes.route('/plants/<int:id>', methods=['DELETE'])
@login_required
def delete_plant(id):
    plant = db.session.query(Plant).get(id)
    if plant.user_id == current_user.id:
        try:
            db.session.delete(plant)
            db.session.commit()
        except:
            return {'result': 'unsuccessful'}
        return {'result': 'successful'}


@user_routes.route('/follows/<int:id>', methods=['DELETE'])
@login_required
def unfollow(id):
    follow = db.session.query(Follow).get(id)
    if follow.user_id == current_user.id:
        try:
            db.session.delete(follow)
            db.session.commit()
        except:
            return {'result': 'unsuccessful'}
        return {'deleted': id}
