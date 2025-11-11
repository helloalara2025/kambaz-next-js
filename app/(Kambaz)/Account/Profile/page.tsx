"use client";
/**
 * Profile Page — wired to Account reducer
 * - if no currentUser -> redirect to /Account/Signin
 * - if currentUser -> populate form with their data
 * - Sign out clears currentUser then redirects to /Account/Signin
 */

import Link from 'next/link';
import { redirect } from 'next/dist/client/components/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUser } from '../Reducer';

interface RootState {
  accountReducer: {
    currentUser: Profile | null;
  };
}

type Profile = {
  username?: string;
  password?: string;
  first?: string;
  last?: string;
  dob?: string;
  email?: string;
  role?: string;
};

export default function ProfilePage() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((s: RootState) => s.accountReducer);
  const [profile, setProfile] = useState<Profile>({});

  useEffect(() => {
    if (!currentUser) {
      redirect('/Account/Signin');
      return;
    }
    setProfile(currentUser as Profile);
  }, [currentUser]);

  const update = (key: keyof Profile) =>
    (e: React.ChangeEvent<HTMLInputElement>) => setProfile({ ...profile, [key]: e.target.value });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const signout = () => {
    dispatch(setCurrentUser(null));
    redirect('/Account/Signin');
  };

  return (
    <div id="wd-profile-screen" className="d-flex flex-column align-items-center justify-content-center min-vh-100" style={{ background: '#fff' }}>
      {/* breadcrumb */}
      <nav className="mb-3 small text-muted" aria-label="breadcrumb">
        <Link href="/Dashboard" className="text-decoration-none text-muted">Dashboard</Link>
        <span className="px-2">/</span>
        <span>Account</span>
        <span className="px-2">/</span>
        <span className="fw-semibold text-dark">Profile</span>
      </nav>
      <div className="card shadow-sm border-0" style={{ width: '100%', maxWidth: 420 }}>
        <form className="card-body px-4 py-4" onSubmit={submit} autoComplete="off">
          <h2 className="fw-bold mb-4 mt-1 text-center">Profile</h2>

          <label className="visually-hidden" htmlFor="wd-username">Username</label>
          <input id="wd-username" autoComplete="username" className="form-control mb-3 shadow-sm"
                 defaultValue={profile.username} onChange={update('username')} placeholder="Username" />

          <label className="visually-hidden" htmlFor="wd-password">Password</label>
          <input id="wd-password" type="password" autoComplete="current-password" className="form-control mb-3 shadow-sm"
                 defaultValue={profile.password} onChange={update('password')} placeholder="Password" />

          <label className="visually-hidden" htmlFor="wd-firstname">First name</label>
          <input id="wd-firstname" className="form-control mb-3 shadow-sm"
                 defaultValue={profile.first} onChange={update('first')} placeholder="First name" />

          <label className="visually-hidden" htmlFor="wd-lastname">Last name</label>
          <input id="wd-lastname" className="form-control mb-3 shadow-sm"
                 defaultValue={profile.last} onChange={update('last')} placeholder="Last name" />

          <label className="visually-hidden" htmlFor="wd-dob">Date of birth</label>
          <input id="wd-dob" type="date" className="form-control mb-3 shadow-sm"
                 defaultValue={profile.dob} onChange={update('dob')} placeholder="mm/dd/yyyy" />

          <label className="visually-hidden" htmlFor="wd-email">Email</label>
          <input id="wd-email" type="email" autoComplete="email" className="form-control mb-3 shadow-sm"
                 defaultValue={profile.email} onChange={update('email')} placeholder="Email" />

          <label className="visually-hidden" htmlFor="wd-role">Role</label>
          <select id="wd-role" className="form-select mb-4 shadow-sm" defaultValue={profile.role ?? ''} onChange={(e) => setProfile({ ...profile, role: e.target.value })}>
            <option value=""> </option>
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>
            <option value="STUDENT">Student</option>
          </select>

          <button type="submit" className="btn btn-dark w-100 mb-2">Save</button>
          <button id="wd-signout-btn" type="button" onClick={signout} className="btn w-100 mb-2" style={{ background: '#c0392b', color: '#fff' }}>Sign out</button>
        </form>
      </div>
      <style jsx>{`
        @media (min-width: 992px) {
          #wd-account-profile > .card { margin-top: 32px; }
        }
      `}</style>
      <div style={{ marginBottom: 32 }} />
    </div>
  );
}