import { STATUSES } from "../../constants/statuses";

const KanbanColumn = ({ status, applications, onStatusChange }) => {
    return (
        <div className="bg-gray-100 rounded p-3 min-h-[300px]">
            <h3 className="font-semibold mb-3">{status}</h3>

            <div className="space-y-2">
                {applications.map(app => (
                    <div
                        key={app._id}
                        className="bg-white p-3 rounded shadow-sm"
                    >
                        <h4 className="font-medium">{app.company}</h4>
                        <p className="text-sm text-gray-600">{app.role}</p>

                        <select
                            value={app.status}
                            onChange={(e) =>
                                onStatusChange(app._id, e.target.value)
                            }
                            className="mt-2 w-full border p-1 text-sm"
                        >
                            {STATUSES.map(s => (
                                <option key={s} value={s}>
                                    {s}
                                </option>
                            ))}
                        </select>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default KanbanColumn;