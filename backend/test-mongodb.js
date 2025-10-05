import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

async function testMongoDBConnection() {
  console.log('Testing MongoDB connection...');
  
  if (!process.env.MONGO_URI) {
    console.log('❌ Error: MONGO_URI not found in environment variables');
    console.log('Please check your .env file contains MONGO_URI');
    return;
  }
  
  console.log('MongoDB URI found in environment variables');
  
  try {
    console.log('Attempting to connect to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000 // 5 second timeout
    });
    
    console.log('✅ MongoDB connection successful!');
    
    // Get list of collections
    console.log('\nListing collections in database:');
    const collections = await mongoose.connection.db.listCollections().toArray();
    
    if (collections.length === 0) {
      console.log('No collections found - database appears to be empty');
    } else {
      collections.forEach(collection => {
        console.log(` - ${collection.name}`);
      });
    }
    
    // Define User model for testing query
    const UserSchema = new mongoose.Schema({
      name: { type: String },
      email: { type: String },
      role: { type: String },
      createdAt: { type: Date },
      updatedAt: { type: Date }
    });
    
    const User = mongoose.model('User', UserSchema);
    
    // Try to get users count
    console.log('\nChecking User collection:');
    const userCount = await User.countDocuments();
    console.log(`Found ${userCount} users in database`);
    
    if (userCount > 0) {
      console.log('\nListing first 5 users:');
      const users = await User.find().limit(5);
      users.forEach((user, index) => {
        console.log(`User ${index + 1}:`);
        console.log(` - Name: ${user.name}`);
        console.log(` - Email: ${user.email}`);
        console.log(` - Role: ${user.role}`);
      });
    }
    
  } catch (err) {
    console.log(`❌ MongoDB connection error: ${err.message}`);
    console.log('Error details:', err);
  } finally {
    // Close connection
    if (mongoose.connection.readyState) {
      console.log('\nClosing MongoDB connection...');
      await mongoose.connection.close();
      console.log('Connection closed');
    }
  }
}

// Run the test
testMongoDBConnection().catch(console.error);