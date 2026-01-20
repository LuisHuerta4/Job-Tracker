const Stats = ({ applications }) => {
    const stats = applications.reduce(
        (acc, app) => {
            acc.total++;
            acc[app.status] = (acc[app.status] || 0) + 1;
            return acc;
        },
        { total: 0 }
    );

    const StatCard = ({ label, value }) => (
        <div className="border p-4 rounded text-center">
            <p className="text-sm text-gray-500">{label}</p>
            <p className="text-2xl font-semibold">{value}</p>
        </div>
    );

    return (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <StatCard label="Total" value={stats.total} />
            <StatCard label="Applied" value={stats.Applied || 0} />
            <StatCard label="Interviewing" value={stats.Interviewing || 0} />
            <StatCard label="Offer" value={stats.Offer || 0} />
            <StatCard label="Rejected" value={stats.Rejected || 0} />
        </div>
    );
};

export default Stats;