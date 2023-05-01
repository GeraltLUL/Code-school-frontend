from flask_login import LoginManager, login_user, login_required, logout_user, current_user
from flask import render_template, redirect, url_for, session, Flask, request
from flask_cors import CORS
from pymongo import MongoClient
from mongo import *
import os

# Flask config
app = Flask(__name__)
# app.config['SECRET_KEY'] = os.getenv('FLASK_KEY')
app.config['SECRET_KEY'] = "super secret key"
app.config['JSON_AS_ASCII'] = False
app.config['SECURITY_UNAUTHORIZED_VIEW'] = '/login'
app.config.from_object(__name__)
CORS(app)

client = MongoClient('mongodb+srv://Server1:hvdz6OpEEbuUROKF@stl-cluster.ymx42wl.mongodb.net/test')
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


# Programs
@app.route('/programs')
def programs():
    return render_template('StudyPrograms.html')


# Main page
@app.route('/')
def index():
    return render_template('main.html')


@app.route('/auth')
def auth():
    if current_user.is_authenticated:
        return redirect(url_for('profile'))

    return render_template('signin.html')


# Profile Page
@app.route('/profile')
@login_required
def profile():
    if session is None:
        logout_user()
        return redirect(url_for('auth'))

    DD = current_user.DD
    MM = current_user.MM
    YYYY = current_user.YYYY

    if DD == '':
        DD = "ДД"
    if MM == '':
        MM = "ММ"
    if YYYY == '':
        YYYY = "ГГГГ"
    return render_template('profile.html', username=current_user.name, usersurname=current_user.surname,
                           patronymic=current_user.patronymic, email=current_user.email, DD=DD,
                           MM=MM, YYYY=YYYY)


# Update inf
@app.route('/changing', methods=['POST', 'GET'])
def updateInf():
    if current_user.is_authenticated:
        return redirect(url_for('profile'))

    if request.method == 'POST':
        try:
            name = request.form.get('name')
            surname = request.form.get('surname')
            patronymic = request.form.get('patronymic')
            DD = request.form.get('DD')
            MM = request.form.get('MM')
            YYYY = request.form.get('YYYY')
            email = request.form.get('email')

            if 0 < int(MM) <= 12:
                if int(MM)%2 == 0:
                    if int(MM) == 2:
                        if 0 < int(DD) <= 29:
                            pass
                        else:
                            return redirect(url_for('profile'))
                    else:
                        if 0 < int(DD) <= 30:
                            pass
                        else:
                            return redirect(url_for('profile'))
                else:
                    if 0 < int(DD) <= 31:
                        pass
                    else:
                        return redirect(url_for('profile'))
            else:
                return redirect(url_for('profile'))

            return redirect(url_for('profile'))

            # ???????????? КАК ЭТОЙ ХУЙНЕЙ ПОЛЬЗОВАТЬСЯ?!?!
            # update_record()

        except Exception as e:
            print(e)




# Login
@app.route('/login', methods=['POST', 'GET'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('profile'))

    if request.method == 'POST':
        try:
            email = request.form.get('email')
            password = request.form.get('password')
            cur_user = find_user_by_email(email)

            if cur_user is not None and cur_user.password == password:
                session['username'] = cur_user.name
                session['id'] = cur_user.id
                login_user(cur_user)

                return redirect(url_for('profile'))
        except Exception as e:
            print(e)

    return render_template('signin.html')


# Register
@app.route('/register', methods=['GET', 'POST'])
def register():
    if current_user.is_authenticated:
        return redirect(url_for('profile'))

    if request.method == 'POST':
        try:
            name = request.form.get('name')
            surname = request.form.get('surname')
            email = request.form.get('email')
            password = request.form.get('password')
            password2 = request.form.get('password2')
            cur_user = find_user_by_email(email)
            patronymic = ''
            DD = ''
            MM = ''
            YYYY = ''

            if cur_user is None and password == password2 and len(password) >= 1:
                create_record(name, surname, patronymic, email, password, DD, MM, YYYY)
                cur_user = find_user_by_email(email)
                session['username'] = name
                session['id'] = cur_user.id
                login_user(cur_user)

                return redirect(url_for('profile'))
            else:
                print('Error')

        except Exception as e:
            print(e)

    return render_template('signin.html')


# Logout
@app.route('/logout', methods=['GET', 'POST'])
@login_required
def logout():
    if current_user.is_authenticated:
        logout_user()
        session.pop('username', default=None)
        session.pop('id', default=None)
    return redirect(url_for('index'))


if __name__ == '__main__':
    app.run(debug=False)
