'use client';

/*
  course home page
  real data-driven version
*/

import { useParams } from 'next/navigation';
import Link from 'next/link';
import * as db from '../../Database';

type Course = {
  _id: string;
  name: string;
  description?: string;
};

export default function CourseHome() {
  const { cid } = useParams<{ cid: string }>();
  const course = (db.courses as Course[]).find((c) => c._id === cid);

  if (!course) {
    return (
      <div className="p-4">
        <h2 className="text-danger">Course not found</h2>
        <p className="text-muted">Invalid or missing course ID: {cid}</p>
      </div>
    );
  }

  return (
    <div id="wd-course-home" className="p-4">
      <h2 className="text-primary">{course.name}</h2>
      <p className="text-muted small mb-4">{course.description}</p>

      <div className="d-flex gap-2">
        <Link href={`/Courses/${cid}/Modules`} className="btn btn-outline-secondary btn-sm">Modules</Link>
        <Link href={`/Courses/${cid}/Assignments`} className="btn btn-outline-secondary btn-sm">Assignments</Link>
        <Link href={`/Courses/${cid}/People/Table`} className="btn btn-outline-secondary btn-sm">People</Link>
      </div>
    </div>
  );
}