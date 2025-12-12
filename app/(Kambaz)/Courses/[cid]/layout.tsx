/**
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ║                      COURSE LAYOUT                                        ║
 * ║                    Course Page Shell                                      ║
 * ║                         Created by Alara                                  ║
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 * 
 * Layout for all course-related pages.
 * Provides course-specific navigation sidebar.
 * 
 * @author Alara
 */

"use client";

import { useParams, usePathname } from "next/navigation";
import Link from "next/link";
import { ListGroup, Breadcrumb } from "react-bootstrap";
import { 
  FaHome, 
  FaBook, 
  FaFileAlt, 
  FaUsers, 
  FaChartBar 
} from "react-icons/fa";

/**
 * Course navigation links
 */
const courseLinks = [
  { label: "Home", path: "Home", icon: FaHome },
  { label: "Modules", path: "Modules", icon: FaBook },
  { label: "Assignments", path: "Assignments", icon: FaFileAlt },
  { label: "People", path: "People", icon: FaUsers },
  { label: "Grades", path: "Grades", icon: FaChartBar },
];

export default function CourseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const pathname = usePathname();
  const courseId = params.cid as string;

  // Determine current section from pathname
  const currentSection = pathname.split("/").pop() || "Home";

  return (
    <div className="d-flex">
      {/* Course Navigation Sidebar */}
      <div className="wd-courses-navigation bg-light border-end d-none d-md-block">
        <div className="p-3">
          {/* Breadcrumb */}
          <Breadcrumb>
            <Breadcrumb.Item href="/Kambaz/Dashboard">Dashboard</Breadcrumb.Item>
            <Breadcrumb.Item active>{courseId}</Breadcrumb.Item>
          </Breadcrumb>
          
          <h5 className="text-danger mb-3">{courseId}</h5>
          
          {/* Navigation Links */}
          <ListGroup variant="flush">
            {courseLinks.map((link) => (
              <ListGroup.Item
                key={link.path}
                as={Link}
                href={`/Kambaz/Courses/${courseId}/${link.path}`}
                className={`d-flex align-items-center py-2 ${
                  currentSection === link.path
                    ? "bg-white border-start border-3 border-dark fw-bold"
                    : "text-muted"
                }`}
                style={{ textDecoration: "none" }}
              >
                <link.icon className="me-2" />
                {link.label}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow-1 p-4">
        {children}
      </div>
    </div>
  );
}
