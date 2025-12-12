/**
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ║                      COURSE HOME PAGE                                     ║
 * ║                    Course Overview                                        ║
 * ║                         Created by Alara                                  ║
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 * 
 * The landing page when entering a course.
 * Shows course status and recent activity.
 * 
 * @author Alara
 * @route /Kambaz/Courses/[cid]/Home
 */

"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, Row, Col, Alert } from "react-bootstrap";
import * as client from "../../client";

export default function CourseHome() {
  const params = useParams();
  const courseId = params.cid as string;
  
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const data = await client.findCourseById(courseId);
        setCourse(data);
      } catch (err) {
        console.error("Error fetching course:", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCourse();
  }, [courseId]);

  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  return (
    <div id="wd-course-home">
      <h2>Course Home</h2>
      <hr />

      {course && (
        <Alert variant="info">
          <strong>{course.name}</strong>
          {course.number && ` (${course.number})`}
        </Alert>
      )}

      <Row>
        <Col md={8}>
          {/* Course Status */}
          <Card className="mb-4">
            <Card.Header>
              <h5 className="mb-0">Course Status</h5>
            </Card.Header>
            <Card.Body>
              <div className="d-flex gap-2 mb-3">
                <button className="btn btn-secondary btn-sm">Unpublish All</button>
                <button className="btn btn-success btn-sm">Publish All</button>
              </div>
              <hr />
              <h6>To Do</h6>
              <p className="text-muted">Nothing for now!</p>
            </Card.Body>
          </Card>

          {/* Course Description */}
          {course?.description && (
            <Card className="mb-4">
              <Card.Header>
                <h5 className="mb-0">Description</h5>
              </Card.Header>
              <Card.Body>
                <p>{course.description}</p>
              </Card.Body>
            </Card>
          )}
        </Col>

        <Col md={4}>
          {/* Coming Up */}
          <Card className="mb-4">
            <Card.Header>
              <h5 className="mb-0">Coming Up</h5>
            </Card.Header>
            <Card.Body>
              <p className="text-muted">No upcoming events</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
