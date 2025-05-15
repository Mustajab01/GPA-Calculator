'use client'

import { ChevronRight, GraduationCap, PlusCircle, Trash2, X } from 'lucide-react';
import Link from 'next/link';
import { useContext } from 'react';
import { GpaDataContext } from '@/context/GpaDataContext';


const Sidebar = () => {
  const { semesters, selectedSemester, setSelectedSemesterFunc, addSemester, removeSemester, calculateCGPA, isSidebarOpen, toggleSidebar } = useContext(GpaDataContext)
  return (
    <aside className={`
            fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-xl text-gray-800
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            md:relative md:translate-x-0
            flex flex-col
        `}>
      {/* Fixed Header Section */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <div className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white px-4 py-2 rounded-lg w-full flex items-center gap-2 justify-center">
            <h2 className="text-xl font-bold">
              CGPA: <span>{calculateCGPA()}</span>
            </h2>
          </div>
          <button onClick={toggleSidebar} className="text-gray-500 hover:text-gray-700 md:hidden ml-4">
            <X size={24} />
          </button>
        </div>

        <Link
          onClick={toggleSidebar}
          href="/gpa-table"
          className="flex items-center gap-2 w-full bg-indigo-50 text-indigo-600 p-3 rounded-lg hover:bg-indigo-100 transition font-medium"
        >
          <GraduationCap size={20} />
          GPA Table
          <ChevronRight size={20} className="ml-auto" />
        </Link>
      </div>

      {/* Scrollable Content Section */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6">
          <h2 className="text-lg font-bold mb-4">Semesters</h2>
          <div className="space-y-2">

            {semesters.map((semester) => (
              <Link
                onClick={toggleSidebar}
                key={semester.id}
                href="/"
              >


                <div

                  onClick={() => setSelectedSemesterFunc(semester.id)}
                  className={`
                                    flex items-center justify-between p-3 rounded-lg cursor-pointer transition
                                    ${selectedSemester === semester.id
                      ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white'
                      : 'hover:bg-gray-100'
                    }
                                `}
                >
                  <div>
                    <span className="font-medium">
                      {semester.name}
                    </span>
                    <span className="text-sm opacity-90 ml-2">
                      (GPA: {semester.gpa.toFixed(2)})
                    </span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeSemester(semester.id);
                    }}
                    className={`p-1 rounded-lg transition ${selectedSemester === semester.id
                      ? 'hover:bg-white/20 text-white'
                      : 'hover:bg-gray-200 text-gray-500'
                      }`}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Fixed Footer Section */}
      <div className="p-6 border-t border-gray-100">
        {semesters.length < 8 && (
          <button
            onClick={addSemester}
            disabled={semesters.length >= 8}
            className="flex items-center gap-2 w-full justify-center bg-gradient-to-r from-indigo-600 to-violet-600 text-white p-3 rounded-lg hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            <PlusCircle size={20} />
            Add Semester
          </button>
        )}

        <footer className="mt-4 text-center">
          <p className="text-gray-600">
            Made by{" "}
            <Link
              href="https://github.com/Mustajab01"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:text-indigo-700 font-medium"
            >
              S. Mustajab Ali
            </Link>
          </p>
        </footer>
      </div>
    </aside>
  );
};

export default Sidebar;