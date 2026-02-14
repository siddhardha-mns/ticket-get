import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Edit3, Plus, Send, Mail, Clock, User, MessageSquare } from "lucide-react";
import { useApp } from "../context/AppContext";
import WorkNoteModal from "../components/WorkNoteModal";

const statusConfig = {
    Open: { color: "text-blue-600", bg: "bg-blue-50", dot: "bg-blue-500" },
    "In Work": { color: "text-emerald-600", bg: "bg-emerald-50", dot: "bg-emerald-500" },
    Acknowledged: { color: "text-violet-600", bg: "bg-violet-50", dot: "bg-violet-500" },
    Pending: { color: "text-gray-500", bg: "bg-gray-50", dot: "bg-gray-400" },
    Completed: { color: "text-teal-600", bg: "bg-teal-50", dot: "bg-teal-500" },
    Closed: { color: "text-gray-400", bg: "bg-gray-50", dot: "bg-gray-300" },
};

const fmt = (d) => d ? new Date(d).toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }) : "—";

const MetaField = ({ label, value, editable, onEdit }) => (
    <div className="flex items-start py-2 border-b border-gray-50 last:border-0">
        <span className="w-28 text-[12px] text-gray-400 font-medium flex-shrink-0">{label}</span>
        <span className="text-[13px] text-gray-700 flex items-center gap-1.5 font-medium flex-1 min-w-0">
            {value || "—"}
            {editable && <Edit3 size={11} className="text-gray-300 hover:text-amber-500 cursor-pointer transition-colors flex-shrink-0" onClick={onEdit} />}
        </span>
    </div>
);

const TicketDetail = () => {
    const { ticketId } = useParams();
    const navigate = useNavigate();
    const { tickets, updateTicket, addWorkNote } = useApp();
    const ticket = tickets.find((t) => t.id === ticketId);

    const [showWorkNote, setShowWorkNote] = useState(false);
    const [editingStatus, setEditingStatus] = useState(false);
    const [editingAssigned, setEditingAssigned] = useState(false);
    const [escalateTo, setEscalateTo] = useState("");
    const [notifyEmails, setNotifyEmails] = useState("");
    const [toastMsg, setToastMsg] = useState("");

    const showToast = (msg) => { setToastMsg(msg); setTimeout(() => setToastMsg(""), 3000); };

    if (!ticket) {
        return (
            <div className="p-6 max-w-3xl mx-auto mt-16 text-center">
                <p className="text-gray-400 text-sm mb-3">Ticket not found.</p>
                <button onClick={() => navigate("/service-requests")} className="text-amber-600 hover:text-amber-700 text-sm font-medium">
                    ← Back to Requests
                </button>
            </div>
        );
    }

    const stat = statusConfig[ticket.status] || statusConfig.Open;

    const handleStatusChange = (newStatus) => {
        updateTicket(ticket.id, { status: newStatus });
        setEditingStatus(false);
        showToast(`Status updated to "${newStatus}"`);
    };

    const handleAssignedChange = (val) => {
        updateTicket(ticket.id, { assignedTo: val });
        setEditingAssigned(false);
        showToast(`Assigned to "${val || "Unassigned"}"`);
    };

    const handleWorkNoteSave = (note) => {
        addWorkNote(ticket.id, note);
        setShowWorkNote(false);
        showToast("Work note added");
    };

    const handleEscalate = () => {
        if (!escalateTo.trim()) return;
        addWorkNote(ticket.id, { message: `Escalated to: ${escalateTo}`, timeWorked: "00:00", isPrivate: false });
        showToast(`Escalated to ${escalateTo}`);
        setEscalateTo("");
    };

    const handleNotify = () => {
        if (!notifyEmails.trim()) return;
        showToast(`Notification sent to ${notifyEmails}`);
        setNotifyEmails("");
    };

    const totalTimeWorked = ticket.workNotes.reduce((acc, n) => {
        const [h, m] = (n.timeWorked || "00:00").split(":").map(Number);
        return acc + h * 60 + m;
    }, 0);
    const totalH = Math.floor(totalTimeWorked / 60);
    const totalM = totalTimeWorked % 60;

    return (
        <div className="p-6 max-w-5xl mx-auto relative">
            {/* Toast */}
            {toastMsg && (
                <div className="fixed top-4 right-4 z-50 bg-gray-800 text-white text-[13px] px-4 py-2.5 rounded-lg shadow-xl animate-fade-in flex items-center gap-2">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full" /> {toastMsg}
                </div>
            )}

            <Link to="/service-requests" className="inline-flex items-center gap-1.5 text-[13px] text-gray-400 hover:text-amber-600 transition-colors mb-5">
                <ArrowLeft size={15} /> Back to Requests
            </Link>

            {/* Title bar */}
            <div className="flex items-start justify-between mb-6 pb-4 border-b border-gray-100">
                <h1 className="text-lg font-bold text-gray-800 leading-snug max-w-xl">{ticket.title}</h1>
                <span className="text-[12px] font-mono text-gray-400 bg-gray-50 px-3 py-1 rounded-lg border border-gray-100">{ticket.id}</span>
            </div>

            <div className="flex gap-8">
                {/* Left */}
                <div className="flex-1 min-w-0 space-y-5">
                    {/* Description */}
                    <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
                        <h2 className="text-[12px] font-semibold text-gray-400 uppercase tracking-wide mb-3">Description</h2>
                        <p className="text-[13px] text-gray-600 leading-relaxed">{ticket.description}</p>
                    </div>

                    {/* Work Notes */}
                    <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-[12px] font-semibold text-gray-400 uppercase tracking-wide">
                                Work Notes <span className="text-gray-300">({ticket.workNotes.length})</span>
                            </h2>
                            <button onClick={() => setShowWorkNote(true)}
                                className="w-8 h-8 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg flex items-center justify-center hover:shadow-md hover:shadow-amber-200/50 transition-all active:scale-95">
                                <Plus size={16} strokeWidth={2.5} />
                            </button>
                        </div>

                        {ticket.workNotes.length === 0 ? (
                            <div className="border border-dashed border-gray-200 rounded-lg p-8 text-center bg-gray-50/30">
                                <MessageSquare size={24} className="mx-auto text-gray-200 mb-2" />
                                <p className="text-[13px] text-gray-300">No work notes yet</p>
                                <button onClick={() => setShowWorkNote(true)} className="text-[12px] text-amber-500 hover:text-amber-600 font-medium mt-1">
                                    + Add the first note
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {ticket.workNotes.map((note) => (
                                    <div key={note.id} className={`rounded-lg p-3.5 border ${note.isPrivate ? "bg-amber-50/50 border-amber-100" : "bg-gray-50/70 border-gray-100"}`}>
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center gap-2">
                                                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-[9px] font-bold">
                                                    {note.author.split(" ").map(n => n[0]).join("")}
                                                </div>
                                                <span className="text-[12px] font-semibold text-gray-700">{note.author}</span>
                                                {note.isPrivate && <span className="text-[10px] bg-amber-200 text-amber-800 px-1.5 py-0.5 rounded font-medium">Private</span>}
                                            </div>
                                            <div className="flex items-center gap-3 text-[11px] text-gray-400">
                                                {note.timeWorked && note.timeWorked !== "00:00" && (
                                                    <span className="flex items-center gap-1"><Clock size={11} /> {note.timeWorked}</span>
                                                )}
                                                <span>{fmt(note.createdAt)}</span>
                                            </div>
                                        </div>
                                        <p className="text-[13px] text-gray-600 leading-relaxed">{note.message}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Escalate / Notify */}
                    <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm space-y-4">
                        <h2 className="text-[12px] font-semibold text-gray-400 uppercase tracking-wide">Notifications & Escalation</h2>
                        <div>
                            <label className="text-[12px] text-gray-400 font-medium block mb-1.5">Escalate to</label>
                            <div className="flex gap-2">
                                <input type="text" value={escalateTo} onChange={(e) => setEscalateTo(e.target.value)}
                                    placeholder="Enter user name..."
                                    className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-[13px] bg-gray-50" />
                                <button onClick={handleEscalate} disabled={!escalateTo.trim()}
                                    className="flex items-center gap-1.5 bg-red-500 text-white px-4 py-2 rounded-lg text-[12px] font-medium hover:bg-red-600 disabled:opacity-40 disabled:cursor-not-allowed transition active:scale-95">
                                    <Send size={13} /> Escalate
                                </button>
                            </div>
                        </div>
                        <div>
                            <label className="text-[12px] text-gray-400 font-medium block mb-1.5">Also notify</label>
                            <div className="flex gap-2">
                                <input type="text" value={notifyEmails} onChange={(e) => setNotifyEmails(e.target.value)}
                                    placeholder="Email addresses (comma separated)..."
                                    className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-[13px] bg-gray-50" />
                                <button onClick={handleNotify} disabled={!notifyEmails.trim()}
                                    className="flex items-center gap-1.5 bg-emerald-500 text-white px-4 py-2 rounded-lg text-[12px] font-medium hover:bg-emerald-600 disabled:opacity-40 disabled:cursor-not-allowed transition active:scale-95">
                                    <Mail size={13} /> Send
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Metadata */}
                <div className="w-72 flex-shrink-0">
                    <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm sticky top-4">
                        <h2 className="text-[12px] font-semibold text-gray-400 uppercase tracking-wide mb-3">Details</h2>
                        <MetaField label="Customer" value={ticket.customer} />
                        <MetaField label="Requester" value={ticket.requester} />
                        <MetaField label="Email" value={ticket.email} />
                        <MetaField label="Project" value={ticket.project || "—"} />
                        <MetaField label="Type" value={ticket.type} />

                        {/* Status — editable inline */}
                        <div className="flex items-start py-2 border-b border-gray-50">
                            <span className="w-28 text-[12px] text-gray-400 font-medium flex-shrink-0">Status</span>
                            {editingStatus ? (
                                <select autoFocus value={ticket.status} onChange={(e) => handleStatusChange(e.target.value)} onBlur={() => setEditingStatus(false)}
                                    className="border border-amber-300 rounded px-2 py-0.5 text-[12px] bg-amber-50">
                                    {["Open", "Acknowledged", "In Work", "Pending", "Completed", "Closed"].map((s) => <option key={s}>{s}</option>)}
                                </select>
                            ) : (
                                <span className="flex items-center gap-1.5 cursor-pointer" onClick={() => setEditingStatus(true)}>
                                    <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2 py-0.5 rounded-full ${stat.bg} ${stat.color}`}>
                                        <span className={`w-1.5 h-1.5 rounded-full ${stat.dot}`} />{ticket.status}
                                    </span>
                                    <Edit3 size={11} className="text-gray-300 hover:text-amber-500" />
                                </span>
                            )}
                        </div>

                        <MetaField label="Severity" value={ticket.severity} />
                        <MetaField label="Priority" value={ticket.priority} />

                        {/* Assigned — editable inline */}
                        <div className="flex items-start py-2 border-b border-gray-50">
                            <span className="w-28 text-[12px] text-gray-400 font-medium flex-shrink-0">Assigned To</span>
                            {editingAssigned ? (
                                <input autoFocus defaultValue={ticket.assignedTo} onBlur={(e) => handleAssignedChange(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && handleAssignedChange(e.target.value)}
                                    className="border border-amber-300 rounded px-2 py-0.5 text-[12px] bg-amber-50 w-full" />
                            ) : (
                                <span className="text-[13px] text-gray-700 flex items-center gap-1.5 font-medium cursor-pointer" onClick={() => setEditingAssigned(true)}>
                                    {ticket.assignedTo || "Unassigned"} <Edit3 size={11} className="text-gray-300 hover:text-amber-500" />
                                </span>
                            )}
                        </div>

                        <MetaField label="Visibility" value={ticket.visibility} />
                        <MetaField label="Billable" value={ticket.billable ? "Yes ✓" : "No"} />
                        <MetaField label="Created" value={fmt(ticket.createdOn)} />
                        <MetaField label="Updated" value={fmt(ticket.lastUpdatedOn)} />
                        <MetaField label="Time Worked" value={`${String(totalH).padStart(2, "0")}:${String(totalM).padStart(2, "0")}`} />
                    </div>
                </div>
            </div>

            <WorkNoteModal isOpen={showWorkNote} onClose={() => setShowWorkNote(false)} onSave={handleWorkNoteSave} />
        </div>
    );
};

export default TicketDetail;
