/**
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ║                      ASSIGNMENTS PAGE                                     ║
 * ║                    Course Assignments List                                ║
 * ║                         Created by Alara                                  ║
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 * 
 * @author Alara
 * @route /Kambaz/Courses/[cid]/Assignments
 */

"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { Card, Button, ListGroup, Modal, Form, Alert } from "react-bootstrap";
import { FaPlus, FaEdit, FaTrash, FaFileAlt } from "react-icons/fa";
import { RootState } from "../../../store";
import { setAssignments, addAssignment, deleteAssignment } from "./reducer";
import * as client from "./client";

export default function Assignments() {
  const params = useParams();
  const courseId = params.cid as string;
  const dispatch = useDispatch();
  
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const { assignments } = useSelector((state: RootState) => state.assignmentsReducer);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [assignmentForm, setAssignmentForm] = useState({
    title: "",
    description: "",
    points: 100,
    dueDate: "",
  });

  const isFaculty = currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const data = await client.findAssignmentsForCourse(courseId);
        dispatch(setAssignments(data));
      } catch (err) {
        setError("Error loading assignments");
      } finally {
        setLoading(false);
      }
    };
    
    fetchAssignments();
  }, [courseId, dispatch]);

  const handleCreateAssignment = async () => {
    try {
      const newAssignment = await client.createAssignment(courseId, assignmentForm);
      dispatch(addAssignment(newAssignment));
      setShowModal(false);
      setAssignmentForm({ title: "", description: "", points: 100, dueDate: "" });
    } catch (err) {
      setError("Error creating assignment");
    }
  };

  const handleDeleteAssignment = async (assignmentId: string) => {
    if (!confirm("Delete this assignment?")) return;
    
    try {
      await client.deleteAssignment(assignmentId);
      dispatch(deleteAssignment(assignmentId));
    } catch (err) {
      setError("Error deleting assignment");
    }
  };

  if (loading) {
    return <div className="text-center py-4">Loading assignments...</div>;
  }

  return (
    <div id="wd-assignments">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Assignments</h2>
        {isFaculty && (
          <Button variant="danger" onClick={() => setShowModal(true)}>
            <FaPlus className="me-1" /> Add Assignment
          </Button>
        )}
      </div>
      <hr />

      {error && (
        <Alert variant="danger" onClose={() => setError("")} dismissible>
          {error}
        </Alert>
      )}

      {assignments.length === 0 ? (
        <p className="text-muted">No assignments yet.</p>
      ) : (
        <Card>
          <Card.Header className="bg-secondary text-white">
            <strong>ASSIGNMENTS</strong>
          </Card.Header>
          <ListGroup variant="flush">
            {assignments.map((assignment: any) => (
              <ListGroup.Item 
                key={assignment._id}
                className="d-flex justify-content-between align-items-center wd-assignment-list-item"
              >
                <div className="d-flex align-items-center">
                  <FaFileAlt className="text-success me-3" size={24} />
                  <div>
                    <Link 
                      href={`/Kambaz/Courses/${courseId}/Assignments/${assignment._id}`}
                      className="text-decoration-none"
                    >
                      <strong>{assignment.title}</strong>
                    </Link>
                    <div className="text-muted small">
                      {assignment.dueDate && `Due: ${assignment.dueDate}`}
                      {assignment.points && ` | ${assignment.points} pts`}
                    </div>
                  </div>
                </div>
                
                {isFaculty && (
                  <div>
                    <Link 
                      href={`/Kambaz/Courses/${courseId}/Assignments/${assignment._id}`}
                      className="btn btn-outline-secondary btn-sm me-1"
                    >
                      <FaEdit />
                    </Link>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDeleteAssignment(assignment._id)}
                    >
                      <FaTrash />
                    </Button>
                  </div>
                )}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card>
      )}

      {/* Add Assignment Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Assignment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Title *</Form.Label>
            <Form.Control
              type="text"
              value={assignmentForm.title}
              onChange={(e) => setAssignmentForm({ ...assignmentForm, title: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={assignmentForm.description}
              onChange={(e) => setAssignmentForm({ ...assignmentForm, description: e.target.value })}
            />
          </Form.Group>
          <div className="row">
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label>Points</Form.Label>
                <Form.Control
                  type="number"
                  value={assignmentForm.points}
                  onChange={(e) => setAssignmentForm({ ...assignmentForm, points: parseInt(e.target.value) })}
                />
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label>Due Date</Form.Label>
                <Form.Control
                  type="date"
                  value={assignmentForm.dueDate}
                  onChange={(e) => setAssignmentForm({ ...assignmentForm, dueDate: e.target.value })}
                />
              </Form.Group>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button 
            variant="danger"
            onClick={handleCreateAssignment}
            disabled={!assignmentForm.title.trim()}
          >
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
