import { deleteUser, updateUser } from '@/api/user';
import { MESSAGES } from '@/common/constants/msg';
import { showError, showSuccess, showWarning } from '@/common/utils/toast';
import { emailFormat, lengthBetween, validateForm } from '@/common/utils/validator';
import MainLayout from '@/layouts/MainLayout';
import { setAuth } from '@/store/authSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const MyPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const username = useSelector(({ auth }) => auth.username);
    const email = useSelector(({ auth }) => auth.email);

    const [newEmail, setNewEmail] = useState(email || '');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    useEffect(() => {
        setNewEmail(email)
    }, [email])

    const handleUpdate = async (e) => {
        e.preventDefault();

        // 비밀번호 수정 시
        if (newPassword || confirmPassword) {
            // 비밀번호, 확인 비밀번호 일치 여부 검사
            if (newPassword !== confirmPassword) {
                showWarning('비밀번호가 일치하지 않습니다.');
                return;
            }
            if (!currentPassword) {
                showWarning('현재 비밀번호를 입력해주세요.');
                return;
            }
        }

        const payload = {};
        if (newEmail && newEmail !== email) {
            // validation
            const errorMessage = validateForm({ email }, { email: [emailFormat()] });
            if (errorMessage) {
                showError(errorMessage);
                return;
            }

            payload.email = newEmail;
        };
        if (currentPassword && newPassword) {
            // validation
            const errorMessage = validateForm({ newPassword }, { newPassword: [lengthBetween('비밀번호', 8, 20)] });
            if (errorMessage) {
                showError(errorMessage);
                return;
            }

            payload.currentPassword = currentPassword;
            payload.newPassword = newPassword;
        }

        // 아무것도 수정하지 않은 경우
        if (Object.keys(payload).length === 0) {
            showWarning('수정할 항목이 없습니다.');
            return;
        }

        try {
            const result = await updateUser(payload);

            if (result.success) {
                showSuccess('회원정보가 수정되었습니다.');
                dispatch(setAuth({ email: newEmail }))
                navigate("/dashboard");
            } else {
                showError(MESSAGES.SERVER_ERROR);
            }
        } catch (err) {
            console.log('회원정보 수정 실패: ' + err);
            showError(MESSAGES.SERVER_ERROR);
        }
    };

    const handleDelete = async () => {
        try {
            const result = await deleteUser();
            
            if(result.success) {
                showSuccess('회원탈퇴 되었습니다.');
                navigate("/");
            } else {
                showError(MESSAGES.SERVER_ERROR);
            }
        } catch(err) { 
            console.log('회원탈퇴 실패: ' + err);
            showError(MESSAGES.SERVER_ERROR);
        }
    };

    return (
        <MainLayout>
            <div className="max-w-md mx-auto p-6 bg-white shadow rounded-lg">
                <h2 className="text-2xl font-bold mb-4">마이페이지</h2>

                <form onSubmit={handleUpdate} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium">아이디</label>
                        <input
                            type="text"
                            value={username}
                            disabled
                            className="w-full px-3 py-2 border rounded bg-gray-100"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">이메일</label>
                        <input
                            type="email"
                            value={newEmail}
                            onChange={(e) => setNewEmail(e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">비밀번호 변경</label>

                        <div className="mt-2 space-y-2">
                            <div>
                                <label htmlFor="currentPassword" className="block text-xs text-gray-600">현재 비밀번호</label>
                                <input
                                    id="currentPassword"
                                    type="password"
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    className="w-full px-3 py-2 border rounded"
                                />
                            </div>

                            <div>
                                <label htmlFor="newPassword" className="block text-xs text-gray-600">새 비밀번호</label>
                                <input
                                    id="newPassword"
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="w-full px-3 py-2 border rounded"
                                />
                            </div>

                            <div>
                                <label htmlFor="confirmPassword" className="block text-xs text-gray-600">새 비밀번호 확인</label>
                                <input
                                    id="confirmPassword"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full px-3 py-2 border rounded"
                                />
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                    >
                        수정하기
                    </button>
                </form>

                <button
                    onClick={handleDelete}
                    className="mt-6 w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
                >
                    회원 탈퇴
                </button>
            </div>
        </MainLayout>
    );
};

export default MyPage;
