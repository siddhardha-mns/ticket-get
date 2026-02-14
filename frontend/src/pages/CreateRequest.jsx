import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Send, AlertCircle, CheckCircle } from "lucide-react";
import { useApp } from "../context/AppContext";

const CreateRequest = () => {
    const { createTicket, currentUser } = useApp();
    const navigate = useNavigate();
    const [submitted, setSubmitted] = useState(false);
    const [createdId, setCreatedId] = useState("");

    const [form, setForm] = useState({
        title: "",
        description: "",
        severity: "Severity3",
        priority: "Priority 3",
        type: "Service Request",
        customer: "",
        project: "",
        visibility: "Public",
        billable: false,
    });

    const [errors, setErrors] = useState({});

    const update = (field, value) => {
        setForm((prev) => ({ ...prev, [field]: value }));
        if (errors[field]) setErrors((prev) => ({ ...prev, [field]: null }));
    };

    const validate = () => {
        const errs = {};
        if (!form.title.trim()) errs.title = "Title is required";
        if (!form.description.trim()) errs.description = "Description is required";
        if (!form.customer.trim()) errs.customer = "Customer is required";
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;
        const ticket = createTicket({
            ...form,
            requester: currentUser.name,
            email: currentUser.email,
            assignedTo: "",
        });
        setCreatedId(ticket.id);
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="p-6 max-w-2xl mx-auto mt-12 text-center animate-fade-in">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={32} className="text-emerald-500" />
                </div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">Request Created Successfully!</h2>
                <p className="text-sm text-gray-500 mb-6">
                    Your request <span className="font-mono font-semibold text-amber-600">{createdId}</span> has been submitted.
                </p>
                <div className="flex justify-center gap-3">
                    <button onClick={() => navigate(`/service-requests/${createdId}`)} className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-5 py-2 rounded-lg text-sm font-medium hover:shadow-md transition-all">
                        View Request
                    </button>
                    <button onClick={() => { setSubmitted(false); setForm({ title: "", description: "", severity: "Severity3", priority: "Priority 3", type: "Service Request", customer: "", project: "", visibility: "Public", billable: false }); }} className="border border-gray-200 text-gray-500 px-5 py-2 rounded-lg text-sm hover:bg-gray-50 transition">
                        Create Another
                    </button>
                </div>
            </div>
        );
    }

    const Field = ({ label, required, error, children }) => (
        <div>
            <label className="text-[12px] text-gray-500 font-semibold uppercase tracking-wide block mb-1.5">
                {label}{required && <span className="text-red-400 ml-0.5">*</span>}
            </label>
            {children}
            {error && <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1"><AlertCircle size={11} /> {error}</p>}
        </div>
    );

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <button onClick={() => navigate("/service-requests")} className="inline-flex items-center gap-1.5 text-[13px] text-gray-400 hover:text-amber-600 transition-colors mb-5">
                <ArrowLeft size={15} /> Back to Requests
            </button>

            <h1 className="text-xl font-bold text-gray-800 tracking-tight mb-1">Create New Request</h1>
            <p className="text-[13px] text-gray-400 mb-6">Fill in the details below to submit a new service request.</p>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm space-y-5">
                    <h2 className="text-[13px] font-semibold text-gray-500 uppercase tracking-wide">Request Details</h2>

                    <Field label="Title" required error={errors.title}>
                        <input value={form.title} onChange={(e) => update("title", e.target.value)}
                            placeholder="Brief summary of the issue or request..."
                            className={`w-full border ${errors.title ? "border-red-300 bg-red-50/30" : "border-gray-200 bg-gray-50"} rounded-lg px-4 py-2.5 text-[13px]`} />
                    </Field>

                    <Field label="Description" required error={errors.description}>
                        <textarea value={form.description} onChange={(e) => update("description", e.target.value)}
                            placeholder="Provide detailed information about the request..."
                            rows={5}
                            className={`w-full border ${errors.description ? "border-red-300 bg-red-50/30" : "border-gray-200 bg-gray-50"} rounded-lg px-4 py-2.5 text-[13px] resize-y`} />
                    </Field>

                    <div className="grid grid-cols-2 gap-4">
                        <Field label="Type">
                            <select value={form.type} onChange={(e) => update("type", e.target.value)}
                                className="w-full border border-gray-200 bg-gray-50 rounded-lg px-4 py-2.5 text-[13px]">
                                <option>Service Request</option>
                                <option>Incident</option>
                            </select>
                        </Field>
                        <Field label="Customer" required error={errors.customer}>
                            <input value={form.customer} onChange={(e) => update("customer", e.target.value)}
                                placeholder="Customer name..."
                                className={`w-full border ${errors.customer ? "border-red-300 bg-red-50/30" : "border-gray-200 bg-gray-50"} rounded-lg px-4 py-2.5 text-[13px]`} />
                        </Field>
                    </div>

                    <Field label="Project">
                        <input value={form.project} onChange={(e) => update("project", e.target.value)}
                            placeholder="Associated project (optional)..."
                            className="w-full border border-gray-200 bg-gray-50 rounded-lg px-4 py-2.5 text-[13px]" />
                    </Field>
                </div>

                {/* Classification */}
                <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm space-y-5">
                    <h2 className="text-[13px] font-semibold text-gray-500 uppercase tracking-wide">Classification</h2>

                    <div className="grid grid-cols-2 gap-4">
                        <Field label="Severity">
                            <select value={form.severity} onChange={(e) => update("severity", e.target.value)}
                                className="w-full border border-gray-200 bg-gray-50 rounded-lg px-4 py-2.5 text-[13px]">
                                <option value="Severity1">Severity 1 — Critical</option>
                                <option value="Severity2">Severity 2 — High</option>
                                <option value="Severity3">Severity 3 — Medium</option>
                                <option value="Severity4">Severity 4 — Low</option>
                            </select>
                        </Field>
                        <Field label="Priority">
                            <select value={form.priority} onChange={(e) => update("priority", e.target.value)}
                                className="w-full border border-gray-200 bg-gray-50 rounded-lg px-4 py-2.5 text-[13px]">
                                <option>Priority 1</option>
                                <option>Priority 2</option>
                                <option>Priority 3</option>
                                <option>Priority 4</option>
                            </select>
                        </Field>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Field label="Visibility">
                            <select value={form.visibility} onChange={(e) => update("visibility", e.target.value)}
                                className="w-full border border-gray-200 bg-gray-50 rounded-lg px-4 py-2.5 text-[13px]">
                                <option>Public</option>
                                <option>Private</option>
                            </select>
                        </Field>
                        <Field label="Billable">
                            <div className="flex items-center gap-3 h-[42px]">
                                <label className="flex items-center gap-2 cursor-pointer text-[13px]">
                                    <input type="checkbox" checked={form.billable} onChange={(e) => update("billable", e.target.checked)}
                                        className="rounded text-amber-500 w-4 h-4" />
                                    <span className="text-gray-600">This request is billable</span>
                                </label>
                            </div>
                        </Field>
                    </div>
                </div>

                {/* Submit */}
                <div className="flex gap-3">
                    <button type="submit"
                        className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-2.5 rounded-lg text-[13px] font-semibold hover:shadow-lg hover:shadow-amber-200/50 transition-all active:scale-[0.98]">
                        <Send size={15} /> Submit Request
                    </button>
                    <button type="button" onClick={() => navigate("/service-requests")}
                        className="border border-gray-200 text-gray-500 px-5 py-2.5 rounded-lg text-[13px] hover:bg-gray-50 transition">
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateRequest;
