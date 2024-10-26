// /** @type {import('next').NextConfig} */
// const nextConfig = {

// };

// module.exports = {
//   async middleware() {
//     return {
//       // Match only API routes
//       matcher: "/api/:path*",
//     };
//   },
// };

// export default nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Add any necessary Next.js configuration options here
  reactStrictMode: true, // Example option
};

// Exporting the middleware as a named export
export const middleware = async () => {
  return {
    // Match only API routes
    matcher: "/api/:path*",
  };
};

export default nextConfig;
