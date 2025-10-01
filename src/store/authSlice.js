import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    username: null,
    email: null,
    role: null,
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setAuth: (state, action) => {
            const payload = action.payload;

            Object.entries(payload).forEach(([key, value]) => {
                if (value !== undefined && key in state) {
                    state[key] = value;
                }
            });

            state.isAuthenticated = true;

            // localStorage 저장
            localStorage.setItem('username', payload.username);
        },
        logout: (state) => {
            state.username = initialState.username;
            state.email = initialState.email;
            state.role = initialState.role;
            state.isAuthenticated = initialState.isAuthenticated;

            // localStorage 초기화
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('username');
        },
    },
});

export const { setAuth, logout } = authSlice.actions;
export default authSlice.reducer;
