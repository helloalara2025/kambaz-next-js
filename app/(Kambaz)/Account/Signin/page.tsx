/**
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ║                      SIGNIN PAGE                                          ║
 * ║                    User Login Form                                        ║
 * ║                         Created by Alara                                  ║
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 * 
 * This page allows users to log into their account.
 * 
 * FLOW:
 * 1. User enters username and password
 * 2. Clicks "Sign In" button
 * 3. API call to /api/users/signin
 * 4. If successful: store user in Redux, redirect to Dashboard
 * 5. If failed: show error message
 * 
 * @author Alara
 * @route /Kambaz/Account/Signin
 */

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Form, Button, Alert, Card, Container } from "react-bootstrap";
import { setCurrentUser } from "../reducer";
import * as client from "../client";

export default function Signin() {
  // Form state
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  
  // Error message for failed login
  const [error, setError] = useState("");
  
  // Loading state while API call is in progress
  const [loading, setLoading] = useState(false);
  
  const dispatch = useDispatch();
  const router = useRouter();

  /**
   * Handle form submission
   * Calls signin API and redirects on success
   */
  const handleSignin = async () => {
    setError("");
    setLoading(true);

    try {
      // Call signin API
      const user = await client.signin(credentials);
      
      // Store user in Redux
      dispatch(setCurrentUser(user));
      
      // Redirect to dashboard
      router.push("/Kambaz/Dashboard");
    } catch (err: any) {
      // Show error message from server or generic message
      setError(err.response?.data?.message || "Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Card style={{ width: "400px" }}>
        <Card.Header className="bg-danger text-white">
          <h3 className="mb-0">Sign In</h3>
        </Card.Header>
        <Card.Body>
          {/* Error Alert */}
          {error && (
            <Alert variant="danger" onClose={() => setError("")} dismissible>
              {error}
            </Alert>
          )}

          {/* Username Field */}
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              id="wd-username"
              type="text"
              placeholder="Enter username"
              value={credentials.username}
              onChange={(e) =>
                setCredentials({ ...credentials, username: e.target.value })
              }
            />
          </Form.Group>

          {/* Password Field */}
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              id="wd-password"
              type="password"
              placeholder="Enter password"
              value={credentials.password}
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
            />
          </Form.Group>

          {/* Sign In Button */}
          <Button
            id="wd-signin-btn"
            variant="primary"
            className="w-100 mb-3"
            onClick={handleSignin}
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </Button>

          {/* Link to Sign Up */}
          <div className="text-center">
            <span>Don't have an account? </span>
            <Link href="/Kambaz/Account/Signup" id="wd-signup-link">
              Sign Up
            </Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}
