import { useState } from "react";
import { SERVICE_REQUESTS } from "../assets/mockData";
import { COLORS } from "../assets/theme";
import { StatusBadge } from "../components/Badges";

export default function ServiceRequestsPage() {
    const [tab, setTab] = useState("all");
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState({ title: "", type: "Infrastructure", priority: "Medium", description: "", assignTo: "" });

    const filtered = tab === "mine" ? SERVICE_REQUESTS.filter(s => s.mine) : SERVICE_REQUESTS;

    return (
        <div>
            <div className="flex items-center justify-between mb-16">
                <div className="page-header" style={{ marginBottom: 0 }}>
                    <div className="page-title">Service Requests</div>
                    <div className="page-subtitle">Company-wide service request management</div>
                </div>
                <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                    <svg style={{ width: 14, height: 14 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14" /></svg>
                    Raise Request
                </button>
            </div>

            <div className="tabs">
                <div className={`tab ${tab === "all" ? "active" : ""}`} onClick={() => setTab("all")}>All Requests</div>
                <div className={`tab ${tab === "mine" ? "active" : ""}`} onClick={() => setTab("mine")}>My Requests</div>
            </div>

            <div className="card table-wrap">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th><th>Title</th><th>Type</th><th>Status</th><th>Requester</th><th>Assignee</th><th>Created</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map(r => (
                            <tr key={r.id} style={{ cursor: "pointer" }}>
                                <td><span className="text-mono" style={{ color: COLORS.accent, fontSize: 12 }}>{r.id}</span></td>
                                <td><span className="font-bold text-sm">{r.title}</span></td>
                                <td><span className="badge badge-gray">{r.type}</span></td>
                                <td><StatusBadge status={r.status} /></td>
                                <td><span className="text-sm" style={{ color: r.requester === "You" ? COLORS.accent : COLORS.textDim }}>{r.requester}</span></td>
                                <td><span className="text-sm" style={{ color: r.assignee === "You" ? COLORS.accent : COLORS.textDim }}>{r.assignee}</span></td>
                                <td><span className="text-muted">{r.created}</span></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <div className="modal-title">New Service Request</div>
                            <button className="close-btn" onClick={() => setShowModal(false)}>×</button>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Request Title</label>
                            <input className="form-input" placeholder="What do you need?" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
                        </div>
                        <div className="card-grid card-grid-2">
                            <div className="form-group">
                                <label className="form-label">Type</label>
                                <select className="form-select" value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
                                    {["Infrastructure", "Software", "Network", "Onboarding", "Policy", "Hardware", "Other"].map(t => <option key={t}>{t}</option>)}
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Assign To Team</label>
                                <select className="form-select" value={form.assignTo} onChange={e => setForm({ ...form, assignTo: e.target.value })}>
                                    <option value="">Select team...</option>
                                    {["IT Support", "DevOps", "Procurement", "Security", "Facilities"].map(t => <option key={t}>{t}</option>)}
                                </select>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Description</label>
                            <textarea className="form-textarea" placeholder="Describe your request in detail..." value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
                        </div>
                        <div className="flex gap-8" style={{ justifyContent: "flex-end" }}>
                            <button className="btn btn-outline" onClick={() => setShowModal(false)}>Cancel</button>
                            <button className="btn btn-primary" onClick={() => setShowModal(false)}>Submit Request</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
