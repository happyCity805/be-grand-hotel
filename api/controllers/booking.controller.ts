import { Request, Response } from 'express';
import { jsonApi } from '../utils/jsonServer';
import { JwtUserPayload } from '../types/user';

interface AuthRequest extends Request {
  user?: JwtUserPayload;
}

export const createBooking = async (req: Request, res: Response) => {
  const authReq = req as AuthRequest;

  if (!authReq.user) return res.status(401).json({ message: 'Unauthorized' });

  const { hotelId, date } = req.body;
  const booking = {
    id: Date.now(),
    userId: authReq.user.id,
    hotelId,
    date,
    status: 'pending',
  };

  await jsonApi.post('/bookings', booking);
  res.json({ message: 'Booking berhasil', booking });
};
