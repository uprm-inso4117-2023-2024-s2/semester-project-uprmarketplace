from flask import Flask, jsonify, request
from flask_cors import CORS

from backend.controller.users import userController

app = Flask(__name__)
CORS(app)


@app.route('/')
def hello_world():  # put application's code here
    return 'Hello World!'


@app.route('/users', methods=['GET'])
def get_users():
    if request.method == 'GET':
        return userController().getAllUsers()
    else:
        return jsonify("Not Supported"), 405
    
@app.route('/findByEmail', methods=['POST'])
def findByEmail():
    if request.method == 'POST':
        return userController().getUserByEmail(request.json)
    else:
        return jsonify("Not Supported"), 405
    
@app.route('/changePassword', methods=['POST'])
def changePassword():
    if request.method == 'POST':
        return userController().changePassword(request.json)
    else:
        return jsonify("Not Supported"), 405

@app.route('/login', methods=['POST'])
def login():
    if request.method == 'POST':
        return userController().login(request.json)
    else:
        return jsonify("Not Supported"), 405


@app.route('/register', methods=['POST'])
def register():
    if request.method == 'POST':
        return userController().register(request.json)
    else:
        return jsonify("Not Supported"), 405


if __name__ == '__main__':
    app.run()
