from flask import jsonify
from backend.dao.users import userDAO


class userController:
    def build_dict(self, row):
        result = {
            'UserID': row[0],
            'FirstName': row[1],
            'LastName': row[2],
            'Email': row[3],
            'Password': row[4],
            'Phone Number': row[5],
            'Security Question': row[6],
            'Security Answer': row[7]
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
        phoneNumber = json['phoneNumber']
        securityQuestion = json['securityQuestion']
        securityAnswer = json['securityAnswer']
        userid = dao.register(firstname, lastname, email, password, phoneNumber, securityQuestion, securityAnswer)
        if userid == 0:
            return jsonify(error="Email is already taken"), 406
        result = {
            "userid": userid,
            "firstname": firstname,
            "lastname": lastname,
            "email": email,
            "password": password,
            "phoneNumber": phoneNumber,
            "securityQuestion": securityQuestion,
            "securityAnswer": securityAnswer
        }
        return jsonify(user=result), 200
    
    def getUserByEmail(self, json):
        dao = userDAO()
        email = json['email']
        user = dao.getUserByEmail(email)
        if user == 0:
            return jsonify(error='No user found with this email.'), 404
        else:        
            user = {
            "userid": user[0],
            "firstname": user[1],
            "lastname": user[2],
            "email": user[3],
            "password": user[4],
            "phoneNumber": user[5],
            "securityQuestion": user[6],
            "securityAnswer": user[7]
            }
            return jsonify(user=user), 201
        
    def changePassword(self, json):
        dao = userDAO()
        userid = json["userid"]
        password = json['password']
        changePass = dao.changePassword(userid, password)
        return jsonify('Password was changed'), 200

    
    

