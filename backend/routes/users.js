import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// Get users with filtering, sorting, and pagination
router.get('/', async (req, res) => {
  try {
    const {
      role,
      status,
      location,
      sort = '-createdAt',
      page = 1,
      limit = 10,
      search
    } = req.query;

    // Build query
    const query = {};
    if (role) query.role = role;
    if (status) query.status = status;
    if (location) query['profile.location'] = new RegExp(location, 'i');
    if (search) {
      query.$or = [
        { name: new RegExp(search, 'i') },
        { email: new RegExp(search, 'i') },
        { 'profile.bio': new RegExp(search, 'i') }
      ];
    }

    // Execute query with pagination
    const users = await User.find(query)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .select('-security.lastIpAddress'); // Exclude sensitive data

    // Get total count for pagination
    const total = await User.countDocuments(query);

    res.json({
      users,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get user statistics
router.get('/stats', async (req, res) => {
  try {
    const stats = await User.getActiveUserStats();
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ status: 'active' });
    
    res.json({
      totalUsers,
      activeUsers,
      roleDistribution: stats,
      activePercentage: (activeUsers / totalUsers * 100).toFixed(2)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new user
router.post('/', async (req, res) => {
  try {
    const user = new User({
      ...req.body,
      security: {
        lastIpAddress: req.ip
      }
    });
    
    await user.save();
    
    // Return user without sensitive data
    const userResponse = user.toJSON();
    delete userResponse.security;
    
    res.status(201).json(userResponse);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: 'Email already exists' });
    } else {
      res.status(400).json({ message: error.message });
    }
  }
});

// Get user by ID with full profile
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      // Increment visit count
      user.stats.visitCount += 1;
      await user.save();
      
      // Return virtual fields
      res.json(user.fullProfile);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update user
router.patch('/:id', async (req, res) => {
  try {
    const updates = req.body;
    const options = { 
      new: true, 
      runValidators: true,
      context: 'query'
    };

    const user = await User.findByIdAndUpdate(
      req.params.id,
      updates,
      options
    );

    if (user) {
      res.json(user.fullProfile);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: 'Email already exists' });
    } else {
      res.status(400).json({ message: error.message });
    }
  }
});

// Delete user (soft delete)
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      user.status = 'inactive';
      await user.save();
      res.json({ message: 'User deactivated successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get users by role
router.get('/role/:role', async (req, res) => {
  try {
    const users = await User.findByRole(req.params.role);
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;