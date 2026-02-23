import { useState } from "react";
import { PROJECTS } from "../assets/mockData";
import { COLORS } from "../assets/theme";

export default function CredentialsPage() {
    const [selectedProject, setSelectedProject] = useState(null);
    const [showPasswords, setShowPasswords] = useState({});
    const [showAddModal, setShowAddModal] = useState(false);
    const [newCred, setNewCred] = useState({ service: "", url: "", username: "", password: "", expiry: "", notes: "" });
    const [copied, setCopied] = useState(null);

    const togglePassword = (id) => setShowPasswords(p => ({ ...p, [id]: !p[id] }));
    const copyToClipboard = (text, id) => {
        navigator.clipboard?.writeText(text);
        setCopied(id);
        setTimeout(() => setCopied(null), 1500);
    };

    return (
        <div>
            <div className="page-header">
                <div className="page-title">Credentials Vault</div>
                <div className="page-subtitle">Secure credential management per project</div>
            </div>

            {!selectedProject ? (
                <>
                    <div className="text-muted mb-16" style={{ marginBottom: 16, fontSize: 13 }}>Select an active project to view its credentials</div>
                    <div className="card-grid card-grid-3">
                        {PROJECTS.map(p => (
                            <div key={p.id} className="ticket-card" onClick={() => setSelectedProject(p)}>
                                <div className="flex items-center gap-8" style={{ marginBottom: 8 }}>
                                    <span className="text-mono text-muted" style={{ fontSize: 10 }}>{p.id}</span>
                                    <span className="badge badge-green">Active</span>
                                </div>
                                <div className="font-bold" style={{ fontSize: 15, marginBottom: 6 }}>{p.name}</div>
                                <div className="text-muted" style={{ fontSize: 12 }}>Team: {p.team}</div>
                                <div className="text-muted mt-4" style={{ fontSize: 12 }}>
                                    <svg style={{ width: 12, height: 12, display: "inline", marginRight: 4 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" /></svg>
                                    {p.credentials.length} credentials stored
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <>
                    <div className="flex items-center justify-between mb-16">
                        <div className="flex items-center gap-12">
                            <button className="btn btn-outline btn-sm" onClick={() => setSelectedProject(null)}>← Back</button>
                            <div>
                                <div className="font-bold" style={{ fontSize: 16 }}>{selectedProject.name}</div>
                                <div className="text-muted" style={{ fontSize: 12 }}>{selectedProject.team} · {selectedProject.credentials.length} credentials</div>
                            </div>
                        </div>
                        <button className="btn btn-primary btn-sm" onClick={() => setShowAddModal(true)}>
                            <svg style={{ width: 12, height: 12 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14" /></svg>
                            Add Credential
                        </button>
                    </div>

                    <div className="card">
                        <div className="table-wrap">
                            <table>
                                <thead><tr><th>Service</th><th>URL / Host</th><th>Username</th><th>Password</th><th>Expiry</th><th>Notes</th><th>Actions</th></tr></thead>
                                <tbody>
                                    {selectedProject.credentials.map(cred => (
                                        <tr key={cred.id}>
                                            <td>
                                                <div className="flex items-center gap-8">
                                                    <div style={{ width: 28, height: 28, borderRadius: 6, background: COLORS.accentGlow, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                        <svg style={{ width: 13, height: 13, color: COLORS.accent }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" /></svg>
                                                    </div>
                                                    <span className="font-bold text-sm">{cred.service}</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="flex items-center gap-6">
                                                    <span className="text-mono" style={{ fontSize: 11, color: COLORS.textDim, maxWidth: 140, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{cred.url}</span>
                                                    <button className="eye-btn" onClick={() => copyToClipboard(cred.url, `url-${cred.id}`)} title="Copy">
                                                        {copied === `url-${cred.id}` ? <span style={{ fontSize: 10, color: COLORS.success }}>✓</span> : <svg style={{ width: 12, height: 12 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" /></svg>}
                                                    </button>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="flex items-center gap-6">
                                                    <span className="text-mono" style={{ fontSize: 12 }}>{cred.username}</span>
                                                    <button className="eye-btn" onClick={() => copyToClipboard(cred.username, `user-${cred.id}`)} title="Copy">
                                                        {copied === `user-${cred.id}` ? <span style={{ fontSize: 10, color: COLORS.success }}>✓</span> : <svg style={{ width: 12, height: 12 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" /></svg>}
                                                    </button>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="password-field">
                                                    <span className="password-text" style={{ fontSize: showPasswords[cred.id] ? 12 : 14, letterSpacing: showPasswords[cred.id] ? 1 : 3 }}>
                                                        {showPasswords[cred.id] ? cred.password : "••••••••••"}
                                                    </span>
                                                    <button className="eye-btn" onClick={() => togglePassword(cred.id)}>
                                                        {showPasswords[cred.id]
                                                            ? <svg style={{ width: 13, height: 13 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24M1 1l22 22" /></svg>
                                                            : <svg style={{ width: 13, height: 13 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                                                        }
                                                    </button>
                                                    {showPasswords[cred.id] && (
                                                        <button className="eye-btn" onClick={() => copyToClipboard(cred.password, `pwd-${cred.id}`)} title="Copy">
                                                            {copied === `pwd-${cred.id}` ? <span style={{ fontSize: 10, color: COLORS.success }}>✓</span> : <svg style={{ width: 12, height: 12 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" /></svg>}
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                            <td>
                                                <span className={`badge ${cred.expiry === "Unlimited" ? "badge-green" : "badge-yellow"}`} style={{ fontSize: 9 }}>{cred.expiry}</span>
                                            </td>
                                            <td><span className="text-muted" style={{ fontSize: 11 }}>{cred.notes}</span></td>
                                            <td>
                                                <div className="flex gap-8">
                                                    <button className="btn btn-outline btn-sm" style={{ padding: "4px 10px" }}>Edit</button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {showAddModal && (
                        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
                            <div className="modal" onClick={e => e.stopPropagation()}>
                                <div className="modal-header">
                                    <div className="modal-title">Add Credential</div>
                                    <button className="close-btn" onClick={() => setShowAddModal(false)}>×</button>
                                </div>
                                <div className="card-grid card-grid-2">
                                    <div className="form-group">
                                        <label className="form-label">Service Name</label>
                                        <input className="form-input" placeholder="e.g. AWS Console" value={newCred.service} onChange={e => setNewCred({ ...newCred, service: e.target.value })} />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">URL / Host</label>
                                        <input className="form-input" placeholder="https://..." value={newCred.url} onChange={e => setNewCred({ ...newCred, url: e.target.value })} />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Username / Email</label>
                                        <input className="form-input" placeholder="username@company.com" value={newCred.username} onChange={e => setNewCred({ ...newCred, username: e.target.value })} />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Password</label>
                                        <input className="form-input" type="password" placeholder="••••••••" value={newCred.password} onChange={e => setNewCred({ ...newCred, password: e.target.value })} />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Expiry Date</label>
                                        <input className="form-input" placeholder="e.g. Dec 2025 / Unlimited" value={newCred.expiry} onChange={e => setNewCred({ ...newCred, expiry: e.target.value })} />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Notes</label>
                                    <input className="form-input" placeholder="Any additional notes..." value={newCred.notes} onChange={e => setNewCred({ ...newCred, notes: e.target.value })} />
                                </div>
                                <div className="flex gap-8" style={{ justifyContent: "flex-end" }}>
                                    <button className="btn btn-outline" onClick={() => setShowAddModal(false)}>Cancel</button>
                                    <button className="btn btn-primary" onClick={() => setShowAddModal(false)}>Save Credential</button>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
