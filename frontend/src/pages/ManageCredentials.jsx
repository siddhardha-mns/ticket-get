import { useState } from "react";
import { X, Search, Upload, Plus, Shield, Lock, Eye, EyeOff, Trash2, Edit3, Check } from "lucide-react";
import { useApp } from "../context/AppContext";

const CreateCredentialModal = ({ isOpen, onClose, onSave }) => {
    const [form, setForm] = useState({
        clientName: "", groupName: "", entryName: "", env: "Production",
        loginDetails: "", user: "", cred: "", expiry: "", type: "Database", description: "",
    });
    const [errors, setErrors] = useState({});

    if (!isOpen) return null;

    const update = (k, v) => { setForm((p) => ({ ...p, [k]: v })); if (errors[k]) setErrors((p) => ({ ...p, [k]: null })); };

    const save = () => {
        const errs = {};
        if (!form.entryName.trim()) errs.entryName = true;
        if (!form.user.trim()) errs.user = true;
        if (!form.cred.trim()) errs.cred = true;
        if (Object.keys(errs).length) { setErrors(errs); return; }
        onSave(form);
        setForm({ clientName: "", groupName: "", entryName: "", env: "Production", loginDetails: "", user: "", cred: "", expiry: "", type: "Database", description: "" });
        onClose();
    };

    const Field = ({ label, field, required, type = "text", children }) => (
        <div>
            <label className="text-[11px] text-gray-400 font-semibold uppercase tracking-wide block mb-1.5">
                {label}{required && <span className="text-red-400">*</span>}
            </label>
            {children || (
                <input value={form[field]} onChange={(e) => update(field, e.target.value)} type={type}
                    className={`w-full border ${errors[field] ? "border-red-300 bg-red-50/30" : "border-gray-200 bg-gray-50"} rounded-lg px-3 py-2 text-[13px]`} />
            )}
        </div>
    );

    return (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-[2px] z-50 flex items-center justify-center animate-fade-in">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl mx-4 overflow-hidden border border-gray-100">
                <div className="px-5 py-3.5 border-b border-gray-100 flex items-center justify-between">
                    <h3 className="text-[15px] font-semibold text-gray-800">Create Credential Entry</h3>
                    <button onClick={onClose} className="text-gray-300 hover:text-gray-500 rounded-lg p-1 hover:bg-gray-100 transition"><X size={18} /></button>
                </div>
                <div className="p-5 space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                        <Field label="Client Name" field="clientName" />
                        <Field label="Group Name" field="groupName" />
                        <Field label="Entry Name" field="entryName" required />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        <Field label="Environment" field="env">
                            <select value={form.env} onChange={(e) => update("env", e.target.value)} className="w-full border border-gray-200 bg-gray-50 rounded-lg px-3 py-2 text-[13px]">
                                <option>Production</option><option>Staging</option><option>Development</option><option>QA</option>
                            </select>
                        </Field>
                        <Field label="Type" field="type">
                            <select value={form.type} onChange={(e) => update("type", e.target.value)} className="w-full border border-gray-200 bg-gray-50 rounded-lg px-3 py-2 text-[13px]">
                                <option>Database</option><option>Application</option><option>Server</option><option>API Key</option>
                            </select>
                        </Field>
                        <Field label="Expiry Date" field="expiry" type="date" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <Field label="Login Details / URL" field="loginDetails" />
                        <Field label="Username" field="user" required />
                    </div>
                    <Field label="Password / Secret" field="cred" required type="password" />
                    <Field label="Description" field="description">
                        <textarea value={form.description} onChange={(e) => update("description", e.target.value)} rows={2}
                            className="w-full border border-gray-200 bg-gray-50 rounded-lg px-3 py-2 text-[13px] resize-y" placeholder="Optional description..." />
                    </Field>
                </div>
                <div className="flex justify-end gap-2.5 px-5 py-3.5 border-t border-gray-100 bg-gray-50/50">
                    <button onClick={onClose} className="px-4 py-2 border border-gray-200 rounded-lg text-[13px] text-gray-500 hover:bg-gray-100 transition">Cancel</button>
                    <button onClick={save} className="px-5 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg text-[13px] font-medium hover:shadow-md hover:shadow-amber-200/50 transition-all active:scale-95">Create</button>
                </div>
            </div>
        </div>
    );
};

