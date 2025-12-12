/**
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ║                      PROFILE PAGE                                         ║
 * ║                    User Profile Editor                                    ║
 * ║                         Created by Alara                                  ║
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 * 
 * Displays and allows editing of the current user's profile.
 * Also provides the sign out functionality.
 * 
 * @author Alara
 * @route /Kambaz/Account/Profile
 */

"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { Form, Button, Alert, Card, Container } from "react-bootstrap";
import { setCurrentUser } from "../reducer";
import { RootState } from "../../store";
import * as client from "../client";

export default function Profile() {
  const dispatch = useDispatch();
  const router = useRouter();
  
  // Get current user from Redux
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  
  // Local profile state for editing
  const [profile, setProfile] = useState<any>(null);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);

  // Initialize profile from Redux state
  useEffect(() => {
    if (!currentUser) {
      // Not logged in, redirect to signin
      router.push("/Kambaz/Account/Signin");
    } else {
      setProfile({ ...currentUser });
    }
  }, [currentUser, router]);

  /**
   * Handle profile update
   */
  const handleUpdate = async () => {
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const updatedUser = await client.updateUser(profile);
      dispatch(setCurrentUser(updatedUser));
      setMessage({ type: "success", text: "Profile updated successfully!" });
    } catch (err: any) {
      setMessage({ 
        type: "danger", 
        text: err.response?.data?.message || "Error updating profile" 
      });
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle sign out
   */
  const handleSignout = async () => {
    try {
      await client.signout();
      dispatch(setCurrentUser(null));
      router.push("/Kambaz/Account/Signin");
    } catch (err: any) {
      setMessage({ type: "danger", text: "Error signing out" });
    }
  };

  // Don't render until profile is loaded
  if (!profile) {
    return (
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-danger" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <Card className="mx-auto" style={{ maxWidth: "600px" }}>
        <Card.Header className="bg-danger text-white d-flex justify-content-between align-items-center">
          <h3 className="mb-0">Profile</h3>
          <Button variant="outline-light" size="sm" onClick={handleSignout}>
            Sign Out
          </Button>
        </Card.Header>
        <Card.Body>
          {message.text && (
            <Alert 
              variant={message.type} 
              onClose={() => setMessage({ type: "", text: "" })} 
              dismissible
            >
              {message.text}
            </Alert>
          )}

          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              id="wd-username"
              type="text"
              value={profile.username || ""}
              onChange={(e) => setProfile({ ...profile, username: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              id="wd-password"
              type="password"
              value={profile.password || ""}
              onChange={(e) => setProfile({ ...profile, password: e.target.value })}
            />
          </Form.Group>

          <div className="row">
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  id="wd-firstname"
                  type="text"
                  value={profile.firstName || ""}
                  onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                />
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  id="wd-lastname"
                  type="text"
                  value={profile.lastName || ""}
                  onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                />
              </Form.Group>
            </div>
          </div>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              id="wd-email"
              type="email"
              value={profile.email || ""}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control
              id="wd-dob"
              type="date"
              value={profile.dob || ""}
              onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Role</Form.Label>
            <Form.Select
              id="wd-role"
              value={profile.role || "USER"}
              onChange={(e) => setProfile({ ...profile, role: e.target.value })}
            >
              <option value="USER">User</option>
              <option value="STUDENT">Student</option>
              <option value="FACULTY">Faculty</option>
              <option value="ADMIN">Admin</option>
            </Form.Select>
          </Form.Group>

          <Button
            id="wd-update-btn"
            variant="primary"
            className="w-100"
            onClick={handleUpdate}
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Profile"}
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
}
