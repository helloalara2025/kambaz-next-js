"use client";

import Link from "next/link";

export default function Labs() {
  return (
    <div id="wd-labs">
      <h1>Labs - TOC</h1>

      <h3> Alara Hakki / web development / fall 2025 </h3>

      <ul>
        <li>
          <Link href="/Labs/Lab1" id="wd-lab1-link">
            Lab 1: HTML Examples
          </Link>
        </li>
        <li>
          <Link href="/Labs/Lab2" id="wd-lab2-link">
            Lab 2: CSS Examples
          </Link>
        </li>
        <li>
          <Link href="/Labs/Lab3" id="wd-lab3-link">
            Lab 3: JavaScript Fundamentals
          </Link>
        </li>
        <li>
          <Link href="/Labs/Lab4" id="wd-lab4-link">
            Lab 4: Maintaing State in React Applications
          </Link>
        </li>
        <li>
          <Link href="/Labs/Lab5" id="wd-lab5-link">
            Lab 5: Backend
          </Link>
        </li>
        <li>
          <Link href="/Account/Signin">Kambaz</Link>
        </li>
      </ul>
      <h3>Links</h3>
      <ul>
        <li>
          <Link href="/Account/Signin">Kambaz Application</Link>
        </li>
        <li>
          <a href="https://github.com/helloalara2025" 
          id="wd-github-client-side">
            Alara Hakki / GitHub Link / Profile
          </a>
        </li>
        <li>
          <a
            href="https://github.com/helloalara2025/kambaz-next-js"
            id="wd-github-server-side"
          >
            Github Repo for: JS and FE , total branches: 7 
          </a>
        </li>
      </ul>
    </div>
  );
}
