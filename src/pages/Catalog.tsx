import React from 'react';
import { Download, FileText, Eye, CheckCircle } from 'lucide-react';

const Catalog = () => {
  // ===== DADOS DAS CARACTERÍSTICAS DO CATÁLOGO =====
  // Array contendo as características incluídas no catálogo
  const catalogFeatures = [
    'Complete product specifications',
    'Technical certifications',
    'Installation guidelines',
    'Maintenance instructions',
    'Safety information',
    'Pricing and availability'
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
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Product Catalog</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Access our comprehensive product catalog with detailed specifications, certifications, and technical sheets.
          </p>
        </div>
      </section>

      {/* ===== SEÇÃO CONTEÚDO PRINCIPAL ===== */}
      {/* Seção que apresenta o catálogo com informações detalhadas e preview */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Conteúdo Informativo */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Complete Industrial Solutions Catalog
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Our comprehensive catalog contains detailed information about all our industrial products, 
                including technical specifications, certifications, and application guidelines. Perfect for 
                project planning and procurement decisions.
              </p>
              
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">What's Included:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {catalogFeatures.map((feature, index) => (
                    <div key={feature} className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={downloadCatalog}
                  className="btn-primary text-lg px-8 py-4"
                >
                  <Download className="h-5 w-5" />
                  Download PDF Catalog
                </button>
                <button className="btn-secondary text-lg px-8 py-4">
                  <Eye className="h-5 w-5" />
                  Preview Online
                </button>
              </div>
            </div>
            
            {/* Preview do Catálogo */}
            <div className="relative">
              <div className="bg-gradient-to-br from-red-50 to-blue-50 rounded-xl p-8 shadow-lg">
                <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                  <div className="flex items-center mb-4">
                    <FileText className="h-8 w-8 text-red-600 mr-3" />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">YMR Industrial Catalog 2024</h3>
                      <p className="text-gray-600">Complete Product Guide</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>File Size:</span>
                      <span>12.5 MB</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Pages:</span>
                      <span>156 pages</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Format:</span>
                      <span>PDF</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Last Updated:</span>
                      <span>December 2024</span>
                    </div>
                  </div>
                </div>
                
                {/* Páginas simuladas do catálogo */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded shadow-sm p-4 h-32 flex items-center justify-center text-gray-400">
                    <div className="text-center">
                      <div className="w-8 h-8 bg-gray-200 rounded mx-auto mb-2"></div>
                      <div className="text-xs">Ladders Section</div>
                    </div>
                  </div>
                  <div className="bg-white rounded shadow-sm p-4 h-32 flex items-center justify-center text-gray-400">
                    <div className="text-center">
                      <div className="w-8 h-8 bg-gray-200 rounded mx-auto mb-2"></div>
                      <div className="text-xs">Safety Equipment</div>
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
      <section className="section-padding bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Download Our Catalog?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need to make informed decisions about industrial equipment and solutions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-white rounded-xl p-8 shadow-md card-hover">
                <div className="bg-blue-50 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                  <FileText className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Detailed Specifications</h3>
                <p className="text-gray-600">
                  Complete technical specifications, dimensions, and performance data for all products.
                </p>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-white rounded-xl p-8 shadow-md card-hover">
                <div className="bg-green-50 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Certified Quality</h3>
                <p className="text-gray-600">
                  All products include certification information and quality assurance documentation.
                </p>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-white rounded-xl p-8 shadow-md card-hover">
                <div className="bg-red-50 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                  <Download className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Easy Access</h3>
                <p className="text-gray-600">
                  Download once and access offline anytime. Perfect for site visits and presentations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SEÇÃO CALL-TO-ACTION ===== */}
      {/* Seção final que incentiva o contato para orçamentos personalizados */}
      <section className="section-padding bg-red-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Need a Custom Quote?
          </h2>
          <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
            Have specific requirements or need a customized solution? Contact our team for personalized assistance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={downloadCatalog}
              className="bg-white text-red-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <Download className="h-5 w-5" />
              Get the Catalog First
            </button>
            <a 
              href="/contact" 
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-red-600 transition-colors duration-200"
            >
              Contact Our Team
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Catalog;