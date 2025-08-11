// src/components/ProductMiniSlider/index.tsx
import React from "react";
import { Link } from "react-router-dom";
import type { ProductSlide } from "../../types";
import { useAutoSlide } from "../../hooks/useAutoSlide";

import { ArrowRight, TrendingUp } from 'lucide-react';

type Props = { slides: ProductSlide[]; delay?: number;  };

export default function ProductMiniSlider({ slides, delay = 4000}: Props) {
  const { index, pause, resume } = useAutoSlide(slides.length, delay, false);

  return (<>
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-gray-900 to-gray-700 text-white p-4">
        <h3 className="font-bold flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Produtos em Destaque
        </h3>
        <div className="relative h-48 w-full" onMouseEnter={pause} onMouseLeave={resume}>
          {slides.map((p, i) => (
            <div key={p.id} className={`absolute inset-0 p-2 transition-opacity duration-500 ${i === index ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
              <div className="relative">
                {p.badge && (
                  <span className="absolute top-2 left-2 z-10 bg-red-500 text-white text-xs px-1 py-1 rounded">
                    {p.badge}
                  </span>
                )}
                <img src={p.image} alt={p.name} className="w-full h-[11rem] object-cover rounded-lg mb-3" loading="lazy" />
                <h4 className="font-semibold text-sm mb-1">{p.name}</h4>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center py-3 gap-2">
          <div className="p-4 py-1 pt-0">
            <Link 
              to="/products"
              className="w-full mt-[2rem] bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-colors"
            >
              Ver Mais Produtos
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>   
      </div> 
    </div>
      </>
  );
}