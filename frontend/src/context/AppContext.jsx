import { createContext, useContext, useState, useCallback } from "react";

// Generate unique IDs
let idCounter = 1000;
const generateId = (prefix = "SR") => `${prefix}-${String(++idCounter).padStart(6, "0")}`;

// Initial seed data (generic placeholders)
const SEED_TICKETS = [
    {
        id: "SR-000001",
        title: "Server response time degradation",
        description: "Users are experiencing slow page loads on the main dashboard. Response times exceed 5 seconds during peak hours.",
        status: "Open",
        severity: "Severity1",
        priority: "Priority 1",
        assignedTo: "Alex Johnson",
        customer: "Acme Corp",
        requester: "Jane Smith",
        email: "jane.smith@acme.com",
        project: "Infrastructure Support",
        type: "Incident",
        visibility: "Public",
        billable: true,
        createdOn: new Date("2026-02-10T09:30:00"),
        lastUpdatedOn: new Date("2026-02-13T14:20:00"),
        workNotes: [
            { id: 1, message: "Investigating database query performance.", author: "Alex Johnson", createdAt: new Date("2026-02-11T10:00:00"), timeWorked: "01:30", isPrivate: false },
        ],
    },
    {
        id: "SR-000002",
        title: "New user onboarding automation",
        description: "Set up automated provisioning for new employee accounts including email, VPN access, and application permissions.",
        status: "In Work",
        severity: "Severity2",
        priority: "Priority 2",
        assignedTo: "Mike Chen",
        customer: "Acme Corp",
        requester: "Bob Williams",
        email: "bob.w@acme.com",
        project: "IT Operations",
        type: "Service Request",
        visibility: "Public",
        billable: false,
        createdOn: new Date("2026-02-08T11:00:00"),
        lastUpdatedOn: new Date("2026-02-14T08:00:00"),
        workNotes: [
            { id: 1, message: "Created automation script for Active Directory provisioning.", author: "Mike Chen", createdAt: new Date("2026-02-09T16:00:00"), timeWorked: "03:00", isPrivate: false },
            { id: 2, message: "Testing email provisioning flow.", author: "Mike Chen", createdAt: new Date("2026-02-12T10:30:00"), timeWorked: "02:00", isPrivate: false },
        ],
    },
    {
        id: "SR-000003",
        title: "SSL certificate renewal for production",
        description: "The SSL certificate for *.production.example.com expires on March 1st. Needs renewal and deployment before expiration.",
        status: "Acknowledged",
        severity: "Severity2",
        priority: "Priority 2",
        assignedTo: "",
        customer: "GlobalTech",
        requester: "Sarah Davis",
        email: "sarah.d@globaltech.io",
        project: "Security Operations",
        type: "Service Request",
        visibility: "Private",
        billable: true,
        createdOn: new Date("2026-02-12T08:45:00"),
        lastUpdatedOn: new Date("2026-02-12T08:45:00"),
        workNotes: [],
    },
    {
        id: "SR-000004",
        title: "Database backup job failing intermittently",
        description: "The nightly backup job for the analytics database is failing about 30% of the time. Logs show timeout errors.",
        status: "In Work",
        severity: "Severity1",
        priority: "Priority 1",
        assignedTo: "Alex Johnson",
        customer: "Acme Corp",
        requester: "Tom Brown",
        email: "tbrown@acme.com",
        project: "Database Administration",
        type: "Incident",
        visibility: "Public",
        billable: true,
        createdOn: new Date("2026-02-05T07:00:00"),
        lastUpdatedOn: new Date("2026-02-14T06:30:00"),
        workNotes: [
            { id: 1, message: "Increased timeout threshold — monitoring for next 48 hours.", author: "Alex Johnson", createdAt: new Date("2026-02-06T15:00:00"), timeWorked: "02:00", isPrivate: false },
        ],
    },
    {
        id: "SR-000005",
        title: "VPN connectivity issues for remote team",
        description: "Multiple remote employees unable to connect to VPN after recent firewall update. Affecting APAC team.",
        status: "Open",
        severity: "Severity3",
        priority: "Priority 3",
        assignedTo: "",
        customer: "GlobalTech",
        requester: "Priya Patel",
        email: "priya@globaltech.io",
        project: "Network Support",
        type: "Incident",
        visibility: "Public",
        billable: false,
        createdOn: new Date("2026-02-13T15:20:00"),
        lastUpdatedOn: new Date("2026-02-13T15:20:00"),
        workNotes: [],
    },
    {
        id: "SR-000006",
        title: "Monthly compliance audit log generation",
        description: "Generate and review compliance audit logs for January 2026 as required by SOC 2 Type II requirements.",
        status: "Completed",
        severity: "Severity4",
        priority: "Priority 4",
        assignedTo: "Lisa Wang",
        customer: "Acme Corp",
        requester: "Legal Team",
        email: "legal@acme.com",
        project: "Compliance",
        type: "Service Request",
        visibility: "Private",
        billable: true,
        createdOn: new Date("2026-02-01T10:00:00"),
        lastUpdatedOn: new Date("2026-02-07T17:00:00"),
        workNotes: [
            { id: 1, message: "Audit logs generated and exported to compliance portal.", author: "Lisa Wang", createdAt: new Date("2026-02-05T14:00:00"), timeWorked: "04:00", isPrivate: false },
            { id: 2, message: "Review completed. All items within compliance thresholds.", author: "Lisa Wang", createdAt: new Date("2026-02-07T16:00:00"), timeWorked: "02:00", isPrivate: true },
        ],
    },
];

const SEED_CREDENTIALS = [
    { id: 1, env: "Production", clientName: "Acme Corp", groupName: "DBA Team", entryName: "Primary DB", loginDetails: "db.prod.internal:5432", user: "admin_prod", cred: "Pr0d$ecure!2026", expiry: "2026-12-31", type: "Database", description: "Primary production PostgreSQL database" },
    { id: 2, env: "Staging", clientName: "Acme Corp", groupName: "DBA Team", entryName: "Staging DB", loginDetails: "db.staging.internal:5432", user: "admin_staging", cred: "St@g1ng#Pass", expiry: "2026-08-15", type: "Database", description: "Staging environment database" },
    { id: 3, env: "Development", clientName: "GlobalTech", groupName: "DevOps", entryName: "CI/CD Pipeline", loginDetails: "jenkins.dev.internal", user: "deploy_user", cred: "D3ploy!Key99", expiry: "2026-06-30", type: "Application", description: "Jenkins automation server" },
    { id: 4, env: "Production", clientName: "GlobalTech", groupName: "Security", entryName: "Monitoring API", loginDetails: "api.monitoring.io", user: "gt_monitor", cred: "M0n1t0r@pi#Sec", expiry: "2027-01-15", type: "API Key", description: "External monitoring API access" },
];

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
    const [tickets, setTickets] = useState(SEED_TICKETS);
    const [credentials, setCredentials] = useState(SEED_CREDENTIALS);
    const [currentUser] = useState({ name: "Naveen Jejji", email: "naveen.jejji@example.com", role: "Admin", initials: "NJ" });

    // Ticket operations
    const createTicket = useCallback((ticketData) => {
        const newTicket = {
            ...ticketData,
            id: generateId("SR"),
            status: "Open",
            createdOn: new Date(),
            lastUpdatedOn: new Date(),
            workNotes: [],
        };
        setTickets((prev) => [newTicket, ...prev]);
        return newTicket;
    }, []);

    const updateTicket = useCallback((ticketId, updates) => {
        setTickets((prev) =>
            prev.map((t) => (t.id === ticketId ? { ...t, ...updates, lastUpdatedOn: new Date() } : t))
        );
    }, []);

    const addWorkNote = useCallback((ticketId, note) => {
        setTickets((prev) =>
            prev.map((t) => {
                if (t.id !== ticketId) return t;
                const newNote = {
                    id: Date.now(),
                    ...note,
                    author: currentUser.name,
                    createdAt: new Date(),
                };
                return { ...t, workNotes: [newNote, ...t.workNotes], lastUpdatedOn: new Date() };
            })
        );
    }, [currentUser.name]);

    // Credential operations
    const addCredential = useCallback((credData) => {
        const newCred = { ...credData, id: Date.now() };
        setCredentials((prev) => [...prev, newCred]);
        return newCred;
    }, []);

    const updateCredential = useCallback((credId, updates) => {
        setCredentials((prev) =>
            prev.map((c) => (c.id === credId ? { ...c, ...updates } : c))
        );
    }, []);

    const deleteCredential = useCallback((credId) => {
        setCredentials((prev) => prev.filter((c) => c.id !== credId));
    }, []);

    const value = {
        tickets,
        credentials,
        currentUser,
        createTicket,
        updateTicket,
        addWorkNote,
        addCredential,
        updateCredential,
        deleteCredential,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
    const ctx = useContext(AppContext);
    if (!ctx) throw new Error("useApp must be used within AppProvider");
    return ctx;
};
