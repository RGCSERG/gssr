from fastapi import FastAPI, Response, status, HTTPException
from fastapi.params import Body
from .database import conn, cursor #(conn, conn2, cursor, cursor2)
from .schemas import Post
from fastapi.middleware.cors import CORSMiddleware
#http://127.0.0.1:8000/redoc
#http://127.0.0.1:8000/docs
#python -m uvicorn app.main:app --reload
app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:3000'],
    allow_methods=['*'],
    allow_headers=['*']
)
    
@app.get("/")
def root():
    return {"message" : "Hello world"}

@app.get("/posts")
def posts():
    cursor.execute("""SELECT * FROM posts ORDER BY _id ASC LIMIT 10""")
    data = cursor.fetchall()
    return {"data" : data}

#title str, content str
@app.post("/posts", status_code=status.HTTP_201_CREATED)
async def create_posts(payload : Post):
    cursor.execute("""INSERT INTO posts (title, content, published) VALUES (%s,%s,%s) RETURNING * """, (payload.title, payload.content, payload.published))
    post = cursor.fetchall()
    conn.commit()
    return {"data" : post}

@app.get("/posts/{id}")
def get_post(id:int):
    cursor.execute("""SELECT * FROM posts WHERE _id = %s """, (str(id),)) # problems that occur are due to str(id), with a comma making it a tuple while without it, it's not a tuple. i.e:(2,) # is a tuple- 2, # is a tuple- (2) is not a tuple
    post = cursor.fetchone()
    if not post:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"post with id : {id} was not found")
    return {"data" : post}

@app.delete("/posts/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_post(id:int):
    cursor.execute("""DELETE FROM posts WHERE _id = %s  RETURNING * """, (str(id),))
    post = cursor.fetchone()
    if post == None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"post with id : {id} cannot be deleted because it does not exist")
    conn.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)

@app.put("/posts/{id}")
def update_post(id:int, payload : Post):
    cursor.execute("""UPDATE posts SET title = %s, content = %s, published = %s  WHERE _id = %s RETURNING *""", (payload.title, payload.content, payload.published, id))
    post = cursor.fetchone()
    if post == None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"post with id : {id} cannot be delete because it does not exist")
    conn.commit()
    return {"data": post}

@app.post("/token")
async def token(payload : Post):
    print(payload)
    return {"ddd" : "dddd"}
# @app.get("/tests")
# def get_tests():
#     cursor2.execute("""SELECT Public.test1.* from Public.test1""")
#     data = cursor2.fetchall()
#     return {"data": data}

# @app.get("/tests/{id}")
# def get_test_test(id:int):
#     cursor2.execute("""SELECT public.test2.* FROM public.test3, public.test2 WHERE public.test3.test1_id = %s and public.test3.test2_id = public.test2.test2_id; """, (str(id),)) # problems that occur are due to str(id), with a comma making it a tuple while without it, it's not a tuple. i.e:(2,) # is a tuple- 2, # is a tuple- (2) is not a tuple
#     data = cursor2.fetchall()
#     if not data:
#         raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"test3s' with id : {id} was not found")
#     return {"data" : data}