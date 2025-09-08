// src/components/PromoPopup/index.tsx
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

type Props = { open: boolean; onClose: () => void };

export default function PromoPopup({ open, onClose }: Props) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-2xl max-w-md w-full relative overflow-hidden">
        <button onClick={onClose} className="absolute top-4 right-4 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full p-2">✕</button>
        <img src="https://images.pexels.com/photos/promo-vertical/pexels-photo-promo-vertical.jpeg" alt="Promoção Especial" className="w-full h-64 object-cover" loading="lazy" />
        <div className="p-6">
          <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">OFERTA ESPECIAL!</h3>
          <p className="text-sm mb-4 text-gray-700 dark:text-gray-300">Até 30% de desconto em produtos selecionados</p>
          <Link to="/promotions" onClick={onClose} className="w-full bg-red-600 text-white py-3 rounded-lg inline-flex items-center justify-center gap-2">
            Ver Ofertas <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
