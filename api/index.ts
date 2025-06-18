import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Import routes dengan path yang benar
import authRoutes from '../routes/auth';
import bookingRoutes from '../routes/booking';
import paymentRoutes from '../routes/payment';

dotenv.config();

const app = express();

// Update CORS untuk production
app.use(
  cors({
    origin: [
      'http://localhost:5500', // untuk development
      'https://your-frontend-domain.com', // ganti dengan domain frontend Anda
      'https://be-grand-hotel.vercel.app', // atau bisa juga tambahkan domain API sendiri
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

app.options('*', cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/payment', paymentRoutes);

// Root route
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Grand Hotel API is running',
    data: null,
  });
});

// Hapus app.listen() - tidak diperlukan di Vercel
// Vercel akan handle server secara otomatis

export default app;
