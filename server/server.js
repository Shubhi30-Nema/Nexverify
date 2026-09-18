// server.js — Entry point: connects DB then starts HTTP server
import { connectDB } from './src/config/db.js';
import { env } from './src/config/env.js';
import app from './app.js';

async function bootstrap() {
  await connectDB();
  app.listen(env.port, () => {
    console.log(`\n🚀 NexVerify API running on http://localhost:${env.port}`);
    console.log(`   OCR service expected at  ${env.ocrServiceUrl}`);
    console.log(`   Environment: ${env.nodeEnv}\n`);
  });
}

bootstrap().catch(err => {
  console.error('[Fatal] Could not start server:', err.message);
  process.exit(1);
});
