import {config} from "dotenv";
import path from "node:path";
import {logger} from "../packages/shared/src/logger";
import {getPool, closePool} from "../packages/shared/src/db";
import fs from "node:fs";

config({path: path.resolve(__dirname, "../", ".env")});

async function main() {
    const file = process.argv[2] ?? "001_users.sql";
    if (!file) {
        logger.error("Please provide a migration file");
        process.exit(1);
    }
    const sql = fs.readFileSync(path.resolve(__dirname, "../", "sql", file), "utf8");
    const pool = getPool();
    const client = await pool.connect();
    try {
        await client.query(sql);
        logger.info(`Migration ${file} applied successfully`);
    } catch (error) {
        logger.error(error);
        logger.error(`Migration ${file} failed`);
        process.exit(1);
    } finally {
        client.release();
        closePool();
    }
}

main()