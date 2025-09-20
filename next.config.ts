import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */ images: {
    domains: ['res.cloudinary.com'], 
  },
   api: {
    bodyParser: {
      sizeLimit: '10mb', // jitni limit chahiye set kar lo
    },
  },
  
};

export default nextConfig;
