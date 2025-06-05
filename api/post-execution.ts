// api/post-execution.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Метод не поддерживается' });
  }

  const { participant, date, status } = req.body;

  try {
    await pool.query(
      'INSERT INTO execution (participant, date, status) VALUES ($1, $2, $3)',
      [participant, date, status]
    );
    res.status(201).json({ success: true });
  } catch (error) {
    console.error('Ошибка при добавлении:', error);
    res.status(500).json({ error: 'Ошибка при добавлении записи' });
  }
}
