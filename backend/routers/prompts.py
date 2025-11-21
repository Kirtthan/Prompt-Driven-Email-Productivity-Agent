from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from .. import models, schemas, database

router = APIRouter(
    prefix="/prompts",
    tags=["prompts"],
)

@router.get("/", response_model=List[schemas.Prompt])
def read_prompts(db: Session = Depends(database.get_db)):
    prompts = db.query(models.Prompt).all()
    return prompts

@router.put("/{prompt_id}", response_model=schemas.Prompt)
def update_prompt(prompt_id: int, prompt: schemas.PromptCreate, db: Session = Depends(database.get_db)):
    db_prompt = db.query(models.Prompt).filter(models.Prompt.id == prompt_id).first()
    if db_prompt is None:
        raise HTTPException(status_code=404, detail="Prompt not found")
    
    db_prompt.template = prompt.template
    db_prompt.description = prompt.description
    db.commit()
    db.refresh(db_prompt)
    return db_prompt
