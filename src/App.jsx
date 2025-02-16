import { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import * as XLSX from 'xlsx';
import GpaTable from './components/GpaTable';
import { GraduationCap, PlusCircle } from 'lucide-react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import SemesterContent from './components/SemesterContent';

const APP_KEY = 'gpa-app-data';

const createDefaultCourses = () => {
    return Array.from({ length: 6 }, (_, index) => ({
        id: index + 1,
        name: `Course ${index + 1}`,
        score: ''
    }));
};

const App = () => {
    const [semesters, setSemesters] = useState([]);
    const [selectedSemester, setSelectedSemester] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const isMounted = useRef(false);

    useEffect(() => {
        const storedData = localStorage.getItem(APP_KEY);
        if (storedData) {
            const { semesters: storedSemesters, selectedSemester: storedSelectedSemester } = JSON.parse(storedData);
            setSemesters(storedSemesters);
            if (storedSelectedSemester && storedSemesters.some(sem => sem.id === storedSelectedSemester)) {
                setSelectedSemester(storedSelectedSemester);
            }
        }
    }, []);

    useEffect(() => {
        if (isMounted.current) {
            localStorage.setItem(APP_KEY, JSON.stringify({ semesters, selectedSemester }));
        } else {
            isMounted.current = true;
        }
    }, [semesters, selectedSemester]);

    const addSemester = () => {
        if (semesters.length < 8) {
            const newSemester = {
                id: Math.max(...semesters.map(sem => sem.id), 0) + 1,
                name: `Semester ${semesters.length + 1}`,
                gpa: 0,
                courses: createDefaultCourses()
            };
            setSemesters([...semesters, newSemester]);
            setSelectedSemester(newSemester.id);
        }
    };

    const removeSemester = (id) => {
        const updatedSemesters = semesters.filter((semester) => semester.id !== id);
        setSemesters(updatedSemesters);

        if (selectedSemester === id) {
            if (updatedSemesters.length > 0) {
                setSelectedSemester(updatedSemesters[updatedSemesters.length - 1].id);
            } else {
                setSelectedSemester(null);
            }
        }
    };

    const updateSemesterGPA = (id, gpa) => {
        setSemesters(semesters.map(semester =>
            semester.id === id ? { ...semester, gpa } : semester
        ));
    };

    const updateSemesterCourses = (semesterId, updatedCourses) => {
        setSemesters(semesters.map(semester =>
            semester.id === semesterId ? { ...semester, courses: updatedCourses } : semester
        ));
    };

    const calculateCGPA = () => {
        if (semesters.length === 0) return '0.00';
        const totalGPA = semesters.reduce((acc, semester) => acc + semester.gpa, 0);
        return (totalGPA / semesters.length).toFixed(2);
    };

    const exportData = () => {
        if (semesters.length === 0) {
            alert('No data to export. Please add at least one semester.');
            return;
        }

        const workbook = XLSX.utils.book_new();

        semesters.forEach((semester) => {
            const worksheet = XLSX.utils.json_to_sheet([
                { Name: semester.name, GPA: semester.gpa.toFixed(2) },
                ...semester.courses.map((course) => ({
                    Course: course.name,
                    Score: course.score || '',
                })),
            ]);
            XLSX.utils.book_append_sheet(workbook, worksheet, semester.name);
        });

        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = URL.createObjectURL(data);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'gpa_data.xlsx');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const WelcomeScreen = () => (
        <div className="flex flex-col items-center justify-center h-full text-center p-6">
            <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
                <div className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <GraduationCap size={32} className="text-white" />
                </div>

                <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 text-transparent bg-clip-text mb-4">
                    Welcome to GPA Calculator
                </h2>

                <p className="text-gray-600 mb-8">
                    Track your academic progress with ease. Get started by adding your first semester.
                </p>

                <button
                    onClick={addSemester}
                    className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white p-3 rounded-lg hover:opacity-90 transition font-medium"
                >
                    <PlusCircle size={20} />
                    Add Your First Semester
                </button>
            </div>
        </div>
    );

    return (
        <Router basename="/GPA-Calculator">
            <div className="flex flex-col h-screen bg-gray-50">
                <Navbar
                    exportData={exportData}
                    toggleSidebar={toggleSidebar}
                    calculateCGPA={calculateCGPA}
                />
                <div className="flex flex-1 overflow-hidden">
                    <Sidebar
                        semesters={semesters}
                        selectedSemester={selectedSemester}
                        setSelectedSemester={setSelectedSemester}
                        addSemester={addSemester}
                        removeSemester={removeSemester}
                        calculateCGPA={calculateCGPA}
                        isOpen={isSidebarOpen}
                        toggleSidebar={toggleSidebar}
                    />
                    <main className="flex-1 overflow-y-auto p-4 md:p-6 transition-all duration-300">
                        <Routes>
                            <Route
                                path="/"
                                element={selectedSemester ? (
                                    <SemesterContent
                                        semester={semesters.find(sem => sem.id === selectedSemester)}
                                        updateSemesterGPA={updateSemesterGPA}
                                        updateSemesterCourses={updateSemesterCourses}
                                    />
                                ) : (
                                    <WelcomeScreen />
                                )}
                            />
                            <Route path="/gpa-table" element={<GpaTable />} />
                        </Routes>
                    </main>
                </div>
            </div>
        </Router>
    );
};

export default App;