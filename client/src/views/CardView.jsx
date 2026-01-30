import { useState } from "react";
import ApplicationCard from "../components/ApplicationCard";
import ApplicationDetailsModal from "../components/ApplicationDetailsModal";

const CardView = ({ applications, onChange }) => {
    const [selectedApp, setSelectedApp] = useState(null);

    return (
        <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {applications.map((app) => (
                    <ApplicationCard
                        key={app._id}
                        app={app}
                        onChange={onChange}
                        onView={() => setSelectedApp(app)}
                    />
                ))}
            </div>

            {selectedApp && (
                <ApplicationDetailsModal
                    app={selectedApp}
                    onClose={() => setSelectedApp(null)}
                />
            )}
        </>
    );
};

export default CardView;