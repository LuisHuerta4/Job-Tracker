import { deleteApplication } from "../api/applications.api";
import { statusColors } from "../../constants/statuses";

const ApplicationCard = ({ app, onChange, onView }) => {

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
                <button onClick={onView} className="app-action">
                    View
                </button>

                <button onClick={handleDelete} className="app-action-danger">
                    Delete
                </button>
            </div>
        </div>
    );
};

export default ApplicationCard;
