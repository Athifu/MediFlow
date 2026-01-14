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

class Alert(BaseModel):
    patient_id: str
    transcript: str

