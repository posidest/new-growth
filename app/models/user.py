from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    avatar = db.Column(db.Text)
    bio = db.Column(db.String(1000))
    zone = db.Column(db.Integer)
    hashed_password = db.Column(db.String(255), nullable=False)

    entries = db.relationship('Entry')
    plants = db.relationship('Plant')
    follows = db.relationship('Follow', foreign_keys='[Follow.friend_id]')
    user = db.relationship('Follow', foreign_keys='[Follow.user_id]')

    @ property
    def password(self):
        return self.hashed_password

    @ password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "avatar": self.avatar,
            "bio": self.bio,
            "zone": self.zone,
            "plants": [plant.to_dict() for plant in self.plants],
        }
