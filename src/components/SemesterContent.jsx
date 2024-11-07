import React from 'react';
import CourseInput from './CourseInput';

const SemesterContent = ({ semester, updateSemesterGPA, updateSemesterCourses }) => {
    const addCourse = () => {
        if (semester.courses.length < 7) {
            const newCourses = [
                ...semester.courses, 
                { id: Math.max(...semester.courses.map(c => c.id), 0) + 1, name: `Course ${semester.courses.length + 1}`, score: '' }
            ];
            updateSemesterCourses(semester.id, newCourses);
        }
    };

    const removeCourse = (id) => {
        if (semester.courses.length <= 6) {
            alert('Each semester must have at least 6 courses.');
            return;
        }
        
        const newCourses = semester.courses
            .filter((course) => course.id !== id)
            .map((course, index) => ({
                ...course,
                id: index + 1,
                name: `Course ${index + 1}`
            }));
        updateSemesterCourses(semester.id, newCourses);
    };

    const updateScore = (id, score) => {
        const newCourses = semester.courses.map(course => 
            course.id === id ? { ...course, score } : course
        );
        updateSemesterCourses(semester.id, newCourses);
    };

    const calculateGPA = React.useCallback(() => {
        const validCourses = semester.courses.filter((course) => course.score !== '');
        if (validCourses.length === 0) return 0;

        const totalGPA = validCourses.reduce((acc, course) => acc + calculateGPAFromScore(course.score), 0);
        return totalGPA / validCourses.length;
    }, [semester]);

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

    React.useEffect(() => {
        const gpa = calculateGPA();
        if (gpa !== semester.gpa) {
            updateSemesterGPA(semester.id, gpa);
        }
    }, [semester, updateSemesterGPA, calculateGPA]);

    return (
        <div className="bg-white rounded-lg shadow p-4 md:p-6 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-blue-800">{semester.name}</h2>
            <div className="mb-4 text-lg font-semibold text-gray-700">
                GPA: {calculateGPA().toFixed(2)}
            </div>
            <div className="space-y-4 mb-6">
                {semester.courses.map((course) => (
                    <div key={course.id} className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4">
                        <span className="w-full md:w-24 font-medium text-gray-600">{course.name}</span>
                        <CourseInput
                            id={course.id}
                            score={course.score}
                            updateScore={updateScore}
                        />
                        <button
                            onClick={() => removeCourse(course.id)}
                            className="text-red-500 hover:text-red-700 transition duration-300"
                            disabled={semester.courses.length <= 6}
                        >
                            Remove
                        </button>
                    </div>
                ))}
            </div>
            <button
                onClick={addCourse}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300 w-full md:w-auto"
                disabled={semester.courses.length >= 7}
            >
                Add Course
            </button>
        </div>
    );
};

export default SemesterContent;