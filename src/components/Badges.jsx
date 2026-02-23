export const PriorityBadge = ({ priority }) => {
    const map = { Critical: "badge-red", High: "badge-yellow", Medium: "badge-blue", Low: "badge-gray" };
    return <span className={`badge ${map[priority] || "badge-gray"}`}>{priority}</span>;
};

export const StatusBadge = ({ status }) => {
    const map = {
        "In Progress": "badge-blue",
        "Open": "badge-yellow",
        "Resolved": "badge-green",
        "Completed": "badge-green",
        "Pending Approval": "badge-yellow",
        "Closed": "badge-gray"
    };
    return <span className={`badge ${map[status] || "badge-gray"}`}>{status}</span>;
};
