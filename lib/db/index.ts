import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

const DB_HOST = process.env.DB_HOST || "";
const DB_NAME = process.env.DB_NAME || "";
const DB_PORT = process.env.DB_PORT || "";
const DB_USER = process.env.DB_USER || "";
const DB_PASSWORD = process.env.DB_PASSWORD || "";

const url = `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`

// Initialize the connection pool
const pool = new Pool({
  connectionString: url,
});

// Initialize Drizzle with the connection pool and schema
export const db = drizzle(pool, { schema }); 