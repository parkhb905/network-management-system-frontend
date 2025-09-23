import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export const PrivateRoute = () => {
    const token = localStorage.getItem('token');

    if (!token) return <Navigate to="/login" replace />; // login 페이지 이동 후 뒤로가기 시 돌아가기 방지.

    return <Outlet />;
};
