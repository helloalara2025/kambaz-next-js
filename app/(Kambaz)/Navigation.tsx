/**
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ║                      NAVIGATION COMPONENT                                 ║
 * ║                    Left Sidebar Navigation                                ║
 * ║                         Created by Alara                                  ║
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 * 
 * The main navigation sidebar inspired by Canvas LMS.
 * Shows links to Account, Dashboard, Courses, etc.
 * 
 * FEATURES:
 * - Fixed position on the left side
 * - Highlights the current page
 * - Responsive icons with labels
 * 
 * @author Alara
 */

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ListGroup } from "react-bootstrap";
import { 
  FaUserCircle, 
  FaTachometerAlt, 
  FaBook, 
  FaInbox,
  FaRegCalendarAlt,
  FaClock,
  FaDesktop,
  FaArrowRight
} from "react-icons/fa";

/**
 * Navigation links configuration
 * Each link has a label, path, and icon component
 */
const links = [
  { label: "Dashboard", path: "/Kambaz/Dashboard", icon: FaTachometerAlt },
  { label: "Courses", path: "/Kambaz/Dashboard", icon: FaBook },
  { label: "Calendar", path: "/Kambaz/Dashboard", icon: FaRegCalendarAlt },
  { label: "Inbox", path: "/Kambaz/Dashboard", icon: FaInbox },
  { label: "Labs", path: "/Labs", icon: FaDesktop },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <div className="wd-kambaz-navigation d-none d-md-block">
      <ListGroup className="list-group-flush">
        {/* Logo/Brand */}
        <ListGroup.Item 
          className="bg-black text-white text-center border-0 py-3"
        >
          <Link href="/" className="text-white text-decoration-none">
            <FaArrowRight className="fs-3 text-danger" />
            <br />
            <span className="small">Kambaz</span>
          </Link>
        </ListGroup.Item>

        {/* Account Link */}
        <ListGroup.Item
          as={Link}
          href="/Kambaz/Account/Profile"
          className={`bg-black text-center border-0 py-3 ${
            pathname.includes("Account") ? "bg-white text-danger" : "text-white"
          }`}
        >
          <FaUserCircle 
            className={`fs-1 ${
              pathname.includes("Account") ? "text-danger" : "text-white"
            }`} 
          />
          <br />
          <span className="small">Account</span>
        </ListGroup.Item>

        {/* Main Navigation Links */}
        {links.map((link) => (
          <ListGroup.Item
            key={link.path + link.label}
            as={Link}
            href={link.path}
            className={`bg-black text-center border-0 py-3 ${
              pathname.includes(link.label) ? "bg-white text-danger" : "text-white"
            }`}
          >
            <link.icon 
              className={`fs-1 ${
                pathname.includes(link.label) ? "text-danger" : "text-danger"
              }`} 
            />
            <br />
            <span className="small">{link.label}</span>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}
