import authRoutes from './oauth';
import express from 'express';
const router = express.Router();

router.use('/auth', authRoutes);

export default router;
