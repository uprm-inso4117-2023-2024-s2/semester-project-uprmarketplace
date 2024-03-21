import csv
import mysql.connector
from mysql.connector import Error
import sys
from config import config_db
import pandas as pd
import numpy as np



product_path = 'data/products.csv'
config_db={
    'user':'rootUser',
    'password':'password',
    'host':"localhost",
    'database':'marketplacedb',
    'port':3306
}

# Try opening the report file
try:
    r_file = pd.read_csv(product_path)
except Error as e:
    print("Error opening the reports file:",e)
    sys.exit(1)

# Connect to mysql database
try:
    connection = mysql.connector.connect(**config_db)
except Error as e:
    print("Error connecting ot the database: ",e)
    sys.exit(1)
print("Connection to database succeeded.")
print("Processing data now,please wait...")
# Create a cursor to execute mysql commads int the database
cursor = connection.cursor()
#
# for index,row in r_file.iterrows():
#
#     # Insert into product table
#     sql = "INSERT INTO marketplacedb.product(pid,name,price,description) VALUES(%s,%s,%s,%s)"
#     # values = (str(row['pid']), str(row['name']), "$10", str(row['description']))
#     values = ("1","book","10","used")
#     cursor.execute(sql, values)

# Insert into product table
sql = "INSERT INTO marketplacedb.product(pid,name,price,description) VALUES(%s,%s,%s,%s)"
# values = (str(row['pid']), str(row['name']), "$10", str(row['description']))
values = ("1", "book", "10", "used")
cursor.execute(sql, values)
connection.commit()
connection.close()
print("Data uploaded successfully")




