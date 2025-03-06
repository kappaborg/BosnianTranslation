/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
      },
      {
        protocol: 'https',
        hostname: 'unpkg.com',
      },
    ],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Node polyfills için konfigürasyon
      config.resolve.fallback = {
        ...config.resolve.fallback,
        canvas: false,
        fs: false,
        path: false,
        os: false,
      };
    }

    // PDF.js worker için özel konfigürasyon
    config.module.rules.push({
      test: /pdf\.worker\.(min\.)?js/,
      type: "asset/resource",
      generator: {
        filename: "static/worker/[hash][ext][query]",
      },
    });

    // Binary modüller için özel kural
    config.module.rules.push({
      test: /\.node$/,
      loader: "ignore-loader",
    });

    return config;
  },
};

module.exports = nextConfig;

