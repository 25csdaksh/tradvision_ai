import { StockRepository } from '../repositories/stock.repository.js';
import { IStockQueryFilter, ICandlestickBar } from '../types/stock.types.js';
import { StockDetailResponseDTO, CreateStockDTO } from '../dtos/stock.dto.js';

export class StockService {
  private repository: StockRepository;

  constructor() {
    this.repository = new StockRepository();
  }

  async getStockBySymbol(symbol: string): Promise<StockDetailResponseDTO> {
    const stock = await this.repository.findBySymbol(symbol);
    if (!stock) {
      const error: any = new Error(`Stock ticker '${symbol}' not found`);
      error.status = 404;
      error.code = 'STOCK_NOT_FOUND';
      throw error;
    }

    const prices = await this.repository.findHistoricalPrices(stock.id, 50);

    const candlestickBars: ICandlestickBar[] = prices.map(p => ({
      timestamp: p.timestamp.toISOString(),
      open: Number(p.open),
      high: Number(p.high),
      low: Number(p.low),
      close: Number(p.close),
      volume: Number(p.volume)
    }));

    return {
      stock: {
        id: stock.id,
        symbol: stock.symbol,
        name: stock.name,
        exchange: stock.exchange,
        sector: stock.sector,
        industry: stock.industry,
        country: stock.country,
        currency: stock.currency,
        isActive: stock.isActive
      },
      recentPrices: candlestickBars,
      metrics: {
        peRatio: 31.2,
        marketCap: '$2.91T',
        fiftyTwoWeekHigh: 199.62,
        fiftyTwoWeekLow: 164.08
      }
    };
  }

  async listStocks(filters: IStockQueryFilter) {
    return this.repository.findMany(filters);
  }

  async createStock(dto: CreateStockDTO) {
    const existing = await this.repository.findBySymbol(dto.symbol);
    if (existing) {
      const error: any = new Error(`Stock ticker '${dto.symbol}' already exists`);
      error.status = 409;
      error.code = 'STOCK_ALREADY_EXISTS';
      throw error;
    }

    return this.repository.create(dto);
  }
}
