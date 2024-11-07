import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';

const Navbar = ({ exportData, toggleSidebar }) => {
    return (
        <nav className="bg-gradient-to-r from-blue-600 to-blue-800 p-4 shadow-md">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <div className="flex items-center">
                    <button
                        onClick={toggleSidebar}
                        className="text-white mr-4 focus:outline-none md:hidden"
                    >
                        <Menu size={24} />
                    </button>
                    <Link to="/" className="text-white text-2xl font-bold hover:text-blue-200 transition duration-300">
                        GPA Calculator
                    </Link>
                </div>
                <button
                    onClick={exportData}
                    className="bg-white text-blue-800 px-4 py-2 rounded-full hover:bg-blue-100 transition duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 text-sm md:text-base"
                >
                    Export CSV
                </button>
            </div>
        </nav>
    );
};

export default Navbar;