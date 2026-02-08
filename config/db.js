import mongoose from "mongoose";

let cached = global.mongoose || { conn: null, promise: null };

export default async function connectDB() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is not set");
    }
    cached.promise = mongoose.connect(process.env.MONGODB_URI).then((m) => m);
  }
  try {
    cached.conn = await cached.promise;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
  return cached.conn;
}
