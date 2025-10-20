import React, { useState } from 'react';
import UserList from './UserList';

const UserPage = () => {
    const [pageType, setPageType] = useState('list');
    const [selectedUser, setSelectedUser] = useState(null);

    return (
        <>
            {pageType === 'list' && (
                <UserList setPageType={setPageType} setSelectedUser={setSelectedUser} />
            )}

            {(pageType === 'create' || pageType === 'edit') && (
                <UserForm setPageType={setPageType} selectedUser={selectedUser} />
            )}
        </>
    );
};

export default UserPage;
