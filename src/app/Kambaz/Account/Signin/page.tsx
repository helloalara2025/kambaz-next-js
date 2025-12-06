"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { FormControl, Button } from "react-bootstrap";

import { setCurrentUser } from "../reducer";
import * as client from "../client";

export default function Signin() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [credentials, setCredentials] = useState<any>({});
  const [error, setError] = useState("");

  const signin = async () => {
    const mockUser = {
      _id: "dev-123",
      username: credentials.username || "devuser",
      firstName: "Dev",
      lastName: "Mode",
      role: "STUDENT",
    };

    dispatch(setCurrentUser(mockUser));
    router.push("/Kambaz"); // land in main app after signin
  };

  // (Later you can restore real login by replacing the function above
  // with the try/catch using client.signin)

  return (
    <div id="wd-signin-screen">
      <h1>Sign in</h1>

      <FormControl
        id="wd-username"
        className="mb-2"
        placeholder="username"
        value={credentials.username || ""}
        onChange={(e) =>
          setCredentials({ ...credentials, username: e.target.value })
        }
      />

      <FormControl
        id="wd-password"
        className="mb-2"
        placeholder="password"
        type="password"
        value={credentials.password || ""}
        onChange={(e) =>
          setCredentials({ ...credentials, password: e.target.value })
        }
      />

      <Button onClick={signin} id="wd-signin-btn" className="w-100">
        Sign in (dev bypass)
      </Button>

      <Link id="wd-signup-link" href="/Kambaz/Account/Signup">
        Sign up
      </Link>
    </div>
  );
}