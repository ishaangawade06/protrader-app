# main.py (Flask backend entrypoint)
from flask import Flask

app = Flask(__name__)

@app.route("/")
def index():
    return {"msg": "ProTraderHack Backend Running"}

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
