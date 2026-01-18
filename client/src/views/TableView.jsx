import { STATUSES } from "../../constants/statuses";

const TableView = ({ applications, onStatusChange }) => {
    return (
        <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
                <thead>
                    <tr className="border-b">
                        <th className="text-left p-3">Company</th>
                        <th className="text-left p-3">Role</th>
                        <th className="text-left p-3">Status</th>
                    </tr>
                </thead>

                <tbody>
                    {applications.map((app) => (
                        <tr key={app._id} className="border-b hover:bg-gray-50">
                            <td className="p-3">{app.company}</td>
                            <td className="p-3">{app.role}</td>
                            <td className="p-3">
                                <select
                                    value={app.status}
                                    onChange={(e) =>
                                        onStatusChange(app._id, e.target.value)
                                    }
                                    className="border rounded px-2 py-1"
                                >
                                    {STATUSES.map((status) => (
                                        <option key={status} value={status}>
                                            {status}
                                        </option>
                                    ))}
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableView;