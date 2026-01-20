import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../api/auth.api";
import { AuthContext } from "../context/AuthContext";

const Register = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await registerUser(form);
            login(data);
            navigate("/");
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <form
                onSubmit={handleSubmit}
                className="w-96 p-6 border rounded space-y-4"
            >
                <h1 className="text-xl font-semibold">Register</h1>

                {error && <p className="text-red-500">{error}</p>}

                <input
                    name="name"
                    placeholder="Name"
                    onChange={handleChange}
                    className="w-full border p-2"
                    autoComplete="off"
                />

                <input
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    className="w-full border p-2"
                    autoComplete="off"
                />

                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    onChange={handleChange}
                    className="w-full border p-2"
                />

                <button className="w-full bg-black text-white p-2">
                    Register
                </button>

                <p className="text-sm">
                    Already have an account?{" "}
                    <Link to="/login" className="underline">Login</Link>
                </p>
            </form>
        </div>
    );
};

export default Register;
