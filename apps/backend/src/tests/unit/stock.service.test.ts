import { describe, it, expect, vi } from 'vitest';
import { StockService } from '../../services/stock.service.js';

describe('StockService Unit Tests', () => {
  it('should throw 404 error if stock symbol does not exist', async () => {
    const service = new StockService();
    
    // Mock findBySymbol to return null
    vi.spyOn((service as any).repository, 'findBySymbol').mockResolvedValue(null);

    await expect(service.getStockBySymbol('INVALID_TICKER')).rejects.toThrow('Stock ticker \'INVALID_TICKER\' not found');
  });

  it('should return detailed stock information when valid symbol is supplied', async () => {
    const service = new StockService();
    
    const mockStock = {
      id: 'uuid-1234',
      symbol: 'AAPL',
      name: 'Apple Inc.',
      exchange: 'NASDAQ',
      sector: 'Technology',
      industry: 'Consumer Electronics',
      country: 'US',
      currency: 'USD',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    vi.spyOn((service as any).repository, 'findBySymbol').mockResolvedValue(mockStock as any);
    vi.spyOn((service as any).repository, 'findHistoricalPrices').mockResolvedValue([]);

    const result = await service.getStockBySymbol('AAPL');

    expect(result.stock.symbol).toBe('AAPL');
    expect(result.stock.name).toBe('Apple Inc.');
    expect(result.metrics.peRatio).toBe(31.2);
  });
});
