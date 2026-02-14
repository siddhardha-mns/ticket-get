import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
    ChevronDown,
    ChevronRight,
    BarChart3,
    Ticket,
    FileText,
    Monitor,
    Users,
    ShoppingBag,
    UserCog,
    PieChart,
    Plus,
    LayoutDashboard,
    Shield,
} from "lucide-react";

const SidebarSection = ({ icon: Icon, label, children, defaultOpen = false }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    return (
        <div className="mb-0.5">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between px-3 py-2 text-[13px] rounded-lg text-gray-600 hover:bg-amber-50 hover:text-amber-900 transition-all duration-200 group"
            >
                <span className="flex items-center gap-2.5">
                    {Icon && <Icon size={16} className="text-gray-400 group-hover:text-amber-600 transition-colors" strokeWidth={1.8} />}
                    <span className="font-medium">{label}</span>
                </span>
                <span className={`transition-transform duration-200 ${isOpen ? "rotate-90" : ""}`}>
                    <ChevronRight size={13} className="text-gray-400" />
                </span>
            </button>
            <div className={`overflow-hidden transition-all duration-200 ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
                <div className="ml-3 pl-3 border-l border-gray-100 mt-0.5 space-y-0.5">
                    {children}
                </div>
            </div>
        </div>
    );
};

const SidebarLink = ({ to, label, icon: Icon, isGreen = false }) => {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                `flex items-center gap-2.5 px-3 py-[7px] text-[13px] rounded-lg transition-all duration-200 ${isActive
                    ? "bg-gradient-to-r from-amber-50 to-orange-50 text-amber-800 font-semibold shadow-sm border border-amber-100"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
                }`
            }
        >
            {Icon && <Icon size={14} className={isGreen ? "text-emerald-500" : "text-gray-400"} strokeWidth={2} />}
            <span>{label}</span>
        </NavLink>
    );
};

const Sidebar = () => {
    return (
        <aside className="w-[240px] min-w-[240px] h-screen bg-white border-r border-gray-100 flex flex-col overflow-hidden">
            {/* Logo */}
            <div className="flex items-center gap-3 px-5 py-5 border-b border-gray-50">
                <div className="w-9 h-9 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-md shadow-amber-200/50">
                    <Ticket size={18} className="text-white" strokeWidth={2.5} />
                </div>
                <div>
                    <h1 className="font-bold text-[15px] text-gray-800 tracking-tight leading-none">TicketFlow</h1>
                    <p className="text-[10px] text-gray-400 font-medium mt-0.5 tracking-wide uppercase">Service Desk</p>
                </div>
            </div>

            {/* Nav */}
            <nav className="flex-1 overflow-y-auto py-3 px-3 space-y-0.5">
                <SidebarLink to="/" label="Dashboard" icon={LayoutDashboard} />
                <SidebarLink to="/tickets-summary" label="Tickets Summary" icon={BarChart3} />

                <div className="pt-2 pb-1 px-3">
                    <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-[0.08em]">Service Management</span>
                </div>

                <SidebarSection icon={FileText} label="Service Requests" defaultOpen={true}>
                    <SidebarLink to="/service-requests" label="All Requests" />
                    <SidebarLink to="/my-requests" label="My Requests" />
                    <SidebarLink to="/group-requests" label="Group Requests" />
                    <SidebarLink to="/create-request" label="Create Request" icon={Plus} isGreen />
                </SidebarSection>

                <SidebarSection icon={Monitor} label="Monitoring">
                    <SidebarLink to="/monitoring" label="System Status" />
                </SidebarSection>

                <SidebarSection icon={Users} label="Customers">
                    <SidebarLink to="/customers" label="Customer List" />
                </SidebarSection>

                <SidebarSection icon={ShoppingBag} label="Catalogue">
                    <SidebarLink to="/catalogue" label="Items" />
                </SidebarSection>

                <SidebarSection icon={UserCog} label="User Management">
                    <SidebarLink to="/user-management" label="Users" />
                </SidebarSection>

                <SidebarLink to="/manage-tables" label="Credentials Vault" icon={Shield} />

                <div className="pt-3 pb-1 px-3">
                    <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-[0.08em]">Analytics</span>
                </div>

                <SidebarSection icon={PieChart} label="Reports" defaultOpen={true}>
                    <SidebarLink to="/reports/status" label="By Status" />
                    <SidebarLink to="/reports/severity" label="By Severity" />
                    <SidebarLink to="/reports/status-severity" label="Status & Severity" />
                    <SidebarLink to="/reports/customer" label="By Customer" />
                    <SidebarLink to="/reports/trend" label="By Trend" />
                    <SidebarLink to="/reports/utilization" label="Resource Utilization" />
                </SidebarSection>

                <div className="pt-2 pb-1 px-3">
                    <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-[0.08em]">My Metrics</span>
                </div>
                <SidebarLink to="/reports/map" label="MAP Report" icon={BarChart3} />
                <SidebarLink to="/reports/week" label="Weekly Analysis" icon={PieChart} />
            </nav>

            {/* User */}
            <div className="p-3 border-t border-gray-50">
                <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                        NJ
                    </div>
                    <div className="min-w-0">
                        <p className="text-[12px] font-semibold text-gray-700 truncate">Naveen Jejji</p>
                        <p className="text-[10px] text-gray-400">Admin</p>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
