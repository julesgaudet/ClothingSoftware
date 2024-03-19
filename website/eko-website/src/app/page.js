import Link from "next/link";

export default function Home() {
  return (
    <main className="m-40 flex flex-col gap-y-11 text-4xl font-black">
      <h1>Voici la homepage</h1>
      <p>
        <Link href="/Articles" className="hover:text-blue-500">
          Articles
        </Link>
      </p>
      <p>
        <Link href="/Article" className="hover:text-blue-500">
          Article
        </Link>
      </p>
    </main>
  );
}
