/****
 * @file Signin Page
 * Sign-in screen for Kambaz users. 
 */
'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import { useDispatch } from 'react-redux';

interface User {
  id?: string;
  username: string;
  password?: string;
  [key: string]: unknown;
}

type SetCurrentUserAction = {
  type: 'SET_CURRENT_USER';
  payload: User;
};

const setCurrentUser = (user: User): SetCurrentUserAction => ({ type: 'SET_CURRENT_USER', payload: user });
import * as DBModule from '../../Database';

const inter = Inter({ subsets: ['latin'] });

// resolve users from database module in a safe way
type DBWithUsers = { users?: User[]; default?: { users?: User[] } };

const db = DBModule as unknown as DBWithUsers;

const USERS: User[] = db.users ?? db.default?.users ?? [];

export default function SigninPage() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Handle form submission and navigate to Dashboard
  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    const user = USERS.find(
      (u: User | undefined) => u?.username === username && u?.password === password
    );
    const sessionUser: User = user ?? { id: 'guest', username };

    dispatch(setCurrentUser(sessionUser));
    router.push('/Dashboard');
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <main className={`d-flex justify-content-center align-items-center ${inter.className}`} style={{ minWidth: '320px', maxWidth: '400px', width: '100%' }}>
        {/* Card container for the sign-in form */}
        <div className="card p-4 w-100">
          <h2 className="mb-4 text-center">Sign In</h2>
          {/* Sign-in form */}
          <form onSubmit={handleSignIn}>
            {/* Username input field with helper text */}
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username</label>
              <input
                type="text"
                id="username"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <div className="form-text">Enter your Kambaz username.</div>
            </div>
            {/* Password input field with helper text */}
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                id="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="form-text">Your password is kept secure.</div>
            </div>
            {/* Sign In button triggers navigation to Dashboard */}
            <button type="submit" className="btn btn-primary w-100">Sign In</button>
          </form>
          <p className="text-center mt-3">
            Don’t have an account?{' '}
            <Link href="/Account/Signup" className="text-decoration-none text-primary fw-semibold">
              Sign up here.
            </Link>
          </p>
          <div className="d-flex justify-content-center mt-3">
            <Link href="/Labs" className="btn btn-outline-secondary px-4">
              Go to Labs
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}