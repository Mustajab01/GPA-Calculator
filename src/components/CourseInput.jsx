import React from 'react';

const CourseInput = ({ id, score, updateScore }) => {
    const handleInputChange = (e) => {
        const value = e.target.value;
        if (value === '' || (parseInt(value) >= 0 && parseInt(value) <= 100)) {
            updateScore(id, value);
        }
    };

    return (
        <input
            type="number"
            value={score}
            onChange={handleInputChange}
            placeholder="Score (0-100)"
            min={0}
            max={100}
            className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-200 transition duration-300 w-full md:w-auto"
        />
    );
};

export default CourseInput;