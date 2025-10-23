'use client';

/*
  assignment editor
  loads single assignment dynamically from db.assignments
*/

import { Form, Row, Col, Button, Breadcrumb, Card } from 'react-bootstrap';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import * as db from '../../../../Database';

type Assignment = { _id: string; title: string; course: string };

export default function AssignmentEditor() {
  const { cid, aid } = useParams<{ cid: string; aid: string }>();
  const assignment = (db.assignments as Assignment[]).find((a) => a._id === aid && a.course === cid);

  return (
    <div id="wd-assignment-editor" className="p-3 container-xxl" style={{ maxWidth: '1100px' }}>
      <h4 className="fw-semibold mb-1">Assignment Editor</h4>
      <Breadcrumb className="mb-3 small text-muted">
        <Breadcrumb.Item linkAs={Link} href="/Dashboard">Dashboard</Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} href="/Courses">Courses</Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} href={`/Courses/${cid}/Home`}>Course Homepage</Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} href={`/Courses/${cid}/Assignments`}>Assignments</Breadcrumb.Item>
        <Breadcrumb.Item active>{assignment?.title || aid}</Breadcrumb.Item>
      </Breadcrumb>

      <Card className="shadow-sm border-0 p-4">
        <Form>
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Assignment Name</Form.Label>
            <Form.Control id="wd-assignment-name" defaultValue={assignment?.title || `Assignment ${aid}`} />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label className="fw-semibold">Description</Form.Label>
            <Form.Control as="textarea" rows={6} placeholder="Enter assignment details here." />
          </Form.Group>

          <Row className="g-4">
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Points</Form.Label>
                <Form.Control id="wd-points" type="number" defaultValue={100} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Assignment Group</Form.Label>
                <Form.Select id="wd-assignment-group" defaultValue="ASSIGNMENTS">
                  <option>ASSIGNMENTS</option>
                  <option>QUIZZES</option>
                  <option>EXAMS</option>
                  <option>PROJECTS</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Display Grade as</Form.Label>
                <Form.Select id="wd-display-grade" defaultValue="Points">
                  <option>Points</option>
                  <option>Percentage</option>
                  <option>Letter Grade</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Submission Type</Form.Label>
                <Form.Select id="wd-submission-type" defaultValue="Online">
                  <option>Online</option>
                  <option>On Paper</option>
                  <option>No Submission</option>
                </Form.Select>
                <div className="mt-2">
                  <div className="fw-semibold small mb-1">Online Entry Options</div>
                  {['Text Entry', 'Website URL', 'Media Recordings', 'File Uploads'].map((label) => (
                    <Form.Check key={label} type="checkbox" label={label} />
                  ))}
                </div>
              </Form.Group>
            </Col>

            <Col md={6}>
              <div className="border rounded p-3">
                <div className="fw-semibold mb-2">Assign</div>

                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Due</Form.Label>
                  <Form.Control id="wd-due" type="date" />
                </Form.Group>

                <Row className="g-3">
                  <Col>
                    <Form.Group>
                      <Form.Label className="fw-semibold">Available from</Form.Label>
                      <Form.Control id="wd-available-from" type="date" />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label className="fw-semibold">Until</Form.Label>
                      <Form.Control id="wd-until" type="date" />
                    </Form.Group>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>

          <hr className="my-4" />
          <div className="d-flex justify-content-end">
            <Button variant="outline-secondary" className="me-2">Cancel</Button>
            <Button variant="danger">Save</Button>
          </div>
        </Form>
      </Card>
    </div>
  );
}