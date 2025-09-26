import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    username: null,
    email: null,
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setAuth: (state, action) => {
            const { username, email } = action.payload;
            state.username = username;
            state.email = email;
            state.isAuthenticated = true;

            // localStorage 저장
            localStorage.setItem('username', username);
        },
        logout: (state) => {
            state.username = initialState.username;
            state.email = initialState.email;
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
