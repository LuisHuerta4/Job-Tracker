import { useState, useContext, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../api/auth.api";
import { AuthContext } from "../context/AuthContext";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Register = () => {
    const containerRef = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline({ delay: 0.2 });

        tl.from(".auth-card", {
            scale: 0.9,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
        });

        tl.from(".auth-title, .auth-subtitle", {
            y: 30,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.inOut",
        }, "-=0.4");

        tl.fromTo(
            ".auth-input",
            { y: 20, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.6,
                stagger: 0.08,
                ease: "back.out(1.7)",
            }
        );

        tl.fromTo(
            ".auth-button",
            { scale: 0.9, opacity: 0 },
            {
                scale: 1,
                opacity: 1,
                duration: 0.4,
                ease: "back.out(1.7)",
            },
            "-=0.2"
        );
    }, { scope: containerRef });

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
        <div ref={containerRef} className="auth-bg">

            <div className="auth-card space-y-6">

                <div className="space-y-1 text-center">
                    <h1 className="auth-title">Create an account</h1>
                    <p className="auth-subtitle">
                        Start tracking your job applications
                    </p>
                </div>

                {error && (
                    <p className="text-sm text-red-500 bg-red-500/10 border border-red-500/20 p-2 rounded-lg">
                        {error}
                    </p>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        name="name"
                        placeholder="Full Name"
                        onChange={handleChange}
                        className="auth-input"
                        required
                    />

                    <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        onChange={handleChange}
                        className="auth-input"
                        required
                    />

                    <input
                        name="password"
                        type="password"
                        placeholder="Password (min 8 characters)"
                        onChange={handleChange}
                        className="auth-input"
                        required
                        minLength={8}
                        maxLength={128}
                    />

                    <button className="auth-button">
                        Register
                    </button>
                </form>

                <p className="text-sm text-center text-white/70">
                    Already have an account?{" "}
                    <Link to="/login" className="text-white font-medium hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;