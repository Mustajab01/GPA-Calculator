import { Link } from 'react-router-dom';
import { Home, Trophy, Award } from 'lucide-react';

const GpaTable = () => {
  const gradeScores = [
    { score: "90-100", gpa: 4.0, gradePoint: "A+" },
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
    { score: "0-49", gpa: 0.0, gradePoint: "F" },
  ];

  const getGradeColor = (grade) => {
    if (grade.startsWith('A')) return 'text-emerald-500';
    if (grade.startsWith('B')) return 'text-blue-500';
    if (grade.startsWith('C')) return 'text-yellow-500';
    if (grade.startsWith('D')) return 'text-orange-500';
    return 'text-red-500';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 max-w-3xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-lg flex items-center justify-center">
          <Trophy size={24} className="text-white" />
        </div>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 text-transparent bg-clip-text">
          GPA Calculation Table
        </h1>
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-200">
        <table className="w-full">
          <thead>
            <tr className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white">
              <th className="p-4 font-medium">Score Range</th>
              <th className="p-4 font-medium">GPA</th>
              <th className="p-4 font-medium">Grade</th>
            </tr>
          </thead>
          <tbody>
            {gradeScores.map((grade, index) => (
              <tr
                key={index}
                className={`
                                    border-t border-gray-200 transition-colors
                                    ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                                    hover:bg-gray-100
                                `}
              >
                <td className="p-4 text-center font-medium text-gray-600">
                  {grade.score}
                </td>
                <td className="p-4 text-center font-medium text-gray-800">
                  {grade.gpa.toFixed(1)}
                </td>
                <td className="p-4 text-center">
                  <span className={`inline-flex items-center gap-1 font-bold ${getGradeColor(grade.gradePoint)}`}>
                    <Award size={16} />
                    {grade.gradePoint}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 flex justify-center">
        <Link
          to="/"
          className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 text-white px-6 py-3 rounded-lg hover:opacity-90 transition duration-300 font-medium"
        >
          <Home size={20} />
          Back to Calculator
        </Link>
      </div>
    </div>
  );
};

export default GpaTable;