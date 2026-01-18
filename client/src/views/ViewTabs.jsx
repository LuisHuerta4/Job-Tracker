const ViewTabs = ({ view, setView }) => {
    const tabs = [
        { id: "cards", label: "Cards" },
        { id: "table", label: "Table" },
        { id: "kanban", label: "Kanban" },
    ];

    return (
        <div className="flex gap-2 border-b mb-6">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => setView(tab.id)}
                    className={`px-4 py-2 text-sm ${view === tab.id
                            ? "border-b-2 border-black font-semibold"
                            : "text-gray-500"
                        }`}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
};

export default ViewTabs;