import Link from "next/link";
import { people } from "@/lib/people";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-gradient-to-b from-orange-50 to-pink-50 px-6 text-center">
      <h1 className="text-2xl font-bold text-pink-600">Who&apos;s lonely today?</h1>
      <div className="flex flex-wrap justify-center gap-4">
        {Object.values(people)
          .filter((person) => person !== undefined)
          .map((person) => (
          <Link
            key={person.slug}
            href={`/${person.slug}`}
            className="rounded-full bg-pink-600 px-6 py-3 font-bold text-white shadow-lg hover:bg-pink-700"
          >
            {person.name}
          </Link>
        ))}
      </div>
    </main>
  );
}
