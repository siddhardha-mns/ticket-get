import { TicketSystemSidebar } from "@/components/ticket-system-sidebar";

export default function AllServiceRequestsPage() {
  const requests = [
    { id: "SR-001", title: "New Software License", requester: "John Doe", status: "Pending", type: "Software", date: "2024-02-15" },
    { id: "SR-002", title: "Hardware Upgrade", requester: "Jane Smith", status: "Approved", type: "Hardware", date: "2024-02-14" },
    { id: "SR-003", title: "Access Request", requester: "Bob Johnson", status: "In Review", type: "Access", date: "2024-02-16" },
    { id: "SR-004", title: "Training Request", requester: "Alice Brown", status: "Completed", type: "Training", date: "2024-02-13" },
  ];

  return (
    <TicketSystemSidebar>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
            All Service Requests
          </h1>
          <div className="flex gap-2">
            <select className="px-4 py-2 rounded-md border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 text-sm">
              <option>All Types</option>
              <option>Software</option>
              <option>Hardware</option>
              <option>Access</option>
              <option>Training</option>
            </select>
            <select className="px-4 py-2 rounded-md border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 text-sm">
              <option>All Status</option>
              <option>Pending</option>
              <option>Approved</option>
              <option>In Review</option>
              <option>Completed</option>
            </select>
          </div>
        </div>
        
        <div className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 overflow-hidden">
          <table className="w-full">
            <thead className="bg-neutral-100 dark:bg-neutral-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-700 dark:text-neutral-300 uppercase tracking-wider">
                  Request ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-700 dark:text-neutral-300 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-700 dark:text-neutral-300 uppercase tracking-wider">
                  Requester
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-700 dark:text-neutral-300 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-700 dark:text-neutral-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-700 dark:text-neutral-300 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
              {requests.map((request) => (
                <tr key={request.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-900/50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900 dark:text-neutral-100">
                    {request.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700 dark:text-neutral-300">
                    {request.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700 dark:text-neutral-300">
                    {request.requester}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                      {request.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      request.status === "Completed" 
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        : request.status === "Approved"
                        ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                        : request.status === "In Review"
                        ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                        : "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
                    }`}>
                      {request.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700 dark:text-neutral-300">
                    {request.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </TicketSystemSidebar>
  );
}
