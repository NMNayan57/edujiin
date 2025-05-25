import express from 'express';
import Scholarship from '../models/Scholarship';

const router = express.Router();

// Get all scholarships with pagination
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;
    
    const scholarships = await Scholarship.find()
      .sort({ amount: -1 })
      .skip(skip)
      .limit(limit);
    
    const total = await Scholarship.countDocuments();
    
    res.json({
      success: true,
      scholarships,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching scholarships:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Get scholarship by ID
router.get('/:id', async (req, res) => {
  try {
    const scholarship = await Scholarship.findById(req.params.id);
    
    if (!scholarship) {
      return res.status(404).json({ success: false, message: 'Scholarship not found' });
    }
    
    res.json({ success: true, scholarship });
  } catch (error) {
    console.error('Error fetching scholarship:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Search scholarships
router.get('/search', async (req, res) => {
  try {
    const { 
      name, 
      provider, 
      type,
      nationality,
      academicLevel,
      field,
      minAmount,
      maxAmount,
      currency
    } = req.query;
    
    const query: any = {};
    
    if (name) {
      query.name = { $regex: name, $options: 'i' };
    }
    
    if (provider) {
      query.provider = { $regex: provider, $options: 'i' };
    }
    
    if (type) {
      query.type = type;
    }
    
    if (nationality) {
      query['eligibility.nationalities'] = nationality;
    }
    
    if (academicLevel) {
      query['eligibility.academicLevels'] = academicLevel;
    }
    
    if (field) {
      query['eligibility.fields'] = { $regex: field, $options: 'i' };
    }
    
    if (minAmount || maxAmount) {
      query.amount = {};
      if (minAmount) query.amount.$gte = parseInt(minAmount as string);
      if (maxAmount) query.amount.$lte = parseInt(maxAmount as string);
    }
    
    if (currency) {
      query.currency = currency;
    }
    
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;
    
    const scholarships = await Scholarship.find(query)
      .sort({ amount: -1 })
      .skip(skip)
      .limit(limit);
    
    const total = await Scholarship.countDocuments(query);
    
    res.json({
      success: true,
      scholarships,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error searching scholarships:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Get scholarships by eligibility
router.post('/eligible', async (req, res) => {
  try {
    const { 
      nationality, 
      academicLevel, 
      gpa,
      toeflScore,
      ieltsScore,
      fields
    } = req.body;
    
    const query: any = {};
    
    if (nationality) {
      query['eligibility.nationalities'] = nationality;
    }
    
    if (academicLevel) {
      query['eligibility.academicLevels'] = academicLevel;
    }
    
    if (fields && fields.length > 0) {
      query['eligibility.fields'] = { $in: fields };
    }
    
    if (gpa) {
      query['eligibility.minimumGPA'] = { $lte: gpa };
    }
    
    if (toeflScore) {
      query['eligibility.languageRequirements.toefl'] = { $lte: toeflScore };
    }
    
    if (ieltsScore) {
      query['eligibility.languageRequirements.ielts'] = { $lte: ieltsScore };
    }
    
    const scholarships = await Scholarship.find(query)
      .sort({ amount: -1 });
    
    res.json({ success: true, scholarships });
  } catch (error) {
    console.error('Error finding eligible scholarships:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

export default router;
