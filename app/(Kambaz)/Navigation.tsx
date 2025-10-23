'use client';

/*
  kambaz global navigation sidebar
  stable, data-driven and layout-ready
*/

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AiOutlineDashboard } from 'react-icons/ai';
import { IoCalendarOutline } from 'react-icons/io5';
import { LiaBookSolid, LiaCogSolid } from 'react-icons/lia';
import { FaInbox, FaRegCircleUser } from 'react-icons/fa6';
import type { ComponentType } from 'react';

type NavItem = { key: string; label: string; href: string; icon: ComponentType<{ size?: number }> };

const NAV_ITEMS: NavItem[] = [
  { key: 'dashboard', label: 'Dashboard', href: '/Dashboard', icon: AiOutlineDashboard },
  { key: 'courses', label: 'Courses', href: '/Courses', icon: LiaBookSolid },
  { key: 'calendar', label: 'Calendar', href: '/Calendar', icon: IoCalendarOutline },
  { key: 'inbox', label: 'Inbox', href: '/Inbox', icon: FaInbox },
  { key: 'labs', label: 'Labs', href: '/Labs', icon: LiaCogSolid },
];

export default function Navigation() {
  const pathname = (usePathname() ?? '').toLowerCase();

  return (
    <aside
      id="wd-kambaz-navigation"
      className="d-flex flex-column align-items-center bg-black text-white position-fixed top-0 bottom-0"
      style={{
        width: 140,
        paddingTop: 12,
        paddingBottom: 12,
        justifyContent: 'space-between',
        rowGap: 8,
        boxShadow: 'inset -1px 0 0 #171717',
      }}
    >
      <div className="d-flex flex-column align-items-center w-100">
        <a
          href="https://www.northeastern.edu/"
          target="_blank"
          id="wd-neu-link"
          className="mb-2 text-decoration-none d-flex flex-column align-items-center w-100"
          style={{
            fontFamily: 'Georgia, Times New Roman, serif',
            color: '#e11d2f',
            fontSize: 11,
            lineHeight: 1.15,
          }}
        >
          <img src="/images/NEU.png" width={75} alt="NEU" />
          NEU
        </a>

        {NAV_ITEMS.map(({ key, label, href, icon: Icon }) => {
          const active = pathname.startsWith(href.toLowerCase());
          const classes = `text-center w-100 d-block py-2 px-3 rounded-2 ${
            active ? 'bg-white text-danger' : 'text-white'
          }`;
          return (
            <div key={key} className="text-center w-100 mb-2 d-flex justify-content-center">
              <Link href={href} className={classes} aria-current={active ? 'page' : undefined}>
                <div className="d-flex flex-column align-items-center w-100" style={{ rowGap: 4 }}>
                  <Icon size={22} />
                  <span className="small mt-1">{label}</span>
                </div>
              </Link>
            </div>
          );
        })}
      </div>

      <div className="text-center w-100 mb-2 d-flex justify-content-center">
        <Link
          href="/Account"
          className={`text-center w-100 d-block py-2 px-3 rounded-2 ${
            pathname.startsWith('/account') ? 'bg-white text-danger' : 'text-white'
          }`}
          aria-current={pathname.startsWith('/account') ? 'page' : undefined}
        >
          <div className="d-flex flex-column align-items-center w-100" style={{ rowGap: 4 }}>
            <FaRegCircleUser size={22} />
            <span className="small mt-1">Account</span>
          </div>
        </Link>
      </div>
    </aside>
  );
}