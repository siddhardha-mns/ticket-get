import { Link } from "react-router-dom";
import { FileText, Ticket, PieChart, Shield, ArrowUpRight, TrendingUp, TrendingDown, Clock } from "lucide-react";
import { useApp } from "../context/AppContext";

const Dashboard = () => {
    const { tickets, credentials, currentUser } = useApp();

    const openCount = tickets.filter((t) => t.status === "Open").length;
    const inWorkCount = tickets.filter((t) => t.status === "In Work" || t.status === "Acknowledged").length;
    const completedCount = tickets.filter((t) => t.status === "Completed" || t.status === "Closed").length;

    // Compute recent activity from work notes across all tickets
    const recentActivity = tickets
        .flatMap((t) => t.workNotes.map((n) => ({ ...n, ticketId: t.id, ticketTitle: t.title })))
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);

    const timeSince = (d) => {
        const mins = Math.floor((Date.now() - new Date(d)) / 60000);
        if (mins < 60) return `${mins}m ago`;
        const hrs = Math.floor(mins / 60);
        if (hrs < 24) return `${hrs}h ago`;
        return `${Math.floor(hrs / 24)}d ago`;
    };

    const stats = [
        { label: "Open Tickets", value: openCount, icon: Ticket, color: "from-blue-500 to-blue-600", trend: null },
        { label: "In Progress", value: inWorkCount, icon: Clock, color: "from-amber-500 to-orange-500", trend: null },
        { label: "Completed", value: completedCount, icon: TrendingUp, color: "from-emerald-500 to-teal-600", trend: null },
        { label: "Credentials", value: credentials.length, icon: Shield, color: "from-violet-500 to-purple-600", trend: null },
    ];

    const quickLinks = [
        { to: "/tickets-summary", label: "Tickets Summary", desc: "View incident & request counts", icon: Ticket, gradient: "from-blue-500 to-cyan-500" },
        { to: "/service-requests", label: "Service Requests", desc: "Manage all service requests", icon: FileText, gradient: "from-emerald-500 to-teal-500" },
        { to: "/reports/utilization", label: "Resource Reports", desc: "Track utilization metrics", icon: PieChart, gradient: "from-amber-500 to-orange-500" },
        { to: "/manage-tables", label: "Credentials Vault", desc: "Manage secure credentials", icon: Shield, gradient: "from-violet-500 to-purple-500" },
    ];

    return (
        <div className="p-6 max-w-5xl mx-auto">
            {/* Greeting */}
            <h1 className="text-xl font-bold text-gray-800 tracking-tight mb-0.5">
                Good afternoon, <span className="text-amber-600">{currentUser.name.split(" ")[0]}</span> 👋
            </h1>
            <p className="text-[13px] text-gray-400 mb-6">Here's what's happening across your projects today.</p>

            {/* Stat Cards */}
            <div className="grid grid-cols-4 gap-4 mb-8">
                {stats.map(({ label, value, icon: Icon, color }) => (
                    <div key={label} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-[12px] text-gray-400 font-medium uppercase tracking-wide">{label}</span>
                            <div className={`w-8 h-8 bg-gradient-to-br ${color} rounded-lg flex items-center justify-center`}>
                                <Icon size={16} className="text-white" />
                            </div>
                        </div>
                        <span className="text-2xl font-bold text-gray-800">{value}</span>
                    </div>
                ))}
            </div>

            {/* Quick Access */}
            <h2 className="text-[12px] text-gray-400 font-semibold uppercase tracking-wide mb-3">Quick Access</h2>
            <div className="grid grid-cols-4 gap-4 mb-8">
                {quickLinks.map(({ to, label, desc, icon: Icon, gradient }) => (
                    <Link key={to} to={to}
                        className="group bg-white rounded-xl border border-gray-100 p-5 shadow-sm hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5">
                        <div className={`w-11 h-11 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center shadow-sm mb-3`}>
                            <Icon size={20} className="text-white" />
                        </div>
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-[13px] font-semibold text-gray-800 group-hover:text-amber-600 transition-colors">{label}</p>
                                <p className="text-[11px] text-gray-400 mt-0.5">{desc}</p>
                            </div>
                            <ArrowUpRight size={14} className="text-gray-300 group-hover:text-amber-500 transition mt-1" />
                        </div>
                    </Link>
                ))}
            </div>

            {/* Recent Activity */}
            <h2 className="text-[12px] text-gray-400 font-semibold uppercase tracking-wide mb-3">Recent Activity</h2>
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm divide-y divide-gray-50">
                {recentActivity.length === 0 ? (
                    <div className="p-8 text-center text-gray-300 text-[13px]">No recent activity yet. Create a ticket or add a work note to get started.</div>
                ) : (
                    recentActivity.map((activity) => (
                        <Link to={`/service-requests/${activity.ticketId}`} key={activity.id} className="flex items-center gap-3 px-5 py-3 hover:bg-amber-50/30 transition-colors">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
                                {activity.author.split(" ").map((n) => n[0]).join("")}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-[13px] text-gray-700">
                                    <span className="font-semibold">{activity.author}</span>{" "}
                                    <span className="text-gray-400">on</span>{" "}
                                    <span className="text-blue-600 font-medium">{activity.ticketId}</span>
                                </p>
                                <p className="text-[12px] text-gray-400 truncate">{activity.message}</p>
                            </div>
                            <span className="text-[11px] text-gray-300">{timeSince(activity.createdAt)}</span>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
};

export default Dashboard;
