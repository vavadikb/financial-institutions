import pkg from "pg";
import dotenv from "dotenv";
const { Pool } = pkg;

dotenv.config();
// export const pool = new Pool({
//   user: process.env.PGUSER || "postgres",
//   host: process.env.PGHOST || "localhost",
//   database: process.env.PGDATABASE || "hedge fund",
//   password: process.env.PGPASSWORD || "root",
//   port: process.env.PGPORT || "3001",
// });

// for docker compose
export const pool = new Pool({
  user: process.env.PGUSER || "postgres",
  host: process.env.PGHOST || "db",
  database: process.env.PGDATABASE || "hedge fund",
  password: process.env.PGPASSWORD || "root",
  port: process.env.PGPORT || "5431",
});
