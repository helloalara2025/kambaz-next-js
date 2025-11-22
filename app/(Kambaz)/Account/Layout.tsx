"use client";

import type { ReactNode } from "react";
import Link from "next/link";

type AccountLayoutProps = {
  children: ReactNode;
};

// layout only for account pages (signin, signup, profile)
export default function AccountLayout({ children }: AccountLayoutProps) {
  return (
    // full page wrapper for account screens
    <div className="wd-account-layout d-flex min-vh-100 position-relative">
      {/* labs link in the corner */}
      <header className="position-absolute top-0 start-0 p-3">
        <Link href="/Labs" className="btn btn-outline-secondary btn-sm">
          labs
        </Link>
      </header>

      {/* auth content in the center */}
      <main className="flex-fill d-flex justify-content-center align-items-center">
        {children}
      </main>
    </div>
  );
}