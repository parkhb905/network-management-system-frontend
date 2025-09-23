import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from './features/auth/LoginPage';
import SignupPage from './features/auth/SignupPage';
import DashboardPage from './features/dashboard/DashboardPage';
import { PrivateRoute } from './routes/PrivateRoute';
import { ToastContainer } from 'react-toastify';

export default function App() {
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
                position="top-right" // 알림 위치
                autoClose={3000} // 3초 뒤 자동 닫힘
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
