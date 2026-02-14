import { useState, useMemo } from "react";
import { FileDown, TrendingUp } from "lucide-react";
import { useApp } from "../context/AppContext";

const fmt = (d) => d ? new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "2-digit", year: "numeric" }) : "—";

const Reports = () => {
    const { tickets } = useApp();
    const [periodFrom, setPeriodFrom] = useState("2026-01-01");
    const [periodTo, setPeriodTo] = useState("2026-12-31");
    const [generatedFor, setGeneratedFor] = useState("All");
    const [generated, setGenerated] = useState(true);

    // Build utilization data from work notes
    const utilization = useMemo(() => {
        if (!generated) return [];
        const from = new Date(periodFrom);
        const to = new Date(periodTo);

        return tickets.flatMap((t) =>
            t.workNotes
                .filter((n) => {
                    const d = new Date(n.createdAt);
                    return d >= from && d <= to;
                })
                .filter(() => {
                    if (generatedFor === "All") return true;
                    if (generatedFor === "Service Request") return t.type === "Service Request";
                    if (generatedFor === "Incident") return t.type === "Incident";
                    return true;
                })
                .map((n) => ({
                    key: `${t.id}-${n.id}`,
                    associate: n.author,
                    customer: t.customer,
                    id: t.id,
                    type: t.type,
                    title: t.title,
                    hours: n.timeWorked || "00:00",
                    createdOn: fmt(n.createdAt),
                }))
        );
    }, [tickets, periodFrom, periodTo, generatedFor, generated]);

    const totalHours = useMemo(() => {
        return utilization.reduce((acc, r) => {
            const [h, m] = r.hours.split(":").map(Number);
            return acc + h * 60 + m;
        }, 0);
    }, [utilization]);

    const totalH = Math.floor(totalHours / 60);
    const totalM = totalHours % 60;

    const handleExport = () => {
        const csv = [
            "Associate,Customer,Ticket ID,Type,Title,Hours,Created",
            ...utilization.map((r) => `"${r.associate}","${r.customer}","${r.id}","${r.type}","${r.title}","${r.hours}","${r.createdOn}"`),
        ].join("\n");
        const blob = new Blob([csv], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a"); a.href = url; a.download = "utilization_report.csv"; a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center shadow-sm">
                    <TrendingUp size={20} className="text-white" />
                </div>
                <div>
                    <h1 className="text-xl font-bold text-gray-800 tracking-tight">Resource Utilization</h1>
                    <p className="text-[12px] text-gray-400">Track time spent across service requests and incidents</p>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl border border-gray-100 p-5 mb-5 shadow-sm">
                <div className="flex flex-wrap items-center gap-4 text-[13px]">
                    <div className="flex items-center gap-2">
                        <label className="text-gray-400 font-medium text-[12px]">Period</label>
                        <input type="date" value={periodFrom} onChange={(e) => setPeriodFrom(e.target.value)} className="border border-gray-200 rounded-lg px-3 py-2 text-[13px] bg-gray-50" />
                        <span className="text-gray-300">–</span>
                        <input type="date" value={periodTo} onChange={(e) => setPeriodTo(e.target.value)} className="border border-gray-200 rounded-lg px-3 py-2 text-[13px] bg-gray-50" />
                    </div>
                    <div className="flex items-center gap-2">
                        <label className="text-gray-400 font-medium text-[12px]">Type</label>
                        <select value={generatedFor} onChange={(e) => setGeneratedFor(e.target.value)} className="border border-gray-200 rounded-lg px-3 py-2 text-[13px] bg-gray-50">
                            <option>All</option><option>Service Request</option><option>Incident</option>
                        </select>
                    </div>
                </div>
                <div className="flex items-center gap-3 mt-4">
                    <button onClick={() => setGenerated(true)}
                        className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-5 py-2 rounded-lg text-[13px] font-medium hover:shadow-md hover:shadow-amber-200/50 transition-all active:scale-95">
                        Generate Report
                    </button>
                    <button onClick={() => setGenerated(false)} className="border border-gray-200 px-4 py-2 rounded-lg text-[13px] text-gray-500 hover:bg-gray-50 transition">Clear</button>
                </div>
            </div>

            {generated && (
                <>
                    {/* Summary + Export */}
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-4 text-[12px] text-gray-500">
                            <span>{utilization.length} entries</span>
                            <span className="h-4 w-px bg-gray-200" />
                            <span className="font-semibold text-amber-600">Total: {String(totalH).padStart(2, "0")}:{String(totalM).padStart(2, "0")} hours</span>
                        </div>
                        <button onClick={handleExport}
                            className="flex items-center gap-1.5 text-[12px] text-gray-500 border border-gray-200 rounded-lg px-3 py-1.5 hover:bg-gray-50 transition active:scale-95">
                            <FileDown size={13} /> Export CSV
                        </button>
                    </div>

                    {/* Table */}
                    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
                        <table className="w-full text-[13px]">
                            <thead>
                                <tr className="bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-100/50">
                                    <th className="text-left px-5 py-3 font-semibold text-amber-800 text-[11px] uppercase tracking-wide">Associate</th>
                                    <th className="text-left px-5 py-3 font-semibold text-amber-800 text-[11px] uppercase tracking-wide">Customer</th>
                                    <th className="text-left px-5 py-3 font-semibold text-amber-800 text-[11px] uppercase tracking-wide">Ticket ID</th>
                                    <th className="text-left px-5 py-3 font-semibold text-amber-800 text-[11px] uppercase tracking-wide">Type</th>
                                    <th className="text-left px-5 py-3 font-semibold text-amber-800 text-[11px] uppercase tracking-wide">Title</th>
                                    <th className="text-left px-5 py-3 font-semibold text-amber-800 text-[11px] uppercase tracking-wide">Hours</th>
                                    <th className="text-left px-5 py-3 font-semibold text-amber-800 text-[11px] uppercase tracking-wide">Created</th>
                                </tr>
                            </thead>
                            <tbody>
                                {utilization.length === 0 ? (
                                    <tr><td colSpan={7} className="text-center py-12 text-gray-300 text-sm">No utilization data for this period. Add work notes to tickets to see them here.</td></tr>
                                ) : utilization.map((row) => (
                                    <tr key={row.key} className="border-b border-gray-50 hover:bg-amber-50/20 transition-colors">
                                        <td className="px-5 py-2.5 text-gray-700 font-medium">{row.associate}</td>
                                        <td className="px-5 py-2.5 text-gray-500">{row.customer}</td>
                                        <td className="px-5 py-2.5 text-blue-600 font-medium">{row.id}</td>
                                        <td className="px-5 py-2.5">
                                            <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${row.type === "Incident" ? "bg-red-50 text-red-500" : "bg-blue-50 text-blue-500"}`}>
                                                {row.type}
                                            </span>
                                        </td>
                                        <td className="px-5 py-2.5 text-gray-600 truncate max-w-[250px]">{row.title}</td>
                                        <td className="px-5 py-2.5">
                                            <span className="bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full text-[11px] font-semibold">{row.hours}</span>
                                        </td>
                                        <td className="px-5 py-2.5 text-gray-400 text-[12px]">{row.createdOn}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </div>
    );
};

export default Reports;
