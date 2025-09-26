import { updateUser } from '@/api/user';
import { showSuccess, showWarning } from '@/common/utils/toast';
import MainLayout from '@/layouts/MainLayout';
import React from 'react';
import { useSelector } from 'react-redux';

const MyPage = () => {
    const username = useSelector(({ auth }) => auth.username);
    const email = useSelector(({ auth }) => auth.email);

    const [newEmail, setNewEmail] = useState(email || '');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleUpdate = async () => {
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
        if (newEmail && newEmail !== email) payload.email = newEmail;
        if (currentPassword && newPassword) {
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
                // 메인으로 이동 ? 아니면 그대로 ?
            } else {
                showError(MESSAGES.SERVER_ERROR);
            }
        } catch (err) {
            console.log('회원정보 수정 실패: ' + err);
            showError(MESSAGES.SERVER_ERROR);
        }
    };

    const handleDelete = async () => {};

    return (
        <MainLayout>
            <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded-lg">
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
                        <input
                            type="password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                        />
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                        />
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                        />
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
