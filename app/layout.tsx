/**
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ║                        ROOT LAYOUT                                        ║
 * ║                    Global App Configuration                               ║
 * ║                         Created by Alara                                  ║
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 * 
 * This is the root layout that wraps every page in the Next.js application.
 * It's responsible for:
 * - Loading global CSS (Bootstrap)
 * - Setting up the HTML document structure
 * - Adding metadata (title, description)
 * 
 * NEXT.JS APP ROUTER:
 * The App Router uses a file-based routing system where:
 * - layout.tsx: Wraps child pages (persistent across navigation)
 * - page.tsx: The actual page content
 * - Folders in () are "route groups" (don't affect URL)
 * 
 * @author Alara
 */

import type { Metadata } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";

/**
 * Page metadata - shown in browser tab and search results
 */
export const metadata: Metadata = {
  title: "Kambaz LMS - Created by Alara",
  description: "Learning Management System built with Next.js and MongoDB",
};

/**
 * Root Layout Component
 * 
 * Every page in the app is wrapped by this layout.
 * The {children} prop contains the current page content.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
