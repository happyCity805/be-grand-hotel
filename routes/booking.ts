import express from 'express';
import { createBooking } from '../controllers/booking.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = express.Router();
router.post('/', authenticate, createBooking);

export default router;
