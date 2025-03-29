import mongoose from 'mongoose';

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
    console.log('-->ENVS-->', process.env);

    if (!mongoUri) {
      console.log('MONGO_URI is not defined');
      throw new Error('MONGO_URI is not defined');
    }
    const db = await mongoose.connect(mongoUri);
    connection.isConnected = db.connections[0].readyState;
    console.log('Mongodb connected successfully');
  } catch (error) {
    console.log('Mongodb connection error', error);
    process.exit(1);
  }
}

export default dbConnect;
