import { VercelRequest, VercelResponse } from '@vercel/node';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Метод не поддерживается' });
  }

  const { participant, date, status } = req.body;

  if (!participant || !date || !status) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  try {
    await pool.query(
      'INSERT INTO execution (participant, date, status) VALUES ($1, $2, $3)',
      [participant, date, status]
    );
    return res.status(201).json({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'DB insert error' });
  }
}
