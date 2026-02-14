import { useState } from "react";
import {
    Bold, Italic, Link, List, ListOrdered, Code, Quote, Table, Undo, Redo, X, Paperclip,
} from "lucide-react";

const WorkNoteModal = ({ isOpen, onClose, onSave }) => {
    const [message, setMessage] = useState("");
    const [timeWorked, setTimeWorked] = useState({ hours: "0", minutes: "0" });
    const [isPrivate, setIsPrivate] = useState(false);
    const [error, setError] = useState("");

    if (!isOpen) return null;

    const toolbarButtons = [
        { icon: Bold, title: "Bold" }, { icon: Italic, title: "Italic" }, { icon: Link, title: "Link" },
        { icon: List, title: "Bullet List" }, { icon: ListOrdered, title: "Numbered List" },
        { icon: Code, title: "Code" }, { icon: Quote, title: "Block Quote" }, { icon: Table, title: "Table" },
        { icon: Undo, title: "Undo" }, { icon: Redo, title: "Redo" },
    ];

    const handleSave = () => {
        if (!message.trim()) { setError("Message is required"); return; }
        const h = String(parseInt(timeWorked.hours) || 0).padStart(2, "0");
        const m = String(parseInt(timeWorked.minutes) || 0).padStart(2, "0");
        onSave({ message: message.trim(), timeWorked: `${h}:${m}`, isPrivate });
        setMessage(""); setTimeWorked({ hours: "0", minutes: "0" }); setIsPrivate(false); setError("");
    };

    return (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-[2px] z-50 flex items-center justify-center animate-fade-in">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 overflow-hidden border border-gray-100">
                <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white px-5 py-3 flex items-center justify-between">
                    <h3 className="font-semibold text-[14px]">Add Work Note</h3>
                    <button onClick={onClose} className="hover:bg-white/10 rounded-lg p-1 transition"><X size={16} /></button>
                </div>

                <div className="p-5 space-y-4">
                    <div>
                        <label className="text-[12px] font-semibold text-gray-500 uppercase tracking-wide">
                            Message<span className="text-red-400 ml-0.5">*</span>
                        </label>
                        {error && <span className="text-red-500 text-[11px] ml-2">{error}</span>}
                    </div>

                    <div className="flex items-center gap-0.5 border border-gray-200 rounded-t-lg px-2.5 py-1.5 bg-gray-50/80">
                        <select className="text-[11px] border border-gray-200 rounded-md px-2 py-1 mr-2 bg-white text-gray-600">
                            <option>Paragraph</option><option>Heading 1</option><option>Heading 2</option>
                        </select>
                        {toolbarButtons.map(({ icon: Icon, title }) => (
                            <button key={title} type="button" title={title} className="p-1.5 hover:bg-gray-200 rounded-md text-gray-500 hover:text-gray-700 transition">
                                <Icon size={14} />
                            </button>
                        ))}
                    </div>

                    <textarea value={message} onChange={(e) => { setMessage(e.target.value); error && setError(""); }}
                        placeholder="Describe what was done, observations, next steps..."
                        className={`w-full border ${error ? "border-red-300" : "border-gray-200"} border-t-0 rounded-b-lg px-4 py-3 min-h-[140px] text-[13px] text-gray-700 placeholder-gray-300 resize-y bg-white`} />

                    <div className="flex items-center gap-3">
                        <label className="text-[12px] text-gray-400 font-medium">Attachments</label>
                        <div className="flex-1 border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 text-[12px] text-gray-300 min-h-[36px]">No files attached</div>
                        <button type="button" className="flex items-center gap-1.5 bg-emerald-500 text-white px-3.5 py-2 rounded-lg text-[12px] font-medium hover:bg-emerald-600 transition active:scale-95">
                            <Paperclip size={13} /> Attach
                        </button>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <label className="text-[12px] text-gray-400 font-medium">Time Worked</label>
                            <input type="number" min="0" value={timeWorked.hours} onChange={(e) => setTimeWorked({ ...timeWorked, hours: e.target.value })}
                                className="w-12 border border-gray-200 rounded-lg px-2 py-1.5 text-[13px] text-center bg-gray-50" />
                            <span className="text-gray-300 text-[13px]">:</span>
                            <input type="number" min="0" max="59" value={timeWorked.minutes} onChange={(e) => setTimeWorked({ ...timeWorked, minutes: e.target.value })}
                                className="w-12 border border-gray-200 rounded-lg px-2 py-1.5 text-[13px] text-center bg-gray-50" />
                            <span className="text-[10px] text-gray-300 ml-0.5">HH:MM</span>
                        </div>
                        <label className="flex items-center gap-2 text-[12px] text-gray-500 cursor-pointer">
                            <input type="checkbox" checked={isPrivate} onChange={(e) => setIsPrivate(e.target.checked)}
                                className="rounded text-amber-500 w-3.5 h-3.5" /> Private Note
                        </label>
                    </div>
                </div>

                <div className="px-5 py-3.5 border-t border-gray-100 bg-gray-50/50 flex justify-end gap-2.5">
                    <button onClick={onClose} className="px-4 py-2 border border-gray-200 rounded-lg text-[13px] text-gray-500 hover:bg-gray-100 transition">Cancel</button>
                    <button onClick={handleSave} className="px-5 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg text-[13px] font-medium hover:shadow-md hover:shadow-amber-200/50 transition-all active:scale-95">Save Note</button>
                </div>
            </div>
        </div>
    );
};

export default WorkNoteModal;
