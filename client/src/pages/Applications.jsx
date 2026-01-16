import { useEffect, useState } from "react";
import { getApplications } from "../api/applications.api";
import ApplicationForm from "../components/ApplicationForm";
import ApplicationCard from "../components/ApplicationCard";

const Applications = () => {
    const [apps, setApps] = useState([]);
    const [loading, setLoading] = useState(true);

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

            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="grid gap-4">
                    {apps.map((app) => (
                        <ApplicationCard key={app._id} app={app} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Applications;