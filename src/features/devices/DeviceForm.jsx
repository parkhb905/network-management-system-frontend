import MainLayout from "@/layouts/MainLayout";
import { Link } from "react-router-dom";

const DeviceForm = () => {
    return (
        <MainLayout>
            <h1>DeviceForm</h1>
            <Link to="/devices">리스트</Link>
        </MainLayout>
    )
}

export default DeviceForm;