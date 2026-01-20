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
            className="bg-white p-3 rounded shadow-sm cursor-grab"
        >
            <h4 className="font-medium">{app.company}</h4>
            <p className="text-sm text-gray-600">{app.role}</p>
        </div>
    );
};

export default KanbanCard;