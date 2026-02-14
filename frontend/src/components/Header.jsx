import { Bell, Search, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const pageTitles = {
    "/": "Dashboard",
    "/tickets-summary": "Tickets Summary",
    "/service-requests": "Service Requests",
    "/my-requests": "My Requests",
    "/group-requests": "Group Requests",
    "/create-request": "Create Request",
    "/manage-tables": "Credentials Vault",
    "/reports": "Reports",
};

const Header = () => {
    const [dateTime, setDateTime] = useState("");
    const location = useLocation();

    useEffect(() => {
        const update = () => {
            const now = new Date();
            const d = now.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
            const t = now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: false });
            setDateTime(`${d} · ${t} IST`);
        };
        update();
        const interval = setInterval(update, 1000);
        return () => clearInterval(interval);
    }, []);

    const getPageTitle = () => {
        const path = location.pathname;
        if (path.startsWith("/service-requests/")) return "Request Details";
        if (path.startsWith("/reports/")) return "Reports";
        return pageTitles[path] || "Dashboard";
    };

    return (
        <header className="h-14 bg-gradient-to-r from-amber-500 via-amber-500 to-orange-500 flex items-center justify-between px-5 shadow-lg shadow-amber-200/30 relative z-10">
            {/* Left: Page indicator */}
            <div className="flex items-center gap-3">
                <h2 className="text-white/90 font-semibold text-sm tracking-wide">{getPageTitle()}</h2>
            </div>

            {/* Center: Search */}
            <div className="hidden md:flex flex-1 max-w-sm mx-8">
                <div className="relative w-full">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" />
                    <input
                        type="text"
                        placeholder="Search tickets, users..."
                        className="w-full bg-white/15 backdrop-blur-sm border border-white/20 text-white text-[13px] rounded-lg pl-9 pr-4 py-1.5 placeholder-white/40 focus:bg-white/25 focus:border-white/30 transition-all"
                        style={{ boxShadow: "none" }}
                    />
                </div>
            </div>

            {/* Right */}
            <div className="flex items-center gap-3">
                <span className="text-white/70 text-[11px] font-medium hidden lg:block font-mono tracking-tight">
                    {dateTime}
                </span>

                <div className="w-px h-5 bg-white/20 hidden lg:block" />

                <button className="relative p-2 hover:bg-white/15 rounded-lg transition-colors">
                    <Bell size={17} className="text-white/80" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-400 rounded-full ring-2 ring-amber-500" />
                </button>

                <div className="flex items-center gap-2 bg-white/10 hover:bg-white/20 rounded-lg px-2.5 py-1.5 cursor-pointer transition-colors">
                    <div className="w-7 h-7 rounded-full bg-white/25 flex items-center justify-center">
                        <span className="text-white text-[11px] font-bold">NJ</span>
                    </div>
                    <span className="text-white text-[12px] font-medium hidden lg:block">Naveen</span>
                </div>
            </div>
        </header>
    );
};

export default Header;
