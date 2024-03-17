from flask import jsonify
from backend.dao.users import userDAO


class userController:
    def build_dict(self, row):
        result = {
            'UserID': row[0],
            'FirstName': row[1],
            'LastName': row[2],
            'Email': row[3],
            'Password': row[4]
        }
        return result

    def getAllUsers(self):
        dao = userDAO()
        result_tuples = dao.getAllUsers()
        result = []
        for row in result_tuples:
            formatted = self.build_dict(row)
            result.append(formatted)
        return jsonify(result)

    def login(self, json):
        dao = userDAO()
        email = json['Email']
        password = json['Password']
        user_fetch = dao.login(email, password)
        if user_fetch:
            user = self.build_dict(user_fetch)
            return jsonify(user)
        else:
            return jsonify(error="Incorrect email or password"), 404

    def register(self, json):
        dao = userDAO()
        firstname = json['firstname']
        lastname = json['lastname']
        email = json['email']
        password = json['password']
        userid = dao.register(firstname, lastname, email, password)
        if userid == 0:
            return jsonify(error="Email is already taken"), 406
        result = {
            "userid": userid,
            "firstname": firstname,
            "lastname": lastname,
            "email": email,
            "password": password
        }
        return jsonify(user=result), 201


