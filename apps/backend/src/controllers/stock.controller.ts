import { Request, Response, NextFunction } from 'express';
import { StockService } from '../services/stock.service.js';

const stockService = new StockService();

export class StockController {
  async getBySymbol(req: Request, res: Response, next: NextFunction) {
    try {
      const { symbol } = req.params;
      const data = await stockService.getStockBySymbol(symbol);

      return res.status(200).json({
        success: true,
        message: `Stock details for ${symbol.toUpperCase()} retrieved successfully`,
        data,
        timestamp: new Date().toISOString(),
        requestId: (req as any).id || 'req_stock_detail'
      });
    } catch (error) {
      next(error);
    }
  }

  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const filters = (req as any).validatedQuery || req.query;
      const { items, total } = await stockService.listStocks(filters);

      const page = Number(filters.page || 1);
      const limit = Number(filters.limit || 20);

      return res.status(200).json({
        success: true,
        message: 'Stock ticker list retrieved successfully',
        data: items,
        meta: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit)
        },
        timestamp: new Date().toISOString(),
        requestId: (req as any).id || 'req_stock_list'
      });
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const stock = await stockService.createStock(req.body);

      return res.status(201).json({
        success: true,
        message: `Stock ticker '${stock.symbol}' created successfully`,
        data: stock,
        timestamp: new Date().toISOString(),
        requestId: (req as any).id || 'req_stock_create'
      });
    } catch (error) {
      next(error);
    }
  }
}
