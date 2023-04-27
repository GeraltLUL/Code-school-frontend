import datetime
import json
from app import users_col
from flask_login import UserMixin
import uuid


class User(UserMixin):
    id = ''
    name = ''
    email = ''
    password = ''
    avatar = ''

    def __init__(self, id, name, email, password, avatar):
        self.id = id
        self.name = name
        self.email = email
        self.password = password
        self.avatar = avatar

    def get_id(self):
        return self.id

    def is_authenticated(self):
        return True

    def is_active(self):
        return True

    def is_anonymous(self):
        return False

def create_record(name, email, password):
    users_col.insert_one({
        'id': str(uuid.uuid4()),
        'name': name,
        'email': email,
        'password': password,
        'avatar': 'user_tmp_example.png',
    })


def find_user_by_id(user_id):
    cur_user = users_col.find_one({'id': user_id})
    if cur_user is not None:
        return User(id=cur_user['id'],
                    name=cur_user['name'],
                    email=cur_user['email'],
                    password=cur_user['password'],
                    avatar=cur_user['avatar'])
    else:
        return None


def find_user_by_email(value):
    cur_user = users_col.find_one({'email': value})
    if cur_user is not None:
        return User(id=cur_user['id'],
                    name=cur_user['name'],
                    email=cur_user['email'],
                    password=cur_user['password'],
                    avatar=cur_user['avatar'])
    else:
        return None


def delete_record_by_id(value):
    users_col.delete_one({
        'id': value
    })


def update_record(findKey, findValue, key, value):
    users_col.find_one_and_update({findKey: findValue},
                                   {'$set': {key: value}})


def update_and_push(findKey, findValue, key, value):
    users_col.find_one_and_update({findKey: findValue},
                                   {'$push': {key: value}})
