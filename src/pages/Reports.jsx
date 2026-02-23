import { useState } from "react";
import { COLORS } from "../assets/theme";

export default function ReportsPage() {
    const [tab, setTab] = useState("utilisation");
    const monthlyData = [45, 62, 38, 71, 55, 83, 67, 90, 74, 58, 86, 72];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const maxVal = Math.max(...monthlyData);
    const typeData = [
        { label: "Network", val: 34, color: "#3b82f6" },
        { label: "Software", val: 28, color: "#8b5cf6" },
        { label: "Hardware", val: 18, color: "#10b981" },
        { label: "Database", val: 12, color: "#f59e0b" },
        { label: "Other", val: 8, color: "#ef4444" },
    ];
    const totalType = typeData.reduce((a, b) => a + b.val, 0);

    let cumulPercent = 0;
    const donutSegments = typeData.map(d => {
        const pct = (d.val / totalType) * 100;
        const seg = { ...d, offset: cumulPercent, pct };
        cumulPercent += pct;
        return seg;
    });

    const circumference = 2 * Math.PI * 36;

    return (
        <div>
            <div className="page-header">
                <div className="page-title">Reports & Analytics</div>
                <div className="page-subtitle">Utilisation metrics and insights</div>
            </div>

            <div className="tabs">
                <div className={`tab ${tab === "utilisation" ? "active" : ""}`} onClick={() => setTab("utilisation")}>Utilisation</div>
                <div className={`tab ${tab === "breakdown" ? "active" : ""}`} onClick={() => setTab("breakdown")}>By Type</div>
                <div className={`tab ${tab === "team" ? "active" : ""}`} onClick={() => setTab("team")}>By Team</div>
            </div>

            {tab === "utilisation" && (
                <>
                    <div className="card-grid card-grid-4" style={{ marginBottom: 20 }}>
                        {[
                            { label: "Total Tickets", val: "342", change: "+12%", color: COLORS.accent },
                            { label: "Resolved", val: "287", change: "+8%", color: COLORS.success },
                            { label: "Avg Resolution", val: "2.4d", change: "-18%", color: COLORS.warning },
                            { label: "Open SLA Breach", val: "7", change: "-3", color: COLORS.danger },
                        ].map(s => (
                            <div key={s.label} className="stat-card">
                                <div className="stat-value" style={{ color: s.color }}>{s.val}</div>
                                <div className="stat-label">{s.label}</div>
                                <div className="stat-change" style={{ color: s.change.startsWith("+") || s.change.startsWith("-") ? COLORS.success : COLORS.textMuted }}>{s.change} this month</div>
                            </div>
                        ))}
                    </div>
                    <div className="card">
                        <div className="font-bold" style={{ marginBottom: 4 }}>Monthly Request Volume</div>
                        <div className="text-muted">Tickets raised per month — current year</div>
                        <div className="chart-bar-wrap">
                            {monthlyData.map((v, i) => (
                                <div key={i} className="chart-bar" style={{ height: `${(v / maxVal) * 100}%`, background: i === 1 ? COLORS.accent : `rgba(59,130,246,0.3)` }} title={`${months[i]}: ${v}`} />
                            ))}
                        </div>
                        <div className="chart-labels">
                            {months.map(m => <div key={m} className="chart-label">{m}</div>)}
                        </div>
                    </div>
                </>
            )}

            {tab === "breakdown" && (
                <div className="card-grid card-grid-2">
                    <div className="card">
                        <div className="font-bold mb-16">Requests by Type</div>
                        <div className="donut-wrap">
                            <svg width="100" height="100" viewBox="0 0 100 100">
                                {donutSegments.map((seg, i) => (
                                    <circle key={i} cx="50" cy="50" r="36"
                                        fill="none" stroke={seg.color} strokeWidth="16"
                                        strokeDasharray={`${(seg.pct / 100) * circumference} ${circumference}`}
                                        strokeDashoffset={-((seg.offset / 100) * circumference)}
                                        transform="rotate(-90 50 50)"
                                    />
                                ))}
                                <text x="50" y="46" textAnchor="middle" fill={COLORS.text} fontSize="14" fontWeight="800" fontFamily="Syne">{totalType}</text>
                                <text x="50" y="58" textAnchor="middle" fill={COLORS.textMuted} fontSize="7" fontFamily="DM Mono">TOTAL</text>
                            </svg>
                            <div className="legend">
                                {typeData.map(d => (
                                    <div key={d.label} className="legend-item">
                                        <div className="legend-dot" style={{ background: d.color }} />
                                        <span style={{ color: COLORS.textDim }}>{d.label}</span>
                                        <span className="font-bold" style={{ marginLeft: "auto", paddingLeft: 12 }}>{d.val}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="font-bold mb-16">Type Distribution</div>
                        {typeData.map(d => (
                            <div key={d.label} style={{ marginBottom: 14 }}>
                                <div className="flex items-center justify-between" style={{ marginBottom: 4 }}>
                                    <span className="text-sm">{d.label}</span>
                                    <span className="text-mono text-muted" style={{ fontSize: 11 }}>{Math.round(d.val / totalType * 100)}%</span>
                                </div>
                                <div className="progress-bar"><div className="progress-fill" style={{ width: `${(d.val / totalType) * 100}%`, background: d.color }} /></div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {tab === "team" && (
                <div className="card">
                    <div className="font-bold mb-16">Request Volume by Team</div>
                    <div className="table-wrap">
                        <table>
                            <thead><tr><th>Team</th><th>Assigned</th><th>Resolved</th><th>Open</th><th>Avg SLA</th><th>Utilisation</th></tr></thead>
                            <tbody>
                                {[
                                    { team: "IT Support", assigned: 87, resolved: 79, open: 8, sla: "1.8d", util: 91 },
                                    { team: "DevOps", assigned: 54, resolved: 48, open: 6, sla: "3.2d", util: 89 },
                                    { team: "Procurement", assigned: 32, resolved: 30, open: 2, sla: "4.1d", util: 94 },
                                    { team: "Security", assigned: 28, resolved: 22, open: 6, sla: "2.9d", util: 79 },
                                    { team: "Facilities", assigned: 41, resolved: 38, open: 3, sla: "5.0d", util: 93 },
                                ].map(row => (
                                    <tr key={row.team}>
                                        <td className="font-bold">{row.team}</td>
                                        <td>{row.assigned}</td>
                                        <td style={{ color: COLORS.success }}>{row.resolved}</td>
                                        <td style={{ color: row.open > 5 ? COLORS.danger : COLORS.warning }}>{row.open}</td>
                                        <td className="text-mono" style={{ fontSize: 12 }}>{row.sla}</td>
                                        <td>
                                            <div className="flex items-center gap-8">
                                                <div className="progress-bar" style={{ flex: 1 }}><div className="progress-fill" style={{ width: `${row.util}%`, background: row.util > 90 ? COLORS.success : COLORS.accent }} /></div>
                                                <span className="text-mono text-muted" style={{ fontSize: 11, minWidth: 32 }}>{row.util}%</span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
