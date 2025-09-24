import { MESSAGES } from '@/common/constants/msg';
import { showWarning } from '@/common/utils/toast';
import axios from 'axios';

const api = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// 요청 인터셉터
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) config.headers.Authorization = `Bearer ${token}`; // 헤더에 JWT 토큰 추가
        return config;
    },
    (err) => {
        return Promise.reject(err);
    }
);

// 응답 인터셉터
api.interceptors.response.use(
    (response) => response,
    (err) => {
        // 토큰 만료 or 인증 실패 -> 로그아웃 처리
        if (err.response && err.response.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/login';
            showWarning(MESSAGES.AUTH_EXPIRED);
        }
        return Promise.reject(err);
    }
);

export default api;
