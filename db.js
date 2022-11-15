import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const Pool = pg.Pool;
const pg_user = process.env.PG_USER;
const pg_host = process.env.PG_HOST;
const pg_database = process.env.PG_DATABASE;
const pg_password = process.env.PG_PASSWORD;


const pool = new Pool({
    user: pg_user,
    host: pg_host,
    database: pg_database,
    password: pg_password,
    port: 5432
});

export default pool;