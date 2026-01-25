import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <h1 className="navbar-logo">JobTracker</h1>
            </div>

            {user && (
                <div className="navbar-right">
                    <span className="navbar-user">
                        {user.name || "User"}
                    </span>
                    <button onClick={logout} className="navbar-logout">
                        Logout
                    </button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;