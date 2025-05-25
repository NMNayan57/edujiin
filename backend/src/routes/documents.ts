import express from 'express';
import path from 'path';
import fs from 'fs';
import multer from 'multer';

const router = express.Router();

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const userId = req.headers['user-id'];
    const uploadDir = path.join(__dirname, '../../../uploads', userId as string);
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Generate unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

// File filter
const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  // Accept only certain file types
  const allowedTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'image/jpeg',
    'image/png'
  ];
  
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only PDF, DOC, DOCX, JPEG, and PNG are allowed.'));
  }
};

// Initialize upload
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// Upload document
router.post('/upload', upload.single('document'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }
    
    const userId = req.headers['user-id'];
    const documentType = req.body.documentType || 'Other';
    const documentName = req.body.documentName || req.file.originalname;
    
    // Return file information
    res.json({
      success: true,
      document: {
        name: documentName,
        type: documentType,
        path: req.file.path,
        size: req.file.size,
        mimetype: req.file.mimetype,
        uploadDate: new Date()
      }
    });
  } catch (error) {
    console.error('Document upload error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Get document
router.get('/:documentId', (req, res) => {
  try {
    const userId = req.headers['user-id'];
    const documentId = req.params.documentId;
    
    // In a real app, you would fetch document info from database
    // For mock purposes, we'll just check if file exists
    const filePath = path.join(__dirname, '../../../uploads', userId as string, documentId);
    
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ success: false, message: 'Document not found' });
    }
    
    res.sendFile(filePath);
  } catch (error) {
    console.error('Document retrieval error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Delete document
router.delete('/:documentId', (req, res) => {
  try {
    const userId = req.headers['user-id'];
    const documentId = req.params.documentId;
    
    // In a real app, you would delete document info from database
    // For mock purposes, we'll just delete the file
    const filePath = path.join(__dirname, '../../../uploads', userId as string, documentId);
    
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ success: false, message: 'Document not found' });
    }
    
    fs.unlinkSync(filePath);
    
    res.json({ success: true, message: 'Document deleted successfully' });
  } catch (error) {
    console.error('Document deletion error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

export default router;
