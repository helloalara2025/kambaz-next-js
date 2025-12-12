/**
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ║                      SESSION COMPONENT                                    ║
 * ║                   Auth Check on Page Load                                 ║
 * ║                         Created by Alara                                  ║
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 * 
 * WHY THIS COMPONENT EXISTS:
 * When a user refreshes the page or opens a new tab, the React app restarts.
 * Redux state is lost, but the server session (cookie) persists.
 * 
 * This component:
 * 1. Runs on every page load (wraps the entire Kambaz app)
 * 2. Calls /api/users/profile to check if user is logged in
 * 3. If yes, restores the user to Redux state
 * 4. Renders children only after the check completes
 * 
 * FLOW:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  Page loads → Session component renders (pending = true)               │
 * │      ↓                                                                 │
 * │  Calls profile() API                                                   │
 * │      ↓                                                                 │
 * │  If 200: dispatch(setCurrentUser(user))                               │
 * │  If 401: No session, user stays null                                  │
 * │      ↓                                                                 │
 * │  pending = false → children render                                     │
 * └─────────────────────────────────────────────────────────────────────────┘
 * 
 * @author Alara
 */

"use client";

import * as client from "./client";
import { useEffect, useState } from "react";
import { setCurrentUser } from "./reducer";
import { useDispatch } from "react-redux";

/**
 * Props interface
 */
interface SessionProps {
  children: React.ReactNode;
}

/**
 * Session Component
 * 
 * Wraps the Kambaz application to restore authentication state.
 * Shows nothing (or loading spinner) until session check completes.
 */
export default function Session({ children }: SessionProps) {
  // Track whether we're still checking the session
  const [pending, setPending] = useState(true);
  const dispatch = useDispatch();

  /**
   * Check if user is already logged in via session cookie
   */
  const fetchProfile = async () => {
    try {
      // Call the profile endpoint - uses session cookie for auth
      const currentUser = await client.profile();
      
      // User is logged in! Store in Redux
      dispatch(setCurrentUser(currentUser));
    } catch (err: any) {
      // 401 error means not logged in - that's fine, just continue
      // Don't log this as an error since it's expected for logged-out users
    }
    
    // Done checking, allow children to render
    setPending(false);
  };

  // Run the session check when component mounts
  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Don't render children until session check completes
  // This prevents flickering between logged-in and logged-out states
  if (pending) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-danger" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // Session check complete, render the app
  return <>{children}</>;
}
