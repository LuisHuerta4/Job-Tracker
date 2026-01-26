import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const KanbanCard = ({ app }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: app._id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="kanban-card"
        >
            <h4 className="font-medium tracking-wide">{app.company}</h4>
            <p className="text-xs text-(--color-text-secondary)">{app.role}</p>
        </div>
    );
};

export default KanbanCard;