import cors from 'cors';
import express from 'express';
import fs from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Setup file paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
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

// Initialize storage
initDataStore();

// Middleware
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// API Endpoints with file-based storage
app.get('/api/users', async (req, res) => {
  try {
    const data = JSON.parse(await fs.readFile(DATA_FILE, 'utf8'));
    return res.json(data.users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ message: 'Error fetching users' });
  }
});

app.post('/api/users', async (req, res) => {
  try {
    const { name, email, role } = req.body;
    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required' });
    }
    
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
    res.status(201).json(newUser);
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({ message: 'Error creating user' });
  }
});

app.get('/api/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const data = JSON.parse(await fs.readFile(DATA_FILE, 'utf8'));
    const user = data.users.find(u => u.id === parseInt(id));
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user);
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).json({ message: 'Error fetching user' });
  }
});

app.put('/api/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, role } = req.body;
    
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
    res.json(updatedUser);
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).json({ message: 'Error updating user' });
  }
});

app.delete('/api/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const data = JSON.parse(await fs.readFile(DATA_FILE, 'utf8'));
    const userIndex = data.users.findIndex(u => u.id === parseInt(id));
    
    if (userIndex === -1) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    data.users.splice(userIndex, 1);
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
    res.json({ message: 'User deleted successfully' });
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
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 API root: http://localhost:${PORT}`);
  console.log(`💾 Storage mode: File-based (data.json)`);
});