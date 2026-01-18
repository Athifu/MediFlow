import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Scan, ZoomIn, ZoomOut, Contrast, Sun, Move, Maximize2, FileDigit, ArrowLeft } from 'lucide-react';

const MOCK_SCANS = [
    { id: 1, type: "Chest X-Ray", date: "2024-03-15", url: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?q=80&w=1000&auto=format&fit=crop" },
    { id: 2, type: "Brain MRI", date: "2024-03-14", url: "https://images.unsplash.com/photo-1559757175-5700dde675bc?q=80&w=1000&auto=format&fit=crop" },
];

export default function ImagingViewer() {
    const [selectedScan, setSelectedScan] = useState(MOCK_SCANS[0]);
    const [zoom, setZoom] = useState(1);
    const [contrast, setContrast] = useState(100);
    const [brightness, setBrightness] = useState(100);
    const [isInverted, setIsInverted] = useState(false);

    const resetTools = () => {
        setZoom(1);
        setContrast(100);
        setBrightness(100);
        setIsInverted(false);
    };

    return (
        <div className="min-h-screen bg-black text-slate-300 flex flex-col h-screen overflow-hidden">

            {/* Top Bar */}
            <div className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6 shrink-0">
                <div className="flex items-center gap-4">
                    <Link to="/staff/dashboard" className="p-2 hover:bg-slate-800 rounded-lg transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="text-white font-bold flex items-center gap-2">
                            <Scan className="text-blue-500" /> MediFlow PACS Viewer
                        </h1>
                        <p className="text-xs text-slate-500">Patient: John Doe (ID: P-90210)</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <div className="bg-slate-800 px-3 py-1 rounded text-xs font-mono text-blue-400 border border-blue-500/30">
                        DICOM // LOSSLESS
                    </div>
                    <div className="w-px h-8 bg-slate-800 mx-2"></div>
                    <button className="p-2 hover:bg-slate-800 rounded text-slate-400 hover:text-white">
                        <Maximize2 className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <div className="flex flex-1 overflow-hidden">

                {/* Left Toolbar */}
                <div className="w-16 bg-slate-900 border-r border-slate-800 flex flex-col items-center py-4 gap-4 z-10">
                    <ToolButton icon={<ZoomIn />} label="Zoom In" onClick={() => setZoom(prev => Math.min(prev + 0.2, 3))} />
                    <ToolButton icon={<ZoomOut />} label="Zoom Out" onClick={() => setZoom(prev => Math.max(prev - 0.2, 0.5))} />
                    <ToolButton icon={<Contrast />} label="Contrast" active={contrast !== 100} onClick={() => setContrast(prev => prev === 100 ? 150 : 100)} />
                    <ToolButton icon={<Sun />} label="Brightness" active={brightness !== 100} onClick={() => setBrightness(prev => prev === 100 ? 130 : 100)} />
                    <ToolButton icon={<FileDigit />} label="Invert" active={isInverted} onClick={() => setIsInverted(!isInverted)} />
                    <div className="flex-1"></div>
                    <ToolButton icon={<Move />} label="Reset" onClick={resetTools} />
                </div>

                {/* Main Viewport */}
                <div className="flex-1 bg-black relative flex items-center justify-center overflow-hidden cursor-move">

                    {/* Image Container */}
                    <div
                        className="transition-all duration-200 ease-out will-change-transform"
                        style={{
                            transform: `scale(${zoom})`,
                            filter: `contrast(${contrast}%) brightness(${brightness}%) invert(${isInverted ? 1 : 0})`
                        }}
                    >
                        <img
                            src={selectedScan.url}
                            alt="Medical Scan"
                            className="max-h-[85vh] object-contain shadow-2xl"
                        />
                    </div>

                    {/* Overlays */}
                    <div className="absolute top-4 left-4 text-xs font-mono text-yellow-500/80 pointer-events-none">
                        <p>Acc: 4949430</p>
                        <p>Ser: 2</p>
                        <p>Img: 14</p>
                        <p>Mag: {(zoom * 100).toFixed(0)}%</p>
                    </div>
                    <div className="absolute top-4 right-4 text-xs font-mono text-yellow-500/80 pointer-events-none text-right">
                        <p>{selectedScan.type}</p>
                        <p className="uppercase">{selectedScan.date}</p>
                        <p>L</p>
                    </div>
                    <div className="absolute bottom-4 left-4 border-l border-b border-yellow-500/50 w-8 h-8 pointer-events-none"></div>
                    <div className="absolute bottom-4 right-4 border-r border-b border-yellow-500/50 w-8 h-8 pointer-events-none"></div>

                </div>

                {/* Right Series List */}
                <div className="w-64 bg-slate-900 border-l border-slate-800 flex flex-col">
                    <div className="p-4 border-b border-slate-800">
                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Series</h3>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {MOCK_SCANS.map(scan => (
                            <div
                                key={scan.id}
                                onClick={() => { setSelectedScan(scan); resetTools(); }}
                                className={`group relative aspect-square bg-black rounded-lg overflow-hidden border-2 cursor-pointer transition-all ${selectedScan.id === scan.id ? 'border-blue-500 ring-2 ring-blue-500/30' : 'border-slate-800 hover:border-slate-600'}`}
                            >
                                <img src={scan.url} alt={scan.type} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 to-transparent p-2">
                                    <p className="text-xs font-bold text-white truncate">{scan.type}</p>
                                    <p className="text-[10px] text-slate-400">{scan.date}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}

function ToolButton({ icon, label, onClick, active }) {
    return (
        <button
            onClick={onClick}
            className={`p-3 rounded-xl transition-all duration-200 group relative flex flex-col items-center gap-1 ${active ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
            title={label}
        >
            {React.cloneElement(icon, { size: 20 })}
        </button>
    )
}
