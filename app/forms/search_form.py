from flask_wtf import FlaskForm
from wtforms import StringField


class SearchForm(FlaskForm):
    search = StringField('search common plant names')
