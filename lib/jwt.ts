import jwt from "jsonwebtoken";

// Function to generate JWT
export const generateToken = (userId: string) => {
  const secret = process.env.JWT_SECRET || "default_secret";
  const token = jwt.sign({ id: userId }, secret, { expiresIn: "15d" });
  return token;
};

// Function to verify JWT
export const verifyToken = (token: string) => {
  const secret = process.env.JWT_SECRET || "default_secret";
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    return error;
  }
};
