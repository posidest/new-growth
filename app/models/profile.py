from .db import db
from sqlalchemy.dialects import postgresql


class Profile(db.Model):
    __tablename__ = 'profiles'

    id = db.Column(db.Integer, primary_key=True)
    picture = db.Column(db.Text)
    common_names = db.Column(postgresql.ARRAY(db.String(256)))
    genus_species = db.Column(db.String(256))
    family = db.Column(db.String(256))
    native_range = db.Column(db.String(1000))
    temp_range = db.Column(db.String(10))
    light = db.Column(db.String(50))
    soil_type = db.Column(db.String(1000))
    water_when = db.Column(db.String(1000))
    fertilization = db.Column(db.String(1000))
    pests = db.Column(postgresql.ARRAY(db.String(50)))
    propogation_methods = db.Column(postgresql.ARRAY(db.String(50)))
    toxic_to_pets = db.Column(db.Boolean)

    plants = db.relationship("Plant")

    def to_dict(self):
        return {
            "id": self.id,
            "picture": self.picture,
            "common_names": self.common_names,
            "genus_species": self.genus_species,
            "family": self.family,
            "native_range": self.native_range,
            "temp_range": self.temp_range,
            "light": self.light,
            "soil_type": self.soil_type,
            "water_when": self.water_when,
            "fertilization": self.fertilization,
            "pests": self.pests,
            "propogation_methods": self.propogation_methods,
            "toxic_to_pets": self.toxic_to_pets,
            "plants": [plant.to_dict() for plant in self.plants]
        }
