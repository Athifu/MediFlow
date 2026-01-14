from pydantic import BaseModel
from typing import Optional, List

class UserLogin(BaseModel):
    email: str
    password: str

class NfcLogin(BaseModel):
    nfc_tag_id: str

class Token(BaseModel):
    access_token: str
    token_type: str
    role: str
    name: str

class Request(BaseModel):
    id: str
    patient_id: str
    type: str  # pain, water, emergency
    status: str = "pending"
    timestamp: Optional[str] = None

class Prescription(BaseModel):
    id: str
    patient_id: str
    medication: str
    dosage: str
    status: str = "preparing"  # preparing, ready

class Alert(BaseModel):
    patient_id: str
    transcript: str

