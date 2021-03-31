from .db import db


class Plant(db.Model):
    __tablename__ = 'plants'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    plant_pic = db.Column(db.Text, nullable=False)
    name = db.Column(db.String(256), nullable=False)
    nickname = db.Column(db.String(256))
    profile_id = db.Column(db.Integer, db.ForeignKey('profiles.id'))

    entries = db.relationship("Entry")

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "plant_pic": self.plant_pic,
            "name": self.name,
            "nickname": self.nickname,
            "profile_id": self.profile_id,
            "entries": [entry.to_dict() for entry in self.entries]
        }
