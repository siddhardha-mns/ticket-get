import { useState } from "react";
import { TICKETS } from "../assets/mockData";
import { COLORS } from "../assets/theme";
import { PriorityBadge, StatusBadge } from "../components/Badges";

export default function TicketsPage() {
    const [tab, setTab] = useState("mine");
    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState("create"); // "create", "view", "edit"
    const [form, setForm] = useState({ id: "", title: "", category: "Network", priority: "Medium", description: "", attachments: [] });

    const handleCreateClick = () => {
        setForm({ id: "", title: "", category: "Network", priority: "Medium", description: "", attachments: [] });
        setModalMode("create");
        setShowModal(true);
    };

    const handleViewClick = (ticket) => {
        setForm({ ...ticket, attachments: ticket.attachments || [] });
        setModalMode("view");
        setShowModal(true);
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        const newAttachments = files.map(file => URL.createObjectURL(file));
        setForm(prev => ({
            ...prev,
            attachments: [...prev.attachments, ...newAttachments]
        }));
    };

    const removeAttachment = (index) => {
        setForm(prev => ({
            ...prev,
            attachments: prev.attachments.filter((_, i) => i !== index)
        }));
    };

    const renderDetailItem = (label, value, full = false) => (
        <div className={`detail-item ${full ? "detail-full" : ""}`}>
            <div className="detail-label">{label}</div>
            <div className="detail-value">{value || "---"}</div>
        </div>
    );

    const renderDetailView = (data) => (
        <div className="detail-grid">
            {renderDetailItem("Ticket ID", data.id)}
            {renderDetailItem("Category", data.category)}
            {renderDetailItem("Priority", <PriorityBadge priority={data.priority} />)}
            {renderDetailItem("Status", <StatusBadge status={data.status} />)}
            {renderDetailItem("Assignee", data.assignee)}
            {renderDetailItem("Created", data.created)}
            {data.description && (
                <div className="detail-item detail-full" style={{ marginTop: 12 }}>
                    <div className="detail-label">Description</div>
                    <div className="detail-value" style={{ background: "var(--bg)", padding: 12, borderRadius: 8, marginTop: 4 }}>{data.description}</div>
                </div>
            )}
            {data.attachments && data.attachments.length > 0 && (
                <div className="detail-item detail-full">
                    <div className="detail-label">Attachments</div>
                    <div className="preview-grid">
                        {data.attachments.map((src, idx) => (
                            <div key={idx} className="preview-item">
                                <img src={src} alt="attachment" className="preview-image" />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );

    return (
        <div>
            <div className="flex items-center justify-between mb-16">
                <div className="page-header" style={{ marginBottom: 0 }}>
                    <div className="page-title">Tickets</div>
                    <div className="page-subtitle">Track & manage support tickets</div>
                </div>
                <button className="btn btn-primary" onClick={handleCreateClick}>
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
                    <div key={t.id} className="ticket-card" style={{ cursor: "pointer" }} onClick={() => handleViewClick(t)}>
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
                            <div className="modal-title">
                                {modalMode === "create" ? "Raise New Ticket" : modalMode === "view" ? `Ticket Details: ${form.id}` : `Update Ticket: ${form.id}`}
                            </div>
                            <button className="close-btn" onClick={() => setShowModal(false)}>×</button>
                        </div>

                        <div style={{ padding: "8px 0" }}>
                            {modalMode === "view" ? (
                                renderDetailView(form)
                            ) : (
                                <>
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
                                    <div className="attachments-section">
                                        <div className="attachments-header">
                                            <div className="detail-label">Attachments</div>
                                            <button className="btn-add-attachment" onClick={() => document.getElementById("ticket-upload").click()}>
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" /></svg>
                                                Add
                                            </button>
                                        </div>
                                        <input type="file" id="ticket-upload" hidden multiple accept="image/*" onChange={handleFileChange} />

                                        {form.attachments && form.attachments.length > 0 && (
                                            <div className="preview-grid">
                                                {form.attachments.map((src, idx) => (
                                                    <div key={idx} className="preview-item">
                                                        <img src={src} alt="preview" className="preview-image" />
                                                        <button className="remove-attachment" onClick={() => removeAttachment(idx)}>×</button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>

                        <div className="flex gap-8" style={{ justifyContent: "flex-end", marginTop: 24 }}>
                            {modalMode === "view" ? (
                                <>
                                    <button className="btn btn-outline" onClick={() => setShowModal(false)}>Close</button>
                                    <button className="btn btn-primary" onClick={() => setModalMode("edit")}>Edit Ticket</button>
                                </>
                            ) : (
                                <>
                                    <button className="btn btn-outline" onClick={() => setShowModal(false)}>Cancel</button>
                                    <button className="btn btn-primary" onClick={() => setShowModal(false)}>
                                        {modalMode === "create" ? "Submit Ticket" : "Update Ticket"}
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
