from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.get("/api/health")
def health():
    return jsonify({"status": "ok"})


@app.get("/api/exchange")
def exchange():
    return jsonify({
        "base": "USD",
        "target": "KRW",
        "rate": 1380,
        "updatedAt": "2026-08-19",
        "source": "demo",
    })


if __name__ == "__main__":
    app.run(port=5000)
