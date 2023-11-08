/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {

        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'raw.githubusercontent.com',
                port: '',
                pathname: '/Bhargavoza1/test-blogposts-main/main/images/**',
            },
        ],
    },
}

module.exports = nextConfig
