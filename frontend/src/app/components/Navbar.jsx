

function Navbar() {
    return (
        <div className="navbar bg-[#9fb6c3] shadow-md border-b border-gray-200">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl font-bold text-gray-800 hover:text-blue-600">daisyUI</a>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1 space-x-4">
                    <li>
                        <a className="text-gray-600 hover:text-blue-600">Link</a>
                    </li>
                    <li>
                        <details className="relative">
                            <summary className="text-gray-600 hover:text-blue-600 cursor-pointer">
                                Parent
                            </summary>
                            <ul className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg p-2">
                                <li>
                                    <a className="block text-gray-600 hover:text-blue-600 px-4 py-2 rounded-md">Link 1</a>
                                </li>
                                <li>
                                    <a className="block text-gray-600 hover:text-blue-600 px-4 py-2 rounded-md">Link 2</a>
                                </li>
                            </ul>
                        </details>
                    </li>
                </ul>
            </div>
        </div>

    )
}

export default Navbar