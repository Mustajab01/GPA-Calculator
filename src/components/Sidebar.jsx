import React from 'react';
import { X } from 'lucide-react';
import { Link , useNavigate} from 'react-router-dom';

const Sidebar = ({ semesters, selectedSemester, setSelectedSemester, addSemester, removeSemester, calculateCGPA, isOpen, toggleSidebar }) => {
    const navigate = useNavigate();
    return (
        <aside className={`
            fixed inset-y-0 left-0 z-50 w-64 bg-gray-800 text-white p-4 overflow-y-auto transition-transform duration-300 ease-in-out transform
            ${isOpen ? 'translate-x-0' : '-translate-x-full'}
            md:relative md:translate-x-0
        `}>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">CGPA: {calculateCGPA()}</h2>
                <button onClick={toggleSidebar} className="text-white md:hidden">
                    <X size={24} />
                </button>
            </div>
            <div className="mb-4">
                <Link
                    to="/gpa-table"
                    className="block bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300"
                >
                    GPA Calculation Table
                </Link>
            </div>
            <h2 className="text-xl font-bold mb-4">Semesters</h2>
            <ul className="space-y-2">
                {semesters.map((semester) => (
                    <li 
                        key={semester.id}
                        className={`flex justify-between items-center p-2 rounded cursor-pointer ${
                            selectedSemester === semester.id ? 'bg-blue-600' : 'hover:bg-gray-700'
                        }`}
                        onClick={() => {
                            setSelectedSemester(semester.id);
                            navigate('/');
                            if (window.innerWidth < 768) {
                                toggleSidebar();
                            }
                        }}
                    >
                        <span>{semester.name} (GPA: {semester.gpa.toFixed(2)})</span>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                removeSemester(semester.id);
                            }}
                            className="text-red-400 hover:text-red-600"
                        >
                            ×
                        </button>
                    </li>
                ))}
            </ul>
            <button
                onClick={addSemester}
                className="w-full mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300"
                disabled={semesters.length >= 8}
            >
                Add Semester
            </button>

            <footer className="absolute bottom-4 left-0 w-full text-center">
                <p>
                    Made by: 
                    <a 
                        href="https://github.com/Mustajab01" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-blue-400 hover:underline ml-1"
                    >
                        S. Mustajab Ali
                    </a>
                </p>
            </footer>


        </aside>
        
    );
};

export default Sidebar;