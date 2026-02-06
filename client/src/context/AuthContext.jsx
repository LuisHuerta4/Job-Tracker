import { createContext, useState } from "react";
import { logoutUser } from "../api/auth.api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("authState"))
    );

    const login = (data) => {
        const authState = { authenticated: true };
        localStorage.setItem("authState", JSON.stringify(authState));
        setUser(authState);
    };

    const logout = () => {
        logoutUser().catch(() => { });
        localStorage.removeItem("authState");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};