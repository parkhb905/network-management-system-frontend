import { ERROR_MESSAGES, MESSAGES } from '@/common/constants/msg';
import { showError, showWarning } from '@/common/utils/toast';
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
        if (err.response) {
            const { status, data } = err.response;

            if (status === 401 && data?.code === 1003) {
                // 토큰 만료 -> 로그아웃 처리
                localStorage.removeItem('token');
                window.location.href = '/login';
                showWarning(ERROR_MESSAGES[data?.code]);
            }
        } else {
            showError(MESSAGES.NETWORK_ERROR);
        }

        return Promise.reject(err);
    }
);

export default api;
