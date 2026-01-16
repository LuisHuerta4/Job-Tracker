const ApplicationCard = ({ app }) => {
    return (
        <div className="border p-4 rounded">
            <h3 className="font-semibold">{app.company}</h3>
            <p>{app.role}</p>
            <p className="text-sm text-gray-500">{app.status}</p>
            <p className="text-sm">
                Follow-up:{" "}
                {new Date(app.followUpDate).toLocaleDateString()}
            </p>
        </div>
    );
};

export default ApplicationCard;