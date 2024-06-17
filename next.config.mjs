/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['courses-top.ru'],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  reactStrictMode: true,

};

export default nextConfig;
