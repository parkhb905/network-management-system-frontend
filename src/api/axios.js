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
        const accessToken = localStorage.getItem('accessToken');
        // 헤더에 JWT 토큰 추가
        if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
        return config;
    },
    (err) => {
        return Promise.reject(err);
    }
);

// 응답 인터셉터
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        const status = error.response?.status;
        const code = error.response?.data?.code;

        // refresh 요청은 재시도 금지
        if (originalRequest.url.includes('/auth/refresh')) {
            return Promise.reject(error);
        }

        // (1) 토큰 만료 -> accessToken 재발급 시도
        if (status === 401 && code == 1003 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // accessToken 재발급 로직.
                const refreshToken = localStorage.getItem('refreshToken');
                if (!refreshToken) throw new Error('No refresh token');

                const response = await api.post('/auth/refresh', { refreshToken });
                const newAccessToken = response.data.accessToken;
                localStorage.setItem('accessToken', newAccessToken);

                // 원래 요청 헤더 갱신 후 재시도
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return api(originalRequest);
            } catch (err) {
                // refresh 실패 -> 로그아웃 처리
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                window.location.href = '/login';
                return Promise.reject(err);
            }
        }

        // (2) refresh 실패 또는 만료된 토큰으로 요청한 경우 (403)
        if (status === 403) {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('username');
            window.location.href = '/login';
        }

        return Promise.reject(error);
    }
);

export default api;
