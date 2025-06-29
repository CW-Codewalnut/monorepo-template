import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, loadEnv } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), "");

	return {
		plugins: [reactRouter(), tailwindcss(), tsconfigPaths()],

		preview: {
			port: 3000,
		},

		server: {
			port: 3000,
			proxy: {
				"/api": {
					changeOrigin: true,
					target: env.VITE_API_URL,
					rewrite: (path) => path.replace(/^\/api/, ""),
				},
			},
		},
	};
});
