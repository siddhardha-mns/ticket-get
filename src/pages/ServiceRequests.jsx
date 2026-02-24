import { useState } from "react";
import { SERVICE_REQUESTS } from "../assets/mockData";
import { COLORS } from "../assets/theme";
import { StatusBadge } from "../components/Badges";

export default function ServiceRequestsPage() {
    const [tab, setTab] = useState("all");
    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState("create"); // "create" or "edit"

    // Filter & Form States
    const initialFormState = {
        id: "",
        title: "",
        fromDate: "2026-02-01",
        toDate: "2026-02-13",
        assignedTo: "",
        requestedBy: "You",
        project: "",
        updatedBy: "",
        type: "--Select--",
        subType: "--Select Sub Type--",
        sortBy: "Updated Date",
        refreshInterval: "Don't Refresh",
        location: "ALL",
        billable: false,
        visibility: false,
        description: "",
        statuses: ["Acknowledged", "Open"],
        severities: ["Severity2"],
        attachments: []
    };

    const [filters, setFilters] = useState({
        ...initialFormState,
        search: "",
        requestedBy: "",
        statuses: ["Acknowledged", "Open", "Approved", "In Work", "Pending", "Completed", "Closed", "Others"],
        severities: ["Severity1", "Severity2", "Severity3", "Severity4"]
    });

    const [form, setForm] = useState(initialFormState);

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

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const handleFormChange = (key, value) => {
        setForm(prev => ({ ...prev, [key]: value }));
    };

    const toggleStatus = (status, viewType = "filter") => {
        const setter = viewType === "filter" ? setFilters : setForm;
        setter(prev => ({
            ...prev,
            statuses: prev.statuses.includes(status)
                ? prev.statuses.filter(s => s !== status)
                : [...prev.statuses, status]
        }));
    };

    const toggleSeverity = (sev, viewType = "filter") => {
        const setter = viewType === "filter" ? setFilters : setForm;
        setter(prev => ({
            ...prev,
            severities: prev.severities.includes(sev)
                ? prev.severities.filter(s => s !== sev)
                : [...prev.severities, sev]
        }));
    };

    const renderDetailItem = (label, value, full = false) => (
        <div className={`detail-item ${full ? "detail-full" : ""}`}>
            <div className="detail-label">{label}</div>
            <div className="detail-value">{value || "---"}</div>
        </div>
    );

    const renderDetailView = (data) => {
        return (
            <div className="detail-grid">
                {renderDetailItem("Request Title", data.title, true)}
                {renderDetailItem("From Date", data.fromDate)}
                {renderDetailItem("To Date", data.toDate)}
                {renderDetailItem("Location", data.location)}
                {renderDetailItem("Assigned To", data.assignedTo)}
                {renderDetailItem("Requested By", data.requestedBy)}
                {renderDetailItem("Project", data.project)}
                {renderDetailItem("Updated By", data.updatedBy)}
                {renderDetailItem("Type", data.type)}
                {renderDetailItem("Sub Type", data.subType)}
                {renderDetailItem("Billable", data.billable ? "Yes" : "No")}
                {renderDetailItem("Visibility", data.visibility ? "Private" : "Public")}
                <div className="detail-item">
                    <div className="detail-label">Status</div>
                    <div className="flex gap-8 mt-4">
                        <StatusBadge status={data.statuses[0] || "Open"} />
                    </div>
                </div>
                <div className="detail-item">
                    <div className="detail-label">Severity</div>
                    <div className="flex items-center gap-8 mt-4">
                        <div className={`severity-indicator sev-${data.severities[0]?.replace("Severity", "")}`}></div>
                        <span className="detail-value">{data.severities[0]}</span>
                    </div>
                </div>
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
    };

    const renderFields = (data, onChange, viewType = "filter") => {
        const isFilter = viewType === "filter";
        const isCreate = viewType === "create";

        return (
            <>
                <div className="filter-grid">
                    <div className="filter-group" style={{ gridColumn: isFilter ? "span 2" : "span 4" }}>
                        <label>{isFilter ? "Search" : "Request Title"}</label>
                        <input type="text" placeholder={isFilter ? "Search by ID, Title, etc." : "What do you need?"}
                            value={isFilter ? data.search : data.title}
                            onChange={e => onChange(isFilter ? "search" : "title", e.target.value)} />
                    </div>
                    {isFilter && (
                        <>
                            <div className="filter-group">
                                <label>From Date</label>
                                <input type="date" value={data.fromDate} onChange={e => onChange("fromDate", e.target.value)} />
                            </div>
                            <div className="filter-group">
                                <label>To Date</label>
                                <input type="date" value={data.toDate} onChange={e => onChange("toDate", e.target.value)} />
                            </div>
                        </>
                    )}
                </div>

                {!isFilter && (
                    <div className="filter-grid">
                        <div className="filter-group">
                            <label>From Date</label>
                            <input type="date" value={data.fromDate} onChange={e => onChange("fromDate", e.target.value)} />
                        </div>
                        <div className="filter-group">
                            <label>To Date</label>
                            <input type="date" value={data.toDate} onChange={e => onChange("toDate", e.target.value)} />
                        </div>
                        <div className="filter-group" style={{ gridColumn: "span 2" }}>
                            <label>Location</label>
                            <select value={data.location} onChange={e => onChange("location", e.target.value)}>
                                <option>ALL</option>
                                <option>Global</option>
                                <option>Mumbai</option>
                                <option>Bangalore</option>
                            </select>
                        </div>
                    </div>
                )}

                <div className="filter-grid">
                    <div className="filter-group">
                        <label>Assigned to</label>
                        <select value={data.assignedTo} onChange={e => onChange("assignedTo", e.target.value)}>
                            <option value="">--Select--</option>
                            <option>Naveen Jejji</option>
                            <option>IT Support</option>
                            <option>DevOps</option>
                        </select>
                    </div>
                    <div className="filter-group">
                        <label>Requested By</label>
                        <select value={data.requestedBy} onChange={e => onChange("requestedBy", e.target.value)}>
                            {!isFilter && <option value="You">You</option>}
                            <option value="">--Select--</option>
                            <option>HR Team</option>
                            <option>Admin</option>
                        </select>
                    </div>
                    <div className="filter-group">
                        <label>Project</label>
                        <select value={data.project} onChange={e => onChange("project", e.target.value)}>
                            <option value="">--Select--</option>
                            <option>Internal HR Portal</option>
                            <option>E-Commerce Platform Migration</option>
                            <option>Internal Tools</option>
                            <option>Office Infrastructure</option>
                        </select>
                    </div>
                    <div className="filter-group">
                        <label>Updated By</label>
                        <select value={data.updatedBy} onChange={e => onChange("updatedBy", e.target.value)}>
                            <option value="">--Select--</option>
                            <option>System</option>
                            <option>Admin</option>
                        </select>
                    </div>
                </div>

                <div className="filter-grid">
                    <div className="filter-group">
                        <label>Type</label>
                        <select value={data.type} onChange={e => onChange("type", e.target.value)}>
                            <option>--Select--</option>
                            <option>Infrastructure</option>
                            <option>Software</option>
                        </select>
                    </div>
                    <div className="filter-group">
                        <label>Sub Type</label>
                        <select value={data.subType} onChange={e => onChange("subType", e.target.value)}>
                            <option>--Select Sub Type--</option>
                        </select>
                    </div>
                    <div className="filter-group">
                        <label>Sort list by</label>
                        <select value={data.sortBy} onChange={e => onChange("sortBy", e.target.value)}>
                            <option>Updated Date</option>
                            <option>Created Date</option>
                            <option>Priority</option>
                        </select>
                    </div>
                    <div className="filter-group">
                        <label>Refresh list interval</label>
                        <select value={data.refreshInterval} onChange={e => onChange("refreshInterval", e.target.value)}>
                            <option>Don't Refresh</option>
                            <option>5 Minutes</option>
                            <option>10 Minutes</option>
                        </select>
                    </div>
                </div>

                <div className="filter-grid" style={{ gridTemplateColumns: isFilter ? "1fr 1fr 1fr" : "1fr 1fr" }}>
                    {isFilter && (
                        <div className="filter-group">
                            <label>Location</label>
                            <select value={data.location} onChange={e => onChange("location", e.target.value)}>
                                <option>ALL</option>
                                <option>Global</option>
                                <option>Mumbai</option>
                                <option>Bangalore</option>
                            </select>
                        </div>
                    )}
                    <div className="filter-item-row" style={{ marginTop: 24 }}>
                        <div className="checkbox-item">
                            <input type="checkbox" id={viewType + "-billable"} checked={data.billable} onChange={e => onChange("billable", e.target.checked)} />
                            <label htmlFor={viewType + "-billable"}>Billable:</label>
                        </div>
                    </div>
                    <div className="filter-item-row" style={{ marginTop: 24 }}>
                        <div className="checkbox-item">
                            <input type="checkbox" id={viewType + "-visibility"} checked={data.visibility} onChange={e => onChange("visibility", e.target.checked)} />
                            <label htmlFor={viewType + "-visibility"}>Visibility: Only Private</label>
                        </div>
                    </div>
                </div>

                {!isCreate && (
                    <div className="filter-row">
                        <div className="filter-item-label">Status:</div>
                        <div className="checkbox-group">
                            {["Acknowledged", "Open", "Approved", "In Work", "Pending", "Completed", "Closed", "Others"].map(s => (
                                <label key={s} className="checkbox-item">
                                    <input type="checkbox" checked={data.statuses.includes(s)} onChange={() => toggleStatus(s, viewType)} />
                                    {s}
                                </label>
                            ))}
                        </div>
                    </div>
                )}

                <div className="filter-row">
                    <div className="filter-item-label">Severity:</div>
                    <div className="severity-list">
                        {[1, 2, 3, 4].map(n => (
                            <label key={n} className="severity-item">
                                <input type="checkbox" className="severity-checkbox"
                                    checked={data.severities.includes(`Severity${n}`)}
                                    onChange={() => toggleSeverity(`Severity${n}`, viewType)} />
                                <div className={`severity-indicator sev-${n}`}></div>
                                Severity{n}
                            </label>
                        ))}
                    </div>
                </div>
            </>
        );
    };

    const handleCreateClick = () => {
        setForm(initialFormState);
        setModalMode("create");
        setShowModal(true);
    };

    const handleEditClick = (request) => {
        setForm({
            ...initialFormState,
            ...request,
            statuses: [request.status],
            severities: [request.severity.replace(" ", "")]
        });
        setModalMode("edit");
        setShowModal(true);
    };

    const handleViewClick = (request) => {
        setForm({
            ...initialFormState,
            ...request,
            statuses: [request.status],
            severities: [request.severity.replace(" ", "")]
        });
        setModalMode("view");
        setShowModal(true);
    };

    const filtered = SERVICE_REQUESTS.filter(s => {
        if (tab === "mine" && !s.mine) return false;
        if (filters.search && !s.title.toLowerCase().includes(filters.search.toLowerCase())) return false;
        if (filters.project && s.project !== filters.project) return false;
        const sevKey = s.severity.replace(" ", "");
        if (!filters.severities.includes(sevKey)) return false;
        return true;
    });

    return (
        <div>
            <div className="flex items-center justify-between mb-16">
                <div className="page-header" style={{ marginBottom: 0 }}>
                    <div className="page-title">Service Requests</div>
                    <div className="page-subtitle">Company-wide service request management</div>
                </div>
                <button className="btn btn-primary" onClick={handleCreateClick}>
                    <svg style={{ width: 14, height: 14 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14" /></svg>
                    Raise Request
                </button>
            </div>

            <div className="tabs">
                <div className={`tab ${tab === "all" ? "active" : ""}`} onClick={() => setTab("all")}>All Requests</div>
                <div className={`tab ${tab === "mine" ? "active" : ""}`} onClick={() => setTab("mine")}>My Requests</div>
            </div>

            {/* Filter Section */}
            <div className="filter-section">
                {renderFields(filters, handleFilterChange, "filter")}

                <div className="filter-criteria-box">
                    <div className="filter-group">
                        <label>Search Criteria Name</label>
                        <input type="text" value={filters.criteriaName} onChange={e => handleFilterChange("criteriaName", e.target.value)} placeholder="Type name to save search..." />
                    </div>
                    <div className="flex gap-12">
                        <button className="btn-filter btn-save">Save Search</button>
                        <button className="btn-filter btn-delete">Delete Search</button>
                    </div>
                </div>

                <div className="filter-actions">
                    <button className="btn-filter btn-search">Search</button>
                </div>
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
                            <tr key={r.id} style={{ cursor: "pointer" }} onClick={() => handleViewClick(r)}>
                                <td><span className="text-mono" style={{ color: COLORS.accent, fontSize: 12 }}>{r.id}</span></td>
                                <td><span className="font-bold text-sm">{r.title}</span></td>
                                <td><span className="badge badge-gray">{r.type}</span></td>
                                <td>
                                    <div className="flex flex-col gap-4">
                                        <StatusBadge status={r.status} />
                                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                            <div className={`severity-indicator sev-${r.severity.split(" ")[1]}`}></div>
                                            <span style={{ fontSize: 10, color: COLORS.textDim }}>{r.severity}</span>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="flex flex-col">
                                        <span className="text-sm" style={{ color: r.requester === "You" ? COLORS.accent : COLORS.textDim }}>{r.requester}</span>
                                        <span style={{ fontSize: 10, color: COLORS.textMuted }}>{r.project}</span>
                                    </div>
                                </td>
                                <td><span className="text-sm" style={{ color: r.assignee === "You" ? COLORS.accent : COLORS.textDim }}>{r.assignee}</span></td>
                                <td>
                                    <div className="flex flex-col">
                                        <span className="text-muted">{r.created}</span>
                                        <span style={{ fontSize: 10, color: COLORS.textMuted }}>{r.location}</span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal modal-large" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <div className="modal-title">
                                {modalMode === "create" ? "New Service Request" : modalMode === "view" ? "Request Details" : `Update Request: ${form.id}`}
                            </div>
                            <button className="close-btn" onClick={() => setShowModal(false)}>×</button>
                        </div>

                        <div style={{ marginBottom: 20 }}>
                            {modalMode === "view" ? renderDetailView(form) : renderFields(form, handleFormChange, modalMode)}
                        </div>

                        {modalMode === "view" && form.description && (
                            <div className="detail-item detail-full" style={{ marginTop: 12 }}>
                                <div className="detail-label">Description</div>
                                <div className="detail-value" style={{ background: "var(--bg)", padding: 12, borderRadius: 8, marginTop: 4 }}>{form.description}</div>
                            </div>
                        )}

                        {(modalMode === "create" || modalMode === "edit") && (
                            <div className="attachments-section">
                                <div className="attachments-header">
                                    <div className="detail-label">Attachments</div>
                                    <button className="btn-add-attachment" onClick={() => document.getElementById("file-upload").click()}>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" /></svg>
                                        Add
                                    </button>
                                </div>
                                <input type="file" id="file-upload" hidden multiple accept="image/*" onChange={handleFileChange} />

                                {form.attachments.length > 0 && (
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
                        )}

                        <div className="flex gap-8" style={{ justifyContent: "flex-end", marginTop: 24 }}>
                            {modalMode === "view" ? (
                                <>
                                    <button className="btn btn-outline" onClick={() => setShowModal(false)}>Close</button>
                                    <button className="btn btn-primary" onClick={() => setModalMode("edit")}>Edit Request</button>
                                </>
                            ) : (
                                <>
                                    <button className="btn btn-outline" onClick={() => setShowModal(false)}>Cancel</button>
                                    <button className="btn btn-primary" onClick={() => setShowModal(false)}>
                                        {modalMode === "create" ? "Submit Request" : "Update Request"}
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
