import json
import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

# User provided key
API_KEY = os.getenv("GROQ_API_KEY")

class LLMService:
    def __init__(self):
        self.client = OpenAI(
            api_key=API_KEY,
            base_url="https://api.groq.com/openai/v1",
        )
        self.model = "llama-3.3-70b-versatile"

    def generate_response(self, prompt_template: str, context: dict) -> str:
        """
        Generates a response from the LLM based on the prompt and context.
        """
        try:
            formatted_prompt = prompt_template.format(**context)
            
            # Construct a prompt that enforces the role/behavior
            messages = [
                {"role": "system", "content": "You are a helpful email productivity assistant. Respond only with the requested output format."},
                {"role": "user", "content": formatted_prompt}
            ]
            
            response = self.client.chat.completions.create(
                model=self.model,
                messages=messages
            )
            return response.choices[0].message.content.strip()
        except Exception as e:
            print(f"LLM Error: {e}")
            return self._mock_fallback(prompt_template, context)

    def chat(self, query: str, context: str) -> str:
        try:
            # Detect if this is a draft request
            is_draft_request = any(keyword in query.lower() for keyword in ['draft', 'reply', 'respond', 'write'])
            
            if is_draft_request:
                # Request structured JSON response for drafts
                system_prompt = "You are a helpful email assistant. The user wants to draft a reply to an email."
                user_prompt = f"""Email Context:
{context}

User Request: {query}

Generate 3 different draft options with varying tones. Return ONLY a valid JSON object in this exact format (no markdown, no code blocks):
{{
  "type": "draft_options",
  "options": [
    {{
      "tone": "Professional",
      "subject": "Re: [original subject]",
      "body": "The email body text here..."
    }},
    {{
      "tone": "Friendly",
      "subject": "Re: [original subject]",
      "body": "The email body text here..."
    }},
    {{
      "tone": "Brief",
      "subject": "Re: [original subject]",
      "body": "The email body text here..."
    }}
  ]
}}"""
            else:
                # Regular conversational response
                system_prompt = "You are a helpful email assistant. Use the provided email context to answer the user's question."
                user_prompt = f"Context:\n{context}\n\nQuestion: {query}"
            
            response = self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_prompt}
                ]
            )
            response_text = response.choices[0].message.content.strip()
            
            # Try to extract JSON if it's wrapped in code blocks
            if is_draft_request:
                # Remove markdown code blocks if present
                if '```json' in response_text:
                    response_text = response_text.split('```json')[1].split('```')[0].strip()
                elif '```' in response_text:
                    response_text = response_text.split('```')[1].split('```')[0].strip()
                
                # Validate it's valid JSON
                try:
                    json.loads(response_text)
                except json.JSONDecodeError:
                    # If JSON parsing fails, return a fallback
                    return json.dumps({
                        "type": "error",
                        "message": "I had trouble formatting the response. Here's a simple draft:",
                        "fallback": response_text
                    })
            
            return response_text
        except Exception as e:
            print(f"LLM Chat Error: {e}")
            import traceback
            traceback.print_exc()
            return f"I'm sorry, I couldn't process your request. Error: {str(e)}"

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
