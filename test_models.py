import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv("API_KEY")
print(f"Using Key: {api_key[:5]}...")

client = OpenAI(
    api_key=api_key,
    base_url="https://api.x.ai/v1",
)

try:
    print("Listing models...")
    models = client.models.list()
    for m in models:
        print(f" - {m.id}")
except Exception as e:
    print(f"Error listing models: {e}")
