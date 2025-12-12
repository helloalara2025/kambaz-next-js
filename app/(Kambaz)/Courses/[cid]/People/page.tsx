/**
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ║                      PEOPLE PAGE                                          ║
 * ║                    Course Enrollment List                                 ║
 * ║                         Created by Alara                                  ║
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 * 
 * Shows all users enrolled in the current course.
 * 
 * @author Alara
 * @route /Kambaz/Courses/[cid]/People
 */

"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Table, Alert } from "react-bootstrap";
import { FaUserGraduate, FaChalkboardTeacher } from "react-icons/fa";
import * as client from "../../client";

export default function People() {
  const params = useParams();
  const courseId = params.cid as string;
  
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await client.findUsersForCourse(courseId);
        setUsers(data);
      } catch (err) {
        setError("Error loading enrolled users");
      } finally {
        setLoading(false);
      }
    };
    
    fetchUsers();
  }, [courseId]);

  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  return (
    <div id="wd-people">
      <h2>People</h2>
      <hr />

      {error && (
        <Alert variant="danger" onClose={() => setError("")} dismissible>
          {error}
        </Alert>
      )}

      {users.length === 0 ? (
        <p className="text-muted">No users enrolled in this course.</p>
      ) : (
        <Table striped bordered hover className="wd-people-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Login ID</th>
              <th>Section</th>
              <th>Role</th>
              <th>Last Activity</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: any) => (
              <tr key={user._id}>
                <td>
                  {user.role === "FACULTY" ? (
                    <FaChalkboardTeacher className="text-warning me-2" />
                  ) : (
                    <FaUserGraduate className="text-primary me-2" />
                  )}
                  {user.firstName} {user.lastName}
                </td>
                <td>{user.loginId || user._id}</td>
                <td>{user.section || "-"}</td>
                <td>
                  <span className={`badge ${
                    user.role === "FACULTY" 
                      ? "bg-warning" 
                      : user.role === "TA" 
                        ? "bg-info" 
                        : "bg-primary"
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td>{user.lastActivity || "-"}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}
