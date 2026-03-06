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
    ]
  },
}

export default nextConfig
