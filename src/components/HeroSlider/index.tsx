// src/components/HeroSlider/index.tsx
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useAutoSlide } from "../..//hooks/useAutoSlide";
import type { HeroSlide } from "../../types";

type Props = {
  slides: HeroSlide[];
  delay?: number;
  heightClass?: string;
};

const HeroSlider: React.FC<Props> = ({ slides, delay = 5000, heightClass = "h-[70vh]" }) => {
  const { index, next, prev, goTo, pause, resume } = useAutoSlide(slides.length, delay, false);
  const current = index;

  return (
    <section
      className={`relative overflow-hidden ${heightClass}`}
      aria-roledescription="carousel"
      aria-label="Hero slider"
    >
      <div
        className="relative h-full"
        onMouseEnter={pause}
        onMouseLeave={resume}
        onFocus={pause}
        onBlur={resume}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") prev();
          if (e.key === "ArrowRight") next();
        }}
      >
        {slides.map((s, i) => (
          <div
            key={s.id}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} de ${slides.length}: ${s.title}`}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              i === current ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            {/* imagem de fundo */}
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${s.image})` }}
              aria-hidden
            >
              <div className="absolute inset-0 bg-black/50" />
            </div>

            {/* conteúdo */}
            <div className="relative z-10 flex items-center h-full">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="max-w-3xl">
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 text-white">
                    {s.title}
                  </h1>
                  {s.subtitle && (
                    <h2 className="text-lg md:text-xl lg:text-2xl font-medium mb-4 text-white/90">
                      {s.subtitle}
                    </h2>
                  )}
                  <p className="text-base md:text-lg lg:text-xl text-gray-200 mb-8 leading-loose">
                    {s.description}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4">
                    {s.buttons.map((b, idx) => (
                      <Link
                        key={idx}
                        to={b.link}
                        className={`inline-flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition transform hover:scale-105 ${
                          b.variant === "primary"
                            ? "bg-red-600 hover:bg-red-700 text-white"
                            : "bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900"
                        }`}
                      >
                        {b.text}
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* navegação */}
      <button
        aria-label="Anterior"
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/20 text-white"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        aria-label="Próximo"
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/20 text-white"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* indicadores */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            aria-label={`Ir para slide ${i + 1}`}
            aria-current={i === current ? "true" : undefined}
            onClick={() => goTo(i)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              i === current ? "bg-red-500 scale-125" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default React.memo(HeroSlider);
