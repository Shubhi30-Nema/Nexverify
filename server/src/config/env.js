// src/config/env.js
// Loads and validates environment variables; throws at startup if critical vars missing.
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const required = ['MONGO_URI', 'JWT_SECRET'];
required.forEach(k => {
  if (!process.env[k]) throw new Error(`Missing required env var: ${k}`);
});

export const env = {
  mongoUri:       process.env.MONGO_URI,
  jwtSecret:      process.env.JWT_SECRET,
  jwtExpiresIn:   process.env.JWT_EXPIRES_IN || '7d',
  port:           parseInt(process.env.PORT || '5000', 10),
  ocrServiceUrl:  process.env.OCR_SERVICE_URL || 'http://localhost:8000',
  uploadDir:      process.env.UPLOAD_DIR || './uploads',
  maxFileMb:      parseInt(process.env.MAX_FILE_MB || '15', 10),
  nodeEnv:        process.env.NODE_ENV || 'development',
  clientOrigin:   process.env.CLIENT_ORIGIN || 'http://localhost:5173',
};
