import Link from "next/link";

export default function Home() {
  return (
    <main style={{ padding: 24 }}>
      <ul>
        <li>
          <Link href="/Kambaz">Go to Kambaz Home</Link>
        </li>
        <li>
          <Link href="/Kambaz/Account/Signin">Go to Signin</Link>
        </li>
        <li>
          <Link href="/Labs">Go to Labs</Link>
        </li>
      </ul>
    </main>
  );
}