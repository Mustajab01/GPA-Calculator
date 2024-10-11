import React, { useState } from 'react';
import CourseInput from './CourseInput';

const Semester = ({ id, removeSemester }) => {
    const [courses, setCourses] = useState([{ id: 1, score: '' }]);

    const addCourse = () => {
        setCourses([...courses, { id: courses.length + 1, score: '' }]);
    };

    const removeCourse = (courseId) => {
        setCourses(courses.filter((course) => course.id !== courseId));
    };

    const updateScore = (courseId, score) => {
        const updatedCourses = courses.map((course) =>
            course.id === courseId ? { ...course, score } : course
        );
        setCourses(updatedCourses);
    };

    const calculateSemesterGPA = () => {
        const validCourses = courses.filter((course) => course.score !== '');
        if (validCourses.length === 0) return 0;

        const totalGPA = validCourses.reduce((acc, course) => {
            return acc + calculateGPAFromScore(course.score);
        }, 0);

        return (totalGPA / validCourses.length).toFixed(2);
    };

    const calculateGPAFromScore = (score) => {
        if (score >= 85) return 4.0;
        if (score >= 80) return 3.8;
        if (score >= 75) return 3.4;
        if (score >= 71) return 3.0;
        if (score >= 68) return 2.8;
        if (score >= 64) return 2.4;
        if (score >= 61) return 2.0;
        if (score >= 57) return 1.8;
        if (score >= 53) return 1.4;
        if (score >= 50) return 1.0;
        return 0;
    };

    return (
        <div className="bg-gray-100 p-4 mb-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">Semester {id}</h2>
            {courses.map((course) => (
                <CourseInput
                    key={course.id}
                    id={course.id}
                    updateScore={updateScore}
                    removeCourse={removeCourse}
                />
            ))}
            <button
                onClick={addCourse}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 mt-4"
            >
                Add Course
            </button>
            <button
                onClick={() => removeSemester(id)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 mt-4 ml-2"
            >
                Remove Semester
            </button>
            <div className="mt-4 text-lg">
                Semester GPA: <span className="font-bold">{calculateSemesterGPA()}</span>
            </div>
        </div>
    );
};

export default Semester;
