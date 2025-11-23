from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class EmailBase(BaseModel):
    sender: str
    subject: str
    body: str
    timestamp: datetime
    read: bool = False
    category: Optional[str] = None
    summary: Optional[str] = None
    action_items: Optional[str] = None

class EmailCreate(EmailBase):
    id: str

class Email(EmailBase):
    id: str
    class Config:
        orm_mode = True

class PromptBase(BaseModel):
    name: str
    template: str
    description: Optional[str] = None

class PromptCreate(PromptBase):
    pass

class Prompt(PromptBase):
    id: int
    class Config:
        orm_mode = True

class DraftBase(BaseModel):
    email_id: str
    subject: str
    body: str

class DraftCreate(DraftBase):
    pass

class Draft(DraftBase):
    id: int
    is_sent: bool
    created_at: datetime
    updated_at: datetime
    class Config:
        orm_mode = True
