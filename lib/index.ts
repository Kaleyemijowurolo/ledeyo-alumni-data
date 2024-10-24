import { createCipheriv, createDecipheriv } from "crypto";

// Encryption function to handle Buffer or string inputs
export const encryptData = (
  text: Buffer | string,
  key: Buffer,
  iv: Buffer
): string => {
  const cipher = createCipheriv("aes-256-cbc", key, iv);
  let encrypted = cipher.update(
    typeof text === "string" ? Buffer.from(text, "utf8") : text
  );
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return encrypted.toString("hex");
};

// Decryption function
export const decryptData = (
  encryptedText: string,
  key: Buffer,
  iv: Buffer
): string => {
  const encryptedTextBuffer = Buffer.from(encryptedText, "hex");
  const decipher = createDecipheriv("aes-256-cbc", key, iv);
  let decrypted = decipher.update(encryptedTextBuffer);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
};

// Convert environment variables to Buffers and ensure lengths are correct
export const encryptionKey = Buffer.from(
  process.env.NEXT_PUBLIC_DECRYPTIONKEY as string,
  "hex"
); // 32 bytes
export const encryptionKeyIV = Buffer.from(
  process.env.NEXT_PUBLIC_DECRYPTIONKEYIV as string,
  "hex"
); // 16 bytes
