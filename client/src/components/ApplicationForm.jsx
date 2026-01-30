import { useState } from "react";
import { createApplication } from "../api/applications.api";

const ApplicationForm = ({ onAdd }) => {
    const [form, setForm] = useState({
        company: "",
        role: "",
        status: "Applied",
        followUpDate: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createApplication(form);
        setForm({ company: "", role: "", status: "Applied", followUpDate: "" });
        onAdd();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <h2 className="text-xl font-semibold tracking-wide heading">
                Create Application
            </h2>

            <div className="space-y-3">
                <input
                    name="company"
                    placeholder="Company"
                    onChange={handleChange}
                    value={form.company}
                    className="auth-input"
                    autoComplete="off"
                />

                <input
                    name="role"
                    placeholder="Role"
                    onChange={handleChange}
                    value={form.role}
                    className="auth-input"
                    autoComplete="off"
                />

                <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    className="select-dark w-full"
                >
                    <option>Applied</option>
                    <option>Interviewing</option>
                    <option>Offer</option>
                    <option>Rejected</option>
                </select>

                <div className="space-y-1">
                    <label className="text-xs tracking-wide uppercase subtle-text">
                        Follow Up Date
                    </label>
                    <input
                        type="date"
                        name="followUpDate"
                        onChange={handleChange}
                        value={form.followUpDate}
                        className="auth-input"
                    />
                </div>

            </div>

            <button className="auth-button cursor-pointer hover:-translate-y-0.5">
                Add Application
            </button>
        </form>
    );
};

export default ApplicationForm;