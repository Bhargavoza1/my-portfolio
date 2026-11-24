/** @type {import('next').NextConfig} */
const nextConfig = {
    // dev only: let a phone on the same Wi-Fi load the dev server's JS
    // (Next blocks /_next dev files from other origins, so menu and 3D view did not work)
    allowedDevOrigins: ['192.168.*.*', '10.*.*.*', '172.*.*.*', '*.local'],
    images: {

        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'raw.githubusercontent.com',
                port: '',
                pathname: '/Bhargavoza1/**/main/images/**',
            },
        ],
    },
}

module.exports = nextConfig
