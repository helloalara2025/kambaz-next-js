/**
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ║                          LABS PAGE                                        ║
 * ║                    Table of Contents                                      ║
 * ║                         Created by Alara                                  ║
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 * 
 * Main entry point for all lab exercises.
 * Contains links to individual labs and the Kambaz application.
 * 
 * @author Alara
 * @route /Labs
 */

import Link from "next/link";

export default function Labs() {
  return (
    <div className="container mt-4">
      <h1>Labs</h1>
      <h2>Alara</h2>
      <hr />
      
      <h3>Table of Contents</h3>
      <ul className="list-group">
        <li className="list-group-item">
          <Link href="/Labs/Lab5">Lab 5 - Working with HTTP Servers</Link>
        </li>
        <li className="list-group-item">
          <Link href="/Kambaz/Dashboard">Kambaz Dashboard</Link>
        </li>
      </ul>

      <hr />

      <h3>External Links</h3>
      <ul className="list-group">
        <li className="list-group-item">
          <a 
            id="wd-github"
            href="https://github.com/helloalara2025/kambaz-next-js"
            target="_blank"
            rel="noopener noreferrer"
          >
            Frontend GitHub Repository
          </a>
        </li>
        <li className="list-group-item">
          <a 
            href="https://github.com/helloalara2025/kambaz-node-server-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Backend GitHub Repository
          </a>
        </li>
      </ul>
    </div>
  );
}
