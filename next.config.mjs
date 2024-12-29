/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // eslint: {
  //   ignoreDuringBuilds: true,
  // },
  // typescript: {
  //   ignoreBuildErrors: true,
  // },
  // productionBrowserSourceMaps: false,
  // experimental: {
  //   // webpackMemoryOptimizations: true,
  //   serverSourceMaps: false,
  // },
  webpack: (
    config
    // { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    // if (config.cache && !dev) {
    //   config.cache = Object.freeze({
    //     type: "memory",
    //   });
    // }
    config.externals.push("pino-pretty", "lokijs", "encoding");

    return config;
  },
};

export default nextConfig;
