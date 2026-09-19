import { Pool } from 'pg';

let pool: Pool | null = null;

function requiredEnv(name: string): string {
    const value = process.env[name]?.trim();
    if (!value) {
        throw new Error(`Missing required environment variable ${name}`);
    }
    return value;
}

export const getPool = (): Pool => {
    if (!pool) {
        pool = new Pool({
            user: requiredEnv('DB_USER'),
            host: requiredEnv('DB_HOST'),
            database: requiredEnv('DB_NAME'),
            password: requiredEnv('DB_PASSWORD'),
            port: parseInt(process.env.DB_PORT?.trim() || '5432', 10),
            ssl: { rejectUnauthorized: true },
        });
    }
    return pool;
}

export const closePool = () => {
    if (pool) {
        try {
            pool.end();
            pool = null;
        } catch (error) {
            console.error('Error closing pool', error);
            throw error;
        }
    }
}