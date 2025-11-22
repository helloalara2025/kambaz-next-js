"use client";

import { ReactNode, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import * as client from "./client";          // small api helpers
import { setCurrentUser } from "../Account/reducer";

type Props = {
  children: ReactNode;
};

const Session = ({ children }: Props) => {
  const dispatch = useDispatch();
  const [pending, setPending] = useState(true);

  // load current user from server on first render
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const user = await client.profile();
        dispatch(setCurrentUser(user));
      } catch (e) {
        // no logged in user is fine
        dispatch(setCurrentUser(null));
      } finally {
        setPending(false);
      }
    };

    loadProfile();
  }, [dispatch]);

  // tiny loading state so layout does not flicker
  if (pending) {
    return (
      <div className="container mt-4">
        <span>loading account…</span>
      </div>
    );
  }

  return <>{children}</>;
};

export default Session;

///// Notes:	•	On mount, calls client.profile to get current user from session
//	•	Dispatches setCurrentUser to store user in redux
//	•	Shows children once done checking session 
// 	•	calls /api/users/profile on mount
//	•	drops the result into Redux via setCurrentUser
//	•	clears the user if the call fails
//	•	waits until the check is done before rendering children