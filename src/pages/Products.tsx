import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import { featuredCategories } from '../data/featuredCategories'
import { subcategories } from '../data/subcategories'


import { productSlides } from "../data/productSlides";
import { gif } from "../data/gif";
import AsideGif from "../components/AsideGif";
import ProductMiniSlider from '../components/ProductMiniSlider';
import AsideVerticalSlider from '../components/AsideVerticalSlider';
 
const Products = () => {
  // ===== ESTADOS PARA FILTROS =====
  // Estados para controlar a busca e filtro por categoria
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');

  // ===== DADOS DAS CATEGORIAS =====
  // Array contendo todas as categorias disponíveis para filtro

  // ===== LÓGICA DE FILTRAGEM =====
  // Filtra os produtos com base no termo de busca e categoria selecionada
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSubcategory = !selectedSubcategory || product.subcategory_name === selectedSubcategory;
    return matchesSearch && matchesCategory && matchesSubcategory;
  });

  const filteredSubcategories = subcategories.filter(subcategory => {
    const matchesCategory = selectedCategory !== 'All' && subcategory.category === selectedCategory;
    return matchesCategory;
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
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setSelectedSubcategory(''); // Reseta subcategoria ao mudar categoria
                }}
              >
                <option key="0" value="All">Selecionar categoria</option>
                {featuredCategories.map(category => (
                  <option key={category.id} value={category.name}>{category.name}</option>
                ))}
              </select>
            </div>
          </div>
          {/* Lista de Subcategorias */}
          {filteredSubcategories.length === 0 ? (<></>) : (
              <>
                {/* ==== CARD DE SUBCATEGORIAS ==== */}
                <div className="flex flex-wrap w-full gap-2 mt-4">
                  {filteredSubcategories.map((subcategory, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedSubcategory(subcategory.subcategory_name)}
                      className={`px-4 py-2 rounded 
                        ${selectedSubcategory === subcategory.subcategory_name 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-gray-200 text-gray-700'} 
                        transition-colors duration-200`}
                    >
                      {subcategory.subcategory_name}
                    </button>
                  ))}
                </div>
              </>
            )}
        </div>
      </section>
      
      {/* ===== SEÇÃO GRADE DE PRODUTOS ===== */}
      {/* Seção que exibe os produtos filtrados em formato de grid responsivo */}
      <section className="py-2 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <p className="text-lg text-gray-600">
              Showing {filteredProducts.length} products
              {selectedCategory !== 'All' && ` in ${selectedCategory}`}
              {searchTerm && ` matching "${searchTerm}"`}
            </p>
          </div>
          <div className="w-full px-4 flex flex-col lg:flex-row gap-8">
            {/* Conteúdo Principal */}
            <div className="flex-1 min-w-0 lg:max-w-[1000px]">
              {filteredProducts.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-xl text-gray-600">
                    No products found matching your criteria.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-[repeat(auto-fill,_minmax(10rem,_12rem))] gap-[20px]">
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
              )}
            </div>

            {/* Aside Publicitário */}
            <aside className="min-w-[320px] max-w-xs lg:flex-shrink-0 space-y-6">
              <ProductMiniSlider slides={productSlides} />
              <AsideGif img={gif.img} title={gif.title} />
              <AsideVerticalSlider
                images={[
                  "https://ymrindustrial.com/assets/aside/wtl.png",
                  "https://ymrindustrial.com/assets/aside/04.png",
                  "https://ymrindustrial.com/assets/aside/jetlubes.png",
                ]}
              />
            </aside>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Products;