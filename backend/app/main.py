from fastapi import FastAPI, Response, status, HTTPException
from fastapi.params import Body
from .database import conn, cursor
from .schemas import Post

#python -m uvicorn app.main:app --reload
app = FastAPI()

    
@app.get("/")
def root():
    return {"message" : "Hello world"}

@app.get("/posts")
def posts():
    cursor.execute("""SELECT * FROM posts """)
    data = cursor.fetchall()
    return {"data" : data}

#title str, content str
@app.post("/posts", status_code=status.HTTP_201_CREATED)
def create_posts(payload : Post):
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