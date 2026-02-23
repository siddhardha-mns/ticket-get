import { useState } from "react";
import { TICKETS } from "../assets/mockData";
import { COLORS } from "../assets/theme";
import { PriorityBadge, StatusBadge } from "../components/Badges";

export default function TicketsPage() {
    const [tab, setTab] = useState("mine");
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState({ title: "", category: "Network", priority: "Medium", description: "" });

    return (
        <div>
            <div className="flex items-center justify-between mb-16">
                <div className="page-header" style={{ marginBottom: 0 }}>
                    <div className="page-title">Tickets</div>
                    <div className="page-subtitle">Track & manage support tickets</div>
                </div>
                <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                    <svg style={{ width: 14, height: 14 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14" /></svg>
                    Raise Ticket
                </button>
            </div>

            <div className="tabs">
                <div className={`tab ${tab === "mine" ? "active" : ""}`} onClick={() => setTab("mine")}>My Tickets</div>
                <div className={`tab ${tab === "all" ? "active" : ""}`} onClick={() => setTab("all")}>All Progress</div>
            </div>

            <div className="card-grid" style={{ gridTemplateColumns: "1fr" }}>
                {TICKETS.map(t => (
                    <div key={t.id} className="ticket-card">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-12">
                                <span className="text-mono text-muted" style={{ fontSize: 11 }}>{t.id}</span>
                                <span className="font-bold text-sm">{t.title}</span>
                                <span className="badge badge-gray" style={{ fontSize: 9 }}>{t.category}</span>
                            </div>
                            <div className="flex items-center gap-8">
                                <PriorityBadge priority={t.priority} />
                                <StatusBadge status={t.status} />
                            </div>
                        </div>
                        <div className="flex items-center gap-16 mt-8">
                            <span className="text-muted">Assignee: <span style={{ color: COLORS.textDim }}>{t.assignee}</span></span>
                            <span className="text-muted">Created: <span style={{ color: COLORS.textDim }}>{t.created}</span></span>
                            {t.status === "In Progress" && (
                                <div style={{ flex: 1, maxWidth: 160 }}>
                                    <div className="flex items-center justify-between">
                                        <span className="text-muted" style={{ fontSize: 10 }}>Progress</span>
                                        <span className="text-muted" style={{ fontSize: 10 }}>60%</span>
                                    </div>
                                    <div className="progress-bar"><div className="progress-fill" style={{ width: "60%", background: COLORS.accent }} /></div>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <div className="modal-title">Raise New Ticket</div>
                            <button className="close-btn" onClick={() => setShowModal(false)}>×</button>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Issue Title</label>
                            <input className="form-input" placeholder="Brief description of the issue" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
                        </div>
                        <div className="card-grid card-grid-2">
                            <div className="form-group">
                                <label className="form-label">Category</label>
                                <select className="form-select" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                                    {["Network", "Software", "Hardware", "Email", "Database", "Security", "Other"].map(c => <option key={c}>{c}</option>)}
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Priority</label>
                                <select className="form-select" value={form.priority} onChange={e => setForm({ ...form, priority: e.target.value })}>
                                    {["Low", "Medium", "High", "Critical"].map(p => <option key={p}>{p}</option>)}
                                </select>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Description</label>
                            <textarea className="form-textarea" placeholder="Provide detailed information about the issue..." value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
                        </div>
                        <div className="flex gap-8" style={{ justifyContent: "flex-end" }}>
                            <button className="btn btn-outline" onClick={() => setShowModal(false)}>Cancel</button>
                            <button className="btn btn-primary" onClick={() => setShowModal(false)}>Submit Ticket</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
