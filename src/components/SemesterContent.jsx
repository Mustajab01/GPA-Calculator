import React, { useContext, useEffect } from 'react';
import { PlusCircle, Trash2 } from 'lucide-react';
import { GpaDataContext } from '@/context/GpaDataContext';

const SemesterContent = () => {
  const { semesters, selectedSemester, updateSemesterGPA, updateSemesterCourses } = useContext(GpaDataContext)
  const semester = semesters.find(sem => sem.id === selectedSemester)

  const addCourse = () => {
    if (semester?.courses.length < 7) {
      const newCourses = [
        ...semester?.courses,
        { id: Math.max(...semester?.courses.map(c => c.id), 0) + 1, name: `Course ${semester?.courses.length + 1}`, score: '' }
      ];
      updateSemesterCourses(semester?.id, newCourses);
    }
  };

  const removeCourse = (id) => {
    if (semester?.courses.length <= 6) {
      alert('Each semester must have at least 6 courses.');
      return;
    }

    const newCourses = semester?.courses
      .filter((course) => course.id !== id)
      .map((course, index) => ({
        ...course,
        id: index + 1,
        name: `Course ${index + 1}`
      }));
    updateSemesterCourses(semester?.id, newCourses);
  };

  const updateScore = (id, score) => {
    const newCourses = semester?.courses.map(course =>
      course.id === id ? { ...course, score } : course
    );
    updateSemesterCourses(semester?.id, newCourses);
  };

  const calculateGPA = React.useCallback(() => {
    const validCourses = semester?.courses.filter(
      (course) => course.score !== ""
    );
    if (validCourses?.length === 0) return 0;

    const totalGPA = validCourses?.reduce(
      (acc, course) => acc + calculateGPAFromScore(course.score),
      0
    );
    return totalGPA / validCourses?.length;
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

  useEffect(() => {
    const gpa = calculateGPA();
    if (gpa !== semester?.gpa) {
      updateSemesterGPA(semester?.id, gpa);
    }
  }, [semester, updateSemesterGPA, calculateGPA]);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 text-transparent bg-clip-text">
          {semester?.name}
        </h2>
        <div className="bg-indigo-50 px-4 py-2 rounded-lg">
          <span className="text-indigo-600 font-medium">
            GPA: <span className="text-xl font-bold">{semester?.gpa?.toFixed(2) || 0}</span>
          </span>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        {semester?.courses.map((course) => (
          <div key={course.id} className="flex items-center gap-4 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition">
            <span className="font-medium text-gray-700 min-w-[100px]">{course.name}</span>
            <input
              type="number"
              value={course.score}
              onChange={(e) => updateScore(course.id, e.target.value)}
              placeholder="Score (0-100)"
              min={0}
              max={100}
              className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200 transition"
            />
            {semester?.courses.length > 6 &&
              <button
                onClick={() => removeCourse(course.id)}
                className="text-red-500 hover:text-red-600 p-2 rounded-lg hover:bg-red-50 transition"
                disabled={semester?.courses.length <= 6}
              >
                <Trash2 size={20} />
              </button>}
          </div>
        ))}
      </div>

      {semester?.courses.length < 7 && <button
        onClick={addCourse}
        disabled={semester?.courses.length >= 7}
        className="flex items-center gap-2 w-full justify-center bg-gradient-to-r from-indigo-600 to-violet-600 text-white p-3 rounded-lg hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed font-medium"
      >
        <PlusCircle size={20} />
        Add Course
      </button>}
    </div>
  );
};

export default SemesterContent;
