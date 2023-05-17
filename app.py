import smtplib as smtp
from email.mime.text import MIMEText
from email.header import Header
from email.mime.application import MIMEApplication
from email.mime.multipart import MIMEMultipart
from datetime import datetime
import requests
import flask_login
#from flask_login import LoginManager, login_user, login_required, logout_user, current_user
from flask import render_template, redirect, url_for, session, Flask, request
from flask_cors import CORS
from pymongo import MongoClient
from werkzeug.utils import secure_filename

from mongo import *
import os

# Flask config
app = Flask(__name__)

# app.config['SECRET_KEY'] = os.getenv('FLASK_KEY')
app.config['SECRET_KEY'] = "super secret key"
app.config['UPLOAD_FOLDER'] = './static/data/checks/'
app.config['JSON_AS_ASCII'] = False
app.config['SECURITY_UNAUTHORIZED_VIEW'] = '/login'
app.config.from_object(__name__)
CORS(app)

client = MongoClient('mongodb+srv://Server1:hvdz6OpEEbuUROKF@stl-cluster.ymx42wl.mongodb.net/test')
db = client['STL']
users_col = db['users']
orders_col = db['orders']
checks_col = db['checks']

login_manager = flask_login.LoginManager(app)
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


# FAQ
@app.route('/FAQ')
def faq():
    return render_template('faq.html')


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
    if flask_login.current_user.is_authenticated:
        return redirect(url_for('profile'))

    return render_template('signin.html')


# Update inf
@app.route('/sendmessage', methods=['POST', 'GET'])
def sendmail():
    if request.method == 'POST':
        try:
            name = request.form.get('name')
            email = request.form.get('email')
            msg = request.form.get('message')

            server = smtp.SMTP('smtp.gmail.com', 587)
            server.starttls()
            #server.login(os.getenv('email_login'), os.getenv('email_password'))
            server.login('codeschool48@gmail.com', 'fyuznnkwfsblxgur')
            subject = f'Вопрос от {name} ({email})'
            text = msg

            mime = MIMEText(text, 'plain', 'utf-8')
            mime['Subject'] = Header(subject, 'utf-8')

            #server.sendmail(os.getenv('email_login'), 'codeschool48@gmail.com', mime.as_string())
            server.sendmail('codeschool48@gmail.com', 'codeschool48@gmail.com', mime.as_string())
            server.quit()


        except Exception as e:
            print(e)
    return render_template('faq.html')


# Profile Page
@app.route('/profile')
@flask_login.login_required
def profile():
    if session is None:
        flask_login.logout_user()
        return redirect(url_for('auth'))

    DD = flask_login.current_user.DD
    MM = flask_login.current_user.MM
    YYYY = flask_login.current_user.YYYY

    if DD == '':
        DD = 'ДД'
    if MM == '':
        MM = 'ММ'
    if YYYY == '':
        YYYY = 'YYYY'

    return render_template('profile.html', username=flask_login.current_user.name, usersurname=flask_login.current_user.surname,
                           patronymic=flask_login.current_user.patronymic, email=flask_login.current_user.email, DD=DD,
                           MM=MM, YYYY=YYYY)



# enroll
@app.route('/order', methods=['POST', 'GET'])
def order():
    if request.method == 'POST' and flask_login.current_user.is_authenticated:
        current_datetime = datetime.datetime.now()

        day = str(current_datetime.day)
        month = str(current_datetime.month)
        hour = str(current_datetime.hour)
        minutes = str(current_datetime.minute)
        year = str(current_datetime.year)
        program = request.form.get('program')

        if len(day) == 1:
            day = '0' + day
        if len(month) == 1:
            month = '0' + month
        if len(hour) == 1:
            hour = '0' + hour
        if len(minutes) == 1:
            minutes = '0' + minutes

        try:
            server = smtp.SMTP('smtp.gmail.com', 587)
            server.starttls()
            #server.login(os.getenv('email_login'), os.getenv('email_password'))
            server.login('codeschool48@gmail.com', 'fyuznnkwfsblxgur')

            subject = f'Новая запись'
            text = f'Пользователь {flask_login.current_user.surname} {flask_login.current_user.name} ' \
                   f'{flask_login.current_user.patronymic} отправил новый запрос на запись.\n' \
                   f'Программа: {program}\n' \
                   f'email:{flask_login.current_user.email} \n' \
                   f'Дата записи: {day}.{month}.{year}\n' \
                   f'Время записи: {hour}:{minutes}'

            mime = MIMEText(text, 'plain', 'utf-8')
            mime['Subject'] = Header(subject, 'utf-8')

            #server.sendmail(os.getenv('email_login'), 'codeschool48@gmail.com', mime.as_string())
            server.sendmail('codeschool48@gmail.com', 'codeschool48@gmail.com', mime.as_string())
            server.quit()

            create_order(flask_login.current_user.surname,
                         flask_login.current_user.name,
                         flask_login.current_user.patronymic,
                         flask_login.current_user.email,
                         hour,
                         minutes,
                         year,
                         month,
                         day,
                         program,
                         'Success')
        except Exception as e:
            print(e)
            create_order(flask_login.current_user.surname,
                         flask_login.current_user.name,
                         flask_login.current_user.patronymic,
                         flask_login.current_user.email,
                         hour,
                         minutes,
                         year,
                         month,
                         day,
                         program,
                         'Error')
    return render_template('letter.html')


