import { useNavigate } from 'react-router-dom';
import { Loader as Ladder, HardHat, Wrench, Droplets, Shield, Cog, Grid3X3, Users, Award } from 'lucide-react';
import CategoryCard from '../components/CategoryCard';

const Categories = () => {
  // ===== HOOK DE NAVEGAÇÃO =====
  // Hook do React Router para navegação entre páginas
  const navigate = useNavigate();

  // ===== DADOS DAS CATEGORIAS =====
  // Array contendo todas as categorias de produtos disponíveis
  const categories = [
    {
      name: 'Escadas',
      description: 'Escadas profissionais para manutenção industrial e trabalhos de construção.',
      icon: Ladder,
      itemCount: 15,
      onClick: () => navigate('/products')
    },
    {
      name: 'Maquinário de Construção',
      description: 'Equipamentos pesados de construção e maquinário para grandes projetos.',
      icon: Cog,
      itemCount: 23,
      onClick: () => navigate('/products')
    },
    {
      name: 'Ferramentas de Cimento',
      description: 'Ferramentas especializadas e equipamentos para trabalhos com cimento e concreto.',
      icon: HardHat,
      itemCount: 18,
      onClick: () => navigate('/products')
    },
    {
      name: 'Lubrificantes e Vedantes',
      description: 'Lubrificantes industriais, óleos e vedantes para manutenção de maquinário.',
      icon: Droplets,
      itemCount: 32,
      onClick: () => navigate('/products')
    },
    {
      name: 'Equipamentos de Segurança',
      description: 'Equipamentos de proteção individual para ambientes industriais e de construção.',
      icon: Shield,
      itemCount: 27,
      onClick: () => navigate('/products')
    },
    {
      name: 'Acessórios Industriais',
      description: 'Acessórios essenciais e componentes para aplicações industriais.',
      icon: Wrench,
      itemCount: 41,
      onClick: () => navigate('/products')
    }
  ];

  return (
    <div className="min-h-screen page-content">
      {/* ===== SEÇÃO HERO - CABEÇALHO PRINCIPAL ===== */}
      {/* Seção principal com título e descrição da página de categorias */}
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
              <Grid3X3 className="h-5 w-5" />
              <span className="text-sm font-medium">Product Categories</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Categorias de Produtos
            </h1>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-8">
              Navegue pela nossa gama abrangente de produtos industriais organizados por categoria.
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Grid3X3 className="h-6 w-6 text-blue-400" />
                  <span className="text-2xl font-bold">{categories.length}</span>
                </div>
                <p className="text-sm text-gray-300">Categorias</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Award className="h-6 w-6 text-yellow-400" />
                  <span className="text-2xl font-bold">156+</span>
                </div>
                <p className="text-sm text-gray-300">Produtos Totais</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Users className="h-6 w-6 text-green-400" />
                  <span className="text-2xl font-bold">50+</span>
                </div>
                <p className="text-sm text-gray-300">Marcas</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SEÇÃO GRADE DE CATEGORIAS ===== */}
      {/* Seção que exibe todas as categorias em formato de grid responsivo */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-blue-100 rounded-full px-4 py-2 mb-6">
              <Grid3X3 className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium text-blue-800">Navegue por Categoria</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Explore Nossas Categorias</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Encontre exatamente o que precisa navegando por nossas categorias especializadas de equipamentos industriais.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <div 
                key={category.name}
                className="group animate-fade-in-up"
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
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-green-100 rounded-full px-4 py-2 mb-6">
              <Award className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium text-green-800">Nossa Experiência</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Alcance dos Nossos Produtos
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Soluções industriais abrangentes em múltiplas categorias para atender todas as suas necessidades.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="bg-blue-50 p-6 rounded-2xl mb-4 group-hover:bg-blue-100 transition-colors duration-300">
                <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">156+</div>
                <div className="text-gray-600 font-medium">Produtos Totais</div>
              </div>
            </div>
            <div className="text-center group">
              <div className="bg-green-50 p-6 rounded-2xl mb-4 group-hover:bg-green-100 transition-colors duration-300">
                <div className="text-4xl md:text-5xl font-bold text-green-600 mb-2">{categories.length}</div>
                <div className="text-gray-600 font-medium">Categorias</div>
              </div>
            </div>
            <div className="text-center group">
              <div className="bg-purple-50 p-6 rounded-2xl mb-4 group-hover:bg-purple-100 transition-colors duration-300">
                <div className="text-4xl md:text-5xl font-bold text-purple-600 mb-2">50+</div>
                <div className="text-gray-600 font-medium">Marcas</div>
            </div>
            </div>
            <div className="text-center group">
              <div className="bg-yellow-50 p-6 rounded-2xl mb-4 group-hover:bg-yellow-100 transition-colors duration-300">
                <div className="text-4xl md:text-5xl font-bold text-yellow-600 mb-2">10+</div>
                <div className="text-gray-600 font-medium">Anos de Experiência</div>
            </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Categories;