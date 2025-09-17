import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { $ } from "bun";

$.throws(true);

function copyFileIfUnavailable(src: string, dest: string) {
	if (existsSync(dest)) {
		console.log(`Skipping ${dest} (already exists)`);
		return;
	}

	copyFileSync(src, dest);
	console.log(`Created ${dest} from ${src}`);
}

function mkdirIfUnavailable(path: string) {
	if (existsSync(path)) {
		console.log(`Skipping ${path} (already exists)`);
		return;
	}

	mkdirSync(path);
	console.log(`Created ${path}`);
}

try {
	console.log("Installing dependencies...");
	await $`bun install`;
	console.log("✅ Dependencies installed successfully.");

	console.log("Copying environment files...");
	copyFileIfUnavailable("apps/api/.env.example", "apps/api/.env");
	copyFileIfUnavailable("apps/web/.env.example", "apps/web/.env");
	console.log("✅ Environment files copied successfully.");

	console.log("Running database migration...");
	mkdirIfUnavailable("apps/api/.database");
	await $`bun db:migrate`;
	console.log("✅ Database migration completed successfully.");

	console.log("Seeding database...");
	await $`bun db:seed`;
	console.log("✅ Database seeded successfully.");

	console.log("\n🚀 Project setup complete!");
	console.log(
		"\nPaste the appropriate environment variables into your .env files.",
	);
	console.log("\nThen run `bun dev` to start the development server.");
} catch (error) {
	console.error("\n❌ An error occurred during setup:");
	console.error(error);
	process.exit(1);
}
