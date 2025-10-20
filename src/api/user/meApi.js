import api from '../axios';

export const updateMyInfo = async (formData) => {
    const response = await api.put('/user/me', formData);
    return response.data;
};

export const deleteMyAccount = async () => {
    const response = await api.delete('/user/me');
    return response.data;
};
