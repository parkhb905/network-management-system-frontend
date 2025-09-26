import React, { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from './features/auth/LoginPage';
import SignupPage from './features/auth/SignupPage';
import DashboardPage from './features/dashboard/DashboardPage';
import { PrivateRoute } from './routes/PrivateRoute';
import { ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { logout, setAuth } from './store/authSlice';
import { getMyInfo } from './api/auth';

export default function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) return;

        try {
            const savedUsername = localStorage.getItem('username');
            if (savedUsername) dispatch(setAuth({ username: savedUsername }));

            getMyInfo()
                .then((result) => {
                    dispatch(setAuth(result));
                })
                .catch((err) => {
                    dispatch(logout());
                });
        } catch (err) {
            dispatch(logout());
        }
    }, [dispatch]);

    return (
        <>
            <BrowserRouter>
                <Routes>
                    {/* 공개 라우트 */}
                    <Route path="/" element={<Navigate to="/login" replace />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />

                    {/* 보호 라우트 */}
                    <Route element={<PrivateRoute />}>
                        <Route path="/dashboard" element={<DashboardPage />} />
                    </Route>

                    {/* 이외 경로: 리다이렉트 */}
                    <Route path="*" element={<Navigate to="/login" replace />} />
                </Routes>
            </BrowserRouter>

            {/* 토스트 컨테이너 */}
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                pauseOnHover
                draggable
                theme="colored"
            />
        </>
    );
}
