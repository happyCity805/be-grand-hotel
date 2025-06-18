import express from 'express';
import { createSnapTransaction } from '../controllers/payment.controller';

const router = express.Router();
router.post('/', createSnapTransaction);

export default router;
