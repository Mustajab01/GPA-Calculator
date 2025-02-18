import { GpaDataProvider } from "@/context/GpaDataContext";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

export const metadata = {
	title: "GPA Calculator",
	description: "For my UBIT fellows",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className="antialiased">
				<GpaDataProvider>
					<div className="flex flex-col h-screen bg-gray-50">
						<Navbar />
						<div className="flex flex-1 overflow-hidden">
							<Sidebar />
							<main className="flex-1 overflow-y-auto p-4 md:p-6 transition-all duration-300">
								{children}
							</main>
						</div>
					</div>
				</GpaDataProvider>
			</body>
		</html>
	);
}
