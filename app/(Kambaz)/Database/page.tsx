

/*
  database index
  quick data sanity + deep links
*/

import * as db from './index';
import Link from 'next/link';

 type Course = { _id: string; name: string };
 type Module = { _id?: string; course: string };
 type Assignment = { _id: string; course: string };

export default function DatabaseIndex() {
  const courses = (db.courses as Course[]) ?? [];
  const modules = (db.modules as Module[]) ?? [];
  const assignments = (db.assignments as Assignment[]) ?? [];

  return (
    <div className="p-3 container-xxl" style={{ maxWidth: 1100 }}>
      <h4 className="fw-semibold mb-3">Database</h4>

      <div className="row g-3 mb-4">
        <div className="col-auto">
          <span className="badge text-bg-primary">courses {courses.length}</span>
        </div>
        <div className="col-auto">
          <span className="badge text-bg-secondary">modules {modules.length}</span>
        </div>
        <div className="col-auto">
          <span className="badge text-bg-success">assignments {assignments.length}</span>
        </div>
      </div>

      <ul className="list-group">
        {courses.map((c) => (
          <li key={c._id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <div className="fw-semibold">{c.name}</div>
              <div className="text-muted small">{c._id}</div>
            </div>
            <div className="d-flex gap-2">
              <Link className="btn btn-outline-secondary btn-sm" href={`/Courses/${c._id}/Home`}>Home</Link>
              <Link className="btn btn-outline-secondary btn-sm" href={`/Courses/${c._id}/Modules`}>Modules</Link>
              <Link className="btn btn-outline-secondary btn-sm" href={`/Courses/${c._id}/Assignments`}>Assignments</Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}