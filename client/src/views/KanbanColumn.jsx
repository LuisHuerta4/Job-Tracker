import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import KanbanCard from "./KanbanCard";

const KanbanColumn = ({ status, applications }) => {
    const { setNodeRef } = useDroppable({
        id: `column-${status}`,
        data: { status },
    });

    return (
        <div ref={setNodeRef} className="kanban-column">
            <h3 className="font-semibold mb-3">{status}</h3>

            <SortableContext
                items={applications.map(app => app._id)}
                strategy={verticalListSortingStrategy}
            >
                <div className="space-y-2">
                    {applications.map(app => (
                        <KanbanCard key={app._id} app={app} />
                    ))}
                </div>
            </SortableContext>
        </div>
    );
};

export default KanbanColumn;