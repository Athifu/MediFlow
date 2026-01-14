from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import uuid

router = APIRouter()

class Task(BaseModel):
    id: str
    patient_id: str
    type: str # meds | doc_visit
    priority: str # high | low
    status: str # pending | done

class TaskCreate(BaseModel):
    patient_id: str
    type: str
    priority: str

FAKE_TASKS = [
    Task(id=str(uuid.uuid4()), patient_id="1", type="meds", priority="high", status="pending"),
    Task(id=str(uuid.uuid4()), patient_id="2", type="doc_visit", priority="low", status="pending"),
]

@router.get("/", response_model=List[Task])
async def get_tasks():
    return FAKE_TASKS

@router.post("/", response_model=Task)
async def create_task(task_in: TaskCreate):
    new_task = Task(
        id=str(uuid.uuid4()), 
        patient_id=task_in.patient_id,
        type=task_in.type,
        priority=task_in.priority,
        status="pending"
    )
    FAKE_TASKS.append(new_task)
    return new_task

@router.put("/{task_id}/status")
async def update_task_status(task_id: str, status: str):
    for t in FAKE_TASKS:
        if t.id == task_id:
            t.status = status
            return t
    raise HTTPException(status_code=404, detail="Task not found")
