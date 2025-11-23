import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv("GROQ_API_KEY")

print(f"Testing Groq API with key: {api_key[:10] if api_key else 'None'}...")

client = OpenAI(
    api_key=api_key,
    base_url="https://api.groq.com/openai/v1",
)

try:
    print("Attempting to chat with llama-3.3-70b-versatile...")
    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {"role": "user", "content": "Hello, are you working?"}
        ]
    )
    print("Success!")
    print("Response:", response.choices[0].message.content)
except Exception as e:
    print(f"Error connecting to Groq API: {e}")
