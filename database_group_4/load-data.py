import csv
import mysql.connector
from mysql.connector import Error
import sys
import pandas as pd
import numpy as np



product_path = 'data/products.csv'
config_db={
    'user':'root',
    'password':'password',
    'host':"localhost",
    'database':'marketplacedb',
    'port':3306
}

def import_csv_to_mysql(filename, table_name, cursor):
    """
    Imports data from a CSV file into the specified MySQL table.
    """
    # Load data from CSV file into DataFrame
    try:
        df = pd.read_csv(filename)
    except Exception as e:
        print(f"Error reading the CSV file {filename}: {e}")
        sys.exit(1)
    
    # Generate INSERT INTO statement based on DataFrame columns
    cols = ",".join(df.columns)
    placeholders = ",".join(["%s"] * len(df.columns))
    insert_sql = f"INSERT INTO {table_name}({cols}) VALUES({placeholders})"
    
    # Insert each row from the DataFrame into the database
    for _, row in df.iterrows():
        try:
            cursor.execute(insert_sql, tuple(row.values))
        except Error as e:
            print(f"Error inserting data into {table_name}: {e}")
            continue  # Skip problematic row and continue with the next
    
    print(f"Data imported successfully into {table_name}.")

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

try:
    import_csv_to_mysql('database_group_4/data/user.csv', 'marketplacedb.user', cursor)
    import_csv_to_mysql('database_group_4/data/product.csv', 'marketplacedb.product', cursor)
    import_csv_to_mysql('database_group_4/data/reviews.csv', 'marketplacedb.reviews', cursor)

    connection.commit()

except Error as e:
    print(f"An error occurred: {e}")
    connection.rollback()  # Roll back in case of error

finally:
    if connection.is_connected():
        cursor.close()
        connection.close()
        print("MySQL connection is closed")

print("Data uploaded successfully")
