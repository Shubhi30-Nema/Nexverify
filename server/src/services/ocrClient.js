// src/services/ocrClient.js
// Sends a document file to the Python FastAPI OCR micro-service.
// Returns the structured response: { rawText, confidence, boundingBoxes, extractedFields, processingTimeMs }
import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';
import path from 'path';
import { env } from '../config/env.js';

const OCR_TIMEOUT_MS = 120_000; // 2 minutes
const MAX_RETRIES = 1;

async function callOcrApi(filePath, docType, attempt = 0) {
  const form = new FormData();
  form.append('file', fs.createReadStream(filePath), {
    filename: path.basename(filePath),
  });
  form.append('doc_type', docType);

  try {
    const res = await axios.post(`${env.ocrServiceUrl}/ocr`, form, {
      headers: form.getHeaders(),
      timeout: OCR_TIMEOUT_MS,
    });
    return res.data;
  } catch (err) {
    if (attempt < MAX_RETRIES) {
      console.warn(`[OCR] Retry ${attempt + 1} for ${path.basename(filePath)}`);
      return callOcrApi(filePath, docType, attempt + 1);
    }
    throw new Error(`OCR service error: ${err.message}`);
  }
}

export async function processDocument(filePath, docType) {
  const result = await callOcrApi(filePath, docType);
  return {
    rawText:           result.raw_text        || '',
    confidence:        result.confidence       ?? 0,
    boundingBoxCount:  result.bounding_box_count ?? 0,
    extractedFields:   result.extracted_fields ?? {},
    processingTimeMs:  result.processing_time_ms ?? 0,
  };
}
