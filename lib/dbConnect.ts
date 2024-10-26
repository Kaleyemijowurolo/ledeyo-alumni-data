import mongoose, { Mongoose } from "mongoose";

// Define a global object to hold the cached connection
declare global {
  let mongoose: { conn: Mongoose | null; promise: Promise<Mongoose> | null };
}

// Get MongoDB URI from environment variables
const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

// Ensure global.mongoose is initialized and cached properly

let cached = (
  global as typeof global & {
    mongoose: { conn: Mongoose | null; promise: Promise<Mongoose> | null };
  }
).mongoose;

if (!cached) {
  cached = (
    global as typeof global & { mongoose: { conn: null; promise: null } }
  ).mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  // Reuse existing connection if available
  if (cached.conn) {
    console.log("Using existing database connection.");
    return cached.conn;
  }

  // Create a new connection if one does not exist yet
  if (!cached.promise) {
    console.log("Creating new database connection.");
    const opts = {
      bufferCommands: false, // Disable command buffering during connection
    };

    // Create the connection promise
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log("Database connection established.");
      return mongoose;
    });
  }

  // Await the connection promise and store the result in cached.conn
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
