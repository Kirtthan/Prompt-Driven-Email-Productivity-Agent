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

class ChatRequest(BaseModel):
    email_id: str
    query: str

class ChatResponse(BaseModel):
    response: str

@router.post("/chat", response_model=ChatResponse)
def chat_agent(request: ChatRequest, db: Session = Depends(database.get_db)):
    email = db.query(models.Email).filter(models.Email.id == request.email_id).first()
    if not email:
        raise HTTPException(status_code=404, detail="Email not found")
    
    # Construct context
    context = f"Sender: {email.sender}\nSubject: {email.subject}\nBody: {email.body}"
    
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

