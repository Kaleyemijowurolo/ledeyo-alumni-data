// lib/cors.ts
import Cors from "cors";
import type { NextApiRequest, NextApiResponse } from "next";

// Initialize the CORS middleware
const cors = Cors({
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
  origin: "*", // Replace with your specific origin(s) if necessary
});
// Helper function to run middleware
export function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: (req: NextApiRequest, res: NextApiResponse, result: unknown) => void
) {
  return new Promise<void>((resolve, reject) => {
    fn(req, res, (result: unknown) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve();
    });
  });
}

export default cors;
