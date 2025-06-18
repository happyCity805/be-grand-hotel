import { Request, Response } from 'express';
import { jsonApi } from '../utils/jsonServer';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const users = await jsonApi.get(`/users?email=${email}`);
  if (users.data.length > 0)
    return res.status(400).json({ message: 'Email sudah terdaftar' });

  const hashed = await bcrypt.hash(password, 10);
  const user = { id: Date.now(), email, password: hashed };
  await jsonApi.post('/users', user);
  res.json({ message: 'User terdaftar' });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const users = await jsonApi.get(`/users?email=${email}`);
  const user = users.data[0];
  if (!user) return res.status(404).json({ message: 'User tidak ditemukan' });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ message: 'Password salah' });

  const token = jwt.sign(
    { id: user.id, email },
    process.env.JWT_SECRET || 'secret'
  );
  res.json({ token });
};
