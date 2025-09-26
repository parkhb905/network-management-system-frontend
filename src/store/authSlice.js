import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    username: null,
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setAuth: (state, action) => {
            state.username = action.payload.username;
            state.isAuthenticated = true;

            // localStorage 저장
            localStorage.setItem('username', action.payload.username);
        },
        logout: (state) => {
            state.username = initialState.username;
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
