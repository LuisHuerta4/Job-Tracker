import api from "./axios";

export const getApplications = async () => {
    const res = await api.get("/applications");
    return res.data;
};

export const createApplication = async (data) => {
    const res = await api.post("/applications", data);
    return res.data;
};

export const updateApplication = async (id, data) => {
    const res = await api.put(`/applications/${id}`, data);
    return res.data;
};

export const deleteApplication = async (id) => {
    await api.delete(`/applications/${id}`);
};