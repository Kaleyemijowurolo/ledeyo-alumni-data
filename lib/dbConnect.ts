// import mongoose from "mongoose";

// // Extend the NodeJS.Global interface
// declare global {
//   interface Global {
//     mongoose: {
//       conn: typeof mongoose | null;
//       promise: Promise<typeof mongoose> | null;
//     };
//   }
// }

// const MONGODB_URI = process.env.MONGODB_URI as string;

// if (!MONGODB_URI) {
//   throw new Error(
//     "Please define the MONGODB_URI environment variable inside .env.local"
//   );
// }

// // let cached = global.mongoose;
// let cached = (global as typeof global & { mongoose: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null; } }).mongoose;

// // if (!cached) {
// //   cached = global.mongoose = { conn: null, promise: null };
// // }

// if (!cached) {
//     global.mongoose = { conn: null, promise: null }; // Ensure global.mongoose is initialized
//     cached = global.mongoose;
//   }

// async function dbConnect() {
//   if (cached.conn) {
//     console.log("Using existing database connection.");

//     return cached.conn;
//   }

//   if (!cached.promise) {
//     console.log("Creating new database connection.");
//     const opts = {
//       bufferCommands: false,
//     };

//     cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
//         console.log("Database connection established.");
//         return mongoose;
//     });
//   }

//   cached.conn = await cached.promise;
//   return cached.conn;
// }

// export default dbConnect;

// -------------------------------------------

// import mongoose from "mongoose";

// // Extend the NodeJS.Global interface to add a custom global `mongoose` variable.
// // This will hold the cached MongoDB connection and a promise to establish the connection.
// // This ensures that the connection can be reused across requests or invocations.
// declare global {
//   let mongoose: {
//     conn: typeof mongoose | null; // Cached connection object, null if not connected yet
//     promise: Promise<typeof mongoose> | null; // Promise for the connection, used to prevent multiple connections
//   };
// }

// // Get the MongoDB connection URI from environment variables.
// // This URI should be set in the environment, typically in a .env.local file.
// const MONGODB_URI = process.env.MONGODB_URI as string;

// if (!MONGODB_URI) {
//   // Throw an error if the MONGODB_URI environment variable is not defined.
//   // The application cannot connect to the database without this URI.
//   throw new Error(
//     "Please define the MONGODB_URI environment variable inside .env.local"
//   );
// }

// // Cache the global mongoose object with explicit typing.
// // This checks if `global.mongoose` exists. If not, the connection and promise are both `null`.
// // This allows reusing the connection across multiple requests (important in serverless environments).
// const cached = (
//   global as typeof global & {
//     mongoose: {
//       conn: typeof mongoose | null;
//       promise: Promise<typeof mongoose> | null;
//     };
//   }
// ).mongoose;

// async function dbConnect() {
//   // If a cached connection already exists, reuse it.
//   if (cached.conn) {
//     console.log("Using existing database connection.");
//     return cached.conn;
//   }

//   // If no promise exists to establish a connection, create a new one.
//   // This ensures that only one connection attempt is made, even if multiple requests
//   // are made simultaneously.
//   if (!cached.promise) {
//     console.log("Creating new database connection.");

//     const opts = {
//       bufferCommands: false, // Disable buffering of Mongoose commands while the connection is being established.
//     };

//     // Create a new connection promise and store it in the cache.
//     // Once the connection is established, it will be reused for future requests.
//     cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
//       console.log("Database connection established.");
//       return mongoose;
//     });
//   }

//   // Wait for the connection promise to resolve and cache the established connection.
//   cached.conn = await cached.promise;

//   // Return the established connection.
//   return cached.conn;
// }

// // Export the dbConnect function as the default export.
// // This function will be used in other parts of the application to connect to the database.
// export default dbConnect;

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
