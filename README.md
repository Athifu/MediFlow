# 🏥 MediFlow AI - Next-Gen Hospital Operating System

MediFlow AI is a futuristic, comprehensive healthcare platform designed to streamline clinical operations, enhance patient care, and provide intelligence-driven insights for hospital administration. Built with a focus on "Premium Medical" aesthetics and advanced AI integration, it serves as a unified ecosystem for Doctors, Nurses, Pharmacists, Admins, and Patients.

---

## 🚀 Key Features

### 👩‍⚕️ Clinical Command Center (Staff)
*   **AI Diagnostic Copilot**: Intelligent assistant for differential diagnosis and decision support.
*   **Live Sepsis Monitor**: API-driven real-time risk assessment for ICU patients.
*   **Smart Bed IoT Dashboard**: Live visualization of patient positions and bed telemetry.
*   **AI Clinical Scribe**: Automated transcription and summarization of patient consultations.
*   **Medical Imaging Viewer**: Built-in DICOM-compliant viewer for X-Rays and MRI scans.
*   **Patient Queue Management**: Kanban-style flow tracker for ER and OPD.
*   **Staff Schedule Manager**: Intelligent rostering and shift management.

### 🏥 Hospital Administration
*   **Resource Heatmap**: Real-time visualization of hospital bed occupancy and resource strain.
*   **User Management**: Role-based access control for hospital staff.
*   **Inventory Management**: Live tracking of pharmaceutical stock and alerts.
*   **Staff Onboarding**: Automated training and compliance modules.

### 👤 Patient Experience
*   **Interactive Health Dashboard**: A personalized command center for health tracking.
*   **AI Symptom Checker**: Chatbot-driven preliminary triage.
*   **3D Organ Viewer**: Interactive educational tool for understanding medical conditions.
*   **Hospital Navigation Map**: Indoor wayfinding for patients and visitors.
*   **Secure Document Vault**: Encrypted storage for medical records and prescriptions.
*   **Live Translator**: Real-time voice/text translation for non-native speakers.
*   **Emergency SOS**: One-touch alert system with geolocation.
*   **Family Bridge**: Secure link for family members to track patient status.

---

## 🛠️ Technology Stack

### Frontend
*   **Framework**: React 18 (Vite)
*   **Styling**: Tailwind CSS (Custom "Medical Premium" Design System)
*   **Icons**: Lucide React
*   **State Management**: React Hooks & Context
*   **Visualization**: Recharts, Three.js (for 3D elements)

### Backend
*   **Framework**: FastAPI (Python)
*   **Authentication**: JWT (JSON Web Tokens)
*   **API Documentation**: Swagger UI / OpenAPI

---

## ⚡ Getting Started

### Prerequisites
*   **Node.js** (v18+)
*   **Python** (v3.9+)

### 1. Backend Setup
Navigate to the backend directory and start the server:

```bash
cd backend
# Create virtual environment (optional but recommended)
python -m venv venv
# Activate virtual environment
# Windows:
.\venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run the server
python -m uvicorn app.main:app --reload
```
*Server runs at: `http://localhost:8000`*

### 2. Frontend Setup
Navigate to the frontend directory and start the client:

```bash
cd frontend
# Install dependencies
npm install

# Start development server
npm run dev
```
*Client runs at: `http://localhost:5173`*

---

## 🔐 Login Credentials

### Staff Portal
**Access URL**: `http://localhost:5173/staff/login`

| Role | Employee ID | Password | Access Level |
| :--- | :--- | :--- | :--- |
| **Doctor** | `doctor` | `doctor` | Full Clinical Suite, Scribe, Imaging |
| **Nurse** | `nurse` | `nurse` | Patient Care, Vitals, Triage |
| **Pharmacist** | `pharma` | `pharma` | Inventory, Prescriptions |
| **Admin** | `admin` | `admin` | Heatmaps, Users, Resources |

### Patient Portal
**Access URL**: `http://localhost:5173/patient/login`

*   **Method**: Click "Simulate NFC Scan"
*   **Tag ID**: `PATIENT_001` (Pre-configured Test Patient)

---

## 🎨 Design Philosophy
The application follows a **"Medical Premium"** design language characterized by:
*   **Clean layouts** with generous whitespace.
*   **Glassmorphism** for depth and modern feel.
*   **Motion design** to guide user interactions.
*   **Color Theory**: Calming Slate bases with vivid Emerald (Health), Blue (Clinical), and Rose (Alert) accents.

---

## 🤝 Contribution
1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---
*© 2026 MediFlow AI. All Rights Reserved.*
