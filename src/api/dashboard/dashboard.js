import api from '../axios';

export const getDeviceCountByType = async () => {
    const response = await api.get('/dashboard/devices/type');
    return response.data;
};

export const getDeviceCountByVendor = async () => {
    const response = await api.get('/dashboard/devices/vendor');
    return response.data;
};
