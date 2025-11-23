from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from .. import models, schemas, database
from ..services import ingestion

router = APIRouter(
    prefix="/inbox",
    tags=["inbox"],
)

@router.post("/ingest")
def ingest_emails(db: Session = Depends(database.get_db)):
    ingestion.initialize_prompts(db)
    ingestion.ingest_emails(db)
    return {"message": "Ingestion complete"}

@router.get("/", response_model=List[schemas.Email])
def read_emails(skip: int = 0, limit: int = 100, db: Session = Depends(database.get_db)):
    emails = db.query(models.Email).order_by(models.Email.timestamp.desc()).offset(skip).limit(limit).all()
    return emails

@router.get("/{email_id}", response_model=schemas.Email)
def read_email(email_id: str, db: Session = Depends(database.get_db)):
    email = db.query(models.Email).filter(models.Email.id == email_id).first()
    if email is None:
        raise HTTPException(status_code=404, detail="Email not found")
    return email
