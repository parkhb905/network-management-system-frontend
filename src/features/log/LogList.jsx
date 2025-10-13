import { getUserAccessLogs } from '@/api/logs/logs';
import { MESSAGES } from '@/common/constants/msg';
import { showError } from '@/common/utils/toast';
import Table from '@/components/Table';
import MainLayout from '@/layouts/MainLayout';
import { createColumnHelper } from '@tanstack/react-table';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const columnHelper = createColumnHelper();

const columns = [
    columnHelper.accessor('rownum', {
        id: 'rownum',
        cell: (info) => info.getValue(),
        header: '순번',
    }),
    columnHelper.accessor((row) => row.username, {
        id: 'username',
        cell: (info) => info.getValue(),
        header: () => <span>아이디</span>,
    }),
    columnHelper.accessor('result', {
        cell: (info) => info.renderValue(),
        header: () => '로그인 시도 결과',
    }),
    columnHelper.accessor('ip', {
        header: () => <span>IP</span>,
    }),
    columnHelper.accessor('attemptAt', {
        header: '로그인 시도 일시',
        cell: (info) => {
            return info.getValue() ? (
                <span>{moment(info.getValue()).format('YYYY-MM-DD HH:mm:ss')}</span>
            ) : (
                <></>
            );
        },
    }),
    columnHelper.accessor('loginAt', {
        header: '로그인 일시',
        cell: (info) => {
            return info.getValue() ? (
                <span>{moment(info.getValue()).format('YYYY-MM-DD HH:mm:ss')}</span>
            ) : (
                <></>
            );
        },
    }),
    columnHelper.accessor('logoutAt', {
        header: '로그아웃 일시',
        cell: (info) => {
            return info.getValue() ? (
                <span>{moment(info.getValue()).format('YYYY-MM-DD HH:mm:ss')}</span>
            ) : (
                <></>
            );
        },
    }),
];

const LogList = () => {
    const [userAccessLogs, setUserAccessLogs] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);

    const loadUserAccessLogs = async () => {
        try {
            const result = await getUserAccessLogs(page, pageSize);

            if (result.success) {
                setUserAccessLogs(result.content);
                setTotalPages(result.pageInfo.totalPages);
                setTotalElements(result.pageInfo.totalElements);
            } else {
                showError(MESSAGES.SERVER_ERROR);
            }
        } catch (err) {
            console.error('사용자 접속 로그 목록 조회 에러: ' + err);
            showError(MESSAGES.SERVER_ERROR);
        }
    };

    useEffect(() => {
        loadUserAccessLogs();
    }, [page, pageSize]);

    return (
        <MainLayout>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">사용자 접속 로그 리스트</h1>
            </div>

            <div className="overflow-x-auto">
                <Table
                    data={userAccessLogs}
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
                    idKey="userId"
                />
            </div>
        </MainLayout>
    );
};

export default LogList;
