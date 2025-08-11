import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ChevronDown, User } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('PT');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ===== DADOS DAS CATEGORIAS PARA BUSCA =====
  // Array contendo as categorias disponíveis para o filtro de busca
  const categories = ['All', 'Ladders', 'Construction', 'Lubricants', 'Safety Gear', 'Tools', 'Machinery'];

  // ===== DADOS DOS IDIOMAS =====
  // Array contendo as opções de idioma disponíveis
  const languages = [
    { code: 'PT', flag: '🇵🇹' },
    { code: 'EN', flag: '🇬🇧' }
  ];

  // ===== FUNÇÕES DE MANIPULAÇÃO =====
  // Função para alternar o menu de idiomas
  const toggleLanguageMenu = () => {
    setIsLanguageOpen(!isLanguageOpen);
  };

  // Função para selecionar um idioma
  const selectLanguage = (languageCode: string) => {
    setCurrentLanguage(languageCode);
    setIsLanguageOpen(false);
  };

  // Função para lidar com a busca
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implementar lógica de busca aqui
    console.log('Searching for:', searchTerm, 'in category:', selectedCategory);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* ===== PRIMEIRA NAVBAR - NAVEGAÇÃO PRINCIPAL ===== */}
      {/* Navbar superior com fundo azul escuro e navegação principal */}
      <div className="bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-12">
            {/* Primeira Div - Links de Navegação */}
            <div className="flex items-center space-x-6">
              <Link to="/" className="text-sm font-medium hover:text-blue-200 transition-colors">
                Home
              </Link>
              <Link to="/contact" className="text-sm font-medium hover:text-blue-200 transition-colors">
                Contact
              </Link>
              <Link to="/about" className="text-sm font-medium hover:text-blue-200 transition-colors">
                About Us
              </Link>
              <Link to="/services" className="text-sm font-medium hover:text-blue-200 transition-colors">
                Services
              </Link>
            </div>

            {/* Segunda Div - Catálogo, Conta e Idioma */}
            <div className="flex items-center space-x-4">
              <Link to="/catalog" className="text-sm font-medium hover:text-blue-200 transition-colors">
                Catalog
              </Link>
              
              {/* Botão de Conta */}
              <button className="flex items-center space-x-1 text-sm font-medium hover:text-blue-200 transition-colors">
                <User className="h-4 w-4" />
                <span>Conta</span>
              </button>

              {/* Seletor de Idioma */}
              <div className="relative">
                <button
                  onClick={toggleLanguageMenu}
                  className="flex items-center space-x-1 text-sm font-medium hover:text-blue-200 transition-colors"
                >
                  <span className="text-lg">
                    {languages.find(lang => lang.code === currentLanguage)?.flag || currentLanguage}
                  </span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                
                {/* Dropdown de Idiomas */}
                {isLanguageOpen && (
                  <div className="absolute right-0 mt-2 w-16 bg-white rounded-md shadow-lg py-1 z-50">
                    {languages.map((language) => (
                      <button
                        key={language.code}
                        onClick={() => selectLanguage(language.code)}
                        className="flex items-center justify-center w-full px-3 py-2 text-lg hover:bg-gray-100 transition-colors"
                      >
                        <span>{language.flag}</span>
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
              <img src="https://ymrindustrial.com/assets/ymrlogo.png" alt="YMR Industrial" className="h-8" />
              {/* <span className="text-xl font-bold text-gray-900">YMR Industrial</span> */}
            </div>

            {/* Segunda Div - Caixa de Busca com Filtro */}
            <div className="flex-1 max-w-2xl mx-8">
              <form onSubmit={handleSearch} className="flex items-center h-10">
                <div className="relative flex-1 h-full">
                  <input
                    type="text"
                    placeholder="Buscar equipamentos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full h-full pl-4 pr-4 border border-white-900 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-hidden"
                  />
                </div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="h-full px-4 border border-l-0 border-white-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                <button
                  type="submit"
                  className="h-full px-4 bg-blue-900 text-white rounded-r-lg hover:bg-blue-800 transition-colors border border-l-0 border-blue-900"
                >
                  <Search className="h-5 w-5" />
                </button>
              </form>
            </div>

            {/* Terceira Div - Link para Produtos */}
            <div>
              <Link
                to="/products"
                className="text-lg font-regular text-gray-900 hover:text-red-600 transition-colors"
              >
                Products
              </Link>
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