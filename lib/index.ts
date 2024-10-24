// Function to encrypt data using the Web Crypto API
export async function encryptData(data: string): Promise<string> {
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(data);

  // Generate a key for encryption
  const key = await window.crypto.subtle.generateKey(
    {
      name: "AES-GCM",
      length: 256,
    },
    true,
    ["encrypt"]
  );

  // Generate a random initialization vector
  const iv = window.crypto.getRandomValues(new Uint8Array(12));

  // Encrypt the data
  const encryptedData = await window.crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv: iv,
    },
    key,
    dataBuffer
  );

  // Combine the IV and encrypted data for storage
  const combinedData = new Uint8Array(iv.byteLength + encryptedData.byteLength);
  combinedData.set(iv);
  combinedData.set(new Uint8Array(encryptedData), iv.byteLength);
  // Convert to base64 for storage
  return btoa(String.fromCharCode(...Array.from(combinedData)));
}

// Function to decrypt data using the Web Crypto API
export async function decryptData(encryptedData: string): Promise<string> {
  const combinedData = Uint8Array.from(atob(encryptedData), (c) =>
    c.charCodeAt(0)
  );

  // Extract the IV and the encrypted data
  const iv = combinedData.slice(0, 12); // First 12 bytes are the IV
  const dataBuffer = combinedData.slice(12); // The rest is the encrypted data

  // Retrieve the key (you need to store and retrieve the key securely)
  const key = await window.crypto.subtle.importKey(
    "raw",
    new Uint8Array(/* your key bytes here */),
    {
      name: "AES-GCM",
    },
    true,
    ["decrypt"]
  );

  // Decrypt the data
  const decryptedData = await window.crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv: iv,
    },
    key,
    dataBuffer
  );

  // Convert the decrypted data back to a string
  const decoder = new TextDecoder();
  return decoder.decode(decryptedData);
}

// Example usage of decryptData
// const encryptedValues = localStorage.getItem("data");
// if (encryptedValues) {
//   const decryptedValues = await decryptData(encryptedValues);
//   console.log(decryptedValues);
// }
