import { useState } from "react";
import { Mic, MicOff, HeartPulse } from "lucide-react";
import { api } from "../../lib/api";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Button } from "../ui/button";

export default function EmpathyVoice() {
    const [listening, setListening] = useState(false);
    const [transcript, setTranscript] = useState("");
    const [feedback, setFeedback] = useState("");

    const startListening = () => {
        if (!('webkitSpeechRecognition' in window)) {
            alert("Voice recognition not supported in this browser. Try Chrome.");
            return;
        }

        const recognition = new window.webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.lang = 'en-US';

        recognition.onstart = () => {
            setListening(true);
            setFeedback("Listening... (Say 'Help', 'Pain', or 'Scared')");
        };

        recognition.onresult = (event) => {
            const text = event.results[0][0].transcript;
            setTranscript(text);
            handleVoiceCommand(text);
        };

        recognition.onend = () => {
            setListening(false);
        };

        recognition.start();
    };

    const handleVoiceCommand = async (text) => {
        try {
            await api.post("/alerts", {
                patient_id: "1", // Mock ID for demo
                transcript: text
            });

            // Check specific keywords for immediate feedback simulation
            const lower = text.toLowerCase();
            if (lower.includes("pain") || lower.includes("scared") || lower.includes("help") || lower.includes("worry")) {
                setFeedback("Compassion Alert Sent: Nurse notified immediately.");
            } else {
                setFeedback("Understood. Logging your note.");
            }
        } catch (e) {
            setFeedback("Error sending alert.");
            console.error(e);
        }
    };

    return (
        <Card className="h-full border-teal-100">
            <CardHeader className="pb-2">
                <CardTitle className="text-teal-800 flex items-center gap-2">
                    <HeartPulse className="w-6 h-6 text-red-400" />
                    Ask MediFlow
                </CardTitle>
            </CardHeader>
            <CardContent className="text-center pt-6">
                <div className="mb-6 h-24 flex items-center justify-center p-4 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                    <p className="text-slate-600 italic">
                        "{transcript || "Tap microphone and speak..."}"
                    </p>
                </div>

                <Button
                    onClick={startListening}
                    disabled={listening}
                    className={`w-20 h-20 rounded-full transition-all ${listening ? 'bg-red-500 animate-pulse' : 'bg-teal-600 hover:bg-teal-700'}`}
                >
                    {listening ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
                </Button>

                <p className={`mt-4 text-sm font-bold transition-all ${feedback.includes("Compassion") ? "text-red-500" : "text-teal-600"
                    }`}>
                    {feedback}
                </p>
            </CardContent>
        </Card>
    );
}
