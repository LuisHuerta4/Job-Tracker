import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { statusColors } from "../../constants/statuses";
import ApplicationDetailsModal from "../components/ApplicationDetailsModal";

const TableRow = ({ app, onView }) => {

    return (
        <tr className="dashboard-table-row">
            <td className="px-3 py-5">{app.company}</td>
            <td className="px-3 py-5">{app.role}</td>
            <td className="px-3 py-5">
                <span
                    onClick={onView}
                    className={`status-pill ${statusColors[app.status]} cursor-pointer transition hover:opacity-80`}
                    title="Click to edit status"
                >
                    {app.status}
                </span>
            </td>
        </tr>
    );
};

const TableView = ({ applications }) => {
    const [selectedApp, setSelectedApp] = useState(null);
    const tableRef = useRef(null);

    useGSAP(() => {
        const rows = tableRef.current?.querySelectorAll(".dashboard-table-row");
        if (!rows?.length) return;
        gsap.fromTo(rows,
            { x: -20, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.1, stagger: 0.04, ease: "power2.out" }
        );
    }, { scope: tableRef, dependencies: [applications.length] });

    return (
        <div ref={tableRef} className="overflow-x-auto">
            <table className="dashboard-table">
                <thead>
                    <tr className="border-b">
                        <th className="text-left p-3">Company</th>
                        <th className="text-left p-3">Role</th>
                        <th className="text-left p-3">Status</th>
                    </tr>
                </thead>

                <tbody>
                    {applications.map((app) => (
                        <TableRow
                            key={app._id}
                            app={app}
                            onView={() => setSelectedApp(app)}
                        />
                    ))}
                </tbody>
            </table>
            {selectedApp && (
                <ApplicationDetailsModal
                    app={selectedApp}
                    onClose={() => setSelectedApp(null)}
                />
            )}
        </div>
    );
};

export default TableView;