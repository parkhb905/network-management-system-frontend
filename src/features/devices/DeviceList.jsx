import MainLayout from "@/layouts/MainLayout";
import { Link } from "react-router-dom";

const DeviceList = () => {
    return (
        <MainLayout>
            <h1>DeviceList</h1>
            <Link to="/devices/new">장비 생성</Link>
        </MainLayout>
    )
}

export default DeviceList;