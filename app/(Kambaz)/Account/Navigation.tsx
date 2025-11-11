"use client";
/*
  kambaz – account navigation
  - toggles auth links based on signed‑in user
  - shows: dashboard, courses, calendar, inbox, neu, and auth links
*/

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";

// minimal root state for selector
type RootState = { accountReducer: { currentUser: unknown | null } };

export default function AccountNavigation() {
  const pathname = usePathname()?.toLowerCase() ?? "";
  const { currentUser } = useSelector((s: RootState) => s.accountReducer);
  const isSignedIn = !!currentUser;

  // base links always visible
  const base = [
    { label: "Dashboard", href: "/dashboard", external: false },
    { label: "Courses", href: "/Courses", external: false },
    { label: "Calendar", href: "/calendar", external: false },
    { label: "Inbox", href: "https://mail.google.com/", external: true },
    { label: "NEU", href: "https://www.northeastern.edu/", external: true },
  ];

  // auth-dependent links
  const authed = isSignedIn
    ? [
        { label: "Profile", href: "/Account/Profile", external: false },
        { label: "Sign out", href: "/Account/Signin", external: false },
      ]
    : [
        { label: "Signin", href: "/Account/Signin", external: false },
        { label: "Signup", href: "/Account/Signup", external: false },
      ];

  const links = [...base, ...authed];

  return (
    <nav aria-label="Account navigation">
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "10px" }}>
        {links.map((l) => (
          <li key={l.label}>
            {l.external ? (
              <a
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                id={`wd-${l.label.toLowerCase()}-link`}
              >
                {l.label}
              </a>
            ) : (
              <Link
                href={l.href}
                id={`wd-${l.label.toLowerCase().replace(/\s+/g, "-")}-link`}
                className={pathname.startsWith(l.href.toLowerCase()) ? "active" : undefined}
              >
                {l.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}