import React, { useEffect, useState } from 'react';
import { Search, Filter } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { Product } from '../types';
import { apiFetch } from '../services/api';
import { useLocation } from 'react-router-dom';


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
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [subcats, setSubcats] = useState<any[]>([]);
  const [isLoadingMeta, setIsLoadingMeta] = useState(false);
  const [errorMeta, setErrorMeta] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cat = params.get('category');
    if (cat) {
      setSelectedCategory(cat);
      setSelectedSubcategory('');
    }
  }, [location.search]);

  // ===== BUSCAR CATEGORIAS E SUBCATEGORIAS (API) =====
  useEffect(() => {
    async function loadMeta() {
      setIsLoadingMeta(true);
      setErrorMeta(null);
      try {
        // Subcategorias (endpoint público com paginação) — sem Authorization
        const subRes = await apiFetch('/subcategories?isActive=true&limit=100', { noAuth: true });
        const subPayload = subRes?.data || subRes; // SuccessResponseDto -> { data, pagination }
        const subArray = subPayload?.data || [];
        setSubcats(subArray);

        // Derivar categorias a partir das subcategorias (sem 401)
        const uniqueCats = new Map<string, string>();
        subArray.forEach((s: any) => {
          const catId = s.category?.id || s.categoryId;
          const catName = s.category?.name;
          if (catId && catName && !uniqueCats.has(catName)) {
            uniqueCats.set(catName, catId);
          }
        });
        setCategories(Array.from(uniqueCats.keys()).map((name) => ({ id: uniqueCats.get(name) as string, name })));
      } catch (e: any) {
        setErrorMeta(e.message || 'Falha ao carregar categorias');
      } finally {
        setIsLoadingMeta(false);
      }
    }
    loadMeta();
  }, []);

  // ===== BUSCA DE PRODUTOS VIA API =====
  const [items, setItems] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      setIsLoading(true);
      setError(null);
      try {
        const url = new URL('/products', 'http://local'); // base dummy para URL API
        // filtros
        if (searchTerm) url.searchParams.set('search', searchTerm);
        // mapear nomes para IDs para filtrar no servidor
        const selectedCatObj = categories.find((c) => c.name === selectedCategory);
        if (selectedCatObj && selectedCategory !== 'All') {
          url.searchParams.set('categoryId', selectedCatObj.id);
        }
        const selectedSubObj = subcats.find((s: any) => s.name === selectedSubcategory);
        if (selectedSubObj) {
          url.searchParams.set('subcategoryId', selectedSubObj.id);
        }
        // Deixe a API aplicar paginação padrão; não enviar page/limit

        const data = await apiFetch(url.pathname + '?' + url.searchParams.toString());
        const list: any[] = data?.data || [];
        // Mapear do formato da API para o tipo Product usado pelo UI
        const mapped: Product[] = list.map((p: any) => ({
          id: p.id || p._id || String(p.code || p.name),
          name: p.name,
          description: p.description || '',
          category: p.subcategory?.category?.name || p.category?.name || 'Categoria',
          subcategory_name: p.subcategory?.name,
          brand: p.brand?.name,
          model: p.model,
          cod: p.code,
          availability: p.isActive ? 'Em Estoque' : 'Indisponível',
          image: p.images?.[0] || p.thumbnail || 'https://via.placeholder.com/300x300?text=Produto',
          images: p.images || (p.thumbnail ? [p.thumbnail] : undefined),
          features: p.features,
          price: p.price,
        }));
        setItems(mapped);
      } catch (e: any) {
        setError(e.message || 'Falha ao carregar produtos');
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, [searchTerm, selectedCategory, selectedSubcategory]);

  // ===== LÓGICA DE FILTRAGEM (client-side) =====
  const filteredProducts: Product[] = items.filter(product => {
    const matchesSearch = !searchTerm || product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (product.description || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSubcategory = !selectedSubcategory || product.subcategory_name === selectedSubcategory || product.subcategory_name === (selectedSubcategory as any);
    return matchesSearch && matchesCategory && matchesSubcategory;
  });

  const filteredSubcategories = subcats.filter((subcategory: any) => {
    const matchesCategory = selectedCategory !== 'All' && (subcategory.category?.name === selectedCategory);
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
                {categories.map(category => (
                  <option key={category.id} value={category.name}>{category.name}</option>
                ))}
              </select>
            </div>
          </div>
          {/* Lista de Subcategorias */}
          {isLoadingMeta ? (
            <div className="mt-4 text-sm text-gray-500">Carregando categorias...</div>
          ) : errorMeta ? (
            <div className="mt-4 text-sm text-red-600">{errorMeta}</div>
          ) : filteredSubcategories.length === 0 ? (<></>) : (
              <>
                {/* ==== CARD DE SUBCATEGORIAS ==== */}
                <div className="flex flex-wrap w-full gap-2 mt-4">
                  {filteredSubcategories.map((subcategory, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedSubcategory(subcategory.name)}
                      className={`px-4 py-2 rounded 
                        ${selectedSubcategory === subcategory.name 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-gray-200 text-gray-700'} 
                        transition-colors duration-200`}
                    >
                      {subcategory.name}
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
              {isLoading ? (
                <div className="text-center py-16">
                  <p className="text-xl text-gray-600">Carregando produtos...</p>
                </div>
              ) : error ? (
                <div className="text-center py-16">
                  <p className="text-xl text-red-600">{error}</p>
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-xl text-gray-600">
                    No products found matching your criteria.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-[repeat(auto-fill,_minmax(10rem,_12rem))] gap-[20px]">
                  {filteredProducts.map((product, index) => (
                    <div
                      key={product.id}
                      className="animate-fade-in-up"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <ProductCard id={product.id} name={product.name} image={product.image} category={product.category} />
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