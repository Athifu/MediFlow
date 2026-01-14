import requests
import json

def test_patient_login():
    url = "http://localhost:8000/auth/nfc-login"
    payload = {"nfc_tag_id": "PATIENT_001"}
    headers = {"Content-Type": "application/json"}
    
    try:
        response = requests.post(url, json=payload, headers=headers)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    test_patient_login()
