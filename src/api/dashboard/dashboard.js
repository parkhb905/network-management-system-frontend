import api from '../axios';

export const getDeviceCountByType = async () => {
    const response = await api.get('/dashboard/devices/type');
    return response.data;
};

export const getDeviceCountByVendor = async () => {
    const response = await api.get('/dashboard/devices/vendor');
    return response.data;
};

export const getCpuTop5 = async (period) => {
    const response = await api.get('/dashboard/resource/cpu-top5', {
        params: { period },
    });
    return response.data;
};

export const getMemoryTop5 = async (period) => {
    const response = await api.get('/dashboard/resource/memory-top5', {
        params: { period },
    });
    return response.data;
};
