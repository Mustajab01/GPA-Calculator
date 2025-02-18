'use client'

import Link from 'next/link';
import { Download, GraduationCap, Menu } from 'lucide-react';
import { useContext } from 'react';
import { GpaDataContext } from '@/context/GpaDataContext';

const Navbar = () => {
  const { exportData, toggleSidebar, calculateCGPA } = useContext(GpaDataContext)
  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-violet-600 p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={toggleSidebar}
            className="text-white focus:outline-none md:hidden hover:bg-white/20 p-2 rounded-lg transition"
          >
            <Menu size={24} />
          </button>
          <Link href="/" className="hidden md:flex items-center gap-2 text-white text-xl font-bold hover:text-white/90 transition">
            <GraduationCap size={28} />
            <span>GPA Calculator</span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <div className="bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
            <p className="text-white font-medium">
              CGPA: <span className="text-xl font-bold">{calculateCGPA()}</span>
            </p>
          </div>
          <button
            onClick={exportData}
            className="hidden md:flex items-center gap-2 bg-white text-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-50 transition font-medium"
          >
            <Download size={20} />
            Export
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

