from backend.config.dbconfig import dbconfig
import psycopg2


class userDAO:
    def __init__(self):
        connection_url = "dbname=%s user=%s password=%s host=%s port=%s " \
                         % (dbconfig['dbname'], dbconfig['user'], dbconfig['password'], dbconfig['dbhost'],
                            dbconfig['dbport'])

        self.conn = psycopg2.connect(connection_url)

    def getAllUsers(self):
        query = "select * from users"
        cursor = self.conn.cursor()
        cursor.execute(query)
        result = []
        for row in cursor:
            result.append(row)
        return result

    def login(self, email, password):
        cursor = self.conn.cursor()
        query = "select * from users where email = %s and password = %s"
        cursor.execute(query, (email, password,))
        user = cursor.fetchone()
        return user

    def register(self, firstname, lastname, email, password):
        cursor = self.conn.cursor()
        check_email = "select * from users where email = %s"
        cursor.execute(check_email, (email,))
        check_user = cursor.fetchone()
        if check_user is None:
            query = "insert into users(first_name, last_name, email, password) values (%s, %s, %s, %s) on conflict do " \
                    "nothing returning id "
            cursor.execute(query, (firstname, lastname, email, password))
            insertUser = cursor.fetchone()
            self.conn.commit()
            return insertUser[0]
        else:
            return 0
