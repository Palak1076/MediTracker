const app = require('./app');
const mongoose = require('mongoose');
 const  cronJobManager = require('./services/scheduler/cronJobs');
const socketService = require('./services/websocket/socketService');
const logger = require('./utils/logger');
const notificationRoutes = require('./routes/notificationRoutes');
const DoseNotificationManager = require('./services/notification/DoseNotificationManager');
require('dotenv').config();

require('./config/firebase'); 
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/meditracker';
DoseNotificationManager;
app.use('/api/notifications', notificationRoutes);
// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    logger.info('Connected to MongoDB');
    
    // Start server
    const server = app.listen(PORT, () => {
        logger.info(`Server running on port ${PORT}`);
        
        // Initialize WebSocket
        socketService.initialize(server);
        
        // Schedule cron jobs
        cronJobManager.initialize();
    });
})
.catch((error) => {
    logger.error('MongoDB connection error:', error);
    process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    logger.error('Unhandled Promise Rejection:', err);
    // Close server & exit process
    process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    logger.error('Uncaught Exception:', err);
    process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    logger.info('SIGTERM received. Shutting down gracefully...');
    mongoose.connection.close();
    process.exit(0);
});
