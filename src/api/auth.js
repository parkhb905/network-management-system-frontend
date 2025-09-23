import api from './axios';

export const signUp = async (formData) => {
    try {
        const response = await api.post('/auth/signup', formData);
        return response.data;
    } catch (err) {
        console.error('회원가입 실패', err);
        throw err;
    }
};

export const login = async (credentials) => {
    try {
        const response = await api.post('/auth/login', credentials);
        return response.data;
    } catch (err) {
        console.error('로그인 실패', err);
        throw err;
    }
};
