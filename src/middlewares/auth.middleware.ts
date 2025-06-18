import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { JwtUserPayload } from '../types/user';

interface AuthRequest extends Request {
  user?: JwtUserPayload;
}

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token tidak ditemukan' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');

    // Pastikan `decoded` adalah objek dan memiliki `.id`
    if (typeof decoded === 'object' && 'id' in decoded && 'email' in decoded) {
      (req as AuthRequest).user = decoded as JwtUserPayload;
      next();
    } else {
      return res.status(403).json({ message: 'Payload JWT tidak sesuai' });
    }
  } catch (err) {
    return res.status(401).json({ message: 'Token tidak valid' });
  }
};
