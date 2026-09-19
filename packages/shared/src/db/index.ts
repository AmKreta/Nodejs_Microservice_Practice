import { Pool } from 'pg';

let pool: Pool | null = null;

export const getPool = (): Pool => {
    if (!pool) {
        try {
            pool = new Pool({
                user: process.env.DB_USER,
                host: process.env.DB_HOST,
                database: process.env.DB_NAME,
                password: process.env.DB_PASSWORD,
                port: parseInt(process.env.DB_PORT || '5432'),
            });
        } catch (error) {
            console.error('Error initializing pool', error);
            throw error;
        }
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