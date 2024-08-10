import Link from 'next/link';

function Navbar() {
    return (
        <div className="navbar bg-[#9fb6c3] shadow-md border-b border-gray-200">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl font-bold text-gray-800 hover:text-blue-600">Natural Disaster</a>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1 space-x-4">
                    <li>
                        <Link href="/signin" className="text-gray-600 hover:text-blue-600">
                            Sign In
                        </Link>
                    </li>
                    <li>
                        <Link href="/signup" className="text-gray-600 hover:text-blue-600">
                            Sign Up
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Navbar;
