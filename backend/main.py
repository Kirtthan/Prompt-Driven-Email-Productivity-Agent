from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, Base
from .routers import inbox, prompts, agent

# Create tables
Base.metadata.create_all(bind=engine)

import os

app = FastAPI(
    title="Prompt-Driven Email Agent",
    root_path="/api" if os.getenv("VERCEL") else ""
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Allow all for dev
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(inbox.router)
app.include_router(prompts.router)
app.include_router(agent.router)

@app.get("/")
def read_root():
    return {"message": "Email Agent API is running"}
