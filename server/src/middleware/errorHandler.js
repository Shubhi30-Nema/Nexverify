// src/middleware/errorHandler.js
export const errorHandler = (err, req, res, _next) => {
  console.error('[Error]', err.message, err.stack?.split('\n')[1]);

  // Multer file-too-large
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(413).json({ success: false, message: 'File exceeds maximum allowed size' });
  }

  // Mongoose validation errors
  if (err.name === 'ValidationError') {
    const msgs = Object.values(err.errors).map(e => e.message);
    return res.status(422).json({ success: false, message: msgs.join(', ') });
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0];
    return res.status(409).json({ success: false, message: `Duplicate value for field: ${field}` });
  }

  const status = err.statusCode || 500;
  const message = (status < 500) ? err.message : 'Internal server error';
  res.status(status).json({ success: false, message });
};
