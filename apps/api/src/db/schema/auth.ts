import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { commonTableCols } from "./utils";

export const user = sqliteTable("user", {
	...commonTableCols,
	name: text().notNull(),
	email: text().notNull().unique(),
	emailVerified: integer({ mode: "boolean" })
		.$defaultFn(() => false)
		.notNull(),
	image: text("image"),
});

export const session = sqliteTable("session", {
	...commonTableCols,
	expiresAt: integer({ mode: "timestamp" }).notNull(),
	token: text().notNull().unique(),
	ipAddress: text(),
	userAgent: text(),
	userId: text()
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
});

export const account = sqliteTable("account", {
	...commonTableCols,
	accountId: text().notNull(),
	providerId: text().notNull(),
	userId: text()
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
	accessToken: text(),
	refreshToken: text(),
	idToken: text(),
	accessTokenExpiresAt: integer({ mode: "timestamp" }),
	refreshTokenExpiresAt: integer({ mode: "timestamp" }),
	scope: text(),
	password: text(),
});

export const verification = sqliteTable("verification", {
	...commonTableCols,
	identifier: text().notNull(),
	value: text().notNull(),
	expiresAt: integer({ mode: "timestamp" }).notNull(),
});
