import MainLayout from '@/layouts/MainLayout';
import React from 'react';

const CodePage = () => {
    return (
        <MainLayout>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">코드</h1>
                <button>코드 생성</button>
            </div>

            <div className="overflow-x-auto"></div>
        </MainLayout>
    );
};

export default CodePage;
