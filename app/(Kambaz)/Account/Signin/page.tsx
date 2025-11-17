'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
// small in-file client helper to replace missing ../../client module
type AuthUser = {
  id: string;
  username: string;
  email?: string;
  token?: string;
};

const client = {
  signin: async (credentials: { username: string; password: string }): Promise<AuthUser | null> => {
    try {
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });
      if (!res.ok) return null;
      const data = await res.json();
      return data as AuthUser;
    } catch (err) {
      console.error('signin error', err);
      return null;
    }
  },
};

/****
 * @file Signin Page
 * sign in screen for kambaz users
 */

const inter = Inter({ subsets: ['latin'] });

export default function SigninPage() {
  const router = useRouter();
  const dispatch = useDispatch();

  // single credentials object for username and password
  const [credentials, setCredentials] = useState<{ username: string; password: string }>({
    username: '',
    password: '',
  });

  const signin = async () => {
    const user = await client.signin(credentials);
    if (!user) {
      return;
    }

    // basic redux action – reducer should handle this type
    dispatch({ type: 'SET_CURRENT_USER', payload: user });
    router.push('/Dashboard');
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <main
        className={`d-flex justify-content-center align-items-center ${inter.className}`}
        style={{ minWidth: '320px', maxWidth: '400px', width: '100%' }}
      >
        {/* card container for the sign in form */}
        <div className="card p-4 w-100">
          <h2 className="mb-4 text-center">Sign In</h2>

          {/* sign in form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              signin();
            }}
          >
            {/* username input */}
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                id="username"
                className="form-control"
                value={credentials.username}
                onChange={(e) =>
                  setCredentials({ ...credentials, username: e.target.value })
                }
                required
              />
              <div className="form-text">enter your kambaz username</div>
            </div>

            {/* password input */}
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="form-control"
                value={credentials.password}
                onChange={(e) =>
                  setCredentials({ ...credentials, password: e.target.value })
                }
                required
              />
              <div className="form-text">your password is kept secure</div>
            </div>

            {/* submit button */}
            <button type="submit" className="btn btn-primary w-100">
              Sign In
            </button>
          </form>

          <p className="text-center mt-3">
            don’t have an account?{' '}
            <Link
              href="/Account/Signup"
              className="text-decoration-none text-primary fw-semibold"
            >
              sign up here
            </Link>
          </p>

          <div className="d-flex justify-content-center mt-3">
            <Link href="/Labs" className="btn btn-outline-secondary px-4">
              go to labs
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}