/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import SemesterContent from './components/SemesterContent';

const App = () => {
    const [semesters, setSemesters] = useState([
        { 
            id: 1, 
            name: 'Semester 1', 
            gpa: 0,
            courses: [{ id: 1, name: 'Course 1', score: '' }]
        }
    ]);
    const [selectedSemester, setSelectedSemester] = useState(1);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const addSemester = () => {
        if (semesters.length < 8) {
            const newSemester = {
                id: semesters.length + 1,
                name: `Semester ${semesters.length + 1}`,
                gpa: 0,
                courses: [{ id: 1, name: 'Course 1', score: '' }]
            };
            setSemesters([...semesters, newSemester]);
            setSelectedSemester(newSemester.id);
        }
    };

    const removeSemester = (id) => {
        setSemesters(semesters.filter((semester) => semester.id !== id));
        if (selectedSemester === id) {
            setSelectedSemester(semesters[0]?.id || null);
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
        const totalGPA = semesters.reduce((acc, semester) => acc + semester.gpa, 0);
        return semesters.length > 0 ? (totalGPA / semesters.length).toFixed(2) : '0.00';
    };

    const exportData = () => {
        const data = JSON.stringify(semesters, null, 2);
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'gpa_data.json';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <Router>
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
                                    <div className="text-center text-gray-500 mt-10">
                                        Select a semester or add a new one to get started
                                    </div>
                                )
                            } />
                        </Routes>
                    </main>
                </div>
            </div>
        </Router>
    );
};

export default App;