import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/User';

const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    // Create new user
    const newUser = new User({
      email,
      password,
      firstName,
      lastName
    });

    await newUser.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET || 'edujiin_secret_key',
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    res.status(201).json({
      success: true,
      token,
      user: {
        id: newUser._id,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        profileCompleted: newUser.profileCompleted
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'edujiin_secret_key',
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        profileCompleted: user.profileCompleted
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Get current user profile
router.get('/profile', async (req, res) => {
  try {
    // Authentication middleware would set req.user
    const userId = req.headers.authorization?.split(' ')[1];
    if (!userId) {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }
    
    // For mock purposes, decode the token directly
    let decodedId;
    try {
      const decoded = jwt.verify(userId, process.env.JWT_SECRET || 'edujiin_secret_key');
      decodedId = decoded.userId;
    } catch (error) {
      return res.status(401).json({ success: false, message: 'Invalid token' });
    }

    const user = await User.findById(decodedId).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({ success: true, user });
  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Update user profile
router.put('/profile', async (req, res) => {
  try {
    // Authentication middleware would set req.user
    const userId = req.headers.authorization?.split(' ')[1];
    if (!userId) {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }
    
    // For mock purposes, decode the token directly
    let decodedId;
    try {
      const decoded = jwt.verify(userId, process.env.JWT_SECRET || 'edujiin_secret_key');
      decodedId = decoded.userId;
    } catch (error) {
      return res.status(401).json({ success: false, message: 'Invalid token' });
    }

    const updateData = req.body;
    
    // Don't allow password update through this endpoint
    if (updateData.password) {
      delete updateData.password;
    }
    
    // Set profile as completed if enough data is provided
    if (
      updateData.academicRecords?.gpa &&
      updateData.preferences?.countries?.length > 0 &&
      updateData.preferences?.programTypes?.length > 0
    ) {
      updateData.profileCompleted = true;
    }

    const updatedUser = await User.findByIdAndUpdate(
      decodedId,
      { $set: updateData },
      { new: true }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

export default router;
