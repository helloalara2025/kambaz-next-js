/**
 * course home
 * overview with sidebar + breadcrumb + accordion
 * client component for expand/collapse controls
 */
'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Row, Col, Accordion, ListGroup, Button } from 'react-bootstrap';
import axios from 'axios';
import { BASE_API } from '../../client';

import CourseStatus from './Status';

/** Local shapes to avoid `any` */
type ModuleLite = { _id: string; name: string; course: string };
type AssignmentLite = { _id: string; title: string; course: string };

/** Map course ids to display titles */
const COURSE_TITLES: Record<string, string> = {
  RS101: 'Rocket Propulsion',
  RS102: 'Aerodynamics',
  RS103: 'Spacecraft Design',
};

export default function CourseHome() {
  const params = useParams();
  const courseId = String((params as Record<string, string | string[]>).cid);
  const courseTitle = COURSE_TITLES[courseId] || courseId;
  const crumbs = [
    { href: '/Dashboard', label: 'Dashboard' },
    { href: '/Courses', label: 'Courses' },
    { href: `/Courses/${courseId}`, label: 'Course Homepage' },
    { href: '#', label: 'Home', current: true },
  ];

  const [courseModules, setCourseModules] = useState<ModuleLite[]>([]);
  const [courseAssignments, setCourseAssignments] = useState<AssignmentLite[]>([]);

  // load modules and assignments for this course from the api
  useEffect(() => {
    if (!courseId) return;

    const load = async () => {
      try {
        const [modulesRes, assignmentsRes] = await Promise.all([
          axios.get<ModuleLite[]>(`${BASE_API}/courses/${courseId}/modules`),
          axios.get<AssignmentLite[]>(`${BASE_API}/courses/${courseId}/assignments`),
        ]);
        setCourseModules(modulesRes.data ?? []);
        setCourseAssignments(assignmentsRes.data ?? []);
      } catch (e) {
        console.error('failed to load course home data', e);
      }
    };

    void load();
  }, [courseId]);

  /** Collapse all open accordion sections */
  const collapseAll = () => {
    const container = document.getElementById('wd-home-modules-preview');
    if (!container) return;
    container
      .querySelectorAll('.accordion-item .accordion-button:not(.collapsed)')
      .forEach(btn => (btn as HTMLButtonElement).click());
  };

  /** Expand all collapsed accordion sections */
  const expandAll = () => {
    const container = document.getElementById('wd-home-modules-preview');
    if (!container) return;
    container
      .querySelectorAll('.accordion-item .accordion-button.collapsed')
      .forEach(btn => (btn as HTMLButtonElement).click());
  };

  return (
    <div id="wd-course-home" className="container-xxl px-3 pt-3">
      <div className="d-flex align-items-center justify-content-between mb-3 flex-wrap gap-2">
        <div>
          <h5 className="fw-semibold mb-0">{courseTitle}</h5>
          <div className="text-muted small">{courseId}</div>
        </div>
        <div className="d-flex align-items-center gap-2">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb small mb-0">
              {crumbs.map((c, i) => (
                <li
                  key={i}
                  className={`breadcrumb-item ${c.current ? 'active' : ''}`}
                  aria-current={c.current ? 'page' : undefined}
                >
                  {c.current ? (
                    c.label
                  ) : (
                    <Link href={c.href} className="text-muted">
                      {c.label}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
          <Button size="sm" variant="outline-secondary" onClick={expandAll}>Expand All</Button>
          <Button size="sm" variant="outline-secondary" onClick={collapseAll}>Collapse All</Button>
        </div>
      </div>

      <Row className="g-3">

        {/* Main content */}
        <Col lg={9} md={9} sm={12}>
          {/* Modules overview */}
          <div className="card mb-3">
            <div className="card-header d-flex justify-content-between align-items-center py-2">
              <span className="fw-semibold">Modules</span>
              <Link href={`/Courses/${courseId}/Modules`} className="small">View all</Link>
            </div>
            <ul className="list-group list-group-flush small">
              {courseModules.map((m: ModuleLite) => (
                <li key={m._id} className="list-group-item">{m.name}</li>
              ))}
              {courseModules.length === 0 && (
                <li className="list-group-item text-muted">No modules yet</li>
              )}
            </ul>
          </div>

          {/* Assignments overview */}
          <div className="card mb-3">
            <div className="card-header d-flex justify-content-between align-items-center py-2">
              <span className="fw-semibold">Assignments</span>
              <Link href={`/Courses/${courseId}/Assignments`} className="small">View all</Link>
            </div>
            <ul className="list-group list-group-flush small">
              {courseAssignments.map((a: AssignmentLite) => (
                <li key={a._id} className="list-group-item">{a.title}</li>
              ))}
              {courseAssignments.length === 0 && (
                <li className="list-group-item text-muted">No assignments yet</li>
              )}
            </ul>
          </div>

          {/* Modules preview accordion */}
          <Accordion alwaysOpen id="wd-home-modules-preview" className="mb-4">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Lecture 1 - building interfaces + assignment 1</Accordion.Header>
              <Accordion.Body className="p-2 bg-white text-dark">
                <ListGroup variant="flush" className="border rounded bg-white small">
                  <ListGroup.Item className="bg-white text-dark">overview</ListGroup.Item>
                  <ListGroup.Item className="bg-white text-dark">setting up html + react</ListGroup.Item>
                  <ListGroup.Item className="bg-white text-dark">environment setup</ListGroup.Item>
                  <ListGroup.Item className="bg-white text-dark">creating first react app</ListGroup.Item>
                  <ListGroup.Item className="bg-white text-dark">assignment 1 intro</ListGroup.Item>
                </ListGroup>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="1">
              <Accordion.Header>Lecture 2 - prototyping ui + layout logic</Accordion.Header>
              <Accordion.Body className="p-2 bg-white text-dark">
                <ListGroup variant="flush" className="border rounded bg-white small">
                  <ListGroup.Item className="bg-white text-dark">wireframes</ListGroup.Item>
                  <ListGroup.Item className="bg-white text-dark">low fidelity concepts</ListGroup.Item>
                  <ListGroup.Item className="bg-white text-dark">html structure</ListGroup.Item>
                  <ListGroup.Item className="bg-white text-dark">creating a prototype</ListGroup.Item>
                  <ListGroup.Item className="bg-white text-dark">assignment 2 notes</ListGroup.Item>
                </ListGroup>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="2">
              <Accordion.Header>Lecture 3 - visual design + css + bootstrap</Accordion.Header>
              <Accordion.Body className="p-2 bg-white text-dark">
                <ListGroup variant="flush" className="border rounded bg-white small">
                  <ListGroup.Item className="bg-white text-dark">css basics</ListGroup.Item>
                  <ListGroup.Item className="bg-white text-dark">bootstrap grid</ListGroup.Item>
                  <ListGroup.Item className="bg-white text-dark">responsive layout</ListGroup.Item>
                  <ListGroup.Item className="bg-white text-dark">assignment 3 prep</ListGroup.Item>
                </ListGroup>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="3">
              <Accordion.Header>Lecture 4 - components + reusable design</Accordion.Header>
              <Accordion.Body className="p-2 bg-white text-dark">
                <ListGroup variant="flush" className="border rounded bg-white small">
                  <ListGroup.Item className="bg-white text-dark">modular components</ListGroup.Item>
                  <ListGroup.Item className="bg-white text-dark">state + props basics</ListGroup.Item>
                  <ListGroup.Item className="bg-white text-dark">component patterns</ListGroup.Item>
                  <ListGroup.Item className="bg-white text-dark">assignment 4 walkthrough</ListGroup.Item>
                </ListGroup>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>

        {/* Status panel */}
        <Col lg={3} md={3} sm={12}>
          <CourseStatus />
        </Col>
      </Row>
    </div>
  );
}