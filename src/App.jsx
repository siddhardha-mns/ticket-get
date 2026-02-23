import { useState } from "react";
import "./assets/App.css";
import { COLORS } from "./assets/theme";
import { Icon } from "./components/Icon";
import TicketsPage from "./pages/Tickets";
import ServiceRequestsPage from "./pages/ServiceRequests";
import ReportsPage from "./pages/Reports";
import CredentialsPage from "./pages/Credentials";

const navItems = [
    { id: "tickets", label: "Tickets", icon: "ticket" },
    { id: "service", label: "Service Requests", icon: "service" },
    { id: "reports", label: "Reports", icon: "reports" },
    { id: "credentials", label: "Credentials", icon: "credentials" },
];

export default function App() {
    const [page, setPage] = useState("tickets");

    const pageComponents = {
        tickets: <TicketsPage />,
        service: <ServiceRequestsPage />,
        reports: <ReportsPage />,
        credentials: <CredentialsPage />,
    };

    return (
        <div className="layout">
            <aside className="sidebar">
                <div className="logo">
                    <div className="logo-mark">HelpdeskOS</div>
                    <div className="logo-sub">v2.4 · Enterprise</div>
                </div>
                <div className="nav-section">
                    <div className="nav-label">Navigation</div>
                    {navItems.map(item => (
                        <div
                            key={item.id}
                            className={`nav-item ${page === item.id ? "active" : ""}`}
                            onClick={() => setPage(item.id)}
                        >
                            <Icon name={item.icon} />
                            {item.label}
                        </div>
                    ))}
                </div>

                <div style={{ marginTop: "auto", padding: "16px 20px", borderTop: `1px solid ${COLORS.border}` }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ width: 32, height: 32, borderRadius: "50%", background: `linear-gradient(135deg, ${COLORS.accent}, #8b5cf6)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800 }}>A</div>
                        <div>
                            <div style={{ fontSize: 13, fontWeight: 700 }}>Alex Johnson</div>
                            <div style={{ fontSize: 10, color: COLORS.textMuted, fontFamily: "DM Mono" }}>IT Admin</div>
                        </div>
                    </div>
                </div>
            </aside>

            <main className="main">
                {pageComponents[page]}
            </main>
        </div>
    );
}
