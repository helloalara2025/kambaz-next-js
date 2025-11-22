"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import * as client from "../client";
import { setCurrentUser } from "../../Account/reducer";

export default function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const dispatch = useDispatch();
  const router = useRouter();

  const handleSignin = async () => {
    try {
      // talk to server
      const user = await client.signin({ username, password });

      // store user in redux
      dispatch(setCurrentUser(user));

      setError(null);

      // go to profile after login
      router.push("/Account/Profile");
    } catch (e: any) {
      // show server message if there is one
      const msg =
        e?.response?.data?.message ||
        "Unable to sign in. Check your username and password.";
      setError(msg);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSignin();
  };

  return (
    <div className="d-flex justify-content-center align-items-start mt-5">
      <div className="w-25">
        <h1 className="mb-3">Sign In</h1>

        <form onSubmit={handleSubmit} className="w-50">
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              id="wd-username"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="wd-password"
            />
          </div>

          {error && (
            <div className="alert alert-danger py-2" role="alert">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary"
            id="wd-signin-btn"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
///// Notes:	•	
// Uses a local credentials state to hold username and password
//	•	goal: stop using front end local store databaase that is hard coded and instead call backend api 
// On submit, calls client.signin and if successful, dispatches SET_CURRENT_USER with the returned user and navigates to /Dashboard
// </file>