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
app.options('*', cors());

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/payment', paymentRoutes);

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Server is running',
    data: null,
  });
});
const port = 3030;

const init = async () => {
  try {
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

init();

export default app;
