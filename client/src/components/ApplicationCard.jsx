import { useState } from "react";
import { updateApplication, deleteApplication } from "../api/applications.api";
import { STATUSES } from "../../constants/statuses";

const statusColors = {
    Applied: "text-blue-500",
    Interviewing: "text-yellow-500",
    Offer: "text-green-500",
    Rejected: "text-red-500",
};

const ApplicationCard = ({ app, onChange }) => {
    const [status, setStatus] = useState(app.status);
    const [editing, setEditing] = useState(false);

    const handleUpdate = async () => {
        await updateApplication(app._id, { status });
        setEditing(false);
        onChange();
    };

    const handleDelete = async () => {
        if (!window.confirm("Delete this application?")) return;
        await deleteApplication(app._id);
        onChange();
    };

    return (
        <div className="app-card">

            <div className="app-card-header">
                <h3 className="app-card-company">{app.company}</h3>
                <span className={`status-pill ${statusColors[app.status]}`}>
                    {app.status}
                </span>
            </div>

            <p className="app-card-role">{app.role}</p>

            <div className="app-card-footer">
                {editing ? (
                    <div className="flex gap-2">
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="app-select"
                        >
                            {STATUSES.map((s) => (
                                <option key={s} value={s}>
                                    {s}
                                </option>
                            ))}
                        </select>
                        <button onClick={handleUpdate} className="app-action">
                            Save
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={() => setEditing(true)}
                        className="app-action"
                    >
                        Edit
                    </button>
                )}

                <button
                    onClick={handleDelete}
                    className="app-action-danger"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default ApplicationCard;
