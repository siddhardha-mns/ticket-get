import { useState, useMemo } from "react";
import { RefreshCw } from "lucide-react";
import { useApp } from "../context/AppContext";

const TicketsSummary = () => {
    const { tickets } = useApp();
    const [viewType, setViewType] = useState("All");

    const summary = useMemo(() => {
        const filtered = viewType === "All"
            ? tickets
            : tickets.filter((t) => viewType === "Incidents" ? t.type === "Incident" : t.type === "Service Request");

        // Group by customer
        const byCustomer = {};
        filtered.forEach((t) => {
            if (!byCustomer[t.customer]) byCustomer[t.customer] = { open: 0, acknowledged: 0, inWork: 0, pending: 0, completed: 0 };
            const s = t.status;
            if (s === "Open") byCustomer[t.customer].open++;
            else if (s === "Acknowledged") byCustomer[t.customer].acknowledged++;
            else if (s === "In Work") byCustomer[t.customer].inWork++;
            else if (s === "Pending") byCustomer[t.customer].pending++;
            else byCustomer[t.customer].completed++;
        });

        // Compute totals
        const totals = { open: 0, acknowledged: 0, inWork: 0, pending: 0, completed: 0 };
        Object.values(byCustomer).forEach((v) => {
            totals.open += v.open; totals.acknowledged += v.acknowledged;
            totals.inWork += v.inWork; totals.pending += v.pending; totals.completed += v.completed;
        });

        return { byCustomer, totals, total: filtered.length };
    }, [tickets, viewType]);

    const CountBadge = ({ value, color }) => (
        <span className={`inline-block min-w-[24px] text-center font-semibold px-2 py-0.5 rounded-full text-[12px] ${value > 0 ? color : "bg-gray-50 text-gray-300"}`}>
            {value}
        </span>
    );

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <h1 className="text-xl font-bold text-gray-800 tracking-tight mb-6">Tickets Summary</h1>

            {/* Controls */}
            <div className="bg-white rounded-xl border border-gray-100 p-4 mb-5 shadow-sm">
                <div className="flex items-center gap-4 flex-wrap">
                    <div className="flex items-center gap-3">
                        {["All", "Incidents", "Service Requests"].map((type) => (
                            <button key={type} onClick={() => setViewType(type)}
                                className={`text-[13px] px-3.5 py-1.5 rounded-lg border transition-all ${viewType === type
                                    ? "bg-amber-50 border-amber-200 text-amber-700 font-semibold"
                                    : "border-transparent text-gray-400 hover:text-gray-600 hover:bg-gray-50"}`}>
                                {type}
                            </button>
                        ))}
                    </div>
                    <div className="h-5 w-px bg-gray-200" />
                    <span className="text-[12px] text-gray-400">{summary.total} total tickets</span>
                </div>
            </div>

            {/* Summary Table */}
            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
                <table className="w-full text-[13px]">
                    <thead>
                        <tr className="bg-gradient-to-r from-gray-50 to-gray-100/80 border-b border-gray-100">
                            <th className="text-left px-5 py-3 font-semibold text-gray-500 text-[12px] uppercase tracking-wide">Customer</th>
                            <th className="text-center px-5 py-3 font-semibold text-gray-500 text-[12px] uppercase tracking-wide">Open</th>
                            <th className="text-center px-5 py-3 font-semibold text-gray-500 text-[12px] uppercase tracking-wide">Acknowledged</th>
                            <th className="text-center px-5 py-3 font-semibold text-gray-500 text-[12px] uppercase tracking-wide">In Work</th>
                            <th className="text-center px-5 py-3 font-semibold text-gray-500 text-[12px] uppercase tracking-wide">Pending</th>
                            <th className="text-center px-5 py-3 font-semibold text-gray-500 text-[12px] uppercase tracking-wide">Completed</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(summary.byCustomer).length === 0 ? (
                            <tr><td colSpan={6} className="text-center py-8 text-gray-300 text-sm">No tickets match the selected filter</td></tr>
                        ) : (
                            <>
                                {Object.entries(summary.byCustomer).map(([customer, counts]) => (
                                    <tr key={customer} className="border-b border-gray-50 hover:bg-amber-50/30 transition-colors">
                                        <td className="px-5 py-3 font-semibold text-gray-700">{customer}</td>
                                        <td className="text-center px-5 py-3"><CountBadge value={counts.open} color="bg-red-50 text-red-600" /></td>
                                        <td className="text-center px-5 py-3"><CountBadge value={counts.acknowledged} color="bg-orange-50 text-orange-600" /></td>
                                        <td className="text-center px-5 py-3"><CountBadge value={counts.inWork} color="bg-blue-50 text-blue-600" /></td>
                                        <td className="text-center px-5 py-3"><CountBadge value={counts.pending} color="bg-gray-100 text-gray-500" /></td>
                                        <td className="text-center px-5 py-3"><CountBadge value={counts.completed} color="bg-emerald-50 text-emerald-600" /></td>
                                    </tr>
                                ))}
                                {/* Totals row */}
                                <tr className="bg-gray-50/70 font-semibold border-t border-gray-200">
                                    <td className="px-5 py-3 text-gray-800">Total</td>
                                    <td className="text-center px-5 py-3"><CountBadge value={summary.totals.open} color="bg-red-100 text-red-700" /></td>
                                    <td className="text-center px-5 py-3"><CountBadge value={summary.totals.acknowledged} color="bg-orange-100 text-orange-700" /></td>
                                    <td className="text-center px-5 py-3"><CountBadge value={summary.totals.inWork} color="bg-blue-100 text-blue-700" /></td>
                                    <td className="text-center px-5 py-3"><CountBadge value={summary.totals.pending} color="bg-gray-200 text-gray-600" /></td>
                                    <td className="text-center px-5 py-3"><CountBadge value={summary.totals.completed} color="bg-emerald-100 text-emerald-700" /></td>
                                </tr>
                            </>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TicketsSummary;
