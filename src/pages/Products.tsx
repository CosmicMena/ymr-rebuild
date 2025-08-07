import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import ProductCard from '../components/ProductCard';

const Products = () => {
  // ===== ESTADOS PARA FILTROS =====
  // Estados para controlar a busca e filtro por categoria
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // ===== DADOS DAS CATEGORIAS =====
  // Array contendo todas as categorias disponíveis para filtro
  const categories = ['All', 'Ladders', 'Construction', 'Lubricants', 'Safety Gear', 'Tools', 'Machinery'];

  // ===== DADOS DOS PRODUTOS =====
  // Array contendo todos os produtos disponíveis na loja
  const products = [
    {
      name: 'Aluminum Safety Ladder',
      description: 'High-durability ladder with non-slip feet, ideal for industrial maintenance and construction work.',
      image: 'https://images.pexels.com/photos/5691924/pexels-photo-5691924.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'Ladders'
    },
    {
      name: 'Industrial Concrete Mixer',
      description: 'Heavy-duty concrete mixer perfect for construction sites and large-scale projects.',
      image: 'https://images.pexels.com/photos/1198817/pexels-photo-1198817.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'Construction'
    },
    {
      name: 'Premium Hydraulic Oil',
      description: 'High-performance hydraulic fluid for industrial machinery and equipment.',
      image: 'https://images.pexels.com/photos/4489702/pexels-photo-4489702.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'Lubricants'
    },
    {
      name: 'Industrial Safety Helmet',
      description: 'Professional-grade safety helmet with ventilation system for worker protection.',
      image: 'https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'Safety Gear'
    },
    {
      name: 'Heavy-Duty Work Gloves',
      description: 'Cut-resistant work gloves designed for industrial and construction environments.',
      image: 'https://images.pexels.com/photos/5691673/pexels-photo-5691673.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'Safety Gear'
    },
    {
      name: 'Industrial Power Drill',
      description: 'High-torque power drill suitable for heavy-duty industrial applications.',
      image: 'https://images.pexels.com/photos/5691661/pexels-photo-5691661.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'Tools'
    },
    {
      name: 'Telescopic Extension Ladder',
      description: 'Adjustable telescopic ladder with safety locks for versatile industrial use.',
      image: 'https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'Ladders'
    },
    {
      name: 'Industrial Sealant',
      description: 'Weather-resistant industrial sealant for construction and maintenance applications.',
      image: 'https://images.pexels.com/photos/4489702/pexels-photo-4489702.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'Lubricants'
    },
    {
      name: 'Portable Cement Mixer',
      description: 'Compact and portable cement mixer ideal for small to medium construction projects.',
      image: 'https://images.pexels.com/photos/1198817/pexels-photo-1198817.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'Construction'
    },
    {
      name: 'Safety Vest High-Vis',
      description: 'High-visibility safety vest with reflective strips for worker safety.',
      image: 'https://images.pexels.com/photos/5691673/pexels-photo-5691673.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'Safety Gear'
    },
    {
      name: 'Industrial Angle Grinder',
      description: 'Heavy-duty angle grinder for cutting and grinding industrial materials.',
      image: 'https://images.pexels.com/photos/5691661/pexels-photo-5691661.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'Tools'
    },
    {
      name: 'Excavator Hydraulic Fluid',
      description: 'Specialized hydraulic fluid for excavators and heavy construction machinery.',
      image: 'https://images.pexels.com/photos/4489702/pexels-photo-4489702.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'Lubricants'
    }
  ];

  // ===== LÓGICA DE FILTRAGEM =====
  // Filtra os produtos com base no termo de busca e categoria selecionada
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen page-content">
      {/* ===== SEÇÃO HERO - CABEÇALHO PRINCIPAL ===== */}
      {/* Seção principal com título e descrição da página de produtos */}
      <section className="bg-gradient-to-r from-red-600 to-red-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Products</h1>
          <p className="text-xl text-red-100 max-w-2xl mx-auto">
            Discover our comprehensive range of industrial tools, equipment, and solutions.
          </p>
        </div>
      </section>

      {/* ===== SEÇÃO FILTROS ===== */}
      {/* Seção que contém os controles de busca e filtro por categoria */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Campo de Busca */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filtro por Categoria */}
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-gray-500" />
              <select
                className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SEÇÃO GRADE DE PRODUTOS ===== */}
      {/* Seção que exibe os produtos filtrados em formato de grid responsivo */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-gray-600">No products found matching your criteria.</p>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <p className="text-lg text-gray-600">
                  Showing {filteredProducts.length} products
                  {selectedCategory !== 'All' && ` in ${selectedCategory}`}
                  {searchTerm && ` matching "${searchTerm}"`}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredProducts.map((product, index) => (
                  <div 
                    key={product.name}
                    className="animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <ProductCard {...product} />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Products;