import { statusColors } from "../../constants/statuses";

const Stats = ({ applications }) => {
    const stats = applications.reduce(
        (acc, app) => {
            acc.total++;
            acc[app.status] = (acc[app.status] || 0) + 1;
            return acc;
        },
        { total: 0 }
    );

    const StatCircle = ({ label, value }) => (
        <div className="flex flex-col items-center gap-3">
            <div className={`stat-circle ${statusColors[label]}`}>
                <span className="stat-value">{value}</span>
            </div>
            <p className="stat-label">{label}</p>
        </div>
    );

    return (
        <div className="stats-wrapper">
            <StatCircle label="Total" value={stats.total} />
            <StatCircle label="Applied" value={stats.Applied || 0} />
            <StatCircle label="Interviewing" value={stats.Interviewing || 0} />
            <StatCircle label="Offer" value={stats.Offer || 0} />
            <StatCircle label="Rejected" value={stats.Rejected || 0} />
        </div>
    );
};

export default Stats;