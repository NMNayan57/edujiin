import express from 'express';
import University from '../models/University';

const router = express.Router();

// Get all universities with pagination
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;
    
    const universities = await University.find()
      .sort({ ranking: 1 })
      .skip(skip)
      .limit(limit);
    
    const total = await University.countDocuments();
    
    res.json({
      success: true,
      universities,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching universities:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Get university by ID
router.get('/:id', async (req, res) => {
  try {
    const university = await University.findById(req.params.id);
    
    if (!university) {
      return res.status(404).json({ success: false, message: 'University not found' });
    }
    
    res.json({ success: true, university });
  } catch (error) {
    console.error('Error fetching university:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Search universities
router.get('/search', async (req, res) => {
  try {
    const { 
      name, 
      country, 
      programLevel, 
      department,
      minRanking,
      maxRanking,
      minTuition,
      maxTuition
    } = req.query;
    
    const query: any = {};
    
    if (name) {
      query.name = { $regex: name, $options: 'i' };
    }
    
    if (country) {
      query.country = { $regex: country, $options: 'i' };
    }
    
    if (programLevel) {
      query['programs.level'] = programLevel;
    }
    
    if (department) {
      query['programs.department'] = { $regex: department, $options: 'i' };
    }
    
    if (minRanking || maxRanking) {
      query.ranking = {};
      if (minRanking) query.ranking.$gte = parseInt(minRanking as string);
      if (maxRanking) query.ranking.$lte = parseInt(maxRanking as string);
    }
    
    if (minTuition || maxTuition) {
      query['programs.tuition'] = {};
      if (minTuition) query['programs.tuition'].$gte = parseInt(minTuition as string);
      if (maxTuition) query['programs.tuition'].$lte = parseInt(maxTuition as string);
    }
    
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;
    
    const universities = await University.find(query)
      .sort({ ranking: 1 })
      .skip(skip)
      .limit(limit);
    
    const total = await University.countDocuments(query);
    
    res.json({
      success: true,
      universities,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error searching universities:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Get university programs
router.get('/:id/programs', async (req, res) => {
  try {
    const university = await University.findById(req.params.id);
    
    if (!university) {
      return res.status(404).json({ success: false, message: 'University not found' });
    }
    
    res.json({ success: true, programs: university.programs });
  } catch (error) {
    console.error('Error fetching university programs:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

export default router;
