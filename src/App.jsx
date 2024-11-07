import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import * as XLSX from 'xlsx';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import SemesterContent from './components/SemesterContent';
import GpaTable from './components/GpaTable';

const APP_KEY = 'gpa-app-data';

const App = () => {
    const [semesters, setSemesters] = useState([]);
    const [selectedSemester, setSelectedSemester] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const isMounted = useRef(false);

    useEffect(() => {
        // Load data from localStorage on initial render
        const storedData = localStorage.getItem(APP_KEY);
        if (storedData) {
            const { semesters: storedSemesters, selectedSemester: storedSelectedSemester } = JSON.parse(storedData);
            setSemesters(storedSemesters);
            // Only set selected semester if it exists in the loaded semesters
            if (storedSelectedSemester && storedSemesters.some(sem => sem.id === storedSelectedSemester)) {
                setSelectedSemester(storedSelectedSemester);
            }
        }
    }, []);

    useEffect(() => {
        // Save data to localStorage whenever semesters or selectedSemester changes
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
                courses: [{ id: 1, name: 'Course 1', score: '' }]
            };
            setSemesters([...semesters, newSemester]);
            setSelectedSemester(newSemester.id);
        }
    };

    const removeSemester = (id) => {
        const updatedSemesters = semesters.filter((semester) => semester.id !== id);
        setSemesters(updatedSemesters);

        // Handle selected semester after removal
        if (selectedSemester === id) {
            // If there are remaining semesters, select the last one
            if (updatedSemesters.length > 0) {
                setSelectedSemester(updatedSemesters[updatedSemesters.length - 1].id);
            } else {
                // If no semesters remain, clear the selection
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

    return (
        <Router basename="/GPA-Calculator">
            <div className="flex flex-col h-screen bg-gray-100">
                <Navbar exportData={exportData} toggleSidebar={toggleSidebar} />
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
                    <main className="flex-1 overflow-y-auto p-4 transition-all duration-300 ease-in-out">
                        <Routes>
                            <Route path="/" element={
                                selectedSemester ? (
                                    <SemesterContent
                                        semester={semesters.find(sem => sem.id === selectedSemester)}
                                        updateSemesterGPA={updateSemesterGPA}
                                        updateSemesterCourses={updateSemesterCourses}
                                    />
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-full text-center p-4">
                                        <h2 className="text-2xl font-bold text-gray-800 mb-4">
                                            Welcome to GPA Calculator
                                        </h2>
                                        <p className="text-gray-600 mb-6 max-w-md">
                                            Get started by adding your first semester using the "Add Semester" button in the sidebar.
                                        </p>
                                        <button
                                            onClick={addSemester}
                                            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                                        >
                                            Add Your First Semester
                                        </button>
                                    </div>
                                )
                            } />
                            <Route path="/gpa-table" element={<GpaTable />} />
                        </Routes>
                    </main>
                </div>
            </div>
        </Router>
    );
};

export default App;