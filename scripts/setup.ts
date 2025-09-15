import { $ } from "bun";

$.throws(true);

try {
	console.log("Installing dependencies...");
	await $`bun install`;
	console.log("✅ Dependencies installed successfully.");

	console.log("Copying environment files...");
	await $`cp -r apps/api/.env.example apps/api/.env`;
	await $`cp -r apps/web/.env.example apps/web/.env`;
	console.log("✅ Environment files copied successfully.");

	console.log("Running database migration...");
	await $`mkdir -p apps/api/.database`;
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
