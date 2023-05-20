import psycopg2
from psycopg2.extras import RealDictCursor
import time


with open("password.txt", "r") as f:
    passwo = f.read()
while True:
    try:
        conn = psycopg2.connect(host='localhost', database='fast api database', user='postgres', password=f'{passwo}', cursor_factory=RealDictCursor)
        cursor = conn.cursor()
        print("connected to database")
        break
    except Exception as error:
        print("connection to databse failed")
        print(error)
        time.sleep(2)