import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	reactCompiler: true,
	experimental: {
		turbo: false,
	},
};

export default nextConfig;