from fastapi import APIRouter, HTTPException, status
from app.models import UserLogin, NfcLogin, Token
from app.routers.patients import FAKE_PATIENTS

router = APIRouter()

# Authentic Mock User DB
FAKE_USERS_DB = {
    "doctor": {
        "username": "doctor",
        "full_name": "Dr. House",
        "password": "pass", 
        "role": "doctor",
    },
    "nurse": {
        "username": "nurse",
        "full_name": "Nurse Joy",
        "password": "123",
        "role": "nurse",
    },
    "pharma": {
        "username": "pharma",
        "full_name": "Pepper Tablets",
        "password": "mints",
        "role": "pharmacist",
    },
    "admin": {
        "username": "admin",
        "full_name": "System Admin",
        "password": "admin",
        "role": "admin",
    }
}

@router.post("/login", response_model=Token)
async def login_for_access_token(user_data: UserLogin):
    # Check if username (email field used as username) exists in our mock DB
    user = FAKE_USERS_DB.get(user_data.email)
    
    if user and user["password"] == user_data.password:
        return {
            "access_token": f"staff-token-{user['username']}", 
            "token_type": "bearer",
            "role": user["role"],
            "name": user["full_name"]
        }
    
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Incorrect username or password",
        headers={"WWW-Authenticate": "Bearer"},
    )

@router.post("/nfc-login", response_model=Token)
async def nfc_login(nfc_data: NfcLogin):
    # Verify Patient NFC against the central FAKE_PATIENTS list
    # This ensures consistency between the ID you see in the dashboard and what works for login
    valid_ids = [p.nfc_tag_id for p in FAKE_PATIENTS]
    
    if nfc_data.nfc_tag_id in valid_ids:
        # Find patient name for token
        patient = next(p for p in FAKE_PATIENTS if p.nfc_tag_id == nfc_data.nfc_tag_id)
        return {
            "access_token": f"patient-token-{nfc_data.nfc_tag_id}", 
            "token_type": "bearer",
            "role": "patient",
            "name": patient.name
        }
    
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid NFC Tag ID. Try 'PATIENT_001'",
    )
