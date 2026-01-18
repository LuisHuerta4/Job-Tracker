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
        <form
            onSubmit={handleSubmit}
            className="border p-4 rounded space-y-3"
        >
            <h2 className="font-semibold">Add Application</h2>

            <input
                name="company"
                placeholder="Company"
                onChange={handleChange}
                value={form.company}
                className="w-full border p-2"
                autoComplete="off"
            />

            <input
                name="role"
                placeholder="Role"
                onChange={handleChange}
                value={form.role}
                className="w-full border p-2"
                autoComplete="off"
            />

            <input
                type="date"
                name="followUpDate"
                onChange={handleChange}
                value={form.followUpDate}
                className="w-full border p-2"
                autoComplete="off"
            />

            <button className="bg-black text-white px-4 py-2">
                Add
            </button>
        </form>
    );
};

export default ApplicationForm;