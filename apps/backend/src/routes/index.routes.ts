import { Router } from 'express';

const router = Router();

router.get('/', (_req, res) => {
  res.json({ message: 'TradeVision AI API v1 Operational' });
});

export default router;
