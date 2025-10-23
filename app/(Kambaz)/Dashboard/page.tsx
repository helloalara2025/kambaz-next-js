/*
  dashboard
  renders data-driven courses grid from db
*/
'use client';

import Link from 'next/link';
import * as db from '../Database';
import { Row, Col, Card, Button, Form, InputGroup } from 'react-bootstrap';

// local shape for course json
type Course = { _id: string; title: string; image: string; description?: string };

const colors = ['#007bff', '#28a745', '#ffc107'];

export default function Dashboard() {
  const courses = db.courses as Course[];
  return (
    <div id="wd-dashboard" className="p-4" style={{ maxWidth: '1000px', marginLeft: '2rem', paddingLeft: '2rem' }}>
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h2 id="wd-dashboard-title" className="m-0">Dashboard</h2>
        <InputGroup style={{ maxWidth: 360 }}>
          <Form.Control placeholder="Search courses" aria-label="Search courses" />
          <Button variant="outline-secondary">Search</Button>
        </InputGroup>
      </div>

      <h5 id="wd-dashboard-published" className="text-muted mb-3">
        Published Courses <span className="badge text-bg-secondary ms-1">{courses.length}</span>
      </h5>

      <div id="wd-dashboard-courses">
        <Row xs={1} sm={2} md={3} className="g-4 justify-content-start">
          {courses.map((c: Course, i: number) => (
            <Col key={c._id} className="wd-dashboard-course">
              <Card className="h-100 shadow-sm border-0 text-center" style={{ minHeight: 220, maxWidth: 280, margin: '0 auto 1rem 0', backgroundColor: '#ffffff', overflow: 'hidden', transition: 'transform 0.2s ease, box-shadow 0.2s ease' }}>
                <div
                  style={{
                    height: '100px',
                    backgroundColor: colors[i % colors.length],
                    borderTopLeftRadius: '6px',
                    borderTopRightRadius: '6px',
                  }}
                />
                <Card.Body className="d-flex flex-column justify-content-between">
                  <div>
                    <Card.Title className="text-truncate" title={c.title}>{c.title}</Card.Title>
                    <p className="text-muted small mb-2">{c.description ?? ''}</p>
                  </div>
                  <Link href={`/Courses/${c._id}/Home`} className="btn btn-primary btn-sm mt-auto">
                    Go
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        <style jsx>{`
          .wd-dashboard-course:hover {
            transform: translateY(-5px);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
          }
        `}</style>
      </div>
    </div>
  );
}
