import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import mongoose from 'mongoose';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';

// Load environment variables from .env file
dotenv.config();

// --- Environment Validation ---
const checkRequiredEnvVars = () => {
  const required = ['MONGODB_URI', 'JWT_SECRET', 'PORT'];
  const missing = required.filter((envVar) => !process.env[envVar]);
  
  if (missing.length > 0) {
    console.error(`ERROR: Missing required environment variables: ${missing.join(', ')}`);
    process.exit(1);
  }
};

// Run environment validation before connecting to DB or starting Express
checkRequiredEnvVars();

// Import database connection configuration
import { connectDB } from './config/database.js';

// Import global error handler middleware
import { errorHandler } from './middleware/errorHandler.js';

// Import application routes
import authRoutes from './routes/authRoutes.js';
import leadRoutes from './routes/leadRoutes.js';

// Initialize the Express application
const app = express();

// --- Security & Middleware Configuration ---

// Enable Cross-Origin Resource Sharing (Production-ready)
// MUST be before other middleware so preflight requests succeed
app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL, 
      'https://startup-crm-lite-orcin.vercel.app',
      'https://your-app.vercel.app', 
      /^http:\/\/localhost:\d+$/
    ],
    credentials: true,
  })
);

// Security middleware to set various HTTP headers
app.use(helmet());

// Body parsers with size limits to prevent large payload attacks
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));

// MongoDB Injection Protection: sanitizes req.body, req.query, req.params
// Temporarily disabled: express-mongo-sanitize is incompatible with Express 5's req.query getter.
// app.use(mongoSanitize());

// HTTP request logger middleware
// Use 'combined' in production for detailed logs, 'dev' in development for concise logs
if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined'));
} else {
  app.use(morgan('dev'));
}

// --- Rate Limiting ---

// General rate limit: 100 requests per 15 minutes per IP
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: { success: false, message: 'Too many requests, please try again later.' }
});

// Auth rate limit (stricter): 10 requests per 15 minutes for /api/auth routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: { success: false, message: 'Too many auth attempts.' }
});

// Apply rate limiters to all API routes
app.use('/api/', generalLimiter);
app.use('/api/auth/', authLimiter);


// --- Route Registrations ---

// Application API routes
app.use('/api/auth', authRoutes);
app.use('/api/leads', leadRoutes);

// Health check endpoint to verify server status
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date(),
  });
});

// Root endpoint to prevent "Cannot GET /" errors
app.get('/', (req, res) => {
  res.send('Startup CRM Backend is running! Please use the /api endpoints.');
});


// --- Error Handling ---

// Register the global error handler middleware LAST (after all routes)
app.use(errorHandler);


// --- Server Startup & Graceful Shutdown ---

const PORT = process.env.PORT || 5000;
const MODE = process.env.NODE_ENV || 'development';

let server;

// Connect to the database, then start the Express server
connectDB().then(() => {
  server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} in ${MODE} mode`);
  });
});

// Handle graceful shutdown signals
const gracefulShutdown = () => {
  console.log('\nReceived kill signal, shutting down gracefully...');
  
  if (server) {
    server.close(() => {
      console.log('HTTP server closed.');
      // Close MongoDB connection cleanly
      mongoose.connection.close(false).then(() => {
        console.log('MongoDB connection closed.');
        process.exit(0);
      });
    });
  } else {
    process.exit(0);
  }
};

// Listen for termination signals (SIGINT from Ctrl+C, SIGTERM from Docker/Heroku)
process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);
