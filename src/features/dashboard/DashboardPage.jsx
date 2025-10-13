import { useEffect, useState } from 'react';
import MainLayout from '@/layouts/MainLayout';
import DeviceTypeChart from './widgets/DeviceTypeChart';
import VendorChart from './widgets/VendorChart';
import CpuTop5Chart from './widgets/CpuTop5Chart';
import MemoryTop5Chart from './widgets/MemoryTop5Chart';
// import { getDashboardStats } from '@/api/dashboard/dashboard';

export default function DashboardPage() {
    const [stats, setStats] = useState(null);

    // useEffect(() => {
    //     (async () => {
    //         const data = await getDashboardStats();
    //         setStats(data);
    //     })();
    // }, []);

    return (
        <MainLayout>
            <div className="grid grid-cols-2 gap-6 p-6">
                {/* 1행 */}
                <div className="bg-white rounded-2xl shadow-sm p-4">
                    <h2 className="text-lg font-semibold mb-2">장비구분별 장비수</h2>
                    <DeviceTypeChart />
                </div>
                <div className="bg-white rounded-2xl shadow-sm p-4">
                    <h2 className="text-lg font-semibold mb-2">제조사별 장비수</h2>
                    <VendorChart />
                </div>

                {/* 2행 */}
                {/* <div className="bg-white rounded-2xl shadow-sm p-4">
                    <h2 className="text-lg font-semibold mb-2">시간대별 CPU 사용률 TOP5</h2>
                    <CpuTop5Chart />
                </div>
                <div className="bg-white rounded-2xl shadow-sm p-4">
                    <h2 className="text-lg font-semibold mb-2">시간대별 Memory 사용률 TOP5</h2>
                    <MemoryTop5Chart />
                </div> */}

                {/* 3행 — 추후 확장 */}
            </div>
        </MainLayout>
    );
}
