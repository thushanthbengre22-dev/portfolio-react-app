/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: "/ai-lab/job-search-agent",
        destination: "https://job-search-agent-flame.vercel.app/ai-lab/job-search-agent",
      },
      {
        source: "/ai-lab/job-search-agent/:path*",
        destination: "https://job-search-agent-flame.vercel.app/ai-lab/job-search-agent/:path*",
      },
      {
        source: "/ai-lab/warren-bot-it/:path*",
        destination: "https://warren-bot-it-production.up.railway.app/:path*",
      },
    ]
  },
}

export default nextConfig
