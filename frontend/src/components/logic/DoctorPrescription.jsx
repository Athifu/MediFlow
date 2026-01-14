import { useState } from "react";
import { api } from "../../lib/api";
import { CopyPlus, FileOutput } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

export default function DoctorPrescription() {
    const [note, setNote] = useState("");
    const [billPreview, setBillPreview] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleGenerate = async () => {
        if (!note) return;
        setLoading(true);
        try {
            const result = await api.post("/api/generate-bill", { note });
            setBillPreview(result);
        } catch (e) {
            console.error(e);
            alert("Error generating bill.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="h-full border-blue-100 shadow-sm">
            <CardHeader className="pb-3 border-b bg-blue-50/50">
                <CardTitle className="text-blue-800 flex items-center gap-2 text-lg">
                    <CopyPlus className="w-5 h-5" />
                    Prescription & Notes
                </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
                <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Clinical Notes</p>
                <textarea
                    className="w-full h-32 p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm resize-none"
                    placeholder="e.g. Patient requires MRI scan and Paracetamol prescription..."
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                />

                <Button
                    onClick={handleGenerate}
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                >
                    {loading ? "Processing with AI..." : "Sign & Generate Bill"}
                </Button>

                {billPreview && (
                    <div className="mt-4 p-4 bg-emerald-50 border border-emerald-100 rounded-lg animate-in fade-in slide-in-from-top-2">
                        <h4 className="flex items-center gap-2 font-bold text-emerald-800 text-sm mb-3">
                            <FileOutput className="w-4 h-4" /> Bill Generated Successfully
                        </h4>
                        <ul className="space-y-1 text-sm mb-3 border-b border-emerald-100 pb-2">
                            {billPreview.items.map((item, idx) => (
                                <li key={idx} className="flex justify-between text-emerald-900">
                                    <span>{item.name}</span>
                                    <span className="font-mono">${item.price}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="flex justify-between font-bold text-lg text-emerald-900">
                            <span>Total</span>
                            <span>${billPreview.total}</span>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
