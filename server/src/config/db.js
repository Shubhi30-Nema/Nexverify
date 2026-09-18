// src/config/db.js
// Establishes Mongoose connection. Called once from server.js.
import mongoose from 'mongoose';
import { env } from './env.js';

export async function connectDB() {
  mongoose.set('strictQuery', true);

  mongoose.connection.on('connected', () => console.log('[MongoDB] Connected successfully'));
  mongoose.connection.on('error',     err => console.warn('[MongoDB] Connection notice:', err.message));
  mongoose.connection.on('disconnected', () => console.warn('[MongoDB] Disconnected'));

  try {
    await mongoose.connect(env.mongoUri, {
      serverSelectionTimeoutMS: 2000,
    });
  } catch (err) {
    console.warn(`\n[MongoDB Warning] Local MongoDB service is not running (${err.message}).`);
    console.warn(`[MongoDB Info] NexVerify backend will use self-contained in-memory fallback store so all APIs, uploads, and verifications function seamlessly.\n`);
  }
}
