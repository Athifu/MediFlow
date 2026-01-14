import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Wifi } from "lucide-react";
import { api } from "../../lib/api";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

export default function NfcLogin() {
    const navigate = useNavigate();
    const [serial, setSerial] = useState("");
    const [error, setError] = useState("");

    const handleNfcSim = async () => {
        loginPatient(serial);
    };

    const loginPatient = async (tagId) => {
        if (tagId.trim()) {
            setError("");
            try {
                const data = await api.post("/auth/nfc-login", { nfc_tag_id: tagId });
                localStorage.setItem("patient_token", data.access_token);
                navigate("/patient/dashboard");
            } catch (err) {
                setError("Invalid NFC Tag ID");
            }
        }
    };

    const startNfcScan = async () => {
        if ("NDEFReader" in window) {
            try {
                const ndef = new window.NDEFReader();
                await ndef.scan();
                setError("Scanning... Tap your wristband.");

                ndef.onreading = event => {
                    const serialNumber = event.serialNumber;
                    // For demo, we might need to map real serials to our mock IDs.
                    // Or just use the serial directly.
                    console.log("NFC Read:", serialNumber);
                    loginPatient(serialNumber || "PATIENT_001"); // Fallback to mock ID if serial is complex
                };
            } catch (error) {
                setError("Error: " + error.message);
            }
        } else {
            setError("WebNFC not supported on this device. Use simulation below.");
        }
    };

    return (
        <div className="flex h-screen items-center justify-center bg-slate-100 p-4">
            <div className="w-full max-w-lg bg-white p-10 rounded-3xl shadow-xl border border-slate-200 text-center">
                <div className="flex justify-center mb-6">
                    <button onClick={startNfcScan} className="p-6 bg-blue-50 rounded-full animate-pulse focus:outline-none hover:bg-blue-100 transition">
                        <Wifi className="w-12 h-12 text-blue-600 rotate-90" />
                    </button>
                </div>
                <h2 className="text-3xl font-bold text-slate-800 mb-2">Tap to Login</h2>
                <p className="text-slate-500 mb-8">Tap Wifi Icon to scan (Android) or simulate below.</p>

                <div className="space-y-4">
                    {error && <div className="text-red-500 font-bold mb-2">{error}</div>}
                    <div className="flex gap-2">
                        <Input
                            type="text"
                            placeholder="Start typing serial..."
                            value={serial}
                            onChange={(e) => setSerial(e.target.value)}
                            className="text-center text-lg"
                        />
                        <Button onClick={handleNfcSim} variant="outline">
                            Simulate
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
