import { TicketSystemSidebar } from "@/components/ticket-system-sidebar";

export default function RaiseServiceRequestPage() {
  return (
    <TicketSystemSidebar>
      <div className="flex flex-col gap-6">
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
          Raise Service Request
        </h1>
        
        <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg border border-neutral-200 dark:border-neutral-700">
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Request Title
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 rounded-md border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100"
                placeholder="Enter request title"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Request Type
              </label>
              <select className="w-full px-4 py-2 rounded-md border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100">
                <option>Software</option>
                <option>Hardware</option>
                <option>Access</option>
                <option>Training</option>
                <option>Other</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Priority
              </label>
              <select className="w-full px-4 py-2 rounded-md border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100">
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
                <option>Urgent</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Description
              </label>
              <textarea
                rows={6}
                className="w-full px-4 py-2 rounded-md border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100"
                placeholder="Describe your service request..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Justification
              </label>
              <textarea
                rows={3}
                className="w-full px-4 py-2 rounded-md border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100"
                placeholder="Business justification for this request..."
              />
            </div>
            
            <button
              type="submit"
              className="px-6 py-2 bg-black dark:bg-white text-white dark:text-black rounded-md hover:opacity-80 transition"
            >
              Submit Request
            </button>
          </form>
        </div>
      </div>
    </TicketSystemSidebar>
  );
}
