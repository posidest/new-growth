from flask import Blueprint, request
from app.models import db, Plants, Entry
from flask_login import login_required, current_user

plant_routes = Blueprint("plants", __name__)


@plant_routes.route('/<int:id>/entries', methods=['POST'])
@login_required
def add_entry():
    data = request.get_json()
    entry = Entry(user_id=current_user.id, plant_id=data['plant_id'], watered=data['watered'], fertilized=data['fertilized'],
                  location=data['location'], details=data['details'], progress_pic=data['progress_pic'])
    db.session.add(entry)
    db.session.commit()
    return entry.to_dict()
