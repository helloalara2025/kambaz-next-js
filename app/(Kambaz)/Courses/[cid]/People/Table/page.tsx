'use client';

/*
  people table
  data-driven roster view from db
*/

'use client';

import { useParams } from 'next/navigation';
import * as db from '../../../../../../kambaz-node-server-app/Kambaz/Database';
import { Table, Breadcrumb, Card } from 'react-bootstrap';
import Link from 'next/link';

// types
type Enrollment = { course: string; user: string; type: string };
export type Person = {
  _id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  dob?: string;
  role: string; // FACULTY | STUDENT | TA | ADMIN
  loginId?: string;
  section?: string;
  lastActivity?: string;
  totalActivity?: string;
};

export default function PeopleTable() {
  const { cid } = useParams<{ cid: string }>();

  const users = (db as { users?: Person[] }).users ?? [];
  const enrollments = (db as { enrollments?: Enrollment[] }).enrollments ?? [];

  // if enrollments exist for this course, show those.
  // else, show all users as a safe fallback.
  const rows: Person[] = enrollments.length
    ? enrollments
        .filter((e) => e.course === cid)
        .map((e) => users.find((u) => u._id === e.user))
        .filter((u): u is Person => Boolean(u))
    : users;

  // sort by lastName then firstName
  rows.sort((a, b) =>
    `${a.lastName}${a.firstName}`.localeCompare(`${b.lastName}${b.firstName}`)
  );

  return (
    <div id="wd-people" className="p-3 container-xxl" style={{ maxWidth: '1100px' }}>
      <h4 className="fw-semibold mb-1">People</h4>
      <Breadcrumb className="mb-3 small">
        <Breadcrumb.Item linkAs={Link} href="/Dashboard">Dashboard</Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} href="/Courses">Courses</Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} href={`/Courses/${cid}/Home`}>Course Homepage</Breadcrumb.Item>
        <Breadcrumb.Item active>People</Breadcrumb.Item>
      </Breadcrumb>

      <Card className="shadow-sm border-0">
        <div className="table-responsive">
          <Table hover className="mb-0 align-middle">
            <thead className="table-light">
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Email</th>
                <th>Login ID</th>
                <th>Section</th>
                <th>Last Activity</th>
                <th>Total Activity</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((u) => (
                <tr key={u._id}>
                  <td className="text-nowrap">{u.firstName} {u.lastName}</td>
                  <td className="text-nowrap">{u.role}</td>
                  <td className="text-nowrap">{u.email}</td>
                  <td className="text-nowrap">{u.loginId ?? '—'}</td>
                  <td className="text-nowrap">{u.section ?? '—'}</td>
                  <td className="text-nowrap">{u.lastActivity ?? '—'}</td>
                  <td className="text-nowrap">{u.totalActivity ?? '—'}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Card>
    </div>
  );
}