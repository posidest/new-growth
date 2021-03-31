from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, FileField
from wtforms.validators import DataRequired


class PlantForm(FlaskForm):
    plant_pic = FileField('plant pic', [DataRequired()])
    name = StringField('name', [DataRequired()])
    nickname = StringField('nickname')
    profile_id = IntegerField('profile id')
