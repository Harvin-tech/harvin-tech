import mongoose from 'mongoose';

mongoose.set('bufferCommands', false); // Disable Mongoose buffering

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
    });
    connection.isConnected = db.connections[0].readyState;
    console.log('Mongodb connected successfully');
  } catch (error) {
    console.log('Mongodb connection error', error);
    process.exit(1);
  }
}

export default dbConnect;
