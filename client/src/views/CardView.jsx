import ApplicationCard from "../components/ApplicationCard";

const CardView = ({ applications, onChange }) => {
    return (
        <div className="grid gap-4">
            {applications.map((app) => (
                <ApplicationCard
                    key={app._id}
                    app={app}
                    onChange={onChange}
                />
            ))}
        </div>
    );
};

export default CardView;