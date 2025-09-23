import { Link } from 'react-router-dom';

export default function Sidebar() {
    return (
        <aside className="w-64 bg-gray-800 text-white flex flex-col">
            <div className="p-4 text-2xl font-bold border-b border-gray-700">Menu</div>
            <nav className="flex-1 p-4 space-y-2">
                <Link to="/dashboard" className="block px-3 py-2 rounded hover:bg-gray-700">
                    Dashboard
                </Link>
                <Link to="/devices" className="block px-3 py-2 rounded hover:bg-gray-700">
                    Devices
                </Link>
                <Link to="/logs" className="block px-3 py-2 rounded hover:bg-gray-700">
                    Logs
                </Link>
                <Link to="/settings" className="block px-3 py-2 rounded hover:bg-gray-700">
                    Settings
                </Link>
            </nav>
        </aside>
    );
}
