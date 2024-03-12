import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>Voici la homepage</h1>
      <p>
        <Link href="/Articles">Articles</Link>
      </p>
      <p>
        <Link href="/Article">Article</Link>
      </p>
    </main>
  );
}
