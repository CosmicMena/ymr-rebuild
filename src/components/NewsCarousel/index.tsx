// src/components/NewsCarousel/index.tsx
import React from "react";
import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import type { NewsSlide } from "../../types";
import { useAutoSlide } from "../../hooks/useAutoSlide";

type Props = { slides: NewsSlide[]; delay?: number; height?: string };

export default function NewsCarousel({ slides, delay = 6000, height = "h-[20rem]" }: Props) {
  const { index, pause, resume, goTo } = useAutoSlide(slides.length, delay, false);

  return (
    <div
      className={`relative ${height} w-full bg-[#e6e6e6] rounded-xl`}
      onMouseEnter={pause}
      onMouseLeave={resume}
      aria-live="polite"
    >
      {slides.map((n, i) => (
        <article
          key={n.id}
          className={`absolute inset-0 p-5 transition-opacity duration-500 ${
            i === index ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <img
            src={n.image}
            alt={n.title}
            className="w-full h-32 object-cover rounded-lg mb-3"
            loading="lazy"
          />
          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mb-2">
            {n.category}
          </span>
          <h4 className="font-semibold text-sm mb-2 line-clamp-1">{n.title}</h4>
          <p className="text-xs text-gray-600 mb-3 line-clamp-2">{n.summary}</p>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">{n.date}</span>
            <Link
              to={n.link}
              className="text-blue-600 hover:text-blue-800 text-xs font-medium flex items-center gap-1"
            >
              Ler mais <ExternalLink className="h-3 w-3" />
            </Link>
          </div>
        </article>
      ))}

      {/* Dots fixados no bottom */}
      <div className="absolute bottom-4 w-full flex justify-center gap-2 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`w-2 h-2 rounded-full cursor-pointer ${
              i === index ? "bg-blue-500" : "bg-gray-300"
            }`}
            aria-label={`Ir para slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
