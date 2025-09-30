import { getDevices } from '@/api/device/device';
import { MESSAGES } from '@/common/constants/msg';
import { showError } from '@/common/utils/toast';
import Table from '@/components/Table';
import MainLayout from '@/layouts/MainLayout';
import { createColumnHelper } from '@tanstack/react-table';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const columnHelper = createColumnHelper();

const columns = [
    columnHelper.accessor('rownum', {
        id: 'rownum',
        cell: (info) => info.getValue(),
        header: '순번',
    }),
    columnHelper.accessor((row) => row.deviceName, {
        id: 'deviceName',
        cell: (info) => <i>{info.getValue()}</i>,
        header: () => <span>장비명</span>,
    }),
    columnHelper.accessor('deviceTypeName', {
        cell: (info) => info.renderValue(),
        header: () => '장비구분명',
    }),
    columnHelper.accessor('vendorName', {
        header: () => <span>제조사명</span>,
    }),
    columnHelper.accessor('createdByName', {
        header: '생성자명',
    }),
    columnHelper.accessor('createdAt', {
        header: '생성일시',
        cell: (info) => <span>{moment(info.getValue()).format('YYYY-MM-DD HH:mm:ss')}</span>,
    }),
];

const DeviceList = () => {
    const [devices, setDevices] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);

    const loadDevices = async () => {
        try {
            const result = await getDevices(page, pageSize);

            if (result.success) {
                setDevices(result.content);
                setTotalPages(result.pageInfo.totalPages);
                setTotalElements(result.pageInfo.totalElements);
            } else {
                showError(MESSAGES.SERVER_ERROR);
            }
        } catch (err) {
            console.error('장비 목록 조회 에러: ' + err);
            showError(MESSAGES.SERVER_ERROR);
        }
    };

    useEffect(() => {
        loadDevices();
    }, [page, pageSize]);

    return (
        <MainLayout>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">장비 리스트</h1>
                <Link
                    to="/devices/new"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    장비 생성
                </Link>
            </div>

            <div className="overflow-x-auto">
                <Table
                    data={devices}
                    totalPages={totalPages}
                    totalElements={totalElements}
                    columns={columns}
                    page={page}
                    pageSize={pageSize}
                    onPageChange={setPage}
                    onPageSizeChange={(newPageSize) => {
                        setPageSize(newPageSize);
                        setPage(1); // 페이지 크기 바꾸면 1페이지로 초기화
                    }}
                />
            </div>
        </MainLayout>
    );
};

export default DeviceList;
