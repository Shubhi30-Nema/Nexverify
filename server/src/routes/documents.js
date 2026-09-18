// src/routes/documents.js
import express from 'express';
import { uploadDocument, listDocuments, getDocument, deleteDocument } from '../controllers/documentController.js';
import { protect } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

router.use(protect);
router.post('/',      upload.single('file'), uploadDocument);
router.get('/',       listDocuments);
router.get('/:id',    getDocument);
router.delete('/:id', deleteDocument);

export default router;
