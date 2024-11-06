import React from 'react';
import { Link } from 'react-router-dom';

const GpaTable = () => {
  const gradeScores = [
    { score: "90-100", gpa: 4.0, gradePoint: "A+"},
    { score: "85-89", gpa: 4.0, gradePoint: "A" },
    { score: "80-84", gpa: 3.8, gradePoint: "A-" },
    { score: "75-79", gpa: 3.4, gradePoint: "B+" },
    { score: "71-74", gpa: 3.0, gradePoint: "B" },
    { score: "68-70", gpa: 2.8, gradePoint: "B-" },
    { score: "64-67", gpa: 2.4, gradePoint: "C+" },
    { score: "61-63", gpa: 2.0, gradePoint: "C" },
    { score: "57-60", gpa: 1.8, gradePoint: "C-" },
    { score: "53-56", gpa: 1.4, gradePoint: "D+" },
    { score: "50-52", gpa: 1.0, gradePoint: "D" },
    { score: 0, gpa: 0.0,  gradePoint: "F" },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-4 md:p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-blue-800">GPA Calculation Table</h1>
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-center p-2">Score</th>
            <th className="text-center p-2">GPA</th>
            <th className="text-center p-2">Grade</th>
          </tr>
        </thead>
        <tbody>
          {gradeScores.map((grade, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
              <td className="text-center p-2">{grade.score}</td>
              <td className="text-center p-2">{grade.gpa}</td>
              <td className="text-center p-2">{grade.gradePoint}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 text-center">
        <Link to="/" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default GpaTable;