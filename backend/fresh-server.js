import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import fs from 'fs/promises';
import mongoose from 'mongoose';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();
const app = express();

// File-based storage setup
const DATA_FILE = join(__dirname, 'data.json');
const initDataStore = async () => {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf8');
    JSON.parse(data);
    console.log('✅ File-based storage initialized');
  } catch {
    await fs.writeFile(DATA_FILE, JSON.stringify({ users: [] }, null, 2));
    console.log('✅ Created new data.json file');
  }
};

// MongoDB setup
const connectMongoDB = async () => {
  if (!process.env.MONGO_URI) {
    console.log('⚠️ MONGO_URI not found in environment, using file-based storage only');
    return false;
  }
  
  try {
    // Set a shorter connection timeout to avoid long waits
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000, // 5 seconds
      connectTimeoutMS: 10000, // 10 seconds
    });
    console.log('✅ MongoDB connected');
    return true;
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    console.log('⚠️ Falling back to file-based storage');
    console.log('💡 Tip: Update MONGO_URI in .env file with a valid MongoDB connection string');
    console.log('    Current MONGO_URI:', process.env.MONGO_URI);
    return false;
  }
};

// User model for MongoDB
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, default: 'user' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date }
});

const User = mongoose.model('User', UserSchema);

// Initialize storage
let useMongoDb = false;
const initStorage = async () => {
  useMongoDb = await connectMongoDB();
  if (!useMongoDb) {
    await initDataStore();
  }
};

// Start storage initialization
initStorage();

// Middleware
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(\`\${new Date().toISOString()} - \${req.method} \${req.path}\`);
  next();
});

// API Endpoints with hybrid storage (MongoDB + file-based)
app.get('/api/users', async (req, res) => {
  try {
    if (useMongoDb) {
      const users = await User.find({});
      return res.json(users);
    } else {
      const data = JSON.parse(await fs.readFile(DATA_FILE, 'utf8'));
      return res.json(data.users);
    }
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ message: 'Error reading users' });
  }
});

app.post('/api/users', async (req, res) => {
  try {
    const { name, email, role } = req.body;
    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required' });
    }
    
    if (useMongoDb) {
      // Check if email exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already exists' });
      }
      
      // Create new user in MongoDB
      const newUser = new User({ name, email, role });
      await newUser.save();
      return res.status(201).json(newUser);
    } else {
      // File-based storage
      const data = JSON.parse(await fs.readFile(DATA_FILE, 'utf8'));
      if (data.users.some(u => u.email === email)) {
        return res.status(400).json({ message: 'Email already exists' });
      }
      
      const newUser = {
        id: data.users.length + 1,
        name,
        email,
        role: role || 'user',
        createdAt: new Date().toISOString()
      };
      
      data.users.push(newUser);
      await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
      return res.status(201).json(newUser);
    }
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({ message: 'Error creating user' });
  }
});

app.get('/api/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    if (useMongoDb) {
      // MongoDB uses ObjectId
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      return res.json(user);
    } else {
      // File-based storage uses numeric ids
      const data = JSON.parse(await fs.readFile(DATA_FILE, 'utf8'));
      const user = data.users.find(u => u.id === parseInt(id));
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      return res.json(user);
    }
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).json({ message: 'Error fetching user' });
  }
});

app.put('/api/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, role } = req.body;
    
    if (useMongoDb) {
      const updateData = {
        ...(name && { name }),
        ...(email && { email }),
        ...(role && { role }),
        updatedAt: new Date()
      };
      
      const user = await User.findByIdAndUpdate(
        id, 
        updateData,
        { new: true } // return updated document
      );
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      return res.json(user);
    } else {
      // File-based storage
      const data = JSON.parse(await fs.readFile(DATA_FILE, 'utf8'));
      const userIndex = data.users.findIndex(u => u.id === parseInt(id));
      
      if (userIndex === -1) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      const updatedUser = { 
        ...data.users[userIndex], 
        name: name || data.users[userIndex].name,
        email: email || data.users[userIndex].email,
        role: role || data.users[userIndex].role,
        updatedAt: new Date().toISOString()
      };
      
      data.users[userIndex] = updatedUser;
      await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
      return res.json(updatedUser);
    }
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).json({ message: 'Error updating user' });
  }
});

app.delete('/api/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    if (useMongoDb) {
      const user = await User.findByIdAndDelete(id);
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      return res.json({ message: 'User deleted successfully' });
    } else {
      // File-based storage
      const data = JSON.parse(await fs.readFile(DATA_FILE, 'utf8'));
      const userIndex = data.users.findIndex(u => u.id === parseInt(id));
      
      if (userIndex === -1) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      data.users.splice(userIndex, 1);
      await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
      return res.json({ message: 'User deleted successfully' });
    }
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ message: 'Error deleting user' });
  }
});

app.get('/api/message', (req, res) => {
  res.json({ message: 'Welcome to LeafX API!' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

const PORT = process.env.PORT || 5002;

app.listen(PORT, '0.0.0.0', () => {
  console.log(\`🚀 Server running on port \${PORT}\`);
  console.log(\`📍 API root: http://localhost:\${PORT}\`);
  console.log(\`💾 Storage: \${useMongoDb ? 'MongoDB' : 'File-based (data.json)'}\`);
});