# Uploading pdf in storage
@app.route('/uploadcheck', methods=['GET', 'POST'])
@flask_login.login_required
def upload_file():
    if request.method == 'POST':
        try:
            file = request.files['check']
            file_name = secure_filename(file.filename)

            file.save(os.path.join(app.config['UPLOAD_FOLDER'], file_name))
            current_datetime = datetime.datetime.now()

            day = str(current_datetime.day)
            month = str(current_datetime.month)
            hour = str(current_datetime.hour)
            minutes = str(current_datetime.minute)
            year = str(current_datetime.year)

            if len(day) == 1:
                day = '0' + day
            if len(month) == 1:
                month = '0' + month
            if len(hour) == 1:
                hour = '0' + hour
            if len(minutes) == 1:
                minutes = '0' + minutes

            if flask_login.current_user.is_authenticated:
                server = smtp.SMTP('smtp.gmail.com', 587)
                server.starttls()
                #server.login(os.getenv('email_login'), os.getenv('email_password'))
                server.login('codeschool48@gmail.com', 'fyuznnkwfsblxgur')

                subject = f'Чек об оплате обучения'
                text = f'Пользователь {flask_login.current_user.surname} {flask_login.current_user.name} ' \
                       f'{flask_login.current_user.patronymic} отправил новый чек об оплате обучения.\n' \
                       f'email:{flask_login.current_user.email} \n' \
                       f'Дата отправки: {day}.{month}.{year}\n' \
                       f'Время отправки: {hour}:{minutes}'

                mime = MIMEMultipart()
                mime['Subject'] = Header(subject, 'utf-8')
                mime.attach(MIMEText(text, 'plain', 'utf-8'))

                attachment = MIMEApplication(file.read(), _subtype='pdf')
                attachment.add_header('Content-Disposition', 'attachment', filename=file.filename)
                mime.attach(attachment)

                #server.sendmail(os.getenv('email_login'), 'codeschool48@gmail.com', mime.as_string())
                server.sendmail('codeschool48@gmail.com', 'codeschool48@gmail.com', mime.as_string())
                server.quit()

                create_check(flask_login.current_user.surname,
                             flask_login.current_user.name,
                             flask_login.current_user.patronymic,
                             flask_login.current_user.email,
                             hour,
                             minutes,
                             year,
                             month,
                             day,
                             file_name,
                             'Success')
        except Exception as e:

            print(e)

    return redirect(url_for('profile'))




# Update inf
@app.route('/changing', methods=['POST', 'GET'])
def updateInf():
    if request.method == 'POST' and flask_login.current_user.is_authenticated:
        try:
            name = request.form.get('name')
            surname = request.form.get('surname')
            patronymic = request.form.get('patronymic')
            DD = request.form.get('DD')
            MM = request.form.get('MM')
            YYYY = request.form.get('YYYY')
            email = request.form.get('email')

            d = DD
            m = MM
            y = YYYY

            if not YYYY.isnumeric():
                YYYY = 2020
            if not DD.isnumeric():
                DD = 1
            if not MM.isnumeric():
                MM = 1

            if (int(MM) > 12 or int(MM) < 0) or (int(DD) < 0 or int(DD) > 31) or (int(YYYY) > 2023 or int(YYYY) < 2000):
                return redirect(url_for('profile'))

            if len(m) == 1:
                m = '0' + m

            if len(d) == 1:
                d = '0' + d

            update_record('email', email, 'DD', d)
            update_record('email', email, 'MM', m)
            update_record('email', email, 'YYYY', y)
            update_record('email', email, 'name', name)
            update_record('email', email, 'surname', surname)
            update_record('email', email, 'patronymic', patronymic)

        except Exception as e:
            print(e)
    return redirect(url_for('profile'))


# Login
@app.route('/login', methods=['POST', 'GET'])
def login():
    if flask_login.current_user.is_authenticated:
        return redirect(url_for('profile'))

    if request.method == 'POST':
        try:
            email = request.form.get('email')
            password = request.form.get('password')
            cur_user = find_user_by_email(email)

            if cur_user is not None and cur_user.password == password:
                session['username'] = cur_user.name
                session['id'] = cur_user.id
                flask_login.login_user(cur_user)

                return redirect(url_for('profile'))
        except Exception as e:
            print(e)

    return render_template('signin.html')


# Register
@app.route('/register', methods=['GET', 'POST'])
def register():
    if flask_login.current_user.is_authenticated:
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
            awards = ['scratch', 'cpp']

            if cur_user is None and password == password2 and len(password) >= 1:
                create_user(name, surname, patronymic, email, password, DD, MM, YYYY, awards)
                cur_user = find_user_by_email(email)
                session['username'] = name
                session['id'] = cur_user.id
                flask_login.login_user(cur_user)

                return redirect(url_for('profile'))
            else:
                print('Error')

        except Exception as e:
            print(e)

    return render_template('signin.html')


# Logout
@app.route('/logout', methods=['GET', 'POST'])
@flask_login.login_required
def logout():
    if flask_login.current_user.is_authenticated:
        flask_login.logout_user()
        session.pop('username', default=None)
        session.pop('id', default=None)
    return redirect(url_for('index'))


if __name__ == '__main__':
    app.run(debug=False)
