import { TicketSystemSidebar } from "@/components/ticket-system-sidebar";

export default function ReportsPage() {
  const utilizationData = [
    { company: "Acme Corp", totalRequests: 45, software: 20, hardware: 15, access: 10, utilization: "85%" },
    { company: "TechStart Inc", totalRequests: 32, software: 15, hardware: 10, access: 7, utilization: "72%" },
    { company: "Global Systems", totalRequests: 58, software: 25, hardware: 20, access: 13, utilization: "92%" },
  ];

  return (
    <TicketSystemSidebar>
      <div className="flex flex-col gap-6">
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
          Utilization Reports
        </h1>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg border border-neutral-200 dark:border-neutral-700">
            <div className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">Total Requests</div>
            <div className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">135</div>
            <div className="text-xs text-green-600 dark:text-green-400 mt-2">+12% from last month</div>
          </div>
          
          <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg border border-neutral-200 dark:border-neutral-700">
            <div className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">Software Requests</div>
            <div className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">60</div>
            <div className="text-xs text-green-600 dark:text-green-400 mt-2">+8% from last month</div>
          </div>
          
          <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg border border-neutral-200 dark:border-neutral-700">
            <div className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">Hardware Requests</div>
            <div className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">45</div>
            <div className="text-xs text-green-600 dark:text-green-400 mt-2">+5% from last month</div>
          </div>
          
          <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg border border-neutral-200 dark:border-neutral-700">
            <div className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">Avg Utilization</div>
            <div className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">83%</div>
            <div className="text-xs text-green-600 dark:text-green-400 mt-2">+3% from last month</div>
          </div>
        </div>

        {/* Company Utilization Table */}
        <div className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 overflow-hidden">
          <div className="px-6 py-4 border-b border-neutral-200 dark:border-neutral-700">
            <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
              Company-wise Utilization
            </h2>
          </div>
          <table className="w-full">
            <thead className="bg-neutral-100 dark:bg-neutral-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-700 dark:text-neutral-300 uppercase tracking-wider">
                  Company
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-700 dark:text-neutral-300 uppercase tracking-wider">
                  Total Requests
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-700 dark:text-neutral-300 uppercase tracking-wider">
                  Software
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-700 dark:text-neutral-300 uppercase tracking-wider">
                  Hardware
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-700 dark:text-neutral-300 uppercase tracking-wider">
                  Access
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-700 dark:text-neutral-300 uppercase tracking-wider">
                  Utilization
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
              {utilizationData.map((company, idx) => (
                <tr key={idx} className="hover:bg-neutral-50 dark:hover:bg-neutral-900/50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900 dark:text-neutral-100">
                    {company.company}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700 dark:text-neutral-300">
                    {company.totalRequests}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700 dark:text-neutral-300">
                    {company.software}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700 dark:text-neutral-300">
                    {company.hardware}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700 dark:text-neutral-300">
                    {company.access}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-neutral-200 dark:bg-neutral-700 rounded-full h-2 max-w-[100px]">
                        <div 
                          className="bg-green-500 h-2 rounded-full" 
                          style={{ width: company.utilization }}
                        />
                      </div>
                      <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                        {company.utilization}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Request Type Distribution */}
        <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg border border-neutral-200 dark:border-neutral-700">
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
            Request Type Distribution
          </h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-neutral-700 dark:text-neutral-300">Software</span>
                <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">44%</span>
              </div>
              <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: "44%" }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-neutral-700 dark:text-neutral-300">Hardware</span>
                <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">33%</span>
              </div>
              <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: "33%" }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-neutral-700 dark:text-neutral-300">Access</span>
                <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">23%</span>
              </div>
              <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: "23%" }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </TicketSystemSidebar>
  );
}
