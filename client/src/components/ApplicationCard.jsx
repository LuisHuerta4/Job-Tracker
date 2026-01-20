import { useState } from "react";
import {
    updateApplication,
    deleteApplication,
} from "../api/applications.api";
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
        <div className="border p-4 rounded space-y-2">
            <h3 className="font-semibold">{app.company}</h3>
            {/* <h3 className="font-semibold">{app.followUpDate}</h3> */}
            <p>{app.role}</p>

            {editing ? (
                <>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="border p-2"
                    >
                        {STATUSES.map((status) => (
                            <option key={status} value={status}>
                                {status}
                            </option>
                        ))}
                    </select>

                    <button
                        onClick={handleUpdate}
                        className="text-sm underline ml-2"
                    >
                        Save
                    </button>
                </>
            ) : (
                <p className={`text-sm ${statusColors[app.status]}`}>
                    {app.status}
                </p>
            )}

            <div className="flex gap-2 text-sm">
                <button
                    onClick={() => setEditing(!editing)}
                    className="underline"
                >
                    Edit
                </button>

                <button
                    onClick={handleDelete}
                    className="underline text-red-500"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default ApplicationCard;