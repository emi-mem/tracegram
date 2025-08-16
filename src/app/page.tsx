import Link from "next/link";

export default function Home() {
  return (
    <main className="space-y-6">
      <h1 className="text-3xl font-bold">Tracegram</h1>
      <p className="text-slate-600 max-w-2xl">
        Upload two exports of your Instagram followers and get a clean diff.
        Account-safe, privacy-first. (No scraping.)
      </p>
      <Link
        href="/compare"
        className="inline-flex items-center px-4 py-2 rounded-xl bg-black text-white"
      >
        Go to Compare
      </Link>
    </main>
  );
}
