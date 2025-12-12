/**
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ║                      ASSIGNMENT EDITOR                                    ║
 * ║                    Edit/View Assignment Details                           ║
 * ║                         Created by Alara                                  ║
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 * 
 * @author Alara
 * @route /Kambaz/Courses/[cid]/Assignments/[aid]
 */

"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { RootState } from "../../../../store";
import * as client from "../client";

export default function AssignmentEditor() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.cid as string;
  const assignmentId = params.aid as string;
  
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  
  const [assignment, setAssignment] = useState<any>({
    title: "",
    description: "",
    points: 100,
    dueDate: "",
    availableFrom: "",
    availableUntil: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const isFaculty = currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";

  useEffect(() => {
    const fetchAssignment = async () => {
      try {
        const data = await client.findAssignmentById(assignmentId);
        setAssignment(data);
      } catch (err) {
        setError("Error loading assignment");
      } finally {
        setLoading(false);
      }
    };
    
    if (assignmentId !== "new") {
      fetchAssignment();
    } else {
      setLoading(false);
    }
  }, [assignmentId]);

  const handleSave = async () => {
    setSaving(true);
    setError("");
    setSuccess("");
    
    try {
      await client.updateAssignment(assignment);
      setSuccess("Assignment saved successfully!");
    } catch (err) {
      setError("Error saving assignment");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    router.push(`/Kambaz/Courses/${courseId}/Assignments`);
  };

  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  return (
    <div id="wd-assignments-editor">
      <h2>Assignment Editor</h2>
      <hr />

      {error && (
        <Alert variant="danger" onClose={() => setError("")} dismissible>
          {error}
        </Alert>
      )}
      
      {success && (
        <Alert variant="success" onClose={() => setSuccess("")} dismissible>
          {success}
        </Alert>
      )}

      <Card>
        <Card.Body>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="wd-name">Assignment Name</Form.Label>
            <Form.Control
              id="wd-name"
              type="text"
              value={assignment.title || ""}
              onChange={(e) => setAssignment({ ...assignment, title: e.target.value })}
              disabled={!isFaculty}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label htmlFor="wd-description">Description</Form.Label>
            <Form.Control
              id="wd-description"
              as="textarea"
              rows={5}
              value={assignment.description || ""}
              onChange={(e) => setAssignment({ ...assignment, description: e.target.value })}
              disabled={!isFaculty}
            />
          </Form.Group>

          <div className="row">
            <div className="col-md-4">
              <Form.Group className="mb-3">
                <Form.Label htmlFor="wd-points">Points</Form.Label>
                <Form.Control
                  id="wd-points"
                  type="number"
                  value={assignment.points || 100}
                  onChange={(e) => setAssignment({ ...assignment, points: parseInt(e.target.value) })}
                  disabled={!isFaculty}
                />
              </Form.Group>
            </div>
          </div>

          <div className="row">
            <div className="col-md-4">
              <Form.Group className="mb-3">
                <Form.Label htmlFor="wd-due-date">Due Date</Form.Label>
                <Form.Control
                  id="wd-due-date"
                  type="date"
                  value={assignment.dueDate || ""}
                  onChange={(e) => setAssignment({ ...assignment, dueDate: e.target.value })}
                  disabled={!isFaculty}
                />
              </Form.Group>
            </div>
            <div className="col-md-4">
              <Form.Group className="mb-3">
                <Form.Label htmlFor="wd-available-from">Available From</Form.Label>
                <Form.Control
                  id="wd-available-from"
                  type="date"
                  value={assignment.availableFrom || ""}
                  onChange={(e) => setAssignment({ ...assignment, availableFrom: e.target.value })}
                  disabled={!isFaculty}
                />
              </Form.Group>
            </div>
            <div className="col-md-4">
              <Form.Group className="mb-3">
                <Form.Label htmlFor="wd-available-until">Available Until</Form.Label>
                <Form.Control
                  id="wd-available-until"
                  type="date"
                  value={assignment.availableUntil || ""}
                  onChange={(e) => setAssignment({ ...assignment, availableUntil: e.target.value })}
                  disabled={!isFaculty}
                />
              </Form.Group>
            </div>
          </div>

          <hr />

          <div className="d-flex justify-content-end gap-2">
            <Button variant="secondary" onClick={handleCancel}>
              Cancel
            </Button>
            {isFaculty && (
              <Button variant="danger" onClick={handleSave} disabled={saving}>
                {saving ? "Saving..." : "Save"}
              </Button>
            )}
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