const ManageCredentials = () => {
    const { credentials, addCredential, updateCredential, deleteCredential } = useApp();
    const [showModal, setShowModal] = useState(false);
    const [showPasswords, setShowPasswords] = useState({});
    const [searchText, setSearchText] = useState("");
    const [editingField, setEditingField] = useState(null); // { id, field }
    const [editValue, setEditValue] = useState("");
    const [toastMsg, setToastMsg] = useState("");
    const [confirmDelete, setConfirmDelete] = useState(null);

    const showToast = (msg) => { setToastMsg(msg); setTimeout(() => setToastMsg(""), 3000); };
    const togglePassword = (i) => setShowPasswords((prev) => ({ ...prev, [i]: !prev[i] }));

    const startEdit = (id, field, currentValue) => { setEditingField({ id, field }); setEditValue(currentValue || ""); };
    const saveEdit = () => {
        if (editingField) {
            updateCredential(editingField.id, { [editingField.field]: editValue });
            showToast(`Updated ${editingField.field}`);
            setEditingField(null);
        }
    };

    const handleDelete = (id) => { deleteCredential(id); setConfirmDelete(null); showToast("Credential deleted"); };

    const filtered = credentials.filter((c) => {
        if (!searchText) return true;
        const q = searchText.toLowerCase();
        return c.entryName?.toLowerCase().includes(q) || c.user?.toLowerCase().includes(q) || c.env?.toLowerCase().includes(q) || c.loginDetails?.toLowerCase().includes(q);
    });

    const envColors = {
        Production: "bg-red-50 text-red-600",
        Staging: "bg-amber-50 text-amber-600",
        Development: "bg-blue-50 text-blue-600",
        QA: "bg-emerald-50 text-emerald-600",
    };

    return (
        <div className="p-6 max-w-5xl mx-auto relative">
            {toastMsg && (
                <div className="fixed top-4 right-4 z-50 bg-gray-800 text-white text-[13px] px-4 py-2.5 rounded-lg shadow-xl animate-fade-in flex items-center gap-2">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full" /> {toastMsg}
                </div>
            )}

            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center shadow-sm">
                        <Shield size={20} className="text-white" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-gray-800 tracking-tight">Credentials Vault</h1>
                        <p className="text-[12px] text-gray-400">{credentials.length} entries stored securely</p>
                    </div>
                </div>
                <button onClick={() => setShowModal(true)} className="flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-lg text-[13px] font-medium hover:shadow-md hover:shadow-amber-200/50 transition-all active:scale-[0.98]">
                    <Plus size={15} /> New Entry
                </button>
            </div>

            {/* Search Bar */}
            <div className="bg-white rounded-xl border border-gray-100 p-4 mb-5 shadow-sm">
                <div className="relative max-w-sm">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" />
                    <input value={searchText} onChange={(e) => setSearchText(e.target.value)}
                        placeholder="Search credentials..."
                        className="w-full bg-gray-50 border border-gray-200 text-sm rounded-lg pl-9 pr-3 py-2 placeholder-gray-300" />
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
                <div className="bg-gradient-to-r from-violet-50 to-purple-50 px-5 py-3 border-b border-gray-100">
                    <h2 className="text-[13px] font-semibold text-violet-700 flex items-center gap-2">
                        <Lock size={14} /> Project Team Credentials
                    </h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-[13px]">
                        <thead>
                            <tr className="bg-gray-50/80 border-b border-gray-100">
                                <th className="text-left px-5 py-3 font-semibold text-gray-500 text-[11px] uppercase tracking-wide">Env</th>
                                <th className="text-left px-5 py-3 font-semibold text-gray-500 text-[11px] uppercase tracking-wide">Entry Name</th>
                                <th className="text-left px-5 py-3 font-semibold text-gray-500 text-[11px] uppercase tracking-wide">Login Details</th>
                                <th className="text-left px-5 py-3 font-semibold text-gray-500 text-[11px] uppercase tracking-wide">User</th>
                                <th className="text-left px-5 py-3 font-semibold text-gray-500 text-[11px] uppercase tracking-wide">Credential</th>
                                <th className="text-left px-5 py-3 font-semibold text-gray-500 text-[11px] uppercase tracking-wide">Expiry</th>
                                <th className="w-24"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.length === 0 ? (
                                <tr><td colSpan={7} className="text-center py-8 text-gray-300 text-sm">No credentials found</td></tr>
                            ) : filtered.map((row) => (
                                <tr key={row.id} className="border-b border-gray-50 hover:bg-amber-50/20 transition-colors group">
                                    <td className="px-5 py-3">
                                        <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${envColors[row.env] || "bg-gray-50 text-gray-500"}`}>{row.env}</span>
                                    </td>
                                    <td className="px-5 py-3 font-medium text-gray-700">{row.entryName}</td>
                                    <td className="px-5 py-3">
                                        {editingField?.id === row.id && editingField?.field === "loginDetails" ? (
                                            <div className="flex items-center gap-1">
                                                <input autoFocus value={editValue} onChange={(e) => setEditValue(e.target.value)} onKeyDown={(e) => e.key === "Enter" && saveEdit()}
                                                    className="border border-amber-300 rounded px-2 py-0.5 text-[12px] bg-amber-50 w-full" />
                                                <button onClick={saveEdit}><Check size={14} className="text-emerald-500" /></button>
                                            </div>
                                        ) : (
                                            <span className="text-gray-500 font-mono text-[12px] cursor-pointer hover:text-amber-600" onClick={() => startEdit(row.id, "loginDetails", row.loginDetails)}>{row.loginDetails || "—"}</span>
                                        )}
                                    </td>
                                    <td className="px-5 py-3">
                                        {editingField?.id === row.id && editingField?.field === "user" ? (
                                            <div className="flex items-center gap-1">
                                                <input autoFocus value={editValue} onChange={(e) => setEditValue(e.target.value)} onKeyDown={(e) => e.key === "Enter" && saveEdit()}
                                                    className="border border-amber-300 rounded px-2 py-0.5 text-[12px] bg-amber-50 w-full" />
                                                <button onClick={saveEdit}><Check size={14} className="text-emerald-500" /></button>
                                            </div>
                                        ) : (
                                            <span className="text-gray-700 font-medium cursor-pointer hover:text-amber-600" onClick={() => startEdit(row.id, "user", row.user)}>{row.user}</span>
                                        )}
                                    </td>
                                    <td className="px-5 py-3">
                                        <div className="flex items-center gap-2">
                                            <span className="text-gray-500 font-mono text-[12px]">{showPasswords[row.id] ? row.cred : "••••••••"}</span>
                                            <button onClick={() => togglePassword(row.id)} className="text-gray-300 hover:text-gray-500 transition">
                                                {showPasswords[row.id] ? <EyeOff size={13} /> : <Eye size={13} />}
                                            </button>
                                        </div>
                                    </td>
                                    <td className="px-5 py-3 text-gray-400 text-[12px]">{row.expiry || "—"}</td>
                                    <td className="px-5 py-3">
                                        <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                            {confirmDelete === row.id ? (
                                                <>
                                                    <button onClick={() => handleDelete(row.id)} className="text-[11px] text-red-500 bg-red-50 px-2 py-0.5 rounded font-medium hover:bg-red-100 transition">Yes</button>
                                                    <button onClick={() => setConfirmDelete(null)} className="text-[11px] text-gray-400 px-2 py-0.5 rounded hover:bg-gray-100 transition">No</button>
                                                </>
                                            ) : (
                                                <button onClick={() => setConfirmDelete(row.id)} className="text-gray-300 hover:text-red-500 transition p-1 rounded hover:bg-red-50">
                                                    <Trash2 size={13} />
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <CreateCredentialModal isOpen={showModal} onClose={() => setShowModal(false)} onSave={(data) => { addCredential(data); showToast("Credential created"); }} />
        </div>
    );
};

export default ManageCredentials;
