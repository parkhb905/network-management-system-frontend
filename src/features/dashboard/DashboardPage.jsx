import MainLayout from '@/layouts/MainLayout';
import DeviceTypeChart from './widgets/DeviceTypeChart';
import VendorChart from './widgets/VendorChart';
import CpuTop5Chart from './widgets/CpuTop5Chart';
import MemoryTop5Chart from './widgets/MemoryTop5Chart';

export default function DashboardPage() {
    return (
        <MainLayout>
            <div className="grid grid-cols-2 gap-6 px-6 pb-6">
                {/* 1행 */}
                <div className="bg-white rounded-2xl shadow-sm p-4">
                    <DeviceTypeChart />
                </div>
                <div className="bg-white rounded-2xl shadow-sm p-4">
                    <VendorChart />
                </div>

                {/* 2행 */}
                <div className="bg-white rounded-2xl shadow-sm p-4">
                    <CpuTop5Chart />
                </div>
                <div className="bg-white rounded-2xl shadow-sm p-4">
                    <MemoryTop5Chart />
                </div>

                {/* 3행 — 추후 확장 */}
            </div>
        </MainLayout>
    );
}
