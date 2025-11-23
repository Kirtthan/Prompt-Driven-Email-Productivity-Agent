from sqlalchemy import Column, Integer, String, Boolean, DateTime, Text, ForeignKey
from sqlalchemy.orm import relationship
from .database import Base
import datetime

class Email(Base):
    __tablename__ = "emails"

    id = Column(String, primary_key=True, index=True)
    sender = Column(String, index=True)
    subject = Column(String, index=True)
    body = Column(Text)
    timestamp = Column(DateTime)
    read = Column(Boolean, default=False)
    category = Column(String, nullable=True)
    summary = Column(Text, nullable=True)
    action_items = Column(Text, nullable=True) # Stored as JSON string

    drafts = relationship("Draft", back_populates="email")

class Prompt(Base):
    __tablename__ = "prompts"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    template = Column(Text)
    description = Column(String)

class Draft(Base):
    __tablename__ = "drafts"

    id = Column(Integer, primary_key=True, index=True)
    email_id = Column(String, ForeignKey("emails.id"))
    subject = Column(String)
    body = Column(Text)
    is_sent = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)

    email = relationship("Email", back_populates="drafts")
