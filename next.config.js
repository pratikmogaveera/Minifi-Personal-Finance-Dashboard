/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        config.resolve.alias['expo-secure-store'] = false
        return config
    }
}

module.exports = nextConfig
