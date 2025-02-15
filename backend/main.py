# from fastapi import FastAPI
# import requests

# app = FastAPI()

# API_KEY = "b46bb24f932952fc8b58b7305af7cdca"
# BASE_URL = "https://v3.football.api-sports.io"

# @app.get("/")
# def home():
#     return {"message": "Live Sports API is running"}

# @app.get("/live-scores")
# def get_live_scores():
#     headers = {"x-apisports-key": API_KEY}
#     response = requests.get(f"{BASE_URL}/fixtures?live=all", headers=headers)
#     return response.json()


from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import requests

app = FastAPI()

# Allowed origins for local testing and backend calls
origins = [
    "http://localhost:3000",  # Next.js frontend (local development)
    "https://frontend-ikya79gjk-muhammads-projects-25abc4e7.vercel.app",  # Next.js frontend (production)
    "https://live-sports-score-app.onrender.com",  # FastAPI backend itself
    "*", 
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "FastAPI is running"}

@app.get("/live-scores")
def get_live_scores():
    headers = {"x-apisports-key": "b46bb24f932952fc8b58b7305af7cdca"}
    response = requests.get("https://v3.football.api-sports.io/fixtures?live=all", headers=headers)
    return response.json()
