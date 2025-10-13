import { createDevice, getCodes } from '@/api/device/device';
import { MESSAGES } from '@/common/constants/msg';
import { showError, showSuccess } from '@/common/utils/toast';
import MainLayout from '@/layouts/MainLayout';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DeviceForm = () => {
    const navigate = useNavigate();

    const [deviceTypes, setDeviceTypes] = useState([]);
    const [vendors, setVendors] = useState([]);

    const [form, setForm] = useState({
        deviceName: '',
        deviceTypeId: 0,
        vendorId: 0,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const result = await createDevice(form);
        try {
            if (result.success) {
                showSuccess(MESSAGES.INSERT_SUCCESS);
                navigate('/devices');
            } else {
                showError(MESSAGES.SERVER_ERROR);
            }
        } catch (err) {
            console.error('장비 등록 실패: ' + err);
            showError(MESSAGES.SERVER_ERROR);
        }
    };

    // 장비구분 코드 목록 조회
    const getDeviceTypes = async () => {
        try {
            const result = await getCodes('001');
            if (result.success) {
                setDeviceTypes(result.data);
            } else {
                showError(MESSAGES.SERVER_ERROR);
            }
        } catch (err) {
            console.error('장비구분 코드 목록 조회 실패: ' + err);
            showError(MESSAGES.SERVER_ERROR);
        }
    };

    // 제조사 코드 목록 조회
    const getVendors = async () => {
        try {
            const result = await getCodes('002');
            if (result.success) {
                setVendors(result.data);
            } else {
                showError(MESSAGES.SERVER_ERROR);
            }
        } catch (err) {
            console.error('제조사 코드 목록 조회 실패: ' + err);
            showError(MESSAGES.SERVER_ERROR);
        }
    };

    useEffect(() => {
        getDeviceTypes();
        getVendors();
    }, []);

    return (
        <MainLayout>
            <div className="max-w-lg mx-auto bg-white p-6 rounded shadow">
                <h1 className="text-xl font-bold mb-4">장비 생성</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-1 font-medium">장비명</label>
                        <input
                            type="text"
                            name="deviceName"
                            value={form.deviceName}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">장비구분</label>
                        <select
                            name="deviceTypeId"
                            value={form.deviceTypeId}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                            required
                        >
                            <option value="">-- 선택하세요 --</option>
                            {deviceTypes.map((deviceType) => (
                                <option key={deviceType.codeId} value={deviceType.codeId}>
                                    {deviceType.codeName}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">제조사</label>
                        <select
                            name="vendorId"
                            value={form.vendorId}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                            required
                        >
                            <option value="">-- 선택하세요 --</option>
                            {vendors.map((vendor) => (
                                <option key={vendor.codeId} value={vendor.codeId}>
                                    {vendor.codeName}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={() => navigate('/devices')}
                            className="px-4 py-2 rounded bg-gray-400 text-white hover:bg-gray-500"
                        >
                            취소
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                        >
                            저장
                        </button>
                    </div>
                </form>
            </div>
        </MainLayout>
    );
};

export default DeviceForm;
