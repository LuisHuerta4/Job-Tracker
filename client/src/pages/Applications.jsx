import { useEffect, useState } from "react";
import { getApplications, updateApplication } from "../api/applications.api";
import ApplicationForm from "../components/ApplicationForm";
import Stats from "../components/Stats";
import ViewTabs from "../views/ViewTabs";
import CardView from "../views/CardView";
import TableView from "../views/TableView";
import KanbanView from "../views/KanbanView";

const Applications = () => {
    const [view, setView] = useState("cards");
    const [apps, setApps] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("All");

    const filteredApps =
        filter === "All"
            ? apps
            : apps.filter((app) => app.status === filter);

    const loadApplications = async () => {
        const data = await getApplications();
        setApps(data);
        setLoading(false);
    };

    const updateStatus = async (id, status) => {
        // 1. Update UI immediately
        setApps((prevApps) =>
            prevApps.map((app) =>
                app._id === id ? { ...app, status } : app
            )
        );

        // 2. Persist to backend
        try {
            await updateApplication(id, { status });
        } catch (err) {
            console.error("Failed to update status", err);
            loadApplications(); // fallback safety
        }
    };

    useEffect(() => {
        loadApplications();
    }, []);

    return (
        <div className="dashboard">

            <div className="dashboard-header">
                <h1 className="dashboard-title">Dashboard</h1>
                <p className="dashboard-subtitle">
                    Track and manage your job applications
                </p>
            </div>

            {apps.length > 0 && <Stats applications={apps} />}

            <div className="dashboard-controls">
                <ViewTabs view={view} setView={setView} />

                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="dashboard-filter"
                >
                    <option>All</option>
                    <option>Applied</option>
                    <option>Interviewing</option>
                    <option>Offer</option>
                    <option>Rejected</option>
                </select>
            </div>

            <div className="dashboard-content">
                {loading ? (
                    <p className="subtle-text">Loading...</p>
                ) : apps.length === 0 ? (
                    <p className="subtle-text">
                        No applications yet. Add your first one.
                    </p>
                ) : (
                    <>
                        {view === "cards" && (
                            <CardView applications={filteredApps} onChange={loadApplications} />
                        )}

                        {view === "table" && (
                            <TableView applications={filteredApps} onStatusChange={updateStatus} />
                        )}

                        {view === "kanban" && (
                            <KanbanView applications={filteredApps} onStatusChange={updateStatus} />
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Applications;