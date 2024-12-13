
// next.config.js
const nextConfig = {
    swcMinify: true,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
            },
        ],
    },eslint: {
        ignoreDuringBuilds: true,
    },
    };
    
module.exports = nextConfig;