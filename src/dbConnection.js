import pkg from "pg";
import dotenv from "dotenv";
const { Pool } = pkg;

dotenv.config();
export const pool = new Pool({
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "hedge fund",
  password: process.env.DB_PASSWORD || "root",
  port: process.env.DB_PORT || "3001",
});
