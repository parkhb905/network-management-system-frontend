import api from './axios';

// 회원가입
export const signUp = async (formData) => {
    const response = await api.post('/auth/signup', formData);
    return response.data;
};

// 로그인
export const login = async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    const data = response.data;

    // 로그인 성공 시 토큰 저장
    if (data.token) {
        localStorage.setItem('token', data.token);
    }

    return data; // 예시 { token: "...", message: "로그인 성공" }
};
