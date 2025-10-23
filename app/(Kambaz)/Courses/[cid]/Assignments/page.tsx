'use client';

/*
  assignments list
  dynamic from db.assignments filtered by course id
*/

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Breadcrumb, Button, InputGroup, Form, ListGroup, Card } from 'react-bootstrap';
import { FaSearch, FaPlus, FaCheckCircle } from 'react-icons/fa';
import { IoEllipsisVertical } from 'react-icons/io5';
import * as db from '../../../Database';

type Assignment = { _id: string; title: string; course: string };

export default function AssignmentsPage() {
  const { cid } = useParams<{ cid: string }>();
  const assignments = (db.assignments as Assignment[]).filter((a) => a.course === cid);

  return (
    <div id="wd-assignments" className="p-3 container-xxl" style={{ maxWidth: '1100px' }}>
      <h4 className="fw-semibold mb-1">Assignments</h4>
      <Breadcrumb className="mb-3 small text-muted">
        <Breadcrumb.Item linkAs={Link} href="/Dashboard">Dashboard</Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} href="/Courses">Courses</Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} href={`/Courses/${cid}/Home`}>Course Homepage</Breadcrumb.Item>
        <Breadcrumb.Item active>Assignments</Breadcrumb.Item>
      </Breadcrumb>

      <div className="d-flex align-items-center justify-content-between mb-3">
        <div className="flex-grow-1 me-3" style={{ maxWidth: 420 }}>
          <InputGroup>
            <InputGroup.Text><FaSearch /></InputGroup.Text>
            <Form.Control placeholder="Search assignments..." aria-label="Search assignments" />
          </InputGroup>
        </div>
        <div className="text-nowrap">
          <Button variant="secondary" className="me-2"><FaPlus className="me-2" /> Group</Button>
          <Button variant="danger"><FaPlus className="me-2" /> Assignment</Button>
        </div>
      </div>

      <Card className="shadow-sm border-0">
        <div className="d-flex align-items-center justify-content-between px-3 py-2 border-bottom bg-light">
          <h6 className="m-0 text-uppercase small fw-semibold">Assignments</h6>
          <span className="badge text-bg-secondary">{assignments.length}</span>
        </div>
        <ListGroup variant="flush">
          {assignments.map((a) => (
            <ListGroup.Item key={a._id} className="py-3" style={{ borderLeft: '3px solid var(--bs-success)' }}>
              <div className="d-flex justify-content-between align-items-start">
                <div className="pe-3">
                  <Link href={`/Courses/${cid}/Assignments/${a._id}`} className="text-decoration-none">
                    <div className="fw-semibold">{a.title}</div>
                  </Link>
                  <div className="text-secondary small">Course {cid}</div>
                </div>
                <div className="text-nowrap">
                  <FaCheckCircle className="text-success me-3" />
                  <IoEllipsisVertical className="fs-4 text-secondary" />
                </div>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card>
    </div>
  );
}