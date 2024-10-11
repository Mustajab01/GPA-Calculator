import React, { useState } from 'react';
import Semester from './components/Semester';

const App = () => {
    const [semesters, setSemesters] = useState([{ id: 1 }]);

    const addSemester = () => {
        setSemesters([...semesters, { id: semesters.length + 1 }]);
    };

    const removeSemester = (id) => {
        setSemesters(semesters.filter((semester) => semester.id !== id));
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6">
                <h1 className="text-3xl font-bold mb-6 text-center">CGPA Calculator</h1>
                <button
                    onClick={addSemester}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 mb-4"
                >
                    Add Semester
                </button>
                {semesters.map((semester) => (
                    <Semester
                        key={semester.id}
                        id={semester.id}
                        removeSemester={removeSemester}
                    />
                ))}
            </div>
        </div>
    );
};

export default App;
