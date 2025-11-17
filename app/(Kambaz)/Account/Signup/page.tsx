"use client";

/**
 * Signup Page
 */

import Link from "next/link";
import { redirect } from "next/navigation";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { FormControl, Button } from "react-bootstrap";
import { setCurrentUser } from "../Reducer";
import * as client from "../client";

type SignupUser = {
  username?: string;
  password?: string;
};

export default function Signup() {
  const [user, setUser] = useState<SignupUser>({});
  const dispatch = useDispatch();

  const signup = async () => {
    const currentUser = await client.signup(user);
    dispatch(setCurrentUser(currentUser));
    redirect("/Account/Profile");
  };

  return (
    <main
      id="wd-signup-screen"
      className="wd-signup-screen d-flex justify-content-center align-items-center p-4"
    >
      <div className="w-100" style={{ maxWidth: 440 }}>
        <h2 className="text-center m-0">Sign up for Kambaz</h2>
        <p className="text-center mt-1 mb-3 text-secondary">
          Create your account to access courses and dashboards.
        </p>

        {/* Username */}
        <label htmlFor="wd-su-username" className="fw-semibold">
          Username
        </label>
        <FormControl
          id="wd-su-username"
          className="wd-username mb-2"
          placeholder="username"
          value={user.username ?? ""}
          onChange={(e) =>
            setUser({ ...user, username: e.target.value })
          }
        />

        {/* Password */}
        <label htmlFor="wd-su-password" className="fw-semibold">
          Password
        </label>
        <FormControl
          id="wd-su-password"
          className="wd-password mb-3"
          type="password"
          placeholder="password"
          value={user.password ?? ""}
          onChange={(e) =>
            setUser({ ...user, password: e.target.value })
          }
        />

        <div className="d-grid gap-2">
          <Button
            id="wd-su-submit"
            className="wd-signup-btn"
            variant="primary"
            onClick={signup}
          >
            Signup
          </Button>
        </div>

        <div className="mt-2">
          <Link href="/Account/Signin" className="wd-signin-link">
            Sign in
          </Link>
        </div>
      </div>
    </main>
  );
}
