from flask import Flask, render_template, request, session, redirect, url_for
from flask_socketio import join_room, leave_room, send, SocketIO
import random
from string import ascii_uppercase
from cryptography.fernet import Fernet

app = Flask(__name__)
app.config["SECRET_KEY"] = "hjhjsdahhds"
app.config["SERVER_NAME"] = "gssr.uk"
sockio = SocketIO(app)

rooms = {}
key = Fernet.generate_key()
fernet = Fernet(key)

def generate_unique_code(length):
    while True:
        code = ""
        for _ in range(length):
            code += random.choice(ascii_uppercase)
        
        if code not in rooms:
            break
    
    return code

@app.route("/", methods=["POST", "GET"])
def home():
    session.clear()
    if request.method == "POST":
        name = request.form.get("name")
        _id = "".join([random.choice(ascii_uppercase) for _ in range(0,16)])
        code = request.form.get("code")
        join = request.form.get("join", False)
        create = request.form.get("create", False)
        password = request.form.get("password", False) # make optional feild
        entry_password = request.form.get("entry_password", False) # make optional feild

        if not name:
            return render_template("home.html", error="Please enter a name.", code=code, name=name)

        if join != False and not code:
            return render_template("home.html", error="Please enter a room code.", code=code, name=name)
        
        room = code
        if create != False and password:
            room = generate_unique_code(8)
            rooms[room] = {"members": 0, "messages": [], "owner": _id, "XX__XX__XX": fernet.encrypt(password.encode())}
        elif create != False:
            room = generate_unique_code(8)
            rooms[room] = {"members": 0, "messages": [], "owner": _id}
        elif code not in rooms:
            return render_template("home.html", error="Room does not exist.", code=code, name=name)

        session["room"] = room
        session["name"] = name
        session["_id"] = _id
        return redirect(url_for("room"))

    return render_template("home.html")

@app.route("/room")
def room():
    room = session.get("room")
    if room is None or session.get("name") is None or room not in rooms:
        return redirect(url_for("home"))
    if rooms[room]["owner"] == session.get("_id"):
        return render_template("room.html", code=room, messages=rooms[room]["messages"], owner = True)
    return render_template("room.html", code=room, messages=rooms[room]["messages"])

@sockio.on("start_game")
def startgame(data):
    room = session.get("room")
    if room not in rooms:
        return
    if session.get("_id") != rooms[room]["owner"]:
        return
    content = {
        "name" : session.get("name"),
        "message" : f"{session.get('name')} has started the game"
    }
    send(content, to=room)
    rooms[room]["messages"].append(content)
    print(f"{session.get('name')} has started game in {room}")


@sockio.on("message")
def message(data):
    room = session.get("room")
    if room not in rooms:
        return 
    
    content = {
        "name": session.get("name"),
        "message": data["data"]
    }
    send(content, to=room)
    rooms[room]["messages"].append(content)
    print(f"{session.get('name')} said: {data['data']}")

@sockio.on("connect")
def connect(auth):
    room = session.get("room")
    name = session.get("name")
    if not room or not name:
        return
    if room not in rooms:
        leave_room(room)
        return
    
    join_room(room)
    send({"name": name, "message": "has entered the room"}, to=room)
    rooms[room]["members"] += 1
    print(f"{name} joined room {room}")

@sockio.on("disconnect")
def disconnect():
    room = session.get("room")
    name = session.get("name")
    leave_room(room)

    if room in rooms:
        rooms[room]["members"] -= 1
        if rooms[room]["members"] <= 0:
            del rooms[room]
    
    send({"name": name, "message": "has left the room"}, to=room)
    print(f"{name} has left the room {room}")

if __name__ == "__main__":
    sockio.run(app, allow_unsafe_werkzeug=True)