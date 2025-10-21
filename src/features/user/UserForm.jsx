import { getMyInfo } from '@/api/auth/auth';
import { updateUser } from '@/api/user/adminUserApi';
import { MESSAGES } from '@/common/constants/msg';
import { showError, showSuccess } from '@/common/utils/toast';
import { emailFormat, lengthBetween, required, validateForm } from '@/common/utils/validator';
import MainLayout from '@/layouts/MainLayout';
import { setAuth } from '@/store/authSlice';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const UserForm = ({ pageType, setPageType, selectedUser }) => {
    const dispatch = useDispatch();
    const currentUserId = useSelector(({ auth }) => auth.userId);

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        userId: 0,
        username: '',
        name: '',
        email: '',
        role: 'USER',
    });

    const rules = {
        name: [required('이름을 입력해주세요.'), lengthBetween('이름', 2, 20)],
        email: [required('이메일을 입력해주세요.'), emailFormat()],
    };

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();

        // validation
        const errorMessage = validateForm(formData, rules);
        if (errorMessage) {
            showError(errorMessage);
            return;
        }

        try {
            const result = await updateUser(formData);

            if (result.success) {
                showSuccess('회원정보가 수정되었습니다.');

                // 현재 수정한 사용자가 본인인 경우, Redux store 업데이트
                console.log(formData.userId, currentUserId);
                if (formData.userId === currentUserId) {
                    const updatedUserInfo = await getMyInfo();
                    dispatch(setAuth(updatedUserInfo));
                }

                setPageType('list');
            } else {
                showError(MESSAGES.SERVER_ERROR);
            }
        } catch (err) {
            console.error('회원정보 수정 실패: ' + err);
            showError(MESSAGES.SERVER_ERROR);
        }
    };

    useEffect(() => {
        if (pageType === 'edit' && selectedUser) {
            setFormData({
                userId: selectedUser.userId,
                username: selectedUser.username,
                name: selectedUser.name,
                email: selectedUser.email,
                role: selectedUser.role,
            });
        }
    }, [pageType, selectedUser]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        // 에러 메시지 제거
        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: '',
            }));
        }
    };

    const handleCancel = () => {
        setPageType('list');
    };

    return (
        <MainLayout>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">
                    {pageType === 'create' ? '사용자 생성' : '사용자 수정'}
                </h1>
                <button
                    onClick={handleCancel}
                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                    목록으로
                </button>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* 아이디 */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                아이디 <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleInputChange}
                                disabled={pageType === 'edit'} // 편집 모드에서는 아이디 수정 불가
                                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500
                                    ${
                                        errors.username ? 'border-red-500' : 'border-gray-300'
                                    } ${pageType === 'edit' ? 'bg-gray-100' : ''}`}
                                placeholder="아이디를 입력하세요"
                            />
                            {errors.username && (
                                <p className="mt-1 text-sm text-red-500">{errors.username}</p>
                            )}
                        </div>

                        {/* 이름 */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                이름
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="이름을 입력하세요"
                            />
                        </div>

                        {/* 이메일 */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                이메일
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    errors.email ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder="이메일을 입력하세요"
                            />
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                            )}
                        </div>

                        {/* 권한 */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                권한
                            </label>
                            <select
                                name="role"
                                value={formData.role}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="USER">일반 사용자</option>
                                <option value="ADMIN">관리자</option>
                            </select>
                        </div>
                    </div>

                    {pageType === 'edit' && selectedUser && (
                        <div className="pt-6 border-t border-gray-200">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                                <div>
                                    <span className="font-medium">생성일시:</span>{' '}
                                    {moment(selectedUser.createdAt).format('YYYY-MM-DD HH:mm:ss')}
                                </div>
                                <div>
                                    <span className="font-medium">마지막 수정일시:</span>{' '}
                                    {selectedUser.updatedAt
                                        ? moment(selectedUser.updatedAt).format(
                                              'YYYY-MM-DD HH:mm:ss'
                                          )
                                        : '-'}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 버튼 */}
                    <div className="flex justify-end space-x-3 pt-6">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                        >
                            취소
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? '처리 중...' : pageType === 'create' ? '생성' : '수정'}
                        </button>
                    </div>
                </form>
            </div>
        </MainLayout>
    );
};

export default UserForm;
