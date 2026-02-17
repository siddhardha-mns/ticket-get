import { TicketSystemSidebar } from "@/components/ticket-system-sidebar";

export default function Home() {
  return (
    <TicketSystemSidebar>
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
          Dashboard
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400">
          Welcome to the Ticket Management System
        </p>
      </div>
    </TicketSystemSidebar>
  );
}
