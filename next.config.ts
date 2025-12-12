/**
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ║                      NEXT.JS CONFIGURATION                                ║
 * ║                         Created by Alara                                  ║
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 * 
 * This file configures Next.js behavior for the Kambaz application.
 * 
 * @author Alara
 */

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable React strict mode for better error detection
  reactStrictMode: true,
  
  // Configure images from external sources (if needed)
  images: {
    domains: [],
  },
};

export default nextConfig;
