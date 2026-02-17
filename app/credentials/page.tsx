"use client";

import { TicketSystemSidebar } from "@/components/ticket-system-sidebar";
import { useState } from "react";
import { Eye, EyeOff, Plus } from "lucide-react";

export default function CredentialsPage() {
  const [selectedProject, setSelectedProject] = useState("project-alpha");
  const [showPassword, setShowPassword] = useState<{ [key: string]: boolean }>({});

  const projects = [
    { id: "project-alpha", name: "Project Alpha - CRM System" },
    { id: "project-beta", name: "Project Beta - E-commerce Platform" },
    { id: "project-gamma", name: "Project Gamma - Mobile App" },
  ];

  const credentials = {
    "project-alpha": [
      { id: 1, service: "AWS Console", username: "admin@company.com", password: "••••••••", expiry: "2024-12-31", notes: "Production environment" },
      { id: 2, service: "Database", username: "db_admin", password: "••••••••", expiry: "2024-10-15", notes: "PostgreSQL main DB" },
      { id: 3, service: "API Gateway", username: "api_user", password: "••••••••", expiry: "2024-11-20", notes: "REST API access" },
    ],
    "project-beta": [
      { id: 4, service: "Stripe Dashboard", username: "payments@company.com", password: "••••••••", expiry: "2025-01-15", notes: "Payment processing" },
      { id: 5, service: "Admin Panel", username: "admin", password: "••••••••", expiry: "2024-09-30", notes: "Backend admin access" },
    ],
    "project-gamma": [
      { id: 6, service: "Firebase", username: "mobile@company.com", password: "••••••••", expiry: "2024-12-01", notes: "Mobile backend" },
      { id: 7, service: "App Store Connect", username: "developer@company.com", password: "••••••••", expiry: "2025-03-15", notes: "iOS deployment" },
    ],
  };

  const togglePasswordVisibility = (id: number) => {
    setShowPassword(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const currentCredentials = credentials[selectedProject as keyof typeof credentials] || [];

  return (
    <TicketSystemSidebar>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
            Project Credentials
          </h1>
          <button className="flex items-center gap-2 px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-md hover:opacity-80 transition">
            <Plus className="h-4 w-4" />
            Add Credential
          </button>
        </div>

        {/* Project Selector */}
        <div className="bg-white dark:bg-neutral-800 p-4 rounded-lg border border-neutral-200 dark:border-neutral-700">
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
            Select Project
          </label>
          <select 
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
            className="w-full px-4 py-2 rounded-md border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100"
          >
            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>
        </div>

        {/* Credentials Table */}
        <div className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 overflow-hidden">
          <div className="px-6 py-4 border-b border-neutral-200 dark:border-neutral-700">
            <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
              Credentials for {projects.find(p => p.id === selectedProject)?.name}
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neutral-100 dark:bg-neutral-900">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-700 dark:text-neutral-300 uppercase tracking-wider">
                    Service
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-700 dark:text-neutral-300 uppercase tracking-wider">
                    Username
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-700 dark:text-neutral-300 uppercase tracking-wider">
                    Password
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-700 dark:text-neutral-300 uppercase tracking-wider">
                    Expiry Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-700 dark:text-neutral-300 uppercase tracking-wider">
                    Notes
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-700 dark:text-neutral-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
                {currentCredentials.map((cred) => (
                  <tr key={cred.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-900/50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900 dark:text-neutral-100">
                      {cred.service}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700 dark:text-neutral-300">
                      {cred.username}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-neutral-700 dark:text-neutral-300">
                          {showPassword[cred.id] ? "P@ssw0rd123!" : cred.password}
                        </span>
                        <button
                          onClick={() => togglePasswordVisibility(cred.id)}
                          className="text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"
                        >
                          {showPassword[cred.id] ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700 dark:text-neutral-300">
                      {cred.expiry}
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-700 dark:text-neutral-300">
                      {cred.notes}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button className="text-blue-600 dark:text-blue-400 hover:underline mr-3">
                        Edit
                      </button>
                      <button className="text-red-600 dark:text-red-400 hover:underline">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Security Notice */}
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
          <div className="flex gap-3">
            <div className="text-yellow-600 dark:text-yellow-400">⚠️</div>
            <div>
              <h3 className="text-sm font-semibold text-yellow-900 dark:text-yellow-200 mb-1">
                Security Notice
              </h3>
              <p className="text-sm text-yellow-800 dark:text-yellow-300">
                These credentials are sensitive. Only share with authorized team members. 
                Ensure passwords are rotated regularly and update expiry dates accordingly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </TicketSystemSidebar>
  );
}
