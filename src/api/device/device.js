import api from '../axios';

export const getDevices = async (page = 1, size = 10) => {
    const response = await api.get('/devices', {
        params: { page, size },
    });
    return response.data;
};

export const getCodes = async (groupCode) => {
    const response = await api.get(`/codes?groupCode=${groupCode}`);
    return response.data;
};

export const createDevice = async (formData) => {
    const response = await api.post('/devices', formData);
    return response.data;
};
