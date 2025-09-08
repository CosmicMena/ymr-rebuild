// src/components/AdSlider/index.tsx
import React from "react";
import { Link } from "react-router-dom";
import type { AdSlide } from "../../types";
import { useAutoSlide } from "../../hooks/useAutoSlide";

type Props = { slides: AdSlide[]; delay?: number; height?: string };

export default function AdSlider({ slides, delay = 3000, height = "h-40" }: Props) {
  const { index, next, prev, pause, resume } = useAutoSlide(slides.length, delay, false);

  return (
    <div
      className={`relative ${height} w-full`}
      onMouseEnter={pause}
      onMouseLeave={resume}
    >
      {slides.map((s, i) => (
        <article
          key={s.id}
          className={`absolute inset-0 p-4 transition-opacity duration-400 ${i === index ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        >
          <div className={`rounded-lg h-full flex items-stretch overflow-hidden shadow-lg`}>
            <div className={`w-1/3 bg-gradient-to-br ${s.gradient ?? "from-blue-600 to-purple-600"} flex items-center justify-center`}>
              <img src={s.image} alt={s.title} className="object-contain max-h-full p-4" />
            </div>
            <div className="flex-1 p-4 text-gray-900 dark:text-gray-100">
              <h4 className="font-bold text-lg text-gray-900 dark:text-white">{s.title}</h4>
              {s.discount && <span className="inline-block mt-2 text-sm bg-red-600 text-white px-2 py-1 rounded">{s.discount}</span>}
              <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">Lorem ipsum breve descrição se necessário.</p>
              <div className="mt-4">
                <Link to={s.link ?? "/products"} className="inline-block bg-red-600 text-white px-3 py-2 rounded">
                  {s.cta ?? "Ver"}
                </Link>
              </div>
            </div>
          </div>
        </article>
      ))}

      <div className="absolute right-3 bottom-3 flex gap-2">
        <button onClick={() => prev()} className="p-2 rounded-full bg-white/20 text-white">◀</button>
        <button onClick={() => next()} className="p-2 rounded-full bg-white/20 text-white">▶</button>
      </div>
    </div>
  );
}
