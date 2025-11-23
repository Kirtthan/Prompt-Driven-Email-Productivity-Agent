from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List
from .. import models, schemas, database
from ..services.llm_service import llm_service

router = APIRouter(
    prefix="/agent",
    tags=["agent"],
)

from typing import Optional

class ChatRequest(BaseModel):
    email_id: Optional[str] = None
    query: str

class ChatResponse(BaseModel):
    response: str

@router.post("/chat", response_model=ChatResponse)
def chat_agent(request: ChatRequest, db: Session = Depends(database.get_db)):
    context = ""
    
    if request.email_id:
        email = db.query(models.Email).filter(models.Email.id == request.email_id).first()
        if email:
            context = f"Selected Email Context:\nSender: {email.sender}\nSubject: {email.subject}\nBody: {email.body}"
    else:
        # If no specific email is selected, provide a summary of recent emails
        recent_emails = db.query(models.Email).order_by(models.Email.timestamp.desc()).limit(10).all()
        if recent_emails:
            email_list = "\n".join([f"- [{e.id}] From: {e.sender}, Subject: {e.subject}, Date: {e.timestamp}" for e in recent_emails])
            context = f"Recent Emails in Inbox:\n{email_list}\n\n(The user has not selected a specific email, so use this list to answer general questions.)"
        else:
            context = "Inbox is empty."
    
    response = llm_service.chat(request.query, context)
    return {"response": response}

class DraftRequest(BaseModel):
    email_id: str

@router.post("/draft", response_model=schemas.Draft)
def generate_draft(request: DraftRequest, db: Session = Depends(database.get_db)):
    email = db.query(models.Email).filter(models.Email.id == request.email_id).first()
    if not email:
        raise HTTPException(status_code=404, detail="Email not found")
    
    prompt = db.query(models.Prompt).filter(models.Prompt.name == "Auto-Reply Draft Prompt").first()
    if not prompt:
        raise HTTPException(status_code=500, detail="Draft prompt not found")
    
    draft_body = llm_service.generate_response(prompt.template, {"email_body": email.body, "email_subject": email.subject})
    
    db_draft = models.Draft(
        email_id=email.id,
        subject=f"Re: {email.subject}",
        body=draft_body
    )
    db.add(db_draft)
    db.commit()
    db.refresh(db_draft)
    return db_draft

@router.get("/drafts", response_model=List[schemas.Draft])
def get_drafts(db: Session = Depends(database.get_db)):
    return db.query(models.Draft).all()

