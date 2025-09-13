import { Download, FileText, Eye, CheckCircle, BookOpen, Award, Users } from 'lucide-react';

const Catalog = () => {
  // ===== DADOS DAS CARACTERÍSTICAS DO CATÁLOGO =====
  // Array contendo as características incluídas no catálogo
  const catalogFeatures = [
    'Especificações completas dos produtos',
    'Certificações técnicas',
    'Diretrizes de instalação',
    'Instruções de manutenção',
    'Informações de segurança',
    'Preços e disponibilidade'
  ];

  // ===== FUNÇÃO DE DOWNLOAD DO CATÁLOGO =====
  // Função que simula o download do catálogo em PDF
  const downloadCatalog = () => {
    // In a real application, this would trigger a download
    alert('Catalog download started! Check your downloads folder.');
  };

  return (
    <div className="min-h-screen page-content">
      {/* ===== SEÇÃO HERO - CABEÇALHO PRINCIPAL ===== */}
      {/* Seção principal com título e descrição da página do catálogo */}
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
              <BookOpen className="h-5 w-5" />
              <span className="text-sm font-medium">Product Catalog</span>
            </div>
            <p className="text-lg text-gray-300 max-w-4xl mx-auto mb-8">
              Acesse nosso catálogo abrangente de produtos com especificações detalhadas, certificações e fichas técnicas completas.
            </p>
          </div>
        </div>
      </section>

      {/* ===== SEÇÃO CONTEÚDO PRINCIPAL ===== */}
      {/* Seção que apresenta o catálogo com informações detalhadas e preview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-blue-100 rounded-full px-4 py-2 mb-6">
              <FileText className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium text-blue-800">Catálogo Completo</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Catálogo de Soluções Industriais Completas
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nosso catálogo abrangente contém informações detalhadas sobre todos os nossos produtos industriais, 
              incluindo especificações técnicas, certificações e diretrizes de aplicação.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Conteúdo Informativo */}
            <div>
              <div className="mb-8">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">O que está incluído:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {catalogFeatures.map((feature) => (
                    <div key={feature} className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-blue-600 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={downloadCatalog}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2"
                >
                  <Download className="h-5 w-5" />
                  <span>Baixar Catálogo PDF</span>
                </button>
                <button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2">
                  <Eye className="h-5 w-5" />
                  <span>Visualizar Online</span>
                </button>
              </div>
            </div>
            
            {/* Preview do Catálogo */}
            <div className="relative">
              <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 mb-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-600 p-3 rounded-xl mr-4">
                      <FileText className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Catálogo YMR Industrial 2024</h3>
                      <p className="text-blue-700 font-medium">Guia Completo de Produtos</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3">
                      <span className="text-gray-600">Tamanho:</span>
                      <div className="font-semibold text-gray-900">12.5 MB</div>
                    </div>
                    <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3">
                      <span className="text-gray-600">Páginas:</span>
                      <div className="font-semibold text-gray-900">156 páginas</div>
                    </div>
                    <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3">
                      <span className="text-gray-600">Formato:</span>
                      <div className="font-semibold text-gray-900">PDF</div>
                    </div>
                    <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3">
                      <span className="text-gray-600">Atualizado:</span>
                      <div className="font-semibold text-gray-900">Dez 2024</div>
                    </div>
                  </div>
                </div>
                
                {/* Páginas simuladas do catálogo */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 h-32 flex items-center justify-center hover:shadow-md transition-shadow duration-300">
                    <div className="text-center">
                      <div className="w-10 h-10 bg-blue-600 rounded-lg mx-auto mb-2 flex items-center justify-center">
                        <CheckCircle className="h-6 w-6 text-white" />
                      </div>
                      <div className="text-sm font-medium text-gray-700">Seção Escadas</div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 h-32 flex items-center justify-center hover:shadow-md transition-shadow duration-300">
                    <div className="text-center">
                      <div className="w-10 h-10 bg-green-600 rounded-lg mx-auto mb-2 flex items-center justify-center">
                        <Award className="h-6 w-6 text-white" />
                      </div>
                      <div className="text-sm font-medium text-gray-700">Equipamentos</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SEÇÃO VANTAGENS DO CATÁLOGO ===== */}
      {/* Seção que destaca os benefícios de baixar o catálogo */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-green-100 rounded-full px-4 py-2 mb-6">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium text-green-800">Vantagens</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Por que Baixar Nosso Catálogo?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tudo o que você precisa para tomar decisões informadas sobre equipamentos e soluções industriais.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="bg-blue-50 p-4 rounded-2xl w-20 h-20 mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <FileText className="h-10 w-10 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Especificações Detalhadas</h3>
                <p className="text-gray-600">
                  Especificações técnicas completas, dimensões e dados de desempenho para todos os produtos.
                </p>
              </div>
            </div>
            
            <div className="text-center group">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="bg-green-50 p-4 rounded-2xl w-20 h-20 mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <CheckCircle className="h-10 w-10 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Qualidade Certificada</h3>
                <p className="text-gray-600">
                  Todos os produtos incluem informações de certificação e documentação de garantia de qualidade.
                </p>
              </div>
            </div>
            
            <div className="text-center group">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="bg-purple-50 p-4 rounded-2xl w-20 h-20 mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Download className="h-10 w-10 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Acesso Fácil</h3>
                <p className="text-gray-600">
                  Baixe uma vez e acesse offline a qualquer momento. Perfeito para visitas ao local e apresentações.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Catalog;