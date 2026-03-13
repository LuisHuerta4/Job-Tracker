const ViewTabs = ({ view, setView }) => {
    const tabs = [
        { id: "cards", label: "Cards" },
        { id: "table", label: "Table" },
        { id: "kanban", label: "Kanban" },
    ];

    return (
        <div className="flex gap-2 border-b border-border mb-6">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => setView(tab.id)}
                    className={`px-4 py-2 text-sm transition-colors ${
                        view === tab.id
                            ? "border-b-2 border-white text-white font-semibold"
                            : "text-text-muted hover:text-text-secondary"
                    }`}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
};

export default ViewTabs;