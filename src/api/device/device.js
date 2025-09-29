import api from '../axios';

export const getDevices = async (page = 1, size = 10) => {
    const response = await api.get('/devices', {
        params: { page, size },
    });
    return response.data;
};
