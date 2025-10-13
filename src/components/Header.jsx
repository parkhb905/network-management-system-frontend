import { logout } from '@/store/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout as logoutApi } from '@/api/auth/auth';
import { showError } from '@/common/utils/toast';
import { MESSAGES } from '@/common/constants/msg';

export default function Header() {
    const { username, isAuthenticated } = useSelector((state) => state.auth);

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

    return (
        <nav className="flex items-center justify-between px-6 py-3 bg-white shadow">
            <Link to="/dashboard" className="text-sm font-medium text-blue-600 hover:underline">
                <h1 className="text-xl font-bold text-blue-600">NMS</h1>
            </Link>
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
