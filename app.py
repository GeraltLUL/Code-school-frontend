from flask_login import LoginManager, login_user, login_required, logout_user, current_user
from flask import render_template, redirect, url_for, session, Flask, request
from flask_cors import CORS
from pymongo import MongoClient
from validation import input_form_correct
from mongo import *
import os

# Flask config
app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('FLASK_KEY')
app.config['JSON_AS_ASCII'] = False
app.config['SECURITY_UNAUTHORIZED_VIEW'] = '/login'
app.config['UPLOAD_IMAGE_FOLDER'] = './static/assets/img/usersAvatars'
app.config.from_object(__name__)
CORS(app)

client = MongoClient('mongodb://localhost:27019/')
db = client['STL']
users_col = db['users']

login_manager = LoginManager(app)
login_manager.login_view = 'login'
login_manager.login_message = 'Please log in to access the site'
login_manager.login_message_category = 'success'


@login_manager.user_loader
def load_user(user_id):
    return find_user_by_id(user_id)


@app.after_request
def apply_caching(response):
    response.headers['X-Frame-Options'] = 'ALLOW'
    return response


# Main page
@app.route('/')
def index():
    # username = None
    # if session.get('username'):
    #     username = session.get('username')
    #
    # return render_template('index.html', username=username)
    return render_template('main.html')


# Profile Page
@app.route('/profile')
@login_required
def profile():
    username = session.get('username')
    return render_template('profile.html',
                           username=username,
                           registerDate=current_user.registerDate,
                           avatar=current_user.avatar)


# Login
@app.route('/login', methods=['POST', 'GET'])
def login():
    if request.method == 'POST':
        try:
            data = request.get_json()
            cur_user = find_user_by_email(str(data['email']))
            print(data)

            if cur_user is not None and cur_user.password == str(data['password']):
                session['username'] = cur_user.name
                session['id'] = cur_user.id
                login_user(cur_user)
                return {
                    'msg': f'Добро пожаловать, <strong>{cur_user.name}</strong>!',
                    'category': 'Success',
                    'name': cur_user.name
                }
            else:
                return {
                    'msg': 'Неверный пароль или email!',
                    'category': 'Error'
                }
        except Exception as e:
            print(e)
            return {
                'msg': e,
                'category': 'Error'
            }


# Register
@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        try:
            data = request.get_json()

            if input_form_correct(data):
                cur_user = find_user_by_email(str(data['email']))

                if cur_user is None:
                    create_record(data)
                    cur_user = find_user_by_email(str(data['email']))
                    session['username'] = data['name']
                    session['id'] = cur_user.id
                    login_user(cur_user)

                    return {
                        'msg': f'Привет, <strong>{data["name"]}</strong>, вы успешно зарегестрировались и авторизовались!',
                        'category': 'Success',
                        'name': data['name']
                    }
                else:
                    return {
                        'msg': 'Пользователь с таким email уже существует!',
                        'category': 'Error'
                    }
            else:
                return {
                    'msg': 'Поля заполнены некорректно!',
                    'category': 'Error'
                }
        except Exception as e:
            print(e)
            return {
                'msg': e,
                'category': 'Error'
            }


# Logout
@app.route('/logout')
@login_required
def logout():
    logout_user()
    session.pop('username', default=None)
    session.pop('id', default=None)
    return redirect(url_for('index'))



if __name__ == '__main__':
    app.run(debug=False)
