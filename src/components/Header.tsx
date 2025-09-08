import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, User, ShoppingCart, X, ArrowRight } from 'lucide-react';
import { useAuth } from '../../src/context/AuthContext';
import { useCart } from '../../src/context/CartContext';
import { apiFetch } from '../services/api';


const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user } = useAuth();
  const { cartCount } = useCart();
  const [currentLanguage, setCurrentLanguage] = useState('pt');
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ===== CARREGAR CATEGORIAS DA API =====
  useEffect(() => {
    async function loadCategories() {
      setIsLoadingCategories(true);
      try {
        // Carregar subcategorias para derivar categorias
        const subRes = await apiFetch('/subcategories?isActive=true&limit=100', { noAuth: true });
        const subPayload = subRes?.data || subRes;
        const subArray = subPayload?.data || [];
        
        // Derivar categorias únicas das subcategorias
        const uniqueCats = new Map<string, string>();
        subArray.forEach((s: any) => {
          const catId = s.category?.id || s.categoryId;
          const catName = s.category?.name;
          if (catId && catName && !uniqueCats.has(catName)) {
            uniqueCats.set(catName, catId);
          }
        });
        
        const categoriesList = Array.from(uniqueCats.keys()).map((name) => ({ 
          id: uniqueCats.get(name) as string, 
          name 
        }));
        setCategories(categoriesList);
      } catch (e: any) {
        console.error('Erro ao carregar categorias:', e.message);
        // Fallback para categorias hardcoded em caso de erro
        setCategories([
          { id: '1', name: 'Adesivos, Selantes e Fitas' },
          { id: '2', name: 'Equipamentos de Pintura' },
          { id: '3', name: 'EPIs' },
          { id: '4', name: 'Ferramentas' },
          { id: '5', name: 'Instrumentos de teste' },
          { id: '6', name: 'Lubrificantes' }
        ]);
      } finally {
        setIsLoadingCategories(false);
      }
    }
    loadCategories();
  }, []);

  // ===== BUSCA EM TEMPO REAL COM DEBOUNCE =====
  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchTerm.trim().length >= 2) {
        setIsSearching(true);
        setHasSearched(true);
        try {
          const url = new URL('/products', 'http://local');
          url.searchParams.set('search', searchTerm.trim());
          url.searchParams.set('limit', '2'); // Limitar a 2 resultados
          
          const selectedCatObj = categories.find((c) => c.name === selectedCategory);
          if (selectedCatObj && selectedCategory !== 'All') {
            url.searchParams.set('categoryId', selectedCatObj.id);
          }

          const data = await apiFetch(url.pathname + '?' + url.searchParams.toString());
          const list: any[] = data?.data || [];
          
          const mapped = list.map((p: any) => ({
            id: p.id || p._id || String(p.code || p.name),
            name: p.name,
            description: p.description || '',
            category: p.subcategory?.category?.name || p.category?.name || 'Categoria',
            image: p.images?.[0] || p.thumbnail || 'https://via.placeholder.com/60x60?text=Produto',
            brand: p.brand?.name,
            price: p.price,
          }));
          
          setSearchResults(mapped);
          setShowSearchDropdown(true);
        } catch (e: any) {
          console.error('Erro na busca:', e.message);
          setSearchResults([]);
          setShowSearchDropdown(true);
        } finally {
          setIsSearching(false);
        }
      } else {
        setSearchResults([]);
        setShowSearchDropdown(false);
        setHasSearched(false);
      }
    }, 300); // Debounce de 300ms

    return () => clearTimeout(timeoutId);
  }, [searchTerm, selectedCategory, categories]);

  // ===== FECHAR DROPDOWN AO CLICAR FORA =====
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchDropdown(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // ===== LINKS DA PRIMEIRA NAVBAR =====
  const primaryNavItems = [
    { to: '/', label: 'Home' },
    { to: '/contact', label: 'Contact' },
    { to: '/about', label: 'About Us' },
    { to: '/services', label: 'Services' },
  ];

  // ===== DADOS DOS IDIOMAS =====
  // Array contendo as opções de idioma disponíveis
  const languages = [
    { code: 'pt', flagUrl: 'https://flagcdn.com/w40/pt.png', alt: 'Português' },
    { code: 'en', flagUrl: 'https://flagcdn.com/w40/gb.png', alt: 'English' }
  ];

  // ===== FUNÇÕES DE MANIPULAÇÃO =====
  // Função para alternar o menu de idiomas
  function toggleLanguageMenu() {
    setIsLanguageOpen(!isLanguageOpen);
  }

  function selectLanguage(code: string) {
    setCurrentLanguage(code);
    setIsLanguageOpen(false);
  }

  // Função para lidar com a busca
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim() || searchResults.length === 0) return;
    
    // Construir URL com parâmetros de busca
    const searchParams = new URLSearchParams();
    searchParams.set('search', searchTerm.trim());
    if (selectedCategory && selectedCategory !== 'All') {
      searchParams.set('category', selectedCategory);
    }
    
    // Redirecionar para página de produtos com parâmetros
    navigate(`/products?${searchParams.toString()}`);
    setShowSearchDropdown(false);
  };

  // Função para limpar busca
  const clearSearch = () => {
    setSearchTerm('');
    setSearchResults([]);
    setShowSearchDropdown(false);
    setHasSearched(false);
  };

  // Função para ver mais resultados
  const handleViewMore = () => {
    const searchParams = new URLSearchParams();
    searchParams.set('search', searchTerm.trim());
    if (selectedCategory && selectedCategory !== 'All') {
      searchParams.set('category', selectedCategory);
    }
    
    navigate(`/products?${searchParams.toString()}`);
    setShowSearchDropdown(false);
  };

  

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* ===== PRIMEIRA NAVBAR - NAVEGAÇÃO PRINCIPAL ===== */}
      {/* Navbar superior com fundo azul escuro e navegação principal */}
      <div className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-12">
            {/* Primeira Div - Links de Navegação com sublinhado gradiente animado */}
            <div className="relative flex items-center space-x-6">
              {primaryNavItems.map((item) => {
                const isActive = location.pathname === item.to;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`relative text-sm font-medium transition-colors hover:text-blue-200 ${isActive ? 'text-blue-100' : ''} after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-gradient-to-r after:from-blue-300 after:to-blue-500 after:rounded-full after:transition-all after:duration-300 ${isActive ? 'after:w-full' : 'after:w-0 hover:after:w-full'}`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>

            {/* Segunda Div - Catálogo, Conta e Idioma */}
            <div className="flex items-center space-x-4">
              <Link
                to="/catalog"
                className={`relative text-sm font-medium transition-colors hover:text-blue-200 ${location.pathname === '/catalog' ? 'text-blue-100' : ''} after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-gradient-to-r after:from-blue-300 after:to-blue-500 after:rounded-full after:transition-all after:duration-300 ${location.pathname === '/catalog' ? 'after:w-full' : 'after:w-0 hover:after:w-full'}`}
              >
                Catalog
              </Link>
              
              {/* Conta, Login/Logout */}
              <div className="flex items-center gap-3">
                {!isAuthenticated ? (
                  <Link
                    to="/login"
                    className={`relative text-sm font-medium transition-colors hover:text-blue-200 ${location.pathname === '/login' ? 'text-blue-100' : ''} after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-gradient-to-r after:from-blue-300 after:to-blue-500 after:rounded-full after:transition-all after:duration-300 ${location.pathname === '/login' ? 'after:w-full' : 'after:w-0 hover:after:w-full'}`}
                  >
                    Login
                  </Link>
                ) : (
                  <></>
                )}
                {isAuthenticated && (
                  <Link
                    to="/UserProfile"
                    className={`relative flex items-center space-x-1 text-sm font-medium transition-colors hover:text-blue-200 ${location.pathname === '/UserProfile' ? 'text-blue-100' : ''} after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-gradient-to-r after:from-blue-300 after:to-blue-500 after:rounded-full after:transition-all after:duration-300 ${location.pathname === '/UserProfile' ? 'after:w-full' : 'after:w-0 hover:after:w-full'}`}
                  >
                    <User className="h-4 w-4" />
                    <span>{user?.name?.split(' ')[0] || 'Conta'}</span>
                  </Link>
                )}
              </div>

              {/* Seletor de Idioma */}
              <div className="relative inline-block text-left">
                {/* Botão que mostra a bandeira atual */}
                <button
                  onClick={toggleLanguageMenu}
                  className="flex items-center space-x-1 text-sm font-medium hover:text-blue-700 transition-colors z-[9999]"
                  aria-haspopup="true"
                  aria-expanded={isLanguageOpen}
                >
                  <span className="inline-block w-6 h-4 overflow-hidden rounded-sm">
                    <img
                      src={languages.find(lang => lang.code === currentLanguage)?.flagUrl}
                      alt={languages.find(lang => lang.code === currentLanguage)?.alt || currentLanguage}
                      className="w-full h-auto object-cover"
                      draggable={false}
                    />
                  </span>
                  <svg
                    className="h-4 w-4 text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.25 8.27a.75.75 0 01-.02-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                {/* Dropdown de seleção */}
                {isLanguageOpen && (
                  <div className="absolute right-0 mt-2 w-20 bg-white rounded-md shadow-lg py-1 z-[9999]">
                    {languages.map((language) => (
                      <button
                        key={language.code}
                        onClick={() => selectLanguage(language.code)}
                        className="flex items-center justify-center w-full px-3 py-2 hover:bg-gray-100 transition-colors"
                        aria-label={`Selecionar idioma ${language.alt}`}
                      >
                        <span className="inline-block w-7 h-5 overflow-hidden rounded-sm">
                          <img
                            src={language.flagUrl}
                            alt={language.alt}
                            className="w-full h-auto object-cover"
                            draggable={false}
                          />
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* ===== SEGUNDA NAVBAR - LOGO, BUSCA E PRODUTOS ===== */}
      {/* Navbar inferior com logo, caixa de busca e link para produtos */}
      <div className={`bg-[#e6e6e6] shadow-md transition-all duration-300 ${
        isScrolled ? 'shadow-lg' : ''
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Primeira Div - Logo da Empresa */}
            <div className="flex items-center space-x-2">
              {/* <div className="bg-red-600 p-2 rounded-lg">
                <Wrench className="h-6 w-6 text-white" />
              </div> */}
              <Link to="/" aria-label="Ir para a página inicial">
                <img src="https://ymrindustrial.com/assets/ymrlogo.png" alt="YMR Industrial" className="h-8" />
              </Link>
              {/* <span className="text-xl font-bold text-gray-900">YMR Industrial</span> */}
            </div>

            {/* Segunda Div - Caixa de Busca Moderna com Dropdown */}
            <div className="flex-1 max-w-3xl mx-8">
              <div ref={searchRef} className="relative">
                <form onSubmit={handleSearch} className="flex items-center h-12 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                  <div className="relative flex-1 h-full min-w-0">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                      {isSearching ? (
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue-500 border-t-transparent"></div>
                      ) : (
                        <Search className="h-5 w-5" />
                      )}
                    </div>
                    <input
                      type="text"
                      placeholder="Buscar equipamentos, ferramentas, EPIs..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onFocus={() => searchTerm.length >= 2 && setShowSearchDropdown(true)}
                      className="w-full h-full pl-12 pr-12 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-0"
                    />
                    {searchTerm && (
                      <button
                        type="button"
                        onClick={clearSearch}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                  <div className="h-8 w-px bg-gray-300"></div>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="h-full px-3 bg-white text-gray-700 focus:outline-none focus:ring-0 border-0 min-w-[140px] max-w-[160px] text-sm"
                    disabled={isLoadingCategories}
                  >
                    <option value="All">Todas</option>
                    {categories.map(category => (
                      <option key={category.id} value={category.name} title={category.name}>
                        {category.name.length > 15 ? category.name.substring(0, 15) + '...' : category.name}
                      </option>
                    ))}
                  </select>
                  <button
                    type="submit"
                    disabled={!searchTerm.trim() || searchResults.length === 0}
                    className="h-full px-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 transition-all duration-200 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    <Search className="h-4 w-4" />
                    <span className="hidden sm:inline">Buscar</span>
                  </button>
                </form>

                {/* Dropdown de Resultados */}
                {showSearchDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 max-h-96 overflow-hidden">
                    {isSearching ? (
                      <div className="p-6 text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent mx-auto mb-3"></div>
                        <p className="text-gray-500">Buscando produtos...</p>
                      </div>
                    ) : hasSearched && searchResults.length === 0 ? (
                      <div className="p-6 text-center">
                        <div className="text-gray-400 mb-3">
                          <Search className="h-12 w-12 mx-auto" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">Pesquisa sem resultados</h3>
                        <p className="text-gray-500 text-sm">Pesquise por categorias ou tente outros termos</p>
                      </div>
                    ) : searchResults.length > 0 ? (
                      <div className="max-h-80 overflow-y-auto">
                        {searchResults.map((product) => (
                          <div
                            key={product.id}
                            className="p-4 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 cursor-pointer transition-colors"
                            onClick={() => {
                              navigate(`/product/${product.id}`);
                              setShowSearchDropdown(false);
                            }}
                          >
                            <div className="flex items-center gap-3">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-12 h-12 object-cover rounded-lg flex-shrink-0"
                              />
                              <div className="flex-1 min-w-0">
                                <h4 className="font-medium text-gray-900 truncate">{product.name}</h4>
                                <p className="text-sm text-gray-500 truncate">{product.description}</p>
                                <div className="flex items-center gap-2 mt-1">
                                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                                    {product.category}
                                  </span>
                                  {product.brand && (
                                    <span className="text-xs text-gray-400">{product.brand}</span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                        
                        {/* Botão Ver Mais */}
                        <div className="p-4 border-t border-gray-100">
                          <button
                            onClick={handleViewMore}
                            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 rounded-lg hover:from-blue-100 hover:to-blue-200 transition-all duration-200 font-medium"
                          >
                            <span>Ver mais resultados</span>
                            <ArrowRight className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ) : null}
                  </div>
                )}
              </div>
            </div>

            {/* Terceira Div - Link para Produtos e Carrinho */}
            <div className="flex items-center space-x-4">
              <Link
                to="/products"
                className="text-lg font-regular text-gray-900 hover:text-red-600 transition-colors"
              >
                Products
              </Link>
              {isAuthenticated ? (
                <Link
                  to="/cart"
                  className="relative p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-all duration-200 hover:scale-105 hover:shadow-lg group"
                  aria-label="Ir para o carrinho"
                >
                  <ShoppingCart className="h-4 w-4" />
                  {cartCount > 0 && (
                    <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold group-hover:bg-red-600 transition-colors">
                      {cartCount > 99 ? '99+' : cartCount}
                    </div>
                  )}
                </Link>
              ) : (
                <button
                  onClick={() => navigate('/login')}
                  className="relative p-2 bg-gray-400 text-white rounded-md cursor-not-allowed opacity-50"
                  aria-label="Faça login para acessar o carrinho"
                  title="Faça login para acessar o carrinho"
                >
                  <ShoppingCart className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Overlay para fechar dropdown quando clicar fora */}
      {isLanguageOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsLanguageOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;