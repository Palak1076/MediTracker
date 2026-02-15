const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();
const dashboardRoutes = require('./routes/dashboard');
const doseRoutes = require('./routes/doses');
const emailService = require('./services/notification/EmailService');
// Import routes
const authRoutes = require('./routes/auth');
const medicationRoutes = require('./routes/medication');
const reminderRoutes = require('./routes/reminders');
const healthRoutes = require('./routes/health');
const aiRoutes = require('./routes/ai');
const rewardRoutes = require('./routes/reward');
const emailTestRoutes = require('./routes/emailTest');
const scheduleRoutes = require('./routes/scheduleRoutes');
const CronJobManager = require('./services/scheduler/cronJobs');
const MissedDoseDetector = require('./services/scheduler/MissedDoseDetector');
const analyticsRoutes = require('./routes/analyticsRoutes');
const ChangePassword=require('./routes/changePasswordRoute');
// Import middleware
const errorHandler = require('./middleware/errorHandler');
const { auth, firebaseAuth } = require('./middleware/auth');
const userRoutes=require('./routes/userRoutes');
const app = express();

app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true,
  methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization']
}));


app.options('*', cors());
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
  next();
});



CronJobManager.initialize();
MissedDoseDetector.init(); 

app.use(helmet({
  contentSecurityPolicy: false 
}));
// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200, // dev ke liye thoda loose
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      message: 'Too many requests'
    });
  }
});
app.use('/api/auth', limiter);


app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Compression
app.use(compression());

// Logging
app.use(morgan('combined'));

// Static files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/medications', medicationRoutes);
app.use('/api/reminders', reminderRoutes);
app.use('/api/health', healthRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/rewards', rewardRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/doses', doseRoutes);
app.use('/api/email-test', emailTestRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/user',ChangePassword);
app.use("/api/notifications", require("./routes/notificationRoutes"));
console.log('All scheduled services initialized');
app.use('/api/schedule', scheduleRoutes);
app.use('/api/user',userRoutes);
// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        database: 'connected'
    });
});
setTimeout(async () => {
  const res = await emailService.sendEmail(
    'palakcbse2023@gmail.com',
    '🔥 Direct Test Email',
    '<h1>If you see this, Nodemailer WORKS</h1>'
  );
  console.log('DIRECT EMAIL RESULT:', res);
}, 3000);

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        error: 'Route not found',
        path: req.originalUrl
    });
});

// Error handling middleware
app.use(errorHandler);

module.exports = app;
