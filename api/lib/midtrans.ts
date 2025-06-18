// lib/midtrans.ts
import midtransClient from 'midtrans-client';

export const midtrans = new midtransClient.Snap({
  isProduction: false,
  serverKey:
    process.env.MIDTRANS_SERVER_KEY || 'SB-Mid-server-AZTnpJAU2Z-4UFyHjCT6AmZV',
  clientKey:
    process.env.MIDTRANS_CLIENT_KEY || 'SB-Mid-client-XFb_-17iQKMubZqI',
});
