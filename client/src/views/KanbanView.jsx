import { useState } from "react";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import KanbanColumn from "./KanbanColumn";
import KanbanCard from "./KanbanCard";
import { STATUSES, statusColors } from "../../constants/statuses";

const KanbanView = ({ applications, onStatusChange }) => {
    const [activeApp, setActiveApp] = useState(null);

    const grouped = STATUSES.reduce((acc, status) => {
        acc[status] = applications.filter(app => app.status === status);
        return acc;
    }, {});

    const handleDragStart = (event) => {
        const app = applications.find(
            app => app._id === event.active.id
        );
        setActiveApp(app);
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;
        setActiveApp(null);

        if (!over) return;

        const newStatus = over.data.current?.status;
        if (!newStatus) return;

        onStatusChange(active.id, newStatus);
    };

    return (
        <DndContext
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {STATUSES.map(status => (
                    <KanbanColumn
                        key={status}
                        status={status}
                        applications={grouped[status]}
                    />
                ))}
            </div>

            <DragOverlay>
                {activeApp ? (
                    <div className="kanban-card scale-105 shadow-2xl border-white">
                        <h4 className="font-medium tracking-wide">
                            {activeApp.company}
                        </h4>
                        <p className="text-xs text-(--color-text-secondary)">
                            {activeApp.role}
                        </p>
                    </div>
                ) : null}
            </DragOverlay>

        </DndContext>
    );
};

export default KanbanView;