"use client";

import React from "react";
import {
  Ticket,
  FileText,
  BarChart3,
  KeyRound,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function TicketSystemSidebar({ children }: { children: React.ReactNode }) {
  const [expandedSections, setExpandedSections] = React.useState<{
    [key: string]: boolean;
  }>({
    tickets: false,
    serviceRequests: false,
  });

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const mainLinks = [
    {
      label: "Tickets",
      href: "#",
      icon: (
        <Ticket className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
      hasSubmenu: true,
      section: "tickets",
    },
    {
      label: "Service Requests",
      href: "#",
      icon: (
        <FileText className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
      hasSubmenu: true,
      section: "serviceRequests",
    },
    {
      label: "Reports",
      href: "/reports",
      icon: (
        <BarChart3 className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
      hasSubmenu: false,
    },
    {
      label: "Credentials",
      href: "/credentials",
      icon: (
        <KeyRound className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
      hasSubmenu: false,
    },
  ];

  const ticketSubLinks = [
    {
      label: "Raise Ticket",
      href: "/tickets/raise",
    },
    {
      label: "My Tickets",
      href: "/tickets/my-tickets",
    },
  ];

  const serviceRequestSubLinks = [
    {
      label: "All Requests",
      href: "/service-requests/all",
    },
    {
      label: "My Requests",
      href: "/service-requests/my-requests",
    },
    {
      label: "Raise Request",
      href: "/service-requests/raise",
    },
  ];

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-neutral-900">
      {/* Sidebar */}
      <aside className="w-[280px] bg-white dark:bg-neutral-800 border-r border-neutral-200 dark:border-neutral-700 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-neutral-200 dark:border-neutral-700">
          <Link href="/" className="flex items-center gap-3">
            <div className="h-8 w-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">T</span>
            </div>
            <span className="font-semibold text-lg text-neutral-900 dark:text-white">
              Ticket System
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4">
          <div className="space-y-1">
            {mainLinks.map((link, idx) => (
              <div key={idx}>
                {link.hasSubmenu ? (
                  <div>
                    <button
                      onClick={() => toggleSection(link.section!)}
                      className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        {link.icon}
                        <span className="text-sm font-medium">{link.label}</span>
                      </div>
                      {expandedSections[link.section!] ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </button>
                    {expandedSections[link.section!] && (
                      <div className="ml-11 mt-1 space-y-1">
                        {(link.section === "tickets"
                          ? ticketSubLinks
                          : serviceRequestSubLinks
                        ).map((subLink, subIdx) => (
                          <Link
                            key={subIdx}
                            href={subLink.href}
                            className="block px-3 py-2 text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-700/50 rounded-lg transition-colors"
                          >
                            {subLink.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={link.href}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                  >
                    {link.icon}
                    <span className="text-sm font-medium">{link.label}</span>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-neutral-200 dark:border-neutral-700">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
              <span className="text-white text-sm font-medium">U</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-neutral-900 dark:text-white truncate">
                User Name
              </p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate">
                user@company.com
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-8">
        {children}
      </main>
    </div>
  );
}

