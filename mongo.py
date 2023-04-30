import datetime
import json
#from app import *
import app
from flask_login import UserMixin
import uuid


class User(UserMixin):
    id = ''
    name = ''
    surname = ''
    email = ''
    password = ''
    avatar = ''
    patronymic = ''
    DD = ''
    MM = ''
    YYYY = ''

    def __init__(self, id, name, surname, patronymic, email, password, DD, MM, YYYY, avatar):
        self.id = id
        self.name = name
        self.surname = surname
        self.patronymic = patronymic
        self.email = email
        self.password = password
        self.DD = DD
        self.MM = MM
        self.YYYY = YYYY
        self.avatar = avatar

    def get_id(self):
        return self.id

    def is_authenticated(self):
        return True

    def is_active(self):
        return True

    def is_anonymous(self):
        return False


def create_record(name, surname, patronymic, email, password, DD, MM, YYYY):
    app.users_col.insert_one({
        'id': str(uuid.uuid4()),
        'name': name,
        'surname': surname,
        'patronymic': patronymic,
        'email': email,
        'password': password,
        'DD': DD,
        'MM': MM,
        'YYYY': YYYY,
        'avatar': 'user_tmp_example.png',
    })


def find_user_by_id(user_id):
    cur_user = app.users_col.find_one({'id': user_id})
    if cur_user is not None:
        return User(id=cur_user['id'],
                    name=cur_user['name'],
                    surname=cur_user['surname'],
                    patronymic=cur_user['patronymic'],
                    email=cur_user['email'],
                    password=cur_user['password'],
                    DD=cur_user['DD'],
                    MM=cur_user['MM'],
                    YYYY=cur_user['YYYY'],
                    avatar=cur_user['avatar'])
    else:
        return None


def find_user_by_email(value):
    cur_user = app.users_col.find_one({'email': value})
    if cur_user is not None:
        return User(id=cur_user['id'],
                    name=cur_user['name'],
                    surname=cur_user['surname'],
                    patronymic=cur_user['patronymic'],
                    email=cur_user['email'],
                    password=cur_user['password'],
                    DD=cur_user['DD'],
                    MM=cur_user['MM'],
                    YYYY=cur_user['YYYY'],
                    avatar=cur_user['avatar'])
    else:
        return None


def delete_record_by_id(value):
    app.users_col.delete_one({
        'id': value
    })


def update_record(findKey, findValue, key, value):
    app.users_col.find_one_and_update({findKey: findValue},
                                   {'$set': {key: value}})


def update_and_push(findKey, findValue, key, value):
    app.users_col.find_one_and_update({findKey: findValue},
                                   {'$push': {key: value}})
