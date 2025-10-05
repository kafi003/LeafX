import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: [2, 'Name must be at least 2 characters long'],
    maxlength: [50, 'Name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'moderator'],
    default: 'user'
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'suspended'],
    default: 'active'
  },
  profile: {
    avatar: String,
    bio: { type: String, maxlength: 500 },
    location: String,
    interests: [String]
  },
  settings: {
    notifications: { type: Boolean, default: true },
    theme: { type: String, default: 'light', enum: ['light', 'dark'] },
    language: { type: String, default: 'en' }
  },
  stats: {
    lastLogin: Date,
    loginCount: { type: Number, default: 0 },
    visitCount: { type: Number, default: 0 }
  },
  security: {
    passwordLastChanged: Date,
    twoFactorEnabled: { type: Boolean, default: false },
    lastIpAddress: String
  }
}, {
  timestamps: true,
  strict: true,
  collection: 'users',
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better query performance
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ role: 1 });
userSchema.index({ "profile.location": 1 });
userSchema.index({ createdAt: -1 });
userSchema.index({ status: 1, role: 1 });

// Virtual fields
userSchema.virtual('fullProfile').get(function() {
  return {
    ...this.toObject(),
    isAdmin: this.role === 'admin',
    profileUrl: `/api/users/${this._id}`,
    accountAge: new Date() - this.createdAt
  };
});

// Instance methods
userSchema.methods.updateLoginStats = async function(ipAddress) {
  this.stats.lastLogin = new Date();
  this.stats.loginCount += 1;
  this.security.lastIpAddress = ipAddress;
  return this.save();
};

// Static methods
userSchema.statics.findByRole = function(role) {
  return this.find({ role, status: 'active' });
};

userSchema.statics.getActiveUserStats = function() {
  return this.aggregate([
    { $match: { status: 'active' } },
    { $group: {
      _id: '$role',
      count: { $sum: 1 },
      avgLoginCount: { $avg: '$stats.loginCount' }
    }},
    { $sort: { count: -1 } }
  ]);
};

// Middleware
userSchema.pre('save', function(next) {
  if (this.isModified('email')) {
    this.email = this.email.toLowerCase();
  }
  next();
});

userSchema.pre('save', function(next) {
  if (this.isModified('password')) {
    this.security.passwordLastChanged = new Date();
  }
  next();
});

const User = mongoose.model('User', userSchema);

export default User;