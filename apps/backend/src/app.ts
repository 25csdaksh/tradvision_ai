import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import indexRoutes from './routes/index.routes.js';
import { errorMiddleware } from './middleware/error.middleware.js';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

// API v1 Router Aggregator
app.use('/api/v1', indexRoutes);

// Health check endpoint
app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Centralized error handling
app.use(errorMiddleware);

export default app;
