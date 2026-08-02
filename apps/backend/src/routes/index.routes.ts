import { Router } from 'express';
import stockRoutes from './stock.routes.js';

const router = Router();

// Mount Stock Domain Router
router.use('/stocks', stockRoutes);

router.get('/', (_req, res) => {
  res.json({ message: 'TradeVision AI API v1 Operational' });
});

export default router;
