// api/get-executions.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { rows } = await pool.query('SELECT * FROM execution');
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при подключении к базе' });
  }
}
