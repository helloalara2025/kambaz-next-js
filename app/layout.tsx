// app/layout.tsx
import type { ReactNode } from "react";
import "./globals.css"; // keep whatever global styles you use

type RootLayoutProps = {
  children: ReactNode;
};

// root layout wraps the whole app
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}