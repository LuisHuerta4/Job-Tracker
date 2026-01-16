import api from "./axios";

export const getApplications = async () => {
    const res = await api.get("/applications");
    return res.data;
};

export const createApplication = async (data) => {
    const res = await api.post("/applications", data);
    return res.data;
};