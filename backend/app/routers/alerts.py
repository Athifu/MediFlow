from fastapi import APIRouter, HTTPException
from app.models import Alert

router = APIRouter()

@router.post("/")
async def create_alert(alert: Alert):
    # Logic: Compassion Alert Trigger
    keywords = ["pain", "scared", "help", "worry"]
    is_critical = any(k in alert.transcript.lower() for k in keywords)
    
    print(f"Received Voice Alert: {alert.transcript} (Critical: {is_critical})")
    
    if is_critical:
        print(f"!!! CRITICAL ALERT !!! Patient {alert.patient_id} is in distress: '{alert.transcript}'")
        return {"status": "alert_sent", "priority": "high", "message": "Nurse notified of emotional distress."}
    
    print(f"Info: Patient {alert.patient_id} log: '{alert.transcript}'")
    return {"status": "ok", "priority": "normal", "message": "Feedback recorded."}
