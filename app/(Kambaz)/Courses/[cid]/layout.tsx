'use client';

/*
  course layout
  reads cid from params or url
  shows course name and simple sidebar
*/


import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import { courses } from "../../Database";
type Course = (typeof courses)[number];
import { FaAlignJustify } from "react-icons/fa6";


export default function CourseLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { cid: string };
}) {
  const pathname = usePathname() || '';
  const cid = params?.cid ?? (pathname.match(/^\/Courses\/([^/]+)/i)?.[1] ?? '');

  const course = courses.find((course: Course) => course._id === cid);

  const items: { href: string; label: string }[] = [
    { href: `/Courses/${cid}/Home`, label: 'Home' },
    { href: `/Courses/${cid}/Modules`, label: 'Modules' },
    { href: `/Courses/${cid}/Piazza`, label: 'Piazza' },
    { href: `/Courses/${cid}/Zoom`, label: 'Zoom' },
    { href: `/Courses/${cid}/Assignments`, label: 'Assignments' },
    { href: `/Courses/${cid}/Quizzes`, label: 'Quizzes' },
    { href: `/Courses/${cid}/Grades`, label: 'Grades' },
    { href: `/Courses/${cid}/People/Table`, label: 'People' },
  ];

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <div className="container-fluid">
      <div className="row">
        <aside className="col-md-2 d-none d-md-block" aria-label="Course Navigation">
          <nav>
            <ul className="list-unstyled m-0">
              {items.map(({ href, label }) => {
                const active = isActive(href);
                const linkCls = active
                  ? 'd-block px-2 py-1 rounded-1 fw-semibold bg-light border-start border-3 border-danger text-danger text-decoration-none'
                  : 'd-block px-2 py-1 rounded-1 text-body-secondary text-decoration-none';

                return (
                  <li key={href} className="mb-1">
                    <Link
                      href={href}
                      className={linkCls}
                      aria-current={active ? 'page' : undefined}
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>

        <main className="col-md-10 pt-2">
          <div id="wd-courses">
            <h2 className="text-danger">
              <FaAlignJustify className="me-4 fs-4 mb-1" />
              {course?.name}
            </h2>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}