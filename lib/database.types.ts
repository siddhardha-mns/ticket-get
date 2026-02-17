export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          name: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          name: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string;
          created_at?: string;
        };
      };
      companies: {
        Row: {
          id: string;
          name: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          created_at?: string;
        };
      };
      tickets: {
        Row: {
          id: string;
          ticket_id: string;
          title: string;
          description: string;
          priority: "Low" | "Medium" | "High" | "Critical";
          status: "Open" | "In Progress" | "Resolved" | "Closed";
          created_by: string;
          assigned_to: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          ticket_id?: string;
          title: string;
          description: string;
          priority: "Low" | "Medium" | "High" | "Critical";
          status?: "Open" | "In Progress" | "Resolved" | "Closed";
          created_by: string;
          assigned_to?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          ticket_id?: string;
          title?: string;
          description?: string;
          priority?: "Low" | "Medium" | "High" | "Critical";
          status?: "Open" | "In Progress" | "Resolved" | "Closed";
          created_by?: string;
          assigned_to?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      service_requests: {
        Row: {
          id: string;
          request_id: string;
          title: string;
          description: string;
          justification: string | null;
          type: "Software" | "Hardware" | "Access" | "Training" | "Other";
          priority: "Low" | "Medium" | "High" | "Urgent";
          status: "Pending" | "In Review" | "Approved" | "Rejected" | "Completed";
          requester_id: string;
          assigned_to: string | null;
          company_id: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          request_id?: string;
          title: string;
          description: string;
          justification?: string | null;
          type: "Software" | "Hardware" | "Access" | "Training" | "Other";
          priority: "Low" | "Medium" | "High" | "Urgent";
          status?: "Pending" | "In Review" | "Approved" | "Rejected" | "Completed";
          requester_id: string;
          assigned_to?: string | null;
          company_id: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          request_id?: string;
          title?: string;
          description?: string;
          justification?: string | null;
          type?: "Software" | "Hardware" | "Access" | "Training" | "Other";
          priority?: "Low" | "Medium" | "High" | "Urgent";
          status?: "Pending" | "In Review" | "Approved" | "Rejected" | "Completed";
          requester_id?: string;
          assigned_to?: string | null;
          company_id?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      projects: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          status: "Active" | "Completed" | "On Hold";
          company_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string | null;
          status?: "Active" | "Completed" | "On Hold";
          company_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string | null;
          status?: "Active" | "Completed" | "On Hold";
          company_id?: string;
          created_at?: string;
        };
      };
      credentials: {
        Row: {
          id: string;
          project_id: string;
          service: string;
          username: string;
          password: string;
          expiry_date: string | null;
          notes: string | null;
          created_by: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          project_id: string;
          service: string;
          username: string;
          password: string;
          expiry_date?: string | null;
          notes?: string | null;
          created_by: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          project_id?: string;
          service?: string;
          username?: string;
          password?: string;
          expiry_date?: string | null;
          notes?: string | null;
          created_by?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
};

// Helper types
export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];
export type InsertTables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Insert"];
export type UpdateTables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Update"];

export type Ticket = Tables<"tickets">;
export type ServiceRequest = Tables<"service_requests">;
export type Project = Tables<"projects">;
export type Credential = Tables<"credentials">;
export type Company = Tables<"companies">;
export type User = Tables<"users">;
