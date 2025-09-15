import { createClient } from "@libsql/client";
import { sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/libsql";

// since we will be running this as part of setup script, we need to use process.env
// instead of using the db from the index file
const db = drizzle({
	client: createClient({
		url: process.env.DATABASE_URL ?? "",
	}),
});

async function seed() {
	console.log("🌱 Seeding database...");

	try {
		// remove the below snippet and write your seeding logic here
		console.log("Listing all tables...");
		const result = await db.run(
			sql`SELECT name FROM sqlite_master WHERE type='table'`,
		);
		console.log(result.toJSON());

		console.log("✅ Successfully seeded database");
	} catch (error) {
		console.error("❌ Error seeding database:", error);
		process.exit(1);
	}
}

if (import.meta.main) {
	await seed();
	process.exit(0);
}
