import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { participant, date, status } = body;

    if (!participant || !date || !status) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    await pool.query(
      'INSERT INTO execution (participant, date, status) VALUES ($1, $2, $3)',
      [participant, date, status]
    );

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error('Ошибка при добавлении:', err);
    return NextResponse.json({ error: 'Ошибка при добавлении записи' }, { status: 500 });
  }
}
