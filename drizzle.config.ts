import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/server/tables/*.table.ts",
  out: "./drizzle",
  dialect: "sqlite",
  dbCredentials: {
    url: process.env.DB_URL || "",
  },
});
