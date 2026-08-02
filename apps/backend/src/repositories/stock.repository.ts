import { PrismaClient, Stock, StockPrice } from '@prisma/client';
import { IStockQueryFilter } from '../types/stock.types.js';

const prisma = new PrismaClient();

export class StockRepository {
  async findBySymbol(symbol: string): Promise<Stock | null> {
    return prisma.stock.findUnique({
      where: { symbol: symbol.toUpperCase() }
    });
  }

  async findMany(filters: IStockQueryFilter): Promise<{ items: Stock[]; total: number }> {
    const { query, sector, exchange, page = 1, limit = 20 } = filters;
    const skip = (page - 1) * limit;

    const where: any = { isActive: true };

    if (query) {
      where.OR = [
        { symbol: { contains: query, mode: 'insensitive' } },
        { name: { contains: query, mode: 'insensitive' } }
      ];
    }

    if (sector) {
      where.sector = { equals: sector, mode: 'insensitive' };
    }

    if (exchange) {
      where.exchange = { equals: exchange, mode: 'insensitive' };
    }

    const [items, total] = await Promise.all([
      prisma.stock.findMany({
        where,
        skip,
        take: limit,
        orderBy: { symbol: 'asc' }
      }),
      prisma.stock.count({ where })
    ]);

    return { items, total };
  }

  async findHistoricalPrices(stockId: string, limit = 100): Promise<StockPrice[]> {
    return prisma.stockPrice.findMany({
      where: { stockId },
      orderBy: { timestamp: 'desc' },
      take: limit
    });
  }

  async create(data: {
    symbol: string;
    name: string;
    exchange: string;
    sector?: string;
    industry?: string;
    country?: string;
    currency?: string;
  }): Promise<Stock> {
    return prisma.stock.create({
      data: {
        symbol: data.symbol.toUpperCase(),
        name: data.name,
        exchange: data.exchange,
        sector: data.sector,
        industry: data.industry,
        country: data.country || 'US',
        currency: data.currency || 'USD'
      }
    });
  }
}
