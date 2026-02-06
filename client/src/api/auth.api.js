import api from "./axios";

export const registerUser = async (formData) => {
    const res = await api.post("/auth/register", formData);
    return res.data;
};

export const loginUser = async (formData) => {
    const res = await api.post("/auth/login", formData);
    return res.data;
};

export const logoutUser = async () => {
    const res = await api.post("/auth/logout");
    return res.data;
};
