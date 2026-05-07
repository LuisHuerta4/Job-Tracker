import { useEffect, useState, useRef } from "react";
import { getApplications, updateApplication } from "../api/applications.api";
import ApplicationForm from "../components/ApplicationForm";
import Stats from "../components/Stats";
import ViewTabs from "../views/ViewTabs";
import CardView from "../views/CardView";
import TableView from "../views/TableView";
import KanbanView from "../views/KanbanView";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Applications = () => {
    const [view, setView] = useState("cards");
    const [apps, setApps] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("All");
    const [showForm, setShowForm] = useState(false);
    const modalRef = useRef(null);
    const overlayRef = useRef(null);
    const dashboardRef = useRef(null);

    useGSAP(() => {
        gsap.from(".dashboard-header", {
            y: -20,
            opacity: 0,
            duration: 0.9,
            ease: "power3.out",
        });
        gsap.from(".dashboard-controls", {
            y: 20,
            opacity: 0,
            duration: 0.7,
            delay: 0.2,
            ease: "power3.out",
        });
    }, { scope: dashboardRef });

    useEffect(() => {
        if (showForm) {
            gsap.fromTo(
                overlayRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 0.2 }
            );

            gsap.to(
                modalRef.current,
                {
                    opacity: 1,
                    scale: 1,
                    duration: 0.5,
                    ease: "power3.out",
                }
            );
        }
    }, [showForm]);

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
        <div ref={dashboardRef} className="dashboard">

            <div className="dashboard-header">
                <h1 className="dashboard-title">Dashboard</h1>
                <p className="dashboard-subtitle">
                    Track and manage your job applications
                </p>
            </div>

            {apps.length > 0 && <Stats applications={apps} />}

            <div className="dashboard-controls">
                <ViewTabs view={view} setView={setView} />

                <div className="flex gap-3 items-center">
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="select-dark"
                    >
                        <option>All</option>
                        <option>Applied</option>
                        <option>Interviewing</option>
                        <option>Offer</option>
                        <option>Rejected</option>
                    </select>

                    <button
                        onClick={() => setShowForm(true)}
                        className="auth-button"
                    >
                        + New Application
                    </button>
                </div>
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
                            <TableView applications={filteredApps} onChange={loadApplications} />
                        )}

                        {view === "kanban" && (
                            <KanbanView applications={filteredApps} onStatusChange={updateStatus} />
                        )}
                    </>
                )}
            </div>

            {showForm && (
                <div
                    ref={overlayRef}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md"
                    onClick={() => setShowForm(false)}
                >
                    <div
                        ref={modalRef}
                        onClick={(e) => e.stopPropagation()}
                        className="card w-full max-w-lg relative scale-[0.5] transition-transform duration-200"
                    >
                        <button
                            onClick={() => setShowForm(false)}
                            className="absolute top-3 right-5 text-(--color-text-secondary) hover:text-white transition cursor-pointer"
                        >
                            ✕
                        </button>

                        <ApplicationForm
                            onAdd={() => {
                                loadApplications();
                                setShowForm(false);
                            }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Applications;