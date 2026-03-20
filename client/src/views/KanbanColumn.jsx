import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import KanbanCard from "./KanbanCard";
import { statusColors } from "../../constants/statuses";

const KanbanColumn = ({ status, applications }) => {
    const { setNodeRef } = useDroppable({
        id: `column-${status}`,
        data: { status },
    });

    return (
        <div ref={setNodeRef} className="kanban-column">
            <div className="kanban-column-header">
                <h3 className={statusColors[status]}>{status}</h3>
                <span className="kanban-count">{applications.length}</span>
            </div>

            <SortableContext
                items={applications.map(app => app._id)}
                strategy={verticalListSortingStrategy}
            >
                <div className="kanban-list">
                    {applications.map(app => (
                        <KanbanCard key={app._id} app={app} status={status} />
                    ))}
                </div>
            </SortableContext>
        </div>
    );
};

export default KanbanColumn;