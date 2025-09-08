import { useEffect, useState } from 'react';
import { Search, Filter, Package, Grid3X3, Users, Award } from 'lucide-react';
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
    const search = params.get('search');
    
    if (cat) {
      setSelectedCategory(cat);
      setSelectedSubcategory('');
    }
    
    if (search) {
      setSearchTerm(search);
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
      <section className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white py-24 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Package className="h-5 w-5" />
              <span className="text-sm font-medium">Our Products</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Nossos Produtos
            </h1>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-8">
              Descubra nossa gama abrangente de ferramentas industriais, equipamentos e soluções para suas necessidades.
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Package className="h-6 w-6 text-blue-400" />
                  <span className="text-2xl font-bold">{filteredProducts.length}</span>
                </div>
                <p className="text-sm text-gray-300">Produtos Disponíveis</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Grid3X3 className="h-6 w-6 text-yellow-400" />
                  <span className="text-2xl font-bold">{categories.length}</span>
                </div>
                <p className="text-sm text-gray-300">Categorias</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Award className="h-6 w-6 text-green-400" />
                  <span className="text-2xl font-bold">98%</span>
                </div>
                <p className="text-sm text-gray-300">Disponibilidade</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SEÇÃO FILTROS ===== */}
      {/* Seção que contém os controles de busca e filtro por categoria */}
      <section className="py-8 bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-2 bg-blue-100 rounded-full px-4 py-2 mb-4">
              <Search className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium text-blue-800">Buscar e Filtrar</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Encontre o Produto Ideal</h2>
            <p className="text-gray-600">Use os filtros abaixo para encontrar exatamente o que precisa</p>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-center">
            {/* Campo de Busca */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Buscar produtos..."
                className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            {/* Filtro por Categoria */}
            <div className="flex items-center gap-3">
              <div className="bg-blue-50 p-3 rounded-xl">
                <Filter className="h-5 w-5 text-blue-600" />
              </div>
              <select
                className="border border-gray-300 rounded-xl px-6 py-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm min-w-[200px]"
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setSelectedSubcategory(''); // Reseta subcategoria ao mudar categoria
                }}
              >
                <option key="0" value="All">Todas as categorias</option>
                {categories.map(category => (
                  <option key={category.id} value={category.name}>{category.name}</option>
                ))}
              </select>
            </div>
          </div>
          {/* Lista de Subcategorias */}
          {isLoadingMeta ? (
            <div className="mt-8 text-center">
              <div className="inline-flex items-center px-4 py-2 bg-blue-50 rounded-full">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                <span className="text-sm text-blue-600">Carregando categorias...</span>
              </div>
            </div>
          ) : errorMeta ? (
            <div className="mt-8 text-center">
              <div className="inline-flex items-center px-4 py-2 bg-red-50 rounded-full">
                <span className="text-sm text-red-600">{errorMeta}</span>
              </div>
            </div>
          ) : filteredSubcategories.length === 0 ? (<></>) : (
              <>
                {/* ==== CARD DE SUBCATEGORIAS ==== */}
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">Subcategorias</h3>
                  <div className="flex flex-wrap justify-center gap-3">
                    {filteredSubcategories.map((subcategory, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedSubcategory(subcategory.name)}
                        className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${
                          selectedSubcategory === subcategory.name 
                            ? 'bg-blue-600 text-white shadow-lg' 
                            : 'bg-white text-gray-700 border border-gray-300 hover:border-blue-300 hover:bg-blue-50'
                        }`}
                      >
                        {subcategory.name}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
        </div>
      </section>
      
      {/* ===== SEÇÃO GRADE DE PRODUTOS ===== */}
      {/* Seção que exibe os produtos filtrados em formato de grid responsivo */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-green-100 rounded-full px-4 py-2 mb-4">
              <Package className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium text-green-800">Resultados da Busca</span>
            </div>
            <div className="bg-gray-50 rounded-2xl p-6 max-w-2xl mx-auto">
              <p className="text-lg font-semibold text-gray-900">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'produto encontrado' : 'produtos encontrados'}
              </p>
              {selectedCategory !== 'All' && (
                <p className="text-gray-600 mt-1">na categoria <span className="font-medium text-blue-600">{selectedCategory}</span></p>
              )}
              {searchTerm && (
                <p className="text-gray-600 mt-1">correspondendo a <span className="font-medium text-blue-600">"{searchTerm}"</span></p>
              )}
            </div>
          </div>
          <div className="w-full px-4 flex flex-col lg:flex-row gap-8">
            {/* Conteúdo Principal */}
            <div className="flex-1 min-w-0 lg:max-w-[1000px]">
              {isLoading ? (
                <div className="text-center py-20">
                  <div className="inline-flex items-center space-x-3 bg-blue-50 rounded-2xl px-8 py-6">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    <p className="text-xl text-blue-600 font-medium">Carregando produtos...</p>
                  </div>
                </div>
              ) : error ? (
                <div className="text-center py-20">
                  <div className="bg-red-50 rounded-2xl p-8 max-w-md mx-auto">
                    <div className="text-red-600 mb-4">
                      <Package className="h-12 w-12 mx-auto" />
                    </div>
                    <p className="text-xl text-red-600 font-medium">{error}</p>
                    <button 
                      onClick={() => window.location.reload()} 
                      className="mt-4 bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Tentar Novamente
                    </button>
                  </div>
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="text-center py-20">
                  <div className="bg-gray-50 rounded-2xl p-8 max-w-md mx-auto">
                    <div className="text-gray-400 mb-4">
                      <Search className="h-12 w-12 mx-auto" />
                    </div>
                    <p className="text-xl text-gray-600 font-medium mb-2">
                      Nenhum produto encontrado
                    </p>
                    <p className="text-gray-500">
                      Tente ajustar seus critérios de busca
                    </p>
                  </div>
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
            <aside className="min-w-[320px] max-w-xs lg:flex-shrink-0 space-y-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200">
                <h3 className="text-lg font-semibold text-blue-900 mb-4">Produtos em Destaque</h3>
                <ProductMiniSlider slides={productSlides} />
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border border-green-200">
                <h3 className="text-lg font-semibold text-green-900 mb-4">Ofertas Especiais</h3>
                <AsideGif img={gif.img} title={gif.title} />
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border border-purple-200">
                <h3 className="text-lg font-semibold text-purple-900 mb-4">Marcas Parceiras</h3>
                <AsideVerticalSlider
                  images={[
                    "https://ymrindustrial.com/assets/aside/wtl.png",
                    "https://ymrindustrial.com/assets/aside/04.png",
                    "https://ymrindustrial.com/assets/aside/jetlubes.png",
                  ]}
                />
              </div>
            </aside>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Products;