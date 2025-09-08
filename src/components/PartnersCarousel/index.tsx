import React, { useEffect, useRef } from 'react';
import { partners } from '../../data/partners';
import { ExternalLink, Building2 } from 'lucide-react';

const PartnersCarousel = () => {
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    let animationId: number;
    let position = 0;
    const speed = 0.3; // pixels per frame - mais lento para melhor visualização
    const itemWidth = 220; // width of each logo item
    const gap = 32; // gap between items
    const totalWidth = (itemWidth + gap) * partners.length;

    const animate = () => {
      position -= speed;
      
      // Reset position when we've scrolled past all items
      if (Math.abs(position) >= totalWidth) {
        position = 0;
      }
      
      carousel.style.transform = `translateX(${position}px)`;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return (
    <div className="relative overflow-hidden">
      {/* Cabeçalho da Seção */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center space-x-2 bg-blue-100 dark:bg-blue-900/30 rounded-full px-4 py-2 mb-6">
          <Building2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <span className="text-sm font-medium text-blue-800 dark:text-blue-200">Parceiros</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Nossos Parceiros de Confiança
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Trabalhamos com as melhores marcas do mercado para oferecer produtos de alta qualidade e confiabilidade.
        </p>
      </div>

      {/* Carrossel Container */}
      <div className="relative">
        <div 
          ref={carouselRef}
          className="flex items-center space-x-8"
          style={{ width: 'max-content' }}
        >
          {/* Duplicar os itens para criar loop infinito */}
          {[...partners, ...partners].map((partner, index) => (
            <div
              key={`${partner.id}-${index}`}
              className="flex-shrink-0 group"
            >
              <div className="w-56 h-32 bg-white dark:bg-gray-800 rounded-2xl flex items-center justify-center border-2 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-500 transition-all duration-300 hover:shadow-xl group-hover:scale-105 shadow-lg">
                <div className="text-center p-4">
                  <div className="text-lg font-bold text-gray-700 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 mb-2">
                    {partner.name}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    {partner.category}
                  </div>
                  {partner.website && (
                    <a
                      href={partner.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-xs font-medium transition-colors duration-200"
                    >
                      <span>Visitar</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Overlay gradients para efeito de fade nas bordas */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-gray-50 dark:from-gray-800 to-transparent pointer-events-none z-10"></div>
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-gray-50 dark:from-gray-800 to-transparent pointer-events-none z-10"></div>
    </div>
  );
};

export default PartnersCarousel;
