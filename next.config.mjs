/** @type {import('next').NextConfig} */
const nextConfig = {
	output: "export",
	// This tells Next.js that your pages are served from '/GPA-Calculator'
	basePath: "/GPA-Calculator",
	// This ensures that all asset URLs are prefixed correctly
	assetPrefix: "/GPA-Calculator/",
	images: {
		unoptimized: true,
	},
};

export default nextConfig;
