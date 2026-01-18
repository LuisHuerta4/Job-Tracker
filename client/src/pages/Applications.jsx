import { useEffect, useState } from "react";
import { getApplications } from "../api/applications.api";
import ApplicationForm from "../components/ApplicationForm";
import ApplicationCard from "../components/ApplicationCard";
import Stats from "../components/Stats";

const Applications = () => {
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

    useEffect(() => {
        loadApplications();
    }, []);

    return (
        <div className="space-y-6">
            <ApplicationForm onAdd={loadApplications} />

            {apps.length > 0 && <Stats applications={apps} />}

            <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="border p-2"
            >
                <option>All</option>
                <option>Applied</option>
                <option>Interview</option>
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
                <div className="grid gap-4">
                    {filteredApps.map((app) => (
                        <ApplicationCard
                            key={app._id}
                            app={app}
                            onChange={loadApplications}
                        />
                    ))}
                </div>
            )}


        </div>
    );
};

export default Applications;