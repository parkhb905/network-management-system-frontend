import api from '../axios';

export const getUsers = async (page = 1, size = 10) => {
    const response = await api.get('/users', {
        params: { page: page, size },
    });
    return response.data;
};

export const getUserById = async (userId) => {
    const response = await api.get(`/users/${userId}`);
    return response.data;
};

export const createUser = async (userData) => {
    const response = await api.post('/users', userData);
    return response.data;
};

export const updateUser = async (userData) => {
    const response = await api.put(`/users/${userData.userId}`, userData);
    return response.data;
};

export const deleteUser = async (userId) => {
    const response = await api.delete(`/users/${userId}`);
    return response.data;
};
