from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, TextAreaField, FileField
from wtforms.validators import DataRequired


class EntryForm(FlaskForm):
    watered = BooleanField('watered?', [DataRequired()])
    fertilized = BooleanField('fertilized?', [DataRequired()])
    location = StringField('plant location')
    details = TextAreaField('provide additional details')
    progress_pic = FileField('progress pic')
