/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: { esmExternals: true },
  images: { domains: ["cdn.sanity.io", "cdn.sanity.io/files/*"] },
  headers: [
    { key: "Access-Control-Allow-Credentials", value: "true" },
    {
      key: "Access-Control-Allow-Origin",
      value: "http://localhost:3000",
    },
    {
      key: "Access-Control-Allow-Origin",
      value: "https://cdn.sanity.io",
    },
    {
      key: "Access-Control-Allow-Origin",
      value: "http://localhost:3333",
    },
    // ...
  ],
};

module.exports = nextConfig;
