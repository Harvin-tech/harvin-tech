import mongoose from 'mongoose';

// Disable Mongoose buffering to prevent timeout issues
mongoose.set('bufferCommands', false);

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    console.log('Already mongodb connected');
    return;
  }

  try {
    const mongoUri = process.env.MONGO_URI;

    if (!mongoUri) {
      console.log('MONGO_URI is not defined');
      throw new Error('MONGO_URI is not defined');
    }
    const db = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 30000,
      connectTimeoutMS: 30000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
      minPoolSize: 1,
      maxIdleTimeMS: 30000,
      retryWrites: true,
      w: 'majority',
    });

    connection.isConnected = db.connections[0].readyState;
    console.log('Mongodb connected successfully');

    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
      connection.isConnected = 0;
    });

    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected');
      connection.isConnected = 0;
    });

    mongoose.connection.on('reconnected', () => {
      console.log('MongoDB reconnected');
      connection.isConnected = 1;
    });
  } catch (error) {
    console.error('Mongodb connection error:', error);
    connection.isConnected = 0;
    throw error; // Re-throw to let the calling function handle it
  }
}

export default dbConnect;
