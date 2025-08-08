import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader as Ladder, HardHat, Wrench, Droplets, Shield, Cog } from 'lucide-react';
import CategoryCard from '../components/CategoryCard';

const Categories = () => {
  // ===== HOOK DE NAVEGAÇÃO =====
  // Hook do React Router para navegação entre páginas
  const navigate = useNavigate();

  // ===== DADOS DAS CATEGORIAS =====
  // Array contendo todas as categorias de produtos disponíveis
  const categories = [
    {
      name: 'Ladders',
      description: 'Professional ladders for industrial maintenance and construction work.',
      icon: Ladder,
      itemCount: 15,
      onClick: () => navigate('/products')
    },
    {
      name: 'Construction Machinery',
      description: 'Heavy-duty construction equipment and machinery for large projects.',
      icon: Cog,
      itemCount: 23,
      onClick: () => navigate('/products')
    },
    {
      name: 'Cement Tools',
      description: 'Specialized tools and equipment for cement and concrete work.',
      icon: HardHat,
      itemCount: 18,
      onClick: () => navigate('/products')
    },
    {
      name: 'Lubricants & Sealants',
      description: 'Industrial lubricants, oils, and sealants for machinery maintenance.',
      icon: Droplets,
      itemCount: 32,
      onClick: () => navigate('/products')
    },
    {
      name: 'Safety Gear',
      description: 'Personal protective equipment for industrial and construction environments.',
      icon: Shield,
      itemCount: 27,
      onClick: () => navigate('/products')
    },
    {
      name: 'Industrial Accessories',
      description: 'Essential accessories and components for industrial applications.',
      icon: Wrench,
      itemCount: 41,
      onClick: () => navigate('/products')
    }
  ];

  return (
    <div className="min-h-screen page-content">
      {/* ===== SEÇÃO HERO - CABEÇALHO PRINCIPAL ===== */}
      {/* Seção principal com título e descrição da página de categorias */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Product Categories</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Browse our comprehensive range of industrial products organized by category.
          </p>
        </div>
      </section>

      {/* ===== SEÇÃO GRADE DE CATEGORIAS ===== */}
      {/* Seção que exibe todas as categorias em formato de grid responsivo */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <div 
                key={category.name}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CategoryCard {...category} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SEÇÃO ESTATÍSTICAS ===== */}
      {/* Seção que exibe números e estatísticas sobre o portfólio de produtos */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Product Range
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive industrial solutions across multiple categories.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-red-600 mb-2">156+</div>
              <div className="text-gray-600">Total Products</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-red-600 mb-2">6</div>
              <div className="text-gray-600">Categories</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-red-600 mb-2">50+</div>
              <div className="text-gray-600">Brands</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-red-600 mb-2">10+</div>
              <div className="text-gray-600">Years Experience</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Categories;