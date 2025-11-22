"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/app/(Kambaz)/store";
import * as client from "../client";
import { setCurrentUser, updateCurrentUser, clearCurrentUser } from "../../Account/reducer";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.account.currentUser);

  // local copy for editing
  const [user, setUser] = useState<any>(currentUser);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  // sync local state when redux user changes
  useEffect(() => {
    setUser(currentUser);
  }, [currentUser]);

  // load profile from server if we dont have it yet
  useEffect(() => {
    const loadProfile = async () => {
      if (currentUser) return;

      try {
        const profile = await client.profile();
        dispatch(setCurrentUser(profile));
      } catch (e) {
        // not logged in, ignore
      }
    };

    loadProfile();
  }, [currentUser, dispatch]);

  // when inputs change
  const onFieldChange = (field: string, value: string) => {
    if (!user) return;
    const updated = { ...user, [field]: value };
    setUser(updated);
    dispatch(updateCurrentUser({ [field]: value }));
  };

  // save button
  const onSave = async () => {
    if (!user || !user._id) return;

    setPending(true);
    setError(null);

    try {
      const updated = await client.updateUser(user._id, user);
      dispatch(setCurrentUser(updated));
    } catch (e: any) {
      setError(e?.response?.data?.message || "unable to save profile");
    } finally {
      setPending(false);
    }
  };

  // logout button
  const onSignout = async () => {
    try {
      await client.signout?.(); 
    } catch {
    } finally {
      dispatch(clearCurrentUser());
    }
  };

  if (!user) {
    return (
      <div className="container mt-4">
        <h2>profile</h2>
        <p>no user logged in</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-3">profile</h2>

      <div className="row">
        <div className="col-md-6">
          {/* username */}
          <div className="mb-3">
            <label className="form-label">username</label>
            <input
              className="form-control"
              value={user.username ?? ""}
              onChange={(e) => onFieldChange("username", e.target.value)}
            />
          </div>

          {/* first name */}
          <div className="mb-3">
            <label className="form-label">first name</label>
            <input
              className="form-control"
              value={user.first ?? ""}
              onChange={(e) => onFieldChange("first", e.target.value)}
            />
          </div>

          {/* last name */}
          <div className="mb-3">
            <label className="form-label">last name</label>
            <input
              className="form-control"
              value={user.last ?? ""}
              onChange={(e) => onFieldChange("last", e.target.value)}
            />
          </div>

          {/* email */}
          <div className="mb-3">
            <label className="form-label">email</label>
            <input
              type="email"
              className="form-control"
              value={user.email ?? ""}
              onChange={(e) => onFieldChange("email", e.target.value)}
            />
          </div>

          {/* date of birth */}
          <div className="mb-3">
            <label className="form-label">date of birth</label>
            <input
              type="date"
              className="form-control"
              value={user.dob ?? ""}
              onChange={(e) => onFieldChange("dob", e.target.value)}
            />
          </div>

          {/* role */}
          <div className="mb-3">
            <label className="form-label">role</label>
            <input
              className="form-control"
              value={user.role ?? ""}
              onChange={(e) => onFieldChange("role", e.target.value)}
            />
          </div>

          {error && <div className="alert alert-danger">{error}</div>}

          <div className="d-flex gap-2">
            <button
              id="wd-profile-save"
              className="btn btn-primary"
              onClick={onSave}
              disabled={pending}
            >
              {pending ? "saving…" : "save"}
            </button>

            <button
              id="wd-signout-btn"
              className="btn btn-outline-secondary"
              onClick={onSignout}
            >
              sign out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;


///// Notes:	•	Uses currentUser from accountReducer in the store
//	•	Keeps a local profile state so the form is editable before hitting Update
//	•	updateProfile calls client.updateUser and then dispatches setCurrentUser with the updated user  ￼
