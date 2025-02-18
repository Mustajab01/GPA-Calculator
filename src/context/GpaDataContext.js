"use client";

import React, { createContext, useEffect, useRef, useState } from "react";
import * as XLSX from "xlsx";

const GpaDataContext = createContext();

const APP_KEY = "gpa-app-data";

const createDefaultCourses = () => {
	return Array.from({ length: 6 }, (_, index) => ({
		id: index + 1,
		name: `Course ${index + 1}`,
		score: "",
	}));
};

const GpaDataProvider = ({ children }) => {
	const [semesters, setSemesters] = useState([]);
	const [selectedSemester, setSelectedSemester] = useState(null);
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const isMounted = useRef(false);

	useEffect(() => {
		const storedData = localStorage.getItem(APP_KEY);
		if (storedData) {
			const {
				semesters: storedSemesters,
				selectedSemester: storedSelectedSemester,
			} = JSON.parse(storedData);
			setSemesters(storedSemesters);
			if (
				storedSelectedSemester &&
				storedSemesters.some((sem) => sem.id === storedSelectedSemester)
			) {
				setSelectedSemester(storedSelectedSemester);
			}
		}
	}, []);

	useEffect(() => {
		if (isMounted.current) {
			localStorage.setItem(
				APP_KEY,
				JSON.stringify({ semesters, selectedSemester })
			);
		} else {
			isMounted.current = true;
		}
	}, [semesters, selectedSemester]);

	const setSelectedSemesterFunc = (semesterID) => {
		setSelectedSemester(semesterID);
	};

	const addSemester = () => {
		if (semesters.length < 8) {
			const newSemester = {
				id: Math.max(...semesters.map((sem) => sem.id), 0) + 1,
				name: `Semester ${semesters.length + 1}`,
				gpa: 0,
				courses: createDefaultCourses(),
			};
			setSemesters([...semesters, newSemester]);
			setSelectedSemester(newSemester.id);
		}
	};

	const removeSemester = (id) => {
		const updatedSemesters = semesters.filter((semester) => semester.id !== id);
		setSemesters(updatedSemesters);

		if (selectedSemester === id) {
			if (updatedSemesters.length > 0) {
				setSelectedSemester(updatedSemesters[updatedSemesters.length - 1].id);
			} else {
				setSelectedSemester(null);
			}
		}
	};

	const updateSemesterGPA = (id, gpa) => {
		setSemesters(
			semesters.map((semester) =>
				semester.id === id ? { ...semester, gpa } : semester
			)
		);
	};

	const updateSemesterCourses = (semesterId, updatedCourses) => {
		setSemesters(
			semesters.map((semester) =>
				semester.id === semesterId
					? { ...semester, courses: updatedCourses }
					: semester
			)
		);
	};

	const calculateCGPA = () => {
		if (semesters.length === 0) return "0.00";
		const totalGPA = semesters.reduce((acc, semester) => acc + semester.gpa, 0);
		return (totalGPA / semesters.length).toFixed(2);
	};

	const exportData = () => {
		if (semesters.length === 0) {
			alert("No data to export. Please add at least one semester.");
			return;
		}

		const workbook = XLSX.utils.book_new();

		semesters.forEach((semester) => {
			const worksheet = XLSX.utils.json_to_sheet([
				{ Name: semester.name, GPA: semester.gpa.toFixed(2) },
				...semester.courses.map((course) => ({
					Course: course.name,
					Score: course.score || "",
				})),
			]);
			XLSX.utils.book_append_sheet(workbook, worksheet, semester.name);
		});

		const excelBuffer = XLSX.write(workbook, {
			bookType: "xlsx",
			type: "array",
		});
		const data = new Blob([excelBuffer], {
			type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
		});
		const url = URL.createObjectURL(data);
		const link = document.createElement("a");
		link.href = url;
		link.setAttribute("download", "gpa_data.xlsx");
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	return (
		<GpaDataContext.Provider
			value={{
				// States
				semesters,
				selectedSemester,
				isSidebarOpen,
				isMounted,

				// Functions
				setSelectedSemesterFunc,
				addSemester,
				removeSemester,
				updateSemesterGPA,
				updateSemesterCourses,
				calculateCGPA,
				exportData,
				toggleSidebar,
			}}
		>
			{children}
		</GpaDataContext.Provider>
	);
};
export { GpaDataProvider, GpaDataContext };
