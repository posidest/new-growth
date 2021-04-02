from flask import Blueprint, request
from app.models import db, Plant, Entry
from flask_login import login_required, current_user

plant_routes = Blueprint("plants", __name__)


@plant_routes.route('/<int:id>/entries', methods=['POST'])
@login_required
def add_entry(id):
    data = request.get_json()
    entry = Entry(user_id=current_user.id, plant_id=data['plant_id'], watered=data['watered'], fertilized=data['fertilized'],
                  location=data['location'], details=data['details'], progress_pic=data['progress_pic'])
    db.session.add(entry)
    db.session.commit()
    return entry.to_dict()


@plant_routes.route('/<int:id>/entries')
def get_entries(id):
    entries = Entry.query.filter(
        Entry.plant_id == id).order_by(Entry.id.desc()).all()
    return {"entry": [entry.to_dict() for entry in entries]}
