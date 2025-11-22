"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

import * as client from "../client";          // calls to account api
import { setCurrentUser } from "../../Account/reducer";  // save user in account slice

const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();

  // handle sign up click
  const handleSignup = async () => {
    setError(null);
    setPending(true);

    try {
      const newUser = await client.signup({
        username,
        password,
        first,
        last,
        email,
      });

      // store new user in redux
      dispatch(setCurrentUser(newUser));

      // go to profile after sign up
      router.push("/Account/Profile");
    } catch (e: any) {
      setError(e?.response?.data?.message || "unable to sign up");
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Sign up</h2>

      <div className="mb-3">
        <label className="form-label">username</label>
        <input
          className="form-control"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">password</label>
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">first name</label>
        <input
          className="form-control"
          value={first}
          onChange={(e) => setFirst(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">last name</label>
        <input
          className="form-control"
          value={last}
          onChange={(e) => setLast(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">email</label>
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <button
        id="wd-signup-btn"
        className="btn btn-primary"
        onClick={handleSignup}
        disabled={pending}
      >
        {pending ? "creating account..." : "sign up"}
      </button>
    </div>
  );
};

export default SignupPage;

//Notes:	•	Collects username, password, first, last, email
//	•	Calls client.signup to create account
//	•	Stores new user in redux via setCurrentUser
//	•	Navigates to /Account/Profile on success
//	•	Shows error message on failure