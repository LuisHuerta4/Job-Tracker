import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../api/auth.api";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await loginUser(form);
            login(data);
            navigate("/");
        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <form
                onSubmit={handleSubmit}
                className="w-96 p-6 border rounded space-y-4"
            >
                <h1 className="text-xl font-semibold">Login</h1>

                {error && <p className="text-red-500">{error}</p>}

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
                    autoComplete="off"
                />

                <button className="w-full bg-black text-white p-2">
                    Login
                </button>

                <p className="text-sm">
                    No account? <Link to="/register" className="underline">Register</Link>
                </p>
            </form>
        </div>
    );
};

export default Login;