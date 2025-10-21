import { getUsers } from '@/api/user/adminUserApi';
import { MESSAGES } from '@/common/constants/msg';
import { showError } from '@/common/utils/toast';
import { createColumnHelper } from '@tanstack/react-table';
import React, { useEffect, useState } from 'react';
import Table from '@/components/Table';
import moment from 'moment';
import MainLayout from '@/layouts/MainLayout';
import { Link } from 'react-router-dom';

const UserList = ({ setPageType, setSelectedUser }) => {
    const columnHelper = createColumnHelper();

    const columns = [
        columnHelper.accessor('rownum', {
            id: 'rownum',
            cell: (info) => info.getValue(),
            header: '순번',
        }),
        columnHelper.accessor((row) => row.username, {
            id: 'username',
            cell: (info) => {
                return (
                    <span
                        onClick={() => {
                            setPageType('edit');
                            setSelectedUser(info.row.original);
                        }}
                    >
                        {info.getValue()}
                    </span>
                );
            },
            header: () => <span>아이디</span>,
        }),
        columnHelper.accessor((row) => row.name, {
            id: 'name',
            cell: (info) => info.getValue(),
            header: () => <span>이름</span>,
        }),
        columnHelper.accessor('createdAt', {
            header: '가입일시',
            cell: (info) => <span>{moment(info.getValue()).format('YYYY-MM-DD HH:mm:ss')}</span>,
        }),
    ];

    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);

    // 사용자 목록 조회
    const loadUsers = async () => {
        try {
            const result = await getUsers(page, pageSize);

            if (result.success) {
                setUsers(result.content);
                setTotalPages(result.pageInfo.totalPages);
                setTotalElements(result.pageInfo.totalElements);
            } else {
                showError(MESSAGES.SERVER_ERROR);
            }
        } catch (err) {
            console.error('사용자 목록 조회 에러: ' + err);
            showError(MESSAGES.SERVER_ERROR);
        }
    };

    useEffect(() => {
        loadUsers();
    }, [page, pageSize]);

    return (
        <MainLayout>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">사용자 리스트</h1>
            </div>

            <div className="overflow-x-auto">
                <Table
                    data={users}
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
                    onRowClick={(row) => {
                        setPageType('edit');
                        setSelectedUser(row);
                    }}
                />
            </div>
        </MainLayout>
    );
};

export default UserList;
