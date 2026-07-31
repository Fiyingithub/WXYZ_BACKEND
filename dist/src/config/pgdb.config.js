import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();
const pool = new Pool({
    host: process.env.DEV_DB_HOST,
    user: process.env.DEV_DB_USER,
    password: process.env.DEV_DB_PASSWORD,
    port: Number(process.env.DEV_DB_PORT),
    database: process.env.DEV_DB_NAME
});
pool.on('connect', () => {
    console.log('Connected to PostgreSQL database');
});
pool.on('error', (err) => {
    console.error('PostgreSQL connection error:', err);
});
export default pool;
//# sourceMappingURL=pgdb.config.js.map