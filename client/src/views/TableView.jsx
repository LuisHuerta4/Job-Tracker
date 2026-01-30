import { useState } from "react";
import { STATUSES, statusColors } from "../../constants/statuses";

const TableRow = ({ app, onStatusChange }) => {
    const [editing, setEditing] = useState(false);
    const [status, setStatus] = useState(app.status);

    return (
        <tr className="dashboard-table-row">
            <td className="px-3 py-5">{app.company}</td>
            <td className="px-3 py-5">{app.role}</td>
            <td className="px-3 py-5">
                {editing ? (
                    <div>
                        <select
                            value={status}
                            onChange={(e) => {
                                const newStatus = e.target.value;
                                setStatus(newStatus);
                                onStatusChange(app._id, newStatus);
                                setEditing(false);
                            }}
                            className="select-dark"
                        >
                            {STATUSES.map((s) => (
                                <option key={s} value={s}>
                                    {s}
                                </option>
                            ))}
                        </select>
                    </div>
                ) : (
                    <span
                        onClick={() => setEditing(true)}
                        className={`status-pill ${statusColors[app.status]} cursor-pointer transition hover:opacity-80`}
                        title="Click to edit status"
                    >
                        {app.status}
                    </span>
                )}
            </td>
        </tr>
    );
};


const TableView = ({ applications, onStatusChange }) => {
    return (
        <div className="overflow-x-auto">
            <table className="dashboard-table">
                <thead>
                    <tr className="border-b">
                        <th className="text-left p-3">Company</th>
                        <th className="text-left p-3">Role</th>
                        <th className="text-left p-3">Status</th>
                    </tr>
                </thead>

                <tbody>
                    {applications.map((app) => (
                        <TableRow
                            key={app._id}
                            app={app}
                            onStatusChange={onStatusChange}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableView;