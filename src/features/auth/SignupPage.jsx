import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../../layouts/AuthLayout';
import { useState } from 'react';
import { signUp } from '@/api/auth';
import { toast } from 'react-toastify';

export default function SignupPage() {
    const navigate = useNavigate();

    const [signUpForm, setSignUpForm] = useState({
        username: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setSignUpForm({ ...signUpForm, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const result = await signUp(signUpForm);

            if (result.success) {
                alert('회원가입 성공: ' + result);
                navigate('/login');
            } else {
                console.log('회원가입 실패: ' + result.message);
                toast.warn('회원가입 실패');
            }
        } catch (err) {
            console.log('회원가입 실패: ' + err.response?.data || '서버 오류');
            toast.warn('회원가입 실패');
        }
    };

    return (
        <AuthLayout>
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Create an Account</h2>

            <form className="space-y-5">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                    <input
                        type="text"
                        name="username"
                        placeholder="Enter your username"
                        value={signUpForm.username}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={signUpForm.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        value={signUpForm.password}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        placeholder="Confirm your password"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>

                <button
                    type="button"
                    className="w-full bg-green-600 text-white font-semibold py-2 rounded-lg hover:bg-green-700 transition duration-200"
                    onClick={(e) => handleSubmit(e)}
                >
                    Sign Up
                </button>
            </form>

            <p className="mt-6 text-sm text-center text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="font-medium text-blue-600 hover:underline">
                    Log in
                </Link>
            </p>
        </AuthLayout>
    );
}
