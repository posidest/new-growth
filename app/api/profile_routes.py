from flask import Blueprint, request
from app.models import db, Profile
from app.forms import SearchForm
from sqlalchemy.sql import text

profile_routes = Blueprint("profiles", __name__)


@profile_routes.route('/')
def get_plant_profiles():
    profiles = Profile.query.all()
    return {"profile": [profile.to_dict() for profile in profiles]}


@profile_routes.route('/<int:id>')
def get_plant_profile(id):
    profile = db.session.query(Profile).get(id)
    return profile.to_dict()


# @profile_routes.route('/search', methods=['POST'])
# def find_a_profile():
#     data = request.get_json()
#     # profiles = Profile.query.all()
#     profiles = Profile.query.filter(
#         ('%' + data['query'] + '%')).in_(Profile.common_names).all()
#     return {'profile': [profile.to_dict() for profile in profiles]}


@profile_routes.route('/search', methods=['POST'])
def find_a_profile():
    data = request.get_json()
    # profiles = Profile.query.all()
    profiles = Profile.query.filter(
        text('%' + data['query'] + '%')).in_(Profile.common_names).all()
    if profiles:
        return {'profile': [profile.to_dict() for profile in profiles]}


# @profile_routes.route('/search', methods=['GET', 'POST'])
# def search_profiles():
#     form = SearchForm()
#     profiles = Profile.query.all()

#     if form.validate_on_submit():
#         profiles = Profile.query.filter(Profile.common_names[0].ilike(
#             '%' + form.query.data + '%'))

#     # profiles = profiles.order_by(Profile.common_names).all()

#     return {'profile': [profile.to_dict() for profile in profiles]}
