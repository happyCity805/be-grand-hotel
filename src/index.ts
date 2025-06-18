import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import bookingRoutes from './routes/booking';
import paymentRoutes from './routes/payment';

dotenv.config();

const app = express();
app.use(
  cors({
    origin: 'http://localhost:5500',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

app.options('*', cors()); // tambahkan ini

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/payment', paymentRoutes);

const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
