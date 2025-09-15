import { integer, text } from "drizzle-orm/sqlite-core";

import { uuid } from "../../utils";

const tableTimeStampCols = {
	createdAt: integer({ mode: "timestamp" })
		.$defaultFn(() => new Date())
		.notNull(),

	updatedAt: integer({ mode: "timestamp" })
		.$defaultFn(() => new Date())
		.notNull(),
};

const tablePrimaryCol = {
	id: text()
		.primaryKey()
		.$defaultFn(() => uuid())
		.notNull(),
};

export const commonTableCols = {
	...tablePrimaryCol,
	...tableTimeStampCols,
};
