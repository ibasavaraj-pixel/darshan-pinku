"use client";

import { useEffect, useState } from "react";

const EMOJIS = ["🪁", "🎊", "✨", "🧧", "🎉"];

type Particle = {
  id: number;
  emoji: string;
  left: number;
  duration: number;
  delay: number;
  size: number;
};

function generateParticles(): Particle[] {
  return Array.from({ length: 18 }, (_, i) => ({
    id: i,
    emoji: EMOJIS[i % EMOJIS.length],
    left: Math.random() * 100,
    duration: 6 + Math.random() * 6,
    delay: Math.random() * 6,
    size: 16 + Math.random() * 20,
  }));
}

export default function FestiveBackground({ active }: { active: boolean }) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    setParticles(generateParticles());
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {particles.map((p) => (
        <span
          key={p.id}
          className="animate-float"
          style={{
            left: `${p.left}%`,
            bottom: 0,
            fontSize: p.size,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            opacity: active ? 1 : 0.35,
            transition: "opacity 0.6s ease",
          }}
        >
          {p.emoji}
        </span>
      ))}
    </div>
  );
}
