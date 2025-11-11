import Link from "next/link";

export default function Labs() {
  return (
    <div id="wd-labs">
      <h1>Labs</h1>
      <ul>
        <li><Link href="/Labs/Lab1">Lab 1: HTML Examples</Link></li>
        <li><Link href="/Labs/Lab2">Lab 2: CSS Basics</Link></li>
        <li><Link href="/Labs/Lab3">Lab 3: JavaScript Fundamentals</Link></li>
        <li><Link href="/Labs/Lab4">Lab 4: React</Link></li>
        <li><Link href="/Dashboard" id="wd-kambaz-main-link">Kambaz</Link></li> {/* new */}
      </ul>
    </div>
  );
}