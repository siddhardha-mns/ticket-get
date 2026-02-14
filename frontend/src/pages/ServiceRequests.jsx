import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Plus, Filter, FileDown, ChevronDown, Edit3, Eye } from "lucide-react";
import { useApp } from "../context/AppContext";

const severityConfig = {
    Severity1: { border: "border-l-red-500", bg: "bg-red-50/60", badge: "bg-red-500", label: "Sev 1", num: 1 },
    Severity2: { border: "border-l-orange-400", bg: "bg-orange-50/60", badge: "bg-orange-400", label: "Sev 2", num: 2 },
    Severity3: { border: "border-l-amber-400", bg: "bg-amber-50/60", badge: "bg-amber-400", label: "Sev 3", num: 3 },
    Severity4: { border: "border-l-gray-300", bg: "bg-white", badge: "bg-gray-300", label: "Sev 4", num: 4 },
};

const statusConfig = {
    Open: { color: "text-blue-600", bg: "bg-blue-50", dot: "bg-blue-500" },
    "In Work": { color: "text-emerald-600", bg: "bg-emerald-50", dot: "bg-emerald-500" },
    Acknowledged: { color: "text-violet-600", bg: "bg-violet-50", dot: "bg-violet-500" },
    Pending: { color: "text-gray-500", bg: "bg-gray-50", dot: "bg-gray-400" },
    Completed: { color: "text-teal-600", bg: "bg-teal-50", dot: "bg-teal-500" },
    Closed: { color: "text-gray-400", bg: "bg-gray-50", dot: "bg-gray-300" },
};

const fmt = (d) => d ? new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "";

const ServiceRequests = ({ filter }) => {
    const { tickets, currentUser } = useApp();
    const navigate = useNavigate();
    const [searchText, setSearchText] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [severityFilter, setSeverityFilter] = useState("all");
    const [showFilters, setShowFilters] = useState(false);
    const [expandedCard, setExpandedCard] = useState(null);

    const filtered = useMemo(() => {
        let result = [...tickets];

        // Filter by tab
        if (filter === "my") result = result.filter((t) => t.requester === currentUser.name);
        if (filter === "group") result = result.filter((t) => t.assignedTo && t.assignedTo !== "");

        // Search
        if (searchText) {
            const q = searchText.toLowerCase();
            result = result.filter((t) => t.title.toLowerCase().includes(q) || t.id.toLowerCase().includes(q) || t.customer.toLowerCase().includes(q));
        }

        // Status filter
        if (statusFilter !== "all") result = result.filter((t) => t.status === statusFilter);

        // Severity filter
        if (severityFilter !== "all") result = result.filter((t) => t.severity === severityFilter);

        return result;
    }, [tickets, filter, searchText, statusFilter, severityFilter, currentUser.name]);

    const openCount = tickets.filter((t) => t.status === "Open").length;
    const allStatuses = [...new Set(tickets.map((t) => t.status))];

    return (
        <div className="p-6 max-w-5xl mx-auto">
            {/* Title */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-xl font-bold text-gray-800 tracking-tight">
                        {filter === "my" ? "My Requests" : filter === "group" ? "Group Requests" : "Service Requests"}
                    </h1>
                    <p className="text-[13px] text-gray-400 mt-0.5">
                        {filtered.length} request{filtered.length !== 1 ? "s" : ""} · <span className="text-amber-600 font-semibold">Open: {openCount}</span>
                    </p>
                </div>
                <button onClick={() => navigate("/create-request")}
                    className="flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-lg text-[13px] font-medium hover:shadow-md hover:shadow-amber-200/50 transition-all active:scale-[0.98]">
                    <Plus size={15} /> New Request
                </button>
            </div>

            {/* Filter Bar */}
            <div className="bg-white rounded-xl border border-gray-100 p-4 mb-4 shadow-sm">
                <div className="flex flex-wrap items-center gap-3">
                    <div className="relative flex-1 min-w-[200px] max-w-sm">
                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" />
                        <input type="text" placeholder="Search by title, ID, or customer..."
                            value={searchText} onChange={(e) => setSearchText(e.target.value)}
                            className="w-full bg-gray-50 border border-gray-200 text-sm rounded-lg pl-9 pr-3 py-2 placeholder-gray-300 focus:bg-white" />
                    </div>

                    <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
                        className="border border-gray-200 rounded-lg px-3 py-2 text-[13px] bg-gray-50">
                        <option value="all">All Statuses</option>
                        {allStatuses.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>

                    <select value={severityFilter} onChange={(e) => setSeverityFilter(e.target.value)}
                        className="border border-gray-200 rounded-lg px-3 py-2 text-[13px] bg-gray-50">
                        <option value="all">All Severities</option>
                        <option value="Severity1">Severity 1</option>
                        <option value="Severity2">Severity 2</option>
                        <option value="Severity3">Severity 3</option>
                        <option value="Severity4">Severity 4</option>
                    </select>
                </div>

                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-50">
                    <button onClick={() => setShowFilters(!showFilters)} className={`flex items-center gap-1.5 text-[12px] font-medium px-3 py-1.5 rounded-lg border transition-all ${showFilters ? "bg-amber-50 border-amber-200 text-amber-700" : "border-gray-200 text-gray-500 hover:bg-gray-50"}`}>
                        <Filter size={13} /> Advanced Filters
                    </button>
                    <button className="flex items-center gap-1 text-[12px] text-gray-500 px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition">
                        <FileDown size={13} /> Export
                    </button>
                    {(searchText || statusFilter !== "all" || severityFilter !== "all") && (
                        <button onClick={() => { setSearchText(""); setStatusFilter("all"); setSeverityFilter("all"); }}
                            className="text-[12px] text-red-500 hover:text-red-600 px-3 py-1.5 rounded-lg border border-red-200 hover:bg-red-50 transition">
                            Clear All Filters
                        </button>
                    )}
                </div>
            </div>

            {/* Ticket Cards */}
            {filtered.length === 0 ? (
                <div className="bg-white rounded-xl border border-gray-100 p-12 text-center shadow-sm">
                    <p className="text-gray-400 text-sm mb-3">No requests match your filters.</p>
                    <button onClick={() => navigate("/create-request")} className="text-amber-600 hover:text-amber-700 text-sm font-medium">
                        + Create a new request
                    </button>
                </div>
            ) : (
                <div className="space-y-2">
                    {filtered.map((ticket, idx) => {
                        const sev = severityConfig[ticket.severity] || severityConfig.Severity3;
                        const stat = statusConfig[ticket.status] || statusConfig.Open;
                        return (
                            <div key={ticket.id}
                                className={`border-l-[3px] ${sev.border} bg-white rounded-lg border border-gray-100 hover:shadow-md transition-all duration-200 group`}>
                                <div className="p-4">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1 min-w-0">
                                            <Link to={`/service-requests/${ticket.id}`} className="text-[13px] text-blue-600 hover:text-blue-700 font-semibold hover:underline transition-colors">
                                                {ticket.id} — {ticket.title}
                                            </Link>
                                            <div className="flex items-center gap-3 mt-2 flex-wrap">
                                                <span className={`inline-flex items-center gap-1.5 text-[11px] font-medium px-2 py-0.5 rounded-full ${stat.bg} ${stat.color}`}>
                                                    <span className={`w-1.5 h-1.5 rounded-full ${stat.dot}`} />{ticket.status}
                                                </span>
                                                <span className={`text-[11px] font-bold text-white px-2 py-0.5 rounded-full ${sev.badge}`}>{sev.label}</span>
                                                <span className="text-[11px] text-gray-400">{ticket.customer}</span>
                                                {ticket.assignedTo && <span className="text-[11px] text-gray-400">→ <span className="text-gray-600 font-medium">{ticket.assignedTo}</span></span>}
                                                <span className="text-[11px] text-gray-300 hidden lg:inline">Created {fmt(ticket.createdOn)}</span>
                                            </div>
                                        </div>
                                        <button onClick={() => setExpandedCard(expandedCard === ticket.id ? null : ticket.id)}
                                            className="p-1.5 rounded-lg hover:bg-gray-50 text-gray-300 hover:text-gray-500 transition ml-3">
                                            <ChevronDown size={16} className={`transition-transform duration-200 ${expandedCard === ticket.id ? "rotate-180" : ""}`} />
                                        </button>
                                    </div>

                                    {expandedCard === ticket.id && (
                                        <div className="mt-3 pt-3 border-t border-gray-100 animate-fade-in">
                                            <p className="text-[12px] text-gray-500 mb-2 line-clamp-2">{ticket.description}</p>
                                            <div className="flex items-center gap-4 text-[12px] text-gray-400">
                                                <span>Requester: <span className="font-medium text-gray-600">{ticket.requester}</span></span>
                                                <span>Notes: <span className="font-medium text-gray-600">{ticket.workNotes.length}</span></span>
                                                <Link to={`/service-requests/${ticket.id}`} className="text-blue-500 hover:text-blue-600 flex items-center gap-1 font-medium ml-auto">
                                                    <Eye size={12} /> View Details
                                                </Link>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Legend */}
            <div className="flex items-center gap-4 mt-6 text-[11px] text-gray-400">
                <span className="font-medium text-gray-500">Color Codes:</span>
                {[{ color: "bg-red-500", label: "Sev 1" }, { color: "bg-orange-400", label: "Sev 2" }, { color: "bg-amber-400", label: "Sev 3" }, { color: "bg-gray-300", label: "Sev 4" }].map(({ color, label }) => (
                    <span key={label} className="flex items-center gap-1.5"><span className={`w-2.5 h-2.5 rounded-sm ${color}`} /> {label}</span>
                ))}
            </div>
        </div>
    );
};

export default ServiceRequests;
