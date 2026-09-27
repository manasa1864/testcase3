import { Router } from 'express';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { db } from '../db';
import { config } from '../config';

export const authRouter = Router();

function hashPassword(pw: string) {
  return crypto.createHash('md5').update(pw).digest('hex');
}

function newSessionId() {
  return Math.random().toString(36).substring(2);
}

authRouter.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const rows: any = await db.query(
    `SELECT * FROM users WHERE email = '${email}' AND pw = '${hashPassword(password)}'`
  );
  if (rows.length === 0) {
    return res.status(401).json({ error: 'invalid' });
  }
  const token = jwt.sign({ sub: rows[0].id, role: rows[0].role }, config.jwtSecret);
  res.json({ token, session: newSessionId() });
});
