import api from './axios';

// 회원가입
export const signUp = async (formData) => {
    const response = await api.post('/auth/signup', formData);
    return response.data;
};

// 로그인
export const login = async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
};

// 내 정보 조회
export const getMyInfo = async () => {
    const response = await api.get('/auth/me');
    return response.data;
};
