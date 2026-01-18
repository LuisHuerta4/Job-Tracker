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
        await updateApplication(id, { status });
        loadApplications();
    };


    useEffect(() => {
        loadApplications();
    }, []);

    return (
        <div className="space-y-6">
            <ApplicationForm onAdd={loadApplications} />

            {apps.length > 0 && <Stats applications={apps} />}

            <ViewTabs view={view} setView={setView} />

            <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="border p-2"
            >
                <option>All</option>
                <option>Applied</option>
                <option>Interviewing</option>
                <option>Offer</option>
                <option>Rejected</option>
            </select>


            {loading ? (
                <p>Loading...</p>
            ) : apps.length === 0 ? (
                <p className="text-gray-500">
                    No applications yet. Add your first one!
                </p>
            ) : (
                <>
                    {view === "cards" && (
                        <CardView
                            applications={filteredApps}
                            onChange={loadApplications}
                        />
                    )}

                    {view === "table" && (
                        <TableView
                            applications={filteredApps}
                            onStatusChange={updateStatus}
                        />
                    )}

                    {view === "kanban" && <KanbanView />}
                </>
            )}


        </div>
    );
};

export default Applications;