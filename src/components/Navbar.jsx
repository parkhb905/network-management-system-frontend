import { logout } from '@/store/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Navbar() {
    const { username, isAuthenticated } = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(logout());
        window.location.href = '/login';
    };

    return (
        <nav className="flex items-center justify-between px-6 py-3 bg-white shadow">
            <h1 className="text-xl font-bold text-blue-600">NMS Dashboard</h1>
            <div className="flex items-center space-x-4">
                {isAuthenticated && (
                    <>
                        <Link
                            to="/mypage"
                            className="text-sm font-medium text-blue-600 hover:underline"
                        >
                            {username}
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600"
                        >
                            로그아웃
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
}
