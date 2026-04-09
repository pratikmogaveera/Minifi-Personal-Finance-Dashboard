/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
        return [
            {
                source: '/_next/static/:path*',
                headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }]
            },
            {
                source: '/(.*)\.(ico|png|webp|svg|jpg|jpeg|woff|woff2)',
                headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }]
            }
        ]
    },
    webpack: (config) => {
        config.resolve.alias['expo-secure-store'] = false
        return config
    }
}

module.exports = nextConfig
