/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  async rewrites() {
    return [
      {
        source: '/graphql',
        destination: process.env.GRAPHQL_SERVER_ENDPOINT,
      },
    ]
  },
};

export default nextConfig;
