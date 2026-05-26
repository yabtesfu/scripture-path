import cors from 'cors';
import express from 'express';
import dashboardRoutes from './routes/dashboardRoutes.js';
import planRoutes from './routes/planRoutes.js';

export function createApp() {
  const app = express();

  app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173' }));
  app.use(express.json());

  app.get('/api/health', (_req, res) => {
    res.json({ ok: true, service: 'scripture-path-api' });
  });

  app.use('/api/dashboard', dashboardRoutes);
  app.use('/api/plans', planRoutes);

  app.use((req, res) => {
    res.status(404).json({ message: `Route not found: ${req.method} ${req.originalUrl}` });
  });

  return app;
}
