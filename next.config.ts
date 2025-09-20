import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */ images: {
    domains: ['res.cloudinary.com'], 
  },
   api: {
    bodyParser: {
      sizeLimit: '4mb', 
    },
  },
  
};

export default nextConfig;
