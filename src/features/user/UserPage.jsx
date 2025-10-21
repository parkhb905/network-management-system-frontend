import React, { useState } from 'react';
import UserList from './UserList';
import UserForm from './UserForm';

const UserPage = () => {
    const [pageType, setPageType] = useState('list');
    const [selectedUser, setSelectedUser] = useState(null);

    return (
        <>
            {pageType === 'list' && (
                <UserList setPageType={setPageType} setSelectedUser={setSelectedUser} />
            )}

            {(pageType === 'create' || pageType === 'edit') && (
                <UserForm
                    pageType={pageType}
                    setPageType={setPageType}
                    selectedUser={selectedUser}
                />
            )}
        </>
    );
};

export default UserPage;
