from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Optional

router = APIRouter()

class Patient(BaseModel):
    id: str
    name: str
    nfc_tag_id: str
    status: str
    bed_number: str
    bill_amount: float = 0.0
    ride_waiting: bool = False
    missing_docs: int = 0
    discharge_approved: bool = False
    quests_completed: List[str] = []

# Mock DB
FAKE_PATIENTS = [
    Patient(id="1", name="John Doe", nfc_tag_id="PATIENT_001", status="Stable", bed_number="204-A", bill_amount=150.00),
    Patient(id="2", name="Jane Smith", nfc_tag_id="PATIENT_002", status="Critical", bed_number="101-B", missing_docs=2, bill_amount=2500.50), # Compliance Test
    Patient(id="3", name="Alice Wonderland", nfc_tag_id="PATIENT_003", status="Discharge Pending", bed_number="305-C", ride_waiting=True, missing_docs=0, bill_amount=320.00),
    Patient(id="4", name="Bob Builder", nfc_tag_id="PATIENT_004", status="Discharge Approved", bed_number="404-F", discharge_approved=True, ride_waiting=True, bill_amount=0.00), # Smart Ranker Test (Score 100)
]

@router.get("/", response_model=List[Patient])
async def get_patients():
    return FAKE_PATIENTS

@router.get("/{patient_id}", response_model=Optional[Patient])
async def get_patient(patient_id: str):
    for p in FAKE_PATIENTS:
        if p.id == patient_id:
            return p
    return None
