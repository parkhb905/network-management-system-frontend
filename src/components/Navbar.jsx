export default function Navbar() {
    return (
        <nav className="flex items-center justify-between px-6 py-3 bg-white shadow">
            <h1 className="text-xl font-bold text-blue-600">NMS Dashboard</h1>
            <div className="flex items-center space-x-4">
                <button className="text-gray-600 hover:text-blue-600">🔔</button>
                <span className="text-gray-700">admin</span>
            </div>
        </nav>
    );
}
