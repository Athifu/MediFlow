import { useState } from "react";
import { Check, Trophy, Droplets, Footprints, Wind } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Button } from "../ui/button";

export default function DailyQuests() {
    const [quests, setQuests] = useState({
        water: false,
        walk: false,
        breathe: false
    });

    const toggleQuest = (key) => {
        setQuests(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const completedCount = Object.values(quests).filter(Boolean).length;
    const progress = (completedCount / 3) * 100;
    const isUnlocked = completedCount === 3;

    return (
        <Card className="h-full border-teal-100">
            <CardHeader className="pb-2">
                <CardTitle className="text-teal-800 flex items-center gap-2">
                    <Trophy className="w-6 h-6 text-yellow-500" />
                    Recover & Earn
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="mb-6">
                    <div className="flex justify-between text-sm text-slate-500 mb-1">
                        <span>Daily Progress</span>
                        <span>{Math.round(progress)}%</span>
                    </div>
                    <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-teal-500 transition-all duration-500"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                <div className="space-y-3">
                    <QuestItem
                        icon={<Droplets className="w-5 h-5 text-blue-500" />}
                        label="Drink Water"
                        done={quests.water}
                        onClick={() => toggleQuest('water')}
                    />
                    <QuestItem
                        icon={<Footprints className="w-5 h-5 text-orange-500" />}
                        label="Walk 50 Steps"
                        done={quests.walk}
                        onClick={() => toggleQuest('walk')}
                    />
                    <QuestItem
                        icon={<Wind className="w-5 h-5 text-purple-500" />}
                        label="Deep Breathing"
                        done={quests.breathe}
                        onClick={() => toggleQuest('breathe')}
                    />
                </div>

                {isUnlocked && (
                    <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl text-center animate-bounce">
                        <div className="inline-block p-2 bg-yellow-100 rounded-full mb-2">
                            <Trophy className="w-8 h-8 text-yellow-600" />
                        </div>
                        <h4 className="font-bold text-yellow-800">Ready for Home Badge!</h4>
                        <p className="text-xs text-yellow-700">You are a Recovery Champion.</p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

function QuestItem({ icon, label, done, onClick }) {
    return (
        <button
            onClick={onClick}
            className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${done ? 'bg-teal-50 border-teal-200 shadow-sm' : 'bg-white border-slate-100 hover:bg-slate-50'
                }`}
        >
            <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${done ? 'bg-white' : 'bg-slate-100'}`}>
                    {icon}
                </div>
                <span className={`font-medium ${done ? 'text-teal-900' : 'text-slate-600'}`}>{label}</span>
            </div>
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${done ? 'bg-teal-500 border-teal-500' : 'border-slate-300'
                }`}>
                {done && <Check className="w-4 h-4 text-white" />}
            </div>
        </button>
    );
}
