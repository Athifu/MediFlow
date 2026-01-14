from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import auth, patients, tasks, alerts, billing

app = FastAPI(title="MediFlow AI API")

# CORS
origins = [
    "http://localhost:5173",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/auth", tags=["Auth"])
app.include_router(patients.router, prefix="/patients", tags=["Patients"])
app.include_router(tasks.router, prefix="/tasks", tags=["Tasks"])
app.include_router(alerts.router, prefix="/alerts", tags=["Alerts"])
app.include_router(billing.router, prefix="/api", tags=["Billing"])

@app.get("/")
def read_root():
    return {"message": "Welcome to MediFlow AI API"}
