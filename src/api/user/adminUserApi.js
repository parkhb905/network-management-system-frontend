import api from '../axios';

export const getUsers = async (page = 1, size = 10) => {
    const response = await api.get('/users', {
        params: { page: page, size },
    });
    return response.data;
};
