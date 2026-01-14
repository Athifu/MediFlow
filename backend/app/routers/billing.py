from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List
import re

router = APIRouter()

class NoteInput(BaseModel):
    note: str

class BillItem(BaseModel):
    name: str
    price: float

class Bill(BaseModel):
    items: List[BillItem]
    total: float

PRICE_LIST = {
    'Paracetamol': 10.0,
    'MRI': 300.0,
    'Consultation': 50.0
}

@router.post("/generate-bill", response_model=Bill)
async def generate_bill(input: NoteInput):
    # Mock AI Logic: Extract items based on keywords in the text
    # In a real scenario, this would call openai.ChatCompletion.create(...)
    
    found_items = []
    total = 0.0
    
    # Simple keyword matching to simulate AI extraction
    for item, price in PRICE_LIST.items():
        if re.search(r'\b' + re.escape(item) + r'\b', input.note, re.IGNORECASE):
            found_items.append(BillItem(name=item, price=price))
            total += price
            
    return Bill(items=found_items, total=total)
