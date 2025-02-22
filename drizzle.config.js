import { defineConfig } from "drizzle-kit";
export default defineConfig({
  dialect: "postgresql",
  schema: "./utils/schema.js",
  out: "./drizzle",
  dbCredentials: {
    url: "postgresql://neondb_owner:npg_UbEMFgG20elw@ep-raspy-breeze-a5xcibep-pooler.us-east-2.aws.neon.tech/ai-interview?sslmode=require"
  }
});