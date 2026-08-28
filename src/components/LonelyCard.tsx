"use client";

import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import type { Person } from "@/lib/people";
import FestiveBackground from "./FestiveBackground";

const MAX_DODGES = 5;

export default function LonelyCard({ person }: { person: Person }) {
  const [name, setName] = useState("");
  const [tiedBy, setTiedBy] = useState<string | null>(null);
  const [count, setCount] = useState<number | null>(null);
  const [dodges, setDodges] = useState(0);
  const [pos, setPos] = useState({ top: 50, left: 50 });

  const tied = tiedBy !== null;
  const canTie = name.trim().length > 0;

  useEffect(() => {
    fetch("/api/tap")
      .then((r) => r.json())
      .then((d) => setCount(d.count))
      .catch(() => {});
  }, []);

  function dodge() {
    if (tied || dodges >= MAX_DODGES) return;
    setDodges((d) => d + 1);
    setPos({ top: 15 + Math.random() * 70, left: 15 + Math.random() * 70 });
  }

  async function tieRakhi() {
    if (!canTie) return;
    const trimmedName = name.trim();
    setTiedBy(trimmedName);
    fireConfetti();

    const res = await fetch("/api/tap", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: trimmedName, person: person.slug }),
    });
    const data = await res.json();
    setCount(data.count);
  }

  return (
    <main className="animate-gradient relative flex min-h-screen flex-col items-center justify-center gap-6 overflow-hidden bg-gradient-to-br from-orange-200 via-pink-200 to-yellow-200 px-6 py-16 text-center">
      <FestiveBackground active={tied} />

      <h1
        key={tied ? "tied" : "lonely"}
        className={`relative max-w-md text-3xl font-extrabold tracking-tight text-pink-600 drop-shadow-sm sm:text-4xl ${
          tied ? "animate-pop-in" : "text-lonely"
        }`}
      >
        {tied
          ? `🎉 ${tiedBy} tied a rakhi on ${person.name}!`
          : `${person.name} is very lonely today, because nobody gave him a rakhi 😢`}
      </h1>

      <img
        key={tied ? person.festiveImage : person.image}
        src={tied ? person.festiveImage : person.image}
        alt={person.name}
        className={`relative w-72 rounded-2xl shadow-xl ring-4 ring-white/60 sm:w-96 ${
          tied ? "img-tied" : "img-lonely"
        }`}
      />

      {!tied && (
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          required
          maxLength={30}
          className="relative w-56 rounded-full border-2 border-pink-300 bg-white/80 px-4 py-2 text-center text-pink-700 placeholder-pink-300 focus:border-pink-500 focus:outline-none"
        />
      )}
      {!tied && !canTie && (
        <p className="relative -mt-4 text-xs font-medium text-pink-500">
          Enter your name to unlock the button
        </p>
      )}

      <div className="relative h-32 w-full max-w-sm">
        <button
          onMouseEnter={dodge}
          onTouchStart={(e) => {
            if (!tied && dodges < MAX_DODGES) {
              e.preventDefault();
              dodge();
            }
          }}
          onClick={tieRakhi}
          disabled={tied || !canTie}
          style={
            tied
              ? undefined
              : {
                  position: "absolute",
                  top: `${pos.top}%`,
                  left: `${pos.left}%`,
                  transform: "translate(-50%, -50%)",
                }
          }
          className={`cursor-pointer rounded-full bg-pink-600 px-8 py-4 text-lg font-bold whitespace-nowrap text-white shadow-lg transition-[top,left,transform,background-color] duration-300 ease-out hover:scale-105 hover:bg-pink-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 ${
            !tied && canTie ? "animate-glow" : "static"
          }`}
        >
          Tie a Rakhi on {person.name}
        </button>
      </div>

      {count !== null && (
        <p
          key={count}
          className="animate-pop-in relative text-sm font-semibold text-pink-600"
        >
          🧵 {count} rakhi{count === 1 ? "" : "s"} tied today
        </p>
      )}
    </main>
  );
}

function fireConfetti() {
  const colors = ["#db2777", "#f97316", "#facc15"];
  const burst = () => {
    confetti({ particleCount: 100, spread: 90, origin: { y: 0.6 }, colors });
    confetti({
      particleCount: 50,
      angle: 60,
      spread: 60,
      origin: { x: 0, y: 0.7 },
      colors,
    });
    confetti({
      particleCount: 50,
      angle: 120,
      spread: 60,
      origin: { x: 1, y: 0.7 },
      colors,
    });
  };

  burst();
  setTimeout(burst, 350);
  setTimeout(burst, 700);
}
