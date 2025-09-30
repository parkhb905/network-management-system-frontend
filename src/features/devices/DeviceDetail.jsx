import { getCodes, getDevice, updateDevice } from '@/api/device/device';
import { MESSAGES } from '@/common/constants/msg';
import { showError, showSuccess } from '@/common/utils/toast';
import MainLayout from '@/layouts/MainLayout';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const DeviceDetail = () => {
    const navigate = useNavigate();

    const { deviceId } = useParams();

    const loadDevice = async () => {
        try {
            const result = await getDevice(deviceId);

            if (result.success) {
                setForm(result.data);
            } else {
                showError(MESSAGES.SERVER_ERROR);
            }
        } catch (err) {
            console.error('장비 상세 조회 에러: ' + err);
            showError(MESSAGES.SERVER_ERROR);
        }
    };

    useEffect(() => {
        loadDevice();
    }, [deviceId]);

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

        const result = await updateDevice(deviceId, form);
        try {
            if (result.success) {
                showSuccess(MESSAGES.UPDATE_SUCCESS);
                navigate('/devices');
            } else {
                showError(MESSAGES.SERVER_ERROR);
            }
        } catch (err) {
            console.error('장비 수정 실패: ' + err);
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
    }, [deviceId]);

    return (
        <MainLayout>
            <div className="max-w-lg mx-auto bg-white p-6 rounded shadow">
                <h1 className="text-xl font-bold mb-4">장비 수정</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-1 font-medium">장비명</label>
                        <input
                            type="text"
                            name="deviceName"
                            value={form.deviceName || ''}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">장비구분</label>
                        <select
                            name="deviceTypeId"
                            value={form.deviceTypeId || ''}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                        >
                            <option value="">-- 선택하세요 --</option>
                            {deviceTypes.map((t) => (
                                <option key={t.codeId} value={t.codeId}>
                                    {t.codeName}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">제조사</label>
                        <select
                            name="vendorId"
                            value={form.vendorId || ''}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                        >
                            <option value="">-- 선택하세요 --</option>
                            {vendors.map((v) => (
                                <option key={v.codeId} value={v.codeId}>
                                    {v.codeName}
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

export default DeviceDetail;
