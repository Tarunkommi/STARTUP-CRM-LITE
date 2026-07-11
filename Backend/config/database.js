import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

/**
 * Connects to the MongoDB Atlas database using Mongoose.
 * @returns {Promise<void>}
 */
export const connectDB = async () => {
  try {
    // Mongoose options included as requested
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    // Log success message with the host
    console.log(`MongoDB Atlas Connected: ${conn.connection.host}`);
  } catch (error) {
    // Log the error and exit the process on failure
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};
