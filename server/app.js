// app.js — Express application (no listen here; done in server.js)
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import { env } from './src/config/env.js';
import { errorHandler } from './src/middleware/errorHandler.js';

import authRoutes         from './src/routes/auth.js';
import tenderRoutes       from './src/routes/tenders.js';
import bidderRoutes       from './src/routes/bidders.js';
import documentRoutes     from './src/routes/documents.js';
import verificationRoutes from './src/routes/verifications.js';
import auditRoutes        from './src/routes/audit.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

// ---- CORS ----
app.use(cors({
  origin: env.clientOrigin,
  credentials: true,
}));

// ---- Logging ----
if (env.nodeEnv !== 'test') {
  app.use(morgan(env.nodeEnv === 'development' ? 'dev' : 'combined'));
}

// ---- Body parsing ----
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

// ---- Static uploads (for serving uploaded files) ----
app.use('/uploads', express.static(path.resolve(env.uploadDir)));

// ---- API Routes ----
app.use('/api/auth',          authRoutes);
app.use('/api/tenders',       tenderRoutes);
app.use('/api/bidders',       bidderRoutes);
app.use('/api/documents',     documentRoutes);
app.use('/api/verifications', verificationRoutes);
app.use('/api/audit',         auditRoutes);

// ---- Health check ----
app.get('/api/health', (_req, res) => res.json({ status: 'ok', time: new Date().toISOString() }));

// ---- 404 catch-all ----
app.use((_req, res) => res.status(404).json({ success: false, message: 'Route not found' }));

// ---- Central error handler ----
app.use(errorHandler);

export default app;
