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
import { useDebounce } from "../hooks/useDebounce";

const Applications = () => {
    const [view, setView] = useState("cards");
    const [apps, setApps] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("All");
    const [search, setSearch] = useState("");
    const debouncedSearch = useDebounce(search, 250);
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

    const filteredApps = apps
        .filter((app) => filter === "All" || app.status === filter)
        .filter((app) =>
            app.company
                ?.toLowerCase()
                .includes(debouncedSearch.trim().toLowerCase())
        );

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

                <div className="flex flex-col gap-3 md:flex-row md:items-center">
                    <div className="relative">
                        <svg
                            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-(--color-text-muted) pointer-events-none"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1 0 6.4 6.4a7.5 7.5 0 0 0 10.25 10.25Z"
                            />
                        </svg>
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by company..."
                            aria-label="Search applications by company name"
                            className="auth-input pl-9 w-full md:w-56"
                        />
                    </div>

                    <div className="flex gap-3 items-center">
                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="select-dark bg-bg-card"
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
            </div>

            <div className="dashboard-content">
                {loading ? (
                    <p className="subtle-text">Loading...</p>
                ) : apps.length === 0 ? (
                    <p className="subtle-text">
                        No applications yet. Add your first one.
                    </p>
                ) : filteredApps.length === 0 ? (
                    <p className="subtle-text">
                        No applications match your search.
                    </p>
                ) : (
                    <>
                        {(view === "cards" || (view === "kanban" && window.innerWidth < 768)) && (
                            <CardView applications={filteredApps} onChange={loadApplications} />
                        )}

                        {view === "table" && (
                            <TableView applications={filteredApps} onChange={loadApplications} />
                        )}

                        {view === "kanban" && window.innerWidth >= 768 && (
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
                        className="card w-full max-w-lg mx-4 relative scale-[0.5] transition-transform duration-200"
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