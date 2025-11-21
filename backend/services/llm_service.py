import json
import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

# User provided key
API_KEY = os.getenv("API_KEY")

class LLMService:
    def __init__(self):
        genai.configure(api_key=API_KEY)
        self.model = genai.GenerativeModel('gemini-2.5-flash')

    def generate_response(self, prompt_template: str, context: dict) -> str:
        """
        Generates a response from the LLM based on the prompt and context.
        """
        try:
            formatted_prompt = prompt_template.format(**context)
            
            # Construct a prompt that enforces the role/behavior
            full_prompt = f"You are a helpful email productivity assistant. Respond only with the requested output format.\n\n{formatted_prompt}"
            
            response = self.model.generate_content(full_prompt)
            return response.text.strip()
        except Exception as e:
            print(f"LLM Error: {e}")
            return self._mock_fallback(prompt_template, context)

    def chat(self, query: str, context: str) -> str:
        try:
            full_prompt = f"You are a helpful email assistant. Use the provided email context to answer the user's question.\n\nContext:\n{context}\n\nQuestion: {query}"
            response = self.model.generate_content(full_prompt)
            return response.text.strip()
        except Exception as e:
            print(f"LLM Chat Error: {e}")
            return "I'm sorry, I couldn't process your request at the moment."

    def _mock_fallback(self, prompt_template: str, context: dict) -> str:
        """Fallback mock logic in case of API failure"""
        email_body = context.get("email_body", "")
        if "Categorize" in prompt_template:
            if "urgent" in email_body.lower(): return "Important"
            elif "newsletter" in email_body.lower(): return "Newsletter"
            return "General"
        elif "Extract tasks" in prompt_template:
            return json.dumps([])
        return "Draft generation failed."

llm_service = LLMService()
