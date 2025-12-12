/**
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ║                      SIGNUP PAGE                                          ║
 * ║                    User Registration Form                                 ║
 * ║                         Created by Alara                                  ║
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 * 
 * This page allows new users to create an account.
 * 
 * @author Alara
 * @route /Kambaz/Account/Signup
 */

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Form, Button, Alert, Card, Container } from "react-bootstrap";
import { setCurrentUser } from "../reducer";
import * as client from "../client";

export default function Signup() {
  // Form state
  const [user, setUser] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    role: "STUDENT",
  });
  
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const dispatch = useDispatch();
  const router = useRouter();

  /**
   * Handle form submission
   * Creates new user and redirects to profile
   */
  const handleSignup = async () => {
    setError("");
    setLoading(true);

    try {
      // Call signup API
      const newUser = await client.signup(user);
      
      // Store user in Redux (auto-logged in)
      dispatch(setCurrentUser(newUser));
      
      // Redirect to profile
      router.push("/Kambaz/Account/Profile");
    } catch (err: any) {
      setError(err.response?.data?.message || "Error creating account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Card style={{ width: "450px" }}>
        <Card.Header className="bg-danger text-white">
          <h3 className="mb-0">Sign Up</h3>
        </Card.Header>
        <Card.Body>
          {error && (
            <Alert variant="danger" onClose={() => setError("")} dismissible>
              {error}
            </Alert>
          )}

          <Form.Group className="mb-3">
            <Form.Label>Username *</Form.Label>
            <Form.Control
              id="wd-username"
              type="text"
              placeholder="Choose a username"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password *</Form.Label>
            <Form.Control
              id="wd-password"
              type="password"
              placeholder="Choose a password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </Form.Group>

          <div className="row">
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="First name"
                  value={user.firstName}
                  onChange={(e) => setUser({ ...user, firstName: e.target.value })}
                />
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Last name"
                  value={user.lastName}
                  onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                />
              </Form.Group>
            </div>
          </div>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="your.email@example.com"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Role</Form.Label>
            <Form.Select
              value={user.role}
              onChange={(e) => setUser({ ...user, role: e.target.value })}
            >
              <option value="STUDENT">Student</option>
              <option value="FACULTY">Faculty</option>
            </Form.Select>
          </Form.Group>

          <Button
            id="wd-signup-btn"
            variant="primary"
            className="w-100 mb-3"
            onClick={handleSignup}
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </Button>

          <div className="text-center">
            <span>Already have an account? </span>
            <Link href="/Kambaz/Account/Signin" id="wd-signin-link">
              Sign In
            </Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}
