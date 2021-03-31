from .db import db
from sqlalchemy.sql import func
from sqlalchemy.schema import FetchedValue


class Entry(db.Model):
    __tablename__ = 'entries'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    plant_id = db.Column(db.Integer, db.ForeignKey(
        'plants.id'), nullable=False)
    watered = db.Column(db.Boolean, nullable=False)
    fertilized = db.Column(db.Boolean, nullable=False)
    location = db.Column(db.String)
    details = db.Column(db.String(1000))
    progress_pic = db.Column(db.Text)
   #  created_at = db.Column(db.DateTime(timezone=True), db.server_default=func.now())
   #  created_at = db.Column(Db.TIMESTAMP, server_default=FetchedValue())
   #

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "plant_id": self.plant_id,
            "watered": self.watered,
            "fertilized": self.fertilized,
            "location": self.location,
            "details": self.details,
            "progress_pic": self.progress_pic
        }
