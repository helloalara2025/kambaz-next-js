/**
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ║                      GRADES PAGE                                          ║
 * ║                    Course Gradebook                                       ║
 * ║                         Created by Alara                                  ║
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 * 
 * Placeholder for the grades/gradebook functionality.
 * 
 * @author Alara
 * @route /Kambaz/Courses/[cid]/Grades
 */

"use client";

import { useParams } from "next/navigation";
import { Card } from "react-bootstrap";

export default function Grades() {
  const params = useParams();
  const courseId = params.cid as string;

  return (
    <div id="wd-grades">
      <h2>Grades</h2>
      <hr />

      <Card>
        <Card.Body className="text-center py-5">
          <h4 className="text-muted">Gradebook</h4>
          <p className="text-muted">
            Course: {courseId}
          </p>
          <p className="text-muted">
            Grades functionality will be implemented here.
          </p>
        </Card.Body>
      </Card>
    </div>
  );
}
