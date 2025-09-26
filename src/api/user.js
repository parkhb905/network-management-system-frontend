import api from "./axios";

export const updateUser = async (formData) => {
    const response = await api.put('/user/me', formData);
    return response.data;
};

export const deleteUser = async () => {
    const response = await api.delete('/user/me');
    return response.data;
};
