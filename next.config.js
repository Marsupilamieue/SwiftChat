/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    experimental : {
        swcPlugins: [["next-superjson-plugin", {}]]
    },
    images : {
        domains : ['localhost', 'lh3.googleusercontent.com', 'res.cloudinary.com'] // <== Corrected Domain name
    }
}

module.exports = nextConfig
