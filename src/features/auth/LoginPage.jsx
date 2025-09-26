import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../../layouts/AuthLayout';
import { useState } from 'react';
import { login } from '@/api/auth';
import { showError } from '@/common/utils/toast';
import { ERROR_MESSAGES, MESSAGES } from '@/common/constants/msg';
import { required, validateForm } from '@/common/utils/validator';
import { useDispatch } from 'react-redux';
import { setAuth } from '@/store/authSlice';

export default function LoginPage() {
    const dispatch = useDispatch();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const rules = {
        username: [required('아이디를 입력해주세요.')],
        password: [required('비밀번호를 입력해주세요.')],
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // validation
        const errorMessage = validateForm({ username, password }, rules);
        if (errorMessage) {
            showError(errorMessage);
            return;
        }

        try {
            const {
                accessToken,
                refreshToken,
                username: serverUsername,
            } = await login({
                username,
                password,
            });

            // 토큰 저장
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);

            // Redux 반영
            dispatch(setAuth({ username: serverUsername }));

            // LocalStorage 반영
            localStorage.setItem('username', serverUsername);

            // 이동
            navigate('/dashboard');
        } catch (err) {
            console.error('로그인 에러: ' + err);

            if (err.response) {
                const { status, data } = err.response;

                if (status === 401) {
                    const message = ERROR_MESSAGES[data?.code];
                    if (message) showError(message);
                } else {
                    showError(MESSAGES.SERVER_ERROR);
                }
            } else {
                showError(MESSAGES.NETWORK_ERROR);
            }
        }
    };

    return (
        <AuthLayout>
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
                Network Management System
            </h2>

            <form className="space-y-5" onSubmit={handleSubmit}>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                    <input
                        type="text"
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition duration-200"
                >
                    Login
                </button>
            </form>

            <p className="mt-6 text-sm text-center text-gray-600">
                Don’t have an account?{' '}
                <Link to="/signup" className="font-medium text-blue-600 hover:underline">
                    Sign up
                </Link>
            </p>
        </AuthLayout>
    );
}
