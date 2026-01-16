import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <nav className="flex justify-between p-4 border-b">
            <h1 className="font-semibold">Job Tracker</h1>

            {user && (
                <button
                    onClick={logout}
                    className="text-sm underline"
                >
                    Logout
                </button>
            )}
        </nav>
    );
};

export default Navbar;