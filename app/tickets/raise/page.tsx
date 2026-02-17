"use client";

import { TicketSystemSidebar } from "@/components/ticket-system-sidebar";
import { supabase } from "@/lib/supabase";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RaiseTicketPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    priority: "Medium" as "Low" | "Medium" | "High" | "Critical",
    description: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from("tickets").insert({
        title: formData.title,
        description: formData.description,
        priority: formData.priority,
        status: "Open",
        created_by: process.env.NEXT_PUBLIC_CURRENT_USER_ID || "u1000000-0000-0000-0000-000000000005",
      });

      if (error) throw error;

      alert("Ticket created successfully!");
      router.push("/tickets/my-tickets");
    } catch (error) {
      console.error("Error creating ticket:", error);
      alert("Failed to create ticket");
    } finally {
      setLoading(false);
    }
  };

  return (
    <TicketSystemSidebar>
      <div className="flex flex-col gap-6">
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
          Raise a Ticket
        </h1>
        
        <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg border border-neutral-200 dark:border-neutral-700">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Title
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 rounded-md border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100"
                placeholder="Enter ticket title"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Priority
              </label>
              <select 
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value as typeof formData.priority })}
                className="w-full px-4 py-2 rounded-md border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Description
              </label>
              <textarea
                rows={6}
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 rounded-md border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100"
                placeholder="Describe the issue..."
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-black dark:bg-white text-white dark:text-black rounded-md hover:opacity-80 transition disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Submit Ticket"}
            </button>
          </form>
        </div>
      </div>
    </TicketSystemSidebar>
  );
}
