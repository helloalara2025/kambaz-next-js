/**
 * KambazLayout
 * Client layout that shows the global sidebar except on auth routes.
 */
'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import KambazNavigation from './Navigation';
import './styles.css';

export default function KambazLayout({ children }: { children: ReactNode }) {
  const pathname = (usePathname() ?? '').toLowerCase();
  const isAuth = pathname.startsWith('/account/signin') || pathname.startsWith('/account/signup');

  if (isAuth) {
    return <main className="auth-layout">{children}</main>;
  }

  return (
    <div id="wd-kambaz" className="d-flex">
      <KambazNavigation />
      <main className="wd-main-content-offset p-3 flex-fill">{children}</main>
    </div>
  );
}