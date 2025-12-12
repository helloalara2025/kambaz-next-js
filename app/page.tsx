/**
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ║                        HOME PAGE                                          ║
 * ║                         Created by Alara                                  ║
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 * 
 * The root page of the application.
 * Provides navigation links to Labs and Kambaz.
 * 
 * @author Alara
 * @route /
 */

import Link from "next/link";

export default function Home() {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header bg-danger text-white">
              <h1 className="mb-0">Kambaz LMS</h1>
            </div>
            <div className="card-body">
              <h2>Welcome!</h2>
              <p className="lead">
                This is the Kambaz Learning Management System, a full-stack web 
                application built with Next.js, Node.js, and MongoDB.
              </p>
              
              <hr />
              
              <h3>Created by: Alara</h3>
              <p>CS5610 Web Development - Northeastern University</p>
              
              <hr />
              
              <h4>Navigation</h4>
              <div className="d-flex gap-3 mt-3">
                <Link href="/Labs" className="btn btn-primary btn-lg">
                  Labs
                </Link>
                <Link href="/Kambaz/Dashboard" className="btn btn-success btn-lg">
                  Kambaz Dashboard
                </Link>
                <Link href="/Kambaz/Account/Signin" className="btn btn-secondary btn-lg">
                  Sign In
                </Link>
              </div>
              
              <hr />
              
              <h4>External Links</h4>
              <ul className="list-unstyled">
                <li>
                  <a 
                    href="https://github.com/helloalara2025/kambaz-next-js" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline-dark mb-2"
                  >
                    Frontend Repository (GitHub)
                  </a>
                </li>
                <li>
                  <a 
                    href="https://github.com/helloalara2025/kambaz-node-server-app" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline-dark"
                  >
                    Backend Repository (GitHub)
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
