import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../features/auth/LoginPage';
import DashboardPage from '../features/dashboard/DashboardPage';
import SignupPage from '@/features/auth/SignupPage';

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                {/* 로그인 페이지 */}
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/login" element={<LoginPage />} />

                {/* 회원가입 페이지 */}
                <Route path="/signup" element={<SignupPage />} />

                {/* 대시보드 페이지 */}
                <Route path="/dashboard" element={<DashboardPage />} />

                {/* 이외 경로: 리다이렉트 */}
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </BrowserRouter>
    );
}
