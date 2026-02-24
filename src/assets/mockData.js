export const TICKETS = [
    { id: "TKT-001", title: "VPN access issue", priority: "High", status: "In Progress", assignee: "You", created: "Feb 20", category: "Network" },
    { id: "TKT-002", title: "Software license request", priority: "Medium", status: "Open", assignee: "You", created: "Feb 18", category: "Software" },
    { id: "TKT-003", title: "Email not syncing", priority: "Low", status: "Resolved", assignee: "You", created: "Feb 15", category: "Email" },
    { id: "TKT-004", title: "Printer driver update", priority: "Low", status: "Open", assignee: "You", created: "Feb 22", category: "Hardware" },
    { id: "TKT-005", title: "Database timeout errors", priority: "Critical", status: "In Progress", assignee: "You", created: "Feb 21", category: "Database" },
];

export const SERVICE_REQUESTS = [
    { id: "SRQ-001", title: "New employee onboarding", type: "Onboarding", status: "In Progress", requester: "HR Team", assignee: "IT Support", created: "Feb 19", mine: false, severity: "Severity 2", project: "Internal HR Portal", billable: false, visibility: "Public", location: "Mumbai" },
    { id: "SRQ-002", title: "Server provisioning - Prod", type: "Infrastructure", status: "Pending Approval", requester: "You", assignee: "DevOps", created: "Feb 17", mine: true, severity: "Severity 1", project: "E-Commerce Platform Migration", billable: true, visibility: "Private", location: "Global" },
    { id: "SRQ-003", title: "Office 365 license batch", type: "Software", status: "Completed", requester: "You", assignee: "Procurement", created: "Feb 10", mine: true, severity: "Severity 3", project: "Internal Tools", billable: true, visibility: "Public", location: "Bangalore" },
    { id: "SRQ-004", title: "Network expansion - 3rd floor", type: "Network", status: "In Progress", requester: "Facilities", assignee: "You", created: "Feb 14", mine: true, severity: "Severity 2", project: "Office Infrastructure", billable: true, visibility: "Public", location: "Mumbai" },
    { id: "SRQ-005", title: "Backup policy review", type: "Policy", status: "Open", requester: "Security Team", assignee: "Unassigned", created: "Feb 22", mine: false, severity: "Severity 4", project: "Security Compliance", billable: false, visibility: "Private", location: "Global" },
    { id: "SRQ-006", title: "Cloud storage upgrade", type: "Infrastructure", status: "Pending Approval", requester: "Engineering", assignee: "DevOps", created: "Feb 21", mine: false, severity: "Severity 1", project: "Mobile App Backend API", billable: true, visibility: "Public", location: "US-West" },
];

export const PROJECTS = [
    {
        id: "PRJ-001", name: "E-Commerce Platform Migration", status: "Active", team: "Backend Team", credentials: [
            { id: 1, service: "AWS Console", url: "https://aws.amazon.com", username: "admin@company.com", password: "Aws#Prod2024!", expiry: "Dec 2025", notes: "Root account - use with caution" },
            { id: 2, service: "PostgreSQL DB", url: "prod-db.internal:5432", username: "db_admin", password: "P@ssw0rd_DB_2024", expiry: "Jun 2025", notes: "Primary database" },
            { id: 3, service: "Stripe Dashboard", url: "https://dashboard.stripe.com", username: "payments@company.com", password: "Stripe!Pay#2024", expiry: "Unlimited", notes: "Live keys - restricted access" },
        ]
    },
    {
        id: "PRJ-002", name: "Internal HR Portal", status: "Active", team: "Frontend Team", credentials: [
            { id: 1, service: "Azure AD", url: "https://portal.azure.com", username: "admin@hr.company.com", password: "Az!HR#Admin2024", expiry: "Mar 2025", notes: "SSO provider" },
            { id: 2, service: "MySQL Database", url: "hr-db.internal:3306", username: "hr_app", password: "HR_DB!Secure24", expiry: "Jul 2025", notes: "HR data - confidential" },
        ]
    },
    {
        id: "PRJ-003", name: "Mobile App Backend API", status: "Active", team: "API Team", credentials: [
            { id: 1, service: "Firebase Console", url: "https://console.firebase.google.com", username: "api@company.com", password: "Fire#Api!2024", expiry: "Unlimited", notes: "Push notifications & auth" },
            { id: 2, service: "Redis Cache", url: "cache.internal:6379", username: "redis_admin", password: "R3dis!Cache24", expiry: "Aug 2025", notes: "Session cache" },
            { id: 3, service: "Twilio", url: "https://console.twilio.com", username: "sms@company.com", password: "Tw!li0#SMS2024", expiry: "Unlimited", notes: "SMS OTP service" },
        ]
    },
];
