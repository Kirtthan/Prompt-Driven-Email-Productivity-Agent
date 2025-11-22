import json
import os
from sqlalchemy.orm import Session
from .. import models, schemas
from .llm_service import llm_service

MOCK_DATA_PATH = "./data/mock_inbox.json"

def initialize_prompts(db: Session):
    """Initializes default prompts if they don't exist."""
    defaults = [
        {
            "name": "Categorization Prompt",
            "template": "Categorize emails into: Important, Newsletter, Spam, To-Do. To-Do emails must include a direct request requiring user action. Email body: {email_body}",
            "description": "Determines the category of the email."
        },
        {
            "name": "Action Item Prompt",
            "template": "Extract tasks from the email. Respond in JSON: {{ \"task\": \"...\", \"deadline\": \"...\" }}. Email body: {email_body}",
            "description": "Extracts actionable tasks from the email."
        },
        {
            "name": "Auto-Reply Draft Prompt",
            "template": "If an email is a meeting request, draft a polite reply asking for an agenda. Otherwise draft a generic acknowledgement. Email body: {email_body}",
            "description": "Generates a draft reply."
        }
    ]

    for p in defaults:
        existing = db.query(models.Prompt).filter(models.Prompt.name == p["name"]).first()
        if not existing:
            db_prompt = models.Prompt(**p)
            db.add(db_prompt)
    db.commit()

def ingest_emails(db: Session):
    """Loads emails from mock_inbox.json and processes them."""
    if not os.path.exists(MOCK_DATA_PATH):
        print(f"Mock data not found at {MOCK_DATA_PATH}")
        return

    with open(MOCK_DATA_PATH, "r") as f:
        emails_data = json.load(f)

    # Fetch prompts
    cat_prompt = db.query(models.Prompt).filter(models.Prompt.name == "Categorization Prompt").first()
    action_prompt = db.query(models.Prompt).filter(models.Prompt.name == "Action Item Prompt").first()

    for email_data in emails_data:
        # Check if email exists
        existing = db.query(models.Email).filter(models.Email.id == email_data["id"]).first()
        if existing:
            continue

        # Process with LLM
        category = "Uncategorized"
        action_items = "[]"

        if cat_prompt:
            category = llm_service.generate_response(cat_prompt.template, {"email_body": email_data["body"]})
        
        if action_prompt:
            action_items = llm_service.generate_response(action_prompt.template, {"email_body": email_data["body"]})

        # Create Email record
        db_email = models.Email(
            id=email_data["id"],
            sender=email_data["sender"],
            subject=email_data["subject"],
            body=email_data["body"],
            timestamp=datetime.datetime.fromisoformat(email_data["timestamp"].replace("Z", "+00:00")),
            read=email_data["read"],
            category=category,
            action_items=action_items
        )
        db.add(db_email)
    
    db.commit()

import datetime
