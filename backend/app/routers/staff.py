from fastapi import APIRouter, HTTPException
from typing import List
from ..models import Request, Prescription
import uuid
from datetime import datetime

router = APIRouter()

# Mock Data via In-Memory Lists
REQUESTS_DB = [
    {"id": "req_1", "patient_id": "PATIENT_001", "type": "pain", "status": "pending", "timestamp": str(datetime.now())},
    {"id": "req_2", "patient_id": "PATIENT_004", "type": "water", "status": "pending", "timestamp": str(datetime.now())},
    {"id": "req_3", "patient_id": "PATIENT_002", "type": "emergency", "status": "pending", "timestamp": str(datetime.now())}
]

PRESCRIPTIONS_DB = [
    {"id": "rx_1", "patient_id": "PATIENT_001", "medication": "Amoxicillin", "dosage": "500mg", "status": "preparing"}
]

USERS_DB = [] # Mock for created users

@router.get("/requests", response_model=List[Request])
async def get_requests():
    return [req for req in REQUESTS_DB if req["status"] == "pending"]

@router.post("/requests/{request_id}/resolve")
async def resolve_request(request_id: str):
    for req in REQUESTS_DB:
        if req["id"] == request_id:
            req["status"] = "resolved"
            return {"message": "Request resolved"}
    raise HTTPException(status_code=404, detail="Request not found")

@router.get("/prescriptions", response_model=List[Prescription])
async def get_prescriptions():
    return [p for p in PRESCRIPTIONS_DB if p["status"] == "preparing"]

@router.post("/prescriptions")
async def create_prescription(rx: Prescription):
    rx_dict = rx.dict()
    rx_dict["id"] = str(uuid.uuid4())
    PRESCRIPTIONS_DB.append(rx_dict)
    return rx_dict

@router.post("/prescriptions/{rx_id}/ready")
async def mark_prescription_ready(rx_id: str):
    for p in PRESCRIPTIONS_DB:
        if p["id"] == rx_id:
            p["status"] = "ready"
            # In a real app, this would trigger a WS update to the patient
            return {"message": "Prescription marked ready"}
    raise HTTPException(status_code=404, detail="Prescription not found")

@router.post("/users")
async def create_user(name: str, role: str):
    employee_id = f"EMP-{uuid.uuid4().hex[:4].upper()}"
    new_user = {"id": str(uuid.uuid4()), "name": name, "role": role, "employee_id": employee_id}
    USERS_DB.append(new_user)
    return new_user
