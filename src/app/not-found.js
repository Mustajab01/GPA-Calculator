import { AlertTriangle, Home } from "lucide-react";
import Link from "next/link";

const NotFoundScreen = () => (
	<div className="flex flex-col items-center justify-center h-full text-center p-6">
		<div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
			<div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
				<AlertTriangle size={32} className="text-white" />
			</div>

			<h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 text-transparent bg-clip-text mb-4">
				Page Not Found
			</h2>

			<p className="text-gray-600 mb-8">
				The page you&apos;re looking for doesn&apos;t exist or may have been
				moved. Please check the URL or return to the home page.
			</p>

			<Link
				href="/"
				className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 text-white px-6 py-3 rounded-lg hover:opacity-90 transition duration-300 font-medium"
			>
				<Home size={20} />
				Back to Calculator
			</Link>
		</div>
	</div>
);

export default NotFoundScreen;
