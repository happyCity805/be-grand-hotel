// src/controllers/payment.controller.ts
import { Request, Response } from 'express';
import { midtrans } from '../lib/midtrans';

export const createSnapTransaction = async (req: Request, res: Response) => {
  const { bookingId, amount, email, name, phone } = req.body;

  if (!bookingId || !amount || !email || !name) {
    return res.status(400).json({
      message: 'Missing required fields',
      required: ['bookingId', 'amount', 'email', 'name'],
    });
  }

  const grossAmount = Number(amount);
  const orderId = `ORDER-${bookingId}`;

  const parameter = {
    transaction_details: {
      order_id: orderId,
      gross_amount: grossAmount,
    },
    customer_details: {
      first_name: name,
      email,
    },
  };

  try {
    const snap = await midtrans.createTransaction(parameter);

    res.json({
      success: true,
      message: 'Transaksi Snap berhasil dibuat',
      data: {
        redirect_url: snap.redirect_url,
        token: snap.token,
        order_id: orderId,
      },
    });
  } catch (err: any) {
    console.error('Midtrans Snap Error:', err);
    res.status(500).json({
      success: false,
      message: 'Gagal membuat transaksi Snap',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined,
    });
  }
};
