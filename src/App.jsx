import React, { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from './features/auth/LoginPage';
import SignupPage from './features/auth/SignupPage';
import DashboardPage from './features/dashboard/DashboardPage';
import { PrivateRoute } from './routes/PrivateRoute';
import { ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { logout, setAuth } from './store/authSlice';
import { getMyInfo } from './api/auth/auth';
import MyPage from './features/mypage/MyPage';
import DeviceList from './features/device/DeviceList';
import DeviceForm from './features/device/DeviceForm';
import CodeGroupPage from './features/codeGroup/CodeGroupPage';
import CodePage from './features/code/codePage';
import DeviceDetail from './features/device/DeviceDetail';
import LogList from './features/log/LogList';
import { logout as logoutApi } from '@/api/auth/auth';
import { showError } from './common/utils/toast';
import { MESSAGES } from './common/constants/msg';
import UserPage from './features/user/UserPage';

export default function App() {
    const dispatch = useDispatch();

    const handleLogout = async () => {
        const result = await logoutApi();
        try {
            if (result.success) {
                dispatch(logout());
                window.location.href = '/login';
            } else {
                showError(MESSAGES.SERVER_ERROR);
            }
        } catch (err) {
            console.error('로그아웃 실패: ' + err);
            showError(MESSAGES.SERVER_ERROR);
        }
    };

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) return;

        // 새로고침 시 Redux 복구 로직
        try {
            const savedUsername = localStorage.getItem('username');
            if (savedUsername) dispatch(setAuth({ username: savedUsername }));

            getMyInfo()
                .then((data) => {
                    dispatch(setAuth(data));
                })
                .catch((err) => {
                    handleLogout();
                });
        } catch (err) {
            handleLogout();
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
                        <Route path="/mypage" element={<MyPage />} />
                        <Route path="/devices" element={<DeviceList />} />
                        <Route path="/devices/new" element={<DeviceForm />} />
                        <Route path="/devices/:deviceId" element={<DeviceDetail />} />
                        {/* <Route path="/codeGroup" element={<CodeGroupPage />} /> */}
                        {/* <Route path="/code" element={<CodePage />} /> */}
                        <Route path="/logs" element={<LogList />} />
                        <Route path="/users" element={<UserPage />} />
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
