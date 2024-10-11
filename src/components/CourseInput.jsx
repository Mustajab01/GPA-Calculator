import React, { useState } from 'react';

const CourseInput = ({ id, updateScore, removeCourse }) => {
    const [score, setScore] = useState('');

    const handleInputChange = (e) => {
        const value = e.target.value;
        setScore(value);
        updateScore(id, value);
    };

    return (
        <div className="flex items-center space-x-4 mb-2">
            <input
                type="number"
                value={score}
                onChange={handleInputChange}
                placeholder={`Course ${id} Score (1-100)`}
                className="p-2 border rounded-lg w-full"
            />
            <button
                onClick={() => removeCourse(id)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
                Remove
            </button>
        </div>
    );
};

export default CourseInput;
