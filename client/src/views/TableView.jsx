import { useState } from "react";
import { statusColors } from "../../constants/statuses";
import ApplicationDetailsModal from "../components/ApplicationDetailsModal";

const TableRow = ({ app, onView }) => {

    return (
        <tr className="dashboard-table-row">
            <td className="px-3 py-5">{app.company}</td>
            <td className="px-3 py-5">{app.role}</td>
            <td className="px-3 py-5">
                <span
                    onClick={onView}
                    className={`status-pill ${statusColors[app.status]} cursor-pointer transition hover:opacity-80`}
                    title="Click to edit status"
                >
                    {app.status}
                </span>
            </td>
        </tr>
    );
};


const TableView = ({ applications }) => {
    const [selectedApp, setSelectedApp] = useState(null);

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
                            onView={() => setSelectedApp(app)}
                        />
                    ))}
                </tbody>
            </table>
            {selectedApp && (
                <ApplicationDetailsModal
                    app={selectedApp}
                    onClose={() => setSelectedApp(null)}
                />
            )}
        </div>
    );
};

export default TableView;