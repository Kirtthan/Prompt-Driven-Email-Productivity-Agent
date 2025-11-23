import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv("API_KEY")
if api_key:
    api_key = api_key.strip()
print(f"Loaded API Key: {api_key[:5]}...{api_key[-5:] if api_key else 'None'}")
print(f"Key Length: {len(api_key) if api_key else 0}")
print(f"Key Repr: {repr(api_key)}")

if not api_key:
    print("Error: API_KEY not found in environment variables.")
    exit(1)

client = OpenAI(
    api_key=api_key,
    base_url="https://api.x.ai/v1",
)

try:
    print("Attempting to connect to Grok API...")
    response = client.chat.completions.create(
        model="grok-beta",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": "Hello, are you working?"}
        ]
    )
    print("Success!")
    print("Response:", response.choices[0].message.content)
except Exception as e:
    print(f"Error connecting to API: {e}")
