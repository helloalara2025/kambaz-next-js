'use client';

/*
  breadcrumb
  CourseName > section
*/
import { usePathname } from 'next/navigation';

export default function Breadcrumb({ course }: { course?: { name: string } }) {
  const pathname = usePathname();
  const section = pathname?.split('/').pop();
  return <div className="text-muted small">{course?.name} &gt; {section}</div>;
}
