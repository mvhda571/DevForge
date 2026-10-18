import mongoose from 'mongoose';
import env from './env.js';
import dns from 'node:dns';
dns.setServers(['8.8.8.8', '1.1.1.1']);
dns.promises.setServers(['8.8.8.8', '1.1.1.1']);


mongoose.set('strictQuery', true);

export async function connectDb(uri = env.mongoUri) {
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 8000 });
  return mongoose.connection;
}

export async function disconnectDb() {
  await mongoose.disconnect();
}

export function dbState() {
  return ['disconnected', 'connected', 'connecting', 'disconnecting'][mongoose.connection.readyState] || 'unknown';
}
