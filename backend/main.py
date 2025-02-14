from fastapi import FastAPI
import requests

app = FastAPI()

API_KEY = "b46bb24f932952fc8b58b7305af7cdca"
BASE_URL = "https://v3.football.api-sports.io"

@app.get("/")
def home():
    return {"message": "Live Sports API is running"}

@app.get("/live-scores")
def get_live_scores():
    headers = {"x-apisports-key": API_KEY}
    response = requests.get(f"{BASE_URL}/fixtures?live=all", headers=headers)
    return response.json()
