/**
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ║                      MODULES PAGE                                         ║
 * ║                    Course Modules Management                              ║
 * ║                         Created by Alara                                  ║
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 * 
 * Displays and manages modules for a course.
 * Faculty can create, edit, and delete modules.
 * 
 * @author Alara
 * @route /Kambaz/Courses/[cid]/Modules
 */

"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
  Card, Button, Form, ListGroup, 
  Collapse, Modal, Alert 
} from "react-bootstrap";
import { FaPlus, FaEdit, FaTrash, FaChevronDown, FaChevronRight } from "react-icons/fa";
import { RootState } from "../../../store";
import { setModules, addModule, updateModule, deleteModule } from "./reducer";
import * as client from "./client";

export default function Modules() {
  const params = useParams();
  const courseId = params.cid as string;
  const dispatch = useDispatch();
  
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const { modules } = useSelector((state: RootState) => state.modulesReducer);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set());
  
  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [editingModule, setEditingModule] = useState<any>(null);
  const [moduleForm, setModuleForm] = useState({ name: "", description: "" });

  const isFaculty = currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";

  /**
   * Fetch modules on mount
   */
  useEffect(() => {
    const fetchModules = async () => {
      try {
        const data = await client.findModulesForCourse(courseId);
        dispatch(setModules(data));
      } catch (err) {
        setError("Error loading modules");
      } finally {
        setLoading(false);
      }
    };
    
    fetchModules();
  }, [courseId, dispatch]);

  /**
   * Toggle module expansion
   */
  const toggleModule = (moduleId: string) => {
    const newExpanded = new Set(expandedModules);
    if (newExpanded.has(moduleId)) {
      newExpanded.delete(moduleId);
    } else {
      newExpanded.add(moduleId);
    }
    setExpandedModules(newExpanded);
  };

  /**
   * Create new module
   */
  const handleCreateModule = async () => {
    try {
      const newModule = await client.createModule(courseId, moduleForm);
      dispatch(addModule(newModule));
      setShowModal(false);
      resetForm();
    } catch (err) {
      setError("Error creating module");
    }
  };

  /**
   * Update module
   */
  const handleUpdateModule = async () => {
    try {
      await client.updateModule(courseId, { ...editingModule, ...moduleForm });
      dispatch(updateModule({ ...editingModule, ...moduleForm }));
      setShowModal(false);
      resetForm();
    } catch (err) {
      setError("Error updating module");
    }
  };

  /**
   * Delete module
   */
  const handleDeleteModule = async (moduleId: string) => {
    if (!confirm("Delete this module?")) return;
    
    try {
      await client.deleteModule(courseId, moduleId);
      dispatch(deleteModule(moduleId));
    } catch (err) {
      setError("Error deleting module");
    }
  };

  const resetForm = () => {
    setModuleForm({ name: "", description: "" });
    setEditingModule(null);
  };

  const openEditModal = (module: any) => {
    setEditingModule(module);
    setModuleForm({ name: module.name, description: module.description || "" });
    setShowModal(true);
  };

  if (loading) {
    return <div className="text-center py-4">Loading modules...</div>;
  }

  return (
    <div id="wd-modules">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Modules</h2>
        {isFaculty && (
          <Button
            variant="danger"
            onClick={() => {
              resetForm();
              setShowModal(true);
            }}
          >
            <FaPlus className="me-1" /> Add Module
          </Button>
        )}
      </div>
      <hr />

      {error && (
        <Alert variant="danger" onClose={() => setError("")} dismissible>
          {error}
        </Alert>
      )}

      {/* Module List */}
      {modules.length === 0 ? (
        <p className="text-muted">No modules yet.</p>
      ) : (
        <div className="wd-module-list">
          {modules.map((module: any) => (
            <Card key={module._id} className="mb-3 wd-module">
              <Card.Header 
                className="d-flex justify-content-between align-items-center wd-module-title"
                style={{ cursor: "pointer" }}
                onClick={() => toggleModule(module._id)}
              >
                <div className="d-flex align-items-center">
                  {expandedModules.has(module._id) ? (
                    <FaChevronDown className="me-2" />
                  ) : (
                    <FaChevronRight className="me-2" />
                  )}
                  <strong>{module.name}</strong>
                </div>
                
                {isFaculty && (
                  <div onClick={(e) => e.stopPropagation()}>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      className="me-1"
                      onClick={() => openEditModal(module)}
                    >
                      <FaEdit />
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDeleteModule(module._id)}
                    >
                      <FaTrash />
                    </Button>
                  </div>
                )}
              </Card.Header>
              
              <Collapse in={expandedModules.has(module._id)}>
                <div>
                  <Card.Body className="wd-module-content">
                    {module.description && (
                      <p className="text-muted">{module.description}</p>
                    )}
                    
                    {/* Lessons */}
                    {module.lessons && module.lessons.length > 0 && (
                      <ListGroup variant="flush">
                        {module.lessons.map((lesson: any) => (
                          <ListGroup.Item key={lesson._id}>
                            {lesson.name}
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    )}
                    
                    {(!module.lessons || module.lessons.length === 0) && (
                      <p className="text-muted small">No lessons in this module.</p>
                    )}
                  </Card.Body>
                </div>
              </Collapse>
            </Card>
          ))}
        </div>
      )}

      {/* Add/Edit Module Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingModule ? "Edit Module" : "Add Module"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Module Name *</Form.Label>
            <Form.Control
              type="text"
              value={moduleForm.name}
              onChange={(e) => setModuleForm({ ...moduleForm, name: e.target.value })}
              placeholder="e.g., Introduction to React"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={moduleForm.description}
              onChange={(e) => setModuleForm({ ...moduleForm, description: e.target.value })}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button 
            variant="danger"
            onClick={editingModule ? handleUpdateModule : handleCreateModule}
            disabled={!moduleForm.name.trim()}
          >
            {editingModule ? "Update" : "Create"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
