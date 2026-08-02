import { Router } from 'express';
import { StockController } from '../controllers/stock.controller.js';
import { validate } from '../middleware/validate.middleware.js';
import { StockQuerySchema, SymbolParamSchema, CreateStockSchema } from '../validators/stock.validator.ts';

const router = Router();
const controller = new StockController();

router.get('/', validate(StockQuerySchema, 'query'), (req, res, next) => controller.list(req, res, next));
router.get('/:symbol', validate(SymbolParamSchema, 'params'), (req, res, next) => controller.getBySymbol(req, res, next));
router.post('/', validate(CreateStockSchema, 'body'), (req, res, next) => controller.create(req, res, next));

export default router;
