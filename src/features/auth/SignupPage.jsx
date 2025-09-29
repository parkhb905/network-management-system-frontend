import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../../layouts/AuthLayout';
import { useState } from 'react';
import { signUp } from '@/api/auth';
import { showError, showSuccess, showWarning } from '@/common/utils/toast';
import { MESSAGES } from '@/common/constants/msg';
import {
    emailFormat,
    lengthBetween,
    numberBetween,
    required,
    usernameFormat,
    validateForm,
} from '@/common/utils/validator';

export default function SignupPage() {
    const navigate = useNavigate();

    const [signUpForm, setSignUpForm] = useState({
        username: '',
        email: '',
        password: '',
    });

    const rules = {
        username: [
            required('아이디를 입력해주세요.'),
            lengthBetween('아이디', 4, 20),
            usernameFormat(),
        ],
        email: [required('이메일을 입력해주세요.'), emailFormat()],
        password: [required('비밀번호를 입력해주세요.'), lengthBetween('비밀번호', 8, 20)],
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignUpForm({ ...signUpForm, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // validation
        const errorMessage = validateForm(signUpForm, rules);
        if (errorMessage) {
            showError(errorMessage);
            return;
        }

        // 비밀번호, 확인 비밀번호 일치 여부 검사
        if (signUpForm.password !== signUpForm.confirmPassword) {
            showWarning('비밀번호가 일치하지 않습니다.');
            return;
        }

        try {
            const result = await signUp(signUpForm);

            if (result.success) {
                showSuccess('회원가입 완료되었습니다.');
                navigate('/login');
            } else {
                showError(MESSAGES.SERVER_ERROR);
            }
        } catch (err) {
            console.log('회원가입 실패: ' + err);
            showError(MESSAGES.SERVER_ERROR);
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
                        name="confirmPassword"
                        placeholder="Confirm your password"
                        value={signUpForm.confirmPassword}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        required
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
