from flask import Blueprint, request
from app.models import db, Profile


profile_routes = Blueprint("profiles", __name__)


@profile_routes.route('/')
def get_plant_profiles():
    profiles = Profile.query.all()
    return {"profile": [profile.to_dict() for profile in profiles]}


@profile_routes.route('/<int:id>')
def get_plant_profile(id):
    profile = db.session.query(Profile).get(id)
    return profile.to_dict()
