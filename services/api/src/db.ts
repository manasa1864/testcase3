import { Pool } from 'pg';
import { config } from './config';

const pool = new Pool({ connectionString: config.dbUrl });

export const db = {
  async query(sql: string, params?: any[]) {
    const res = await pool.query(sql, params);
    return res.rows;
  },
};
