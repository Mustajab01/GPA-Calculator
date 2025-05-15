"use client";

import { useContext } from "react";
import { GraduationCap, PlusCircle } from "lucide-react";

import SemesterContent from "@/components/SemesterContent";
import { GpaDataContext } from "@/context/GpaDataContext";

export default function HomeView() {
	const { semesters } = useContext(GpaDataContext);

	return semesters.length > 0 ? <SemesterContent /> : <WelcomeScreen />;
}

const WelcomeScreen = () => {
	const { addSemester, isSidebarOpen, toggleSidebar } =
		useContext(GpaDataContext);

	return (
		<div
			className="flex flex-col items-center justify-center h-full text-center p-6"
			onClick={() => {
				if (isSidebarOpen) toggleSidebar();
			}}
		>
			<div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
				<div className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-full flex items-center justify-center mx-auto mb-6">
					<GraduationCap size={32} className="text-white" />
				</div>

				<h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 text-transparent bg-clip-text mb-4">
					Welcome to GPA Calculator
				</h2>

				<p className="text-gray-600 mb-8">
					Track your academic progress with ease. Get started by adding your
					first semester.
				</p>

				<button
					onClick={addSemester}
					className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white p-3 rounded-lg hover:opacity-90 transition font-medium"
				>
					<PlusCircle size={20} />
					Add Your First Semester
				</button>
			</div>
		</div>
	);
};
