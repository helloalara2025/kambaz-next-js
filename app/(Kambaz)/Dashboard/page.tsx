/**
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ║                      DASHBOARD PAGE                                       ║
 * ║                    Course Overview & Management                           ║
 * ║                         Created by Alara                                  ║
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 * 
 * The main dashboard showing enrolled courses as cards.
 * Faculty users can create, edit, and delete courses.
 * Students can view and enroll/unenroll from courses.
 * 
 * @author Alara
 * @route /Kambaz/Dashboard
 */

"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import { 
  Container, Row, Col, Card, Button, Form, 
  Modal, Alert 
} from "react-bootstrap";
import { RootState } from "../store";
import * as client from "../Courses/client";

export default function Dashboard() {
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  
  const [courses, setCourses] = useState<any[]>([]);
  const [allCourses, setAllCourses] = useState<any[]>([]);
  const [showAllCourses, setShowAllCourses] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // New/Edit course modal
  const [showModal, setShowModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState<any>(null);
  const [courseForm, setCourseForm] = useState({
    name: "",
    number: "",
    description: "",
  });

  /**
   * Fetch courses on component mount
   */
  useEffect(() => {
    fetchCourses();
  }, [currentUser]);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      
      // Get enrolled courses for current user
      if (currentUser) {
        const enrolledCourses = await client.findCoursesForUser("current");
        setCourses(enrolledCourses);
      }
      
      // Get all courses (for enrollment toggle)
      const all = await client.findAllCourses();
      setAllCourses(all);
    } catch (err: any) {
      setError("Error loading courses");
    } finally {
      setLoading(false);
    }
  };

  /**
   * Create new course
   */
  const handleCreateCourse = async () => {
    try {
      const newCourse = await client.createCourse(courseForm);
      setCourses([...courses, newCourse]);
      setAllCourses([...allCourses, newCourse]);
      setShowModal(false);
      resetForm();
    } catch (err: any) {
      setError("Error creating course");
    }
  };

  /**
   * Update existing course
   */
  const handleUpdateCourse = async () => {
    try {
      await client.updateCourse({ ...editingCourse, ...courseForm });
      setCourses(courses.map((c) => 
        c._id === editingCourse._id ? { ...c, ...courseForm } : c
      ));
      setShowModal(false);
      resetForm();
    } catch (err: any) {
      setError("Error updating course");
    }
  };

  /**
   * Delete course
   */
  const handleDeleteCourse = async (courseId: string) => {
    if (!confirm("Are you sure you want to delete this course?")) return;
    
    try {
      await client.deleteCourse(courseId);
      setCourses(courses.filter((c) => c._id !== courseId));
      setAllCourses(allCourses.filter((c) => c._id !== courseId));
    } catch (err: any) {
      setError("Error deleting course");
    }
  };

  /**
   * Enroll in course
   */
  const handleEnroll = async (courseId: string) => {
    try {
      await client.enrollInCourse(courseId);
      const course = allCourses.find((c) => c._id === courseId);
      if (course) {
        setCourses([...courses, course]);
      }
    } catch (err: any) {
      setError("Error enrolling in course");
    }
  };

  /**
   * Unenroll from course
   */
  const handleUnenroll = async (courseId: string) => {
    try {
      await client.unenrollFromCourse(courseId);
      setCourses(courses.filter((c) => c._id !== courseId));
    } catch (err: any) {
      setError("Error unenrolling from course");
    }
  };

  const resetForm = () => {
    setCourseForm({ name: "", number: "", description: "" });
    setEditingCourse(null);
  };

  const openEditModal = (course: any) => {
    setEditingCourse(course);
    setCourseForm({
      name: course.name,
      number: course.number || "",
      description: course.description || "",
    });
    setShowModal(true);
  };

  const isFaculty = currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";

  if (loading) {
    return (
      <Container className="py-4 text-center">
        <div className="spinner-border text-danger" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </Container>
    );
  }

  return (
    <Container fluid className="py-4 px-4">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />

      {error && (
        <Alert variant="danger" onClose={() => setError("")} dismissible>
          {error}
        </Alert>
      )}

      {/* Action Buttons */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 id="wd-dashboard-published">
          Published Courses ({courses.length})
        </h2>
        <div>
          <Button
            variant="outline-primary"
            className="me-2"
            onClick={() => setShowAllCourses(!showAllCourses)}
          >
            {showAllCourses ? "Show Enrolled" : "Show All Courses"}
          </Button>
          {isFaculty && (
            <Button
              id="wd-add-course-btn"
              variant="danger"
              onClick={() => {
                resetForm();
                setShowModal(true);
              }}
            >
              + Add Course
            </Button>
          )}
        </div>
      </div>
      <hr />

      {/* Course Cards Grid */}
      <div id="wd-dashboard-courses">
        <Row xs={1} md={2} lg={3} xl={4} className="g-4">
          {(showAllCourses ? allCourses : courses).map((course) => (
            <Col key={course._id} className="wd-dashboard-course">
              <Card>
                <Link 
                  href={`/Kambaz/Courses/${course._id}/Home`}
                  className="text-decoration-none"
                >
                  <Card.Img
                    variant="top"
                    src={course.image || "/images/course-placeholder.svg"}
                    height={160}
                    style={{ objectFit: "cover", backgroundColor: "#61DAFB" }}
                  />
                </Link>
                <Card.Body>
                  <Link 
                    href={`/Kambaz/Courses/${course._id}/Home`}
                    className="text-decoration-none text-dark"
                  >
                    <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                      {course.name}
                    </Card.Title>
                  </Link>
                  <Card.Text 
                    className="wd-dashboard-course-description overflow-hidden"
                    style={{ height: "60px" }}
                  >
                    {course.description}
                  </Card.Text>
                  
                  <div className="d-flex justify-content-between">
                    <Link 
                      href={`/Kambaz/Courses/${course._id}/Home`}
                      className="btn btn-primary btn-sm"
                    >
                      Go
                    </Link>
                    
                    {isFaculty ? (
                      <div>
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          className="me-1"
                          onClick={() => openEditModal(course)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => handleDeleteCourse(course._id)}
                        >
                          Delete
                        </Button>
                      </div>
                    ) : (
                      <Button
                        variant={courses.some((c) => c._id === course._id) 
                          ? "outline-danger" 
                          : "outline-success"}
                        size="sm"
                        onClick={() => 
                          courses.some((c) => c._id === course._id)
                            ? handleUnenroll(course._id)
                            : handleEnroll(course._id)
                        }
                      >
                        {courses.some((c) => c._id === course._id) 
                          ? "Unenroll" 
                          : "Enroll"}
                      </Button>
                    )}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {courses.length === 0 && !showAllCourses && (
          <div className="text-center py-5">
            <p className="text-muted">No enrolled courses yet.</p>
            <Button 
              variant="primary"
              onClick={() => setShowAllCourses(true)}
            >
              Browse All Courses
            </Button>
          </div>
        )}
      </div>

      {/* Add/Edit Course Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingCourse ? "Edit Course" : "Add New Course"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Course Name *</Form.Label>
            <Form.Control
              type="text"
              value={courseForm.name}
              onChange={(e) => setCourseForm({ ...courseForm, name: e.target.value })}
              placeholder="e.g., Web Development"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Course Number</Form.Label>
            <Form.Control
              type="text"
              value={courseForm.number}
              onChange={(e) => setCourseForm({ ...courseForm, number: e.target.value })}
              placeholder="e.g., CS5610"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={courseForm.description}
              onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button 
            variant="danger"
            onClick={editingCourse ? handleUpdateCourse : handleCreateCourse}
          >
            {editingCourse ? "Update" : "Create"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
