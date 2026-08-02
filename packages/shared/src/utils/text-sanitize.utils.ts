export function sanitizeTicker(ticker: string): string {
  return ticker.trim().toUpperCase().replace(/[^A-Z0-9^.-]/g, '');
}
