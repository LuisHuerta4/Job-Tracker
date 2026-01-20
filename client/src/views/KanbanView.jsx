import KanbanColumn from "./KanbanColumn";
import { STATUSES } from "../../constants/statuses";

const KanbanView = ({ applications, onStatusChange }) => {
    const grouped = STATUSES.reduce((acc, status) => {
        acc[status] = applications.filter(app => app.status === status);
        return acc;
    }, {});

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {STATUSES.map(status => (
                <KanbanColumn
                    key={status}
                    status={status}
                    applications={grouped[status]}
                    onStatusChange={onStatusChange}
                />
            ))}
        </div>
    );
};

export default KanbanView;