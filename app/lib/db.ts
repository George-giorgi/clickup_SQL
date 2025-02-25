// lib/db.ts
import sql from "mssql";

// Ensure environment variables are defined, and throw an error if any are missing.
const user = process.env.DATABASE_USER;
const password = process.env.DATABASE_PASSWORD;
const server = process.env.DATABASE_SERVER;
const port = Number(process.env.DATABASE_PORT);
const database = process.env.DATABASE_NAME;

if (!user || !password || !server || !port || !database) {
  throw new Error("Missing one or more required environment variables.");
}

const config = {
  user,
  password,
  server,
  port,
  database,
  options: {
    encrypt: false, // Set to true if using Azure SQL
    trustServerCertificate: true, // Required for self-signed certificates
  },
};

// Database connection function
export async function connectDB() {
  try {
    // Log connection attempt
    console.log("Connecting to database...");
    const pool = await sql.connect(config);
    console.log("Connection successful!");

    return pool;
  } catch (error) {
    console.error("Database connection error:", error);
    throw new Error("Failed to connect to database");
  }
}
