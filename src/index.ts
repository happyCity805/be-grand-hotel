import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import bookingRoutes from './routes/booking';
import paymentRoutes from './routes/payment';
import jsonServer from 'json-server';

const jsonRouter = jsonServer.router('db.json');

dotenv.config();

const app = express();
app.use('/mock', jsonRouter);
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/payment', paymentRoutes);

const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
