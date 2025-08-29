import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { Product } from '../types';
import { apiFetch } from '../services/api';
import { 
  ShoppingCart, Heart, Share2, Shield,
  ChevronLeft, ChevronRight, Download, FileText, Truck, Phone,
  AlertCircle, Info,
  Zap, Settings
} from 'lucide-react';

const ProductPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    let isMounted = true;
    async function load() {
      if (!id) return;
      try {
        const data = await apiFetch(`/products/${id}`);
        const p = data?.data || data;
        const mapped: Product = {
          id: p.id || p._id || String(p.code || p.name),
          name: p.name,
          description: p.description || '',
          category: p?.subcategory?.category?.name || p?.category?.name || 'Categoria',
          subcategory_name: p?.subcategory?.name,
          brand: p?.brand?.name,
          model: p?.model,
          cod: p?.code,
          availability: p?.isActive ? 'Em Estoque' : 'Indisponível',
          image: p?.images?.[0] || p?.thumbnail || 'https://via.placeholder.com/300x300?text=Produto',
          images: p?.images || (p?.thumbnail ? [p.thumbnail] : undefined),
          features: p?.features,
          price: p?.price,
        };
        if (isMounted) {
          setProduct(mapped);
          setSelectedImage(0);
        }
      } catch (e) {
        if (isMounted) setProduct(null);
      }
    }
    load();
    return () => { isMounted = false; };
  }, [id]);

  const gallery = product?.images && product.images.length > 0 ? product.images : (product ? [product.image] : ['']);

  function addToCart() {
    if (!product) return;
    const stored = localStorage.getItem('cartItems');
    const list: any[] = stored ? JSON.parse(stored) : [];
    const cartItem = {
      id: product.id,
      name: product.name,
      category: product.category,
      brand: product.brand || 'YMR',
      model: product.model || 'STD',
      cod: product.cod || `YMR-${product.id.substring(0,6).toUpperCase()}`,
      availability: product.availability || 'Sob Encomenda',
      image: product.image,
      description: product.description,
      features: product.features || [],
      rfqId: null,
      status: null,
      addedDate: new Date().toISOString().split('T')[0]
    };
    // Evitar duplicatas simples pelo id
    const exists = list.some((it) => it.id === cartItem.id);
    const next = exists ? list : [...list, cartItem];
    localStorage.setItem('cartItems', JSON.stringify(next));
    navigate('/cart');
  }

  // ===== ESPECIFICAÇÕES TÉCNICAS =====
  const specifications = [
    { category: 'Potência', specs: [
      { label: 'Potência Nominal', value: '750 kW' },
      { label: 'Potência Máxima', value: '825 kW' },
      { label: 'Tensão', value: '380V / 440V' },
      { label: 'Frequência', value: '50/60 Hz' },
      { label: 'Fator de Potência', value: '0.8' }
    ]},
    { category: 'Motor', specs: [
      { label: 'Marca', value: 'Caterpillar' },
      { label: 'Modelo', value: 'C32 ACERT' },
      { label: 'Cilindros', value: '12' },
      { label: 'Aspiração', value: 'Turboalimentado' },
      { label: 'Combustível', value: 'Diesel' }
    ]},
    { category: 'Dimensões', specs: [
      { label: 'Comprimento', value: '6.2 m' },
      { label: 'Largura', value: '2.1 m' },
      { label: 'Altura', value: '2.8 m' },
      { label: 'Peso', value: '8.500 kg' },
      { label: 'Tanque', value: '1.200 L' }
    ]},
    { category: 'Operação', specs: [
      { label: 'Nível de Ruído', value: '75 dB(A)' },
      { label: 'Consumo', value: '180 L/h' },
      { label: 'Autonomia', value: '6.7 horas' },
      { label: 'Temperatura Op.', value: '-20°C a +50°C' },
      { label: 'Partida', value: 'Automática' }
    ]}
  ];

  // ===== DOCUMENTAÇÕES =====
  // documentos desativados por enquanto
  const documents: any[] = [];

  const nextImage = () => {
    if (!gallery.length) return;
    setSelectedImage((prev) => (prev + 1) % gallery.length);
  };

  const prevImage = () => {
    if (!gallery.length) return;
    setSelectedImage((prev) => (prev - 1 + gallery.length) % gallery.length);
  };

  return (
    <div className="page-content min-h-screen bg-gray-50">
      {/* ===== BREADCRUMB ===== */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <span>Início</span>
            <span>/</span>
            <span>Equipamentos</span>
            <span>/</span>
            <span>Geradores</span>
            <span>/</span>
            <span className="text-gray-900 font-medium">{product?.name || ''}</span>
          </nav>
        </div>
      </div>

      {/* ===== CONTEÚDO PRINCIPAL ===== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* ===== SEÇÃO PRINCIPAL DO PRODUTO ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          
          {/* ===== GALERIA DE IMAGENS ===== */}
          <div className="space-y-4">
            <div className="relative bg-white rounded-xl shadow-sm overflow-hidden">
              <img 
                src={gallery[selectedImage] || ''}
                alt={product?.name || ''}
                className="w-full h-96 object-cover"
              />
              <button 
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
              >
                <ChevronLeft className="h-5 w-5 text-gray-600" />
              </button>
              <button 
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
              >
                <ChevronRight className="h-5 w-5 text-gray-600" />
              </button>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                <div className="flex gap-2">
                  {gallery.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        selectedImage === index ? 'bg-white' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
            
            {/* Miniaturas */}
            <div className="grid grid-cols-5 gap-2">
              {gallery.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index ? 'border-red-500' : 'border-transparent'
                  }`}
                >
                  <img src={image} alt={`${product?.name || ''} ${index + 1}`} className="w-full h-16 object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* ===== INFORMAÇÕES DO PRODUTO ===== */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                <span>{product?.category || ''}</span>
                <span>•</span>
                <span>cod: {product?.cod || ''}</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product?.name || 'Produto'}</h1>
              <div className="flex items-center gap-4">
                <span className="text-sm px-2 py-1 bg-green-100 text-green-700 rounded-full">
                  {product?.availability || 'Sob Encomenda'}
                </span>
              </div>
            </div>

            <div className="border-t border-gray-200">
              
              <p className="text-gray-600 mb-6">{product?.description}</p>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <label className="text-sm font-medium text-gray-700">Quantidade:</label>
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2 hover:bg-gray-100"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 font-medium">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-2 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button onClick={addToCart} className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                    <ShoppingCart className="h-5 w-5" />
                    Solicitar Orçamento
                  </button>
                  <button 
                    onClick={() => setIsFavorite(!isFavorite)}
                    className={`p-2 rounded-lg border transition-colors ${
                      isFavorite ? 'border-red-500 text-red-500' : 'border-gray-300 text-gray-600'
                    }`}
                  >
                    <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
                  </button>
                  <button className="p-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors">
                    <Share2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Informações de entrega */}
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Truck className="h-4 w-4 text-gray-500" />
                <span className="text-gray-700">Entrega em Luanda: 3-5 dias úteis</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Shield className="h-4 w-4 text-gray-500" />
                <span className="text-gray-700">Garantia de 24 meses</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="h-4 w-4 text-gray-500" />
                <span className="text-gray-700">Suporte técnico 24/7</span>
              </div>
            </div>
          </div>
        </div>

        {/* ===== NAVEGAÇÃO POR ABAS ===== */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'overview', label: 'Visão Geral' },
                { id: 'specifications', label: 'Especificações' },
                { id: 'documents', label: 'Documentações' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-red-500 text-red-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* ===== ABA VISÃO GERAL ===== */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Sobre o Produto</h2>
                  <div className="prose max-w-none text-gray-600">
                    <p className="mb-4">
                      O Gerador Industrial YMR-750i Pro representa o estado da arte em soluções de energia para aplicações industriais críticas. 
                      Desenvolvido especificamente para atender às demandas do setor petrolífero e industrial angolano, este equipamento combina 
                      robustez, eficiência e tecnologia avançada.
                    </p>
                    <p className="mb-4">
                      Equipado com motor Caterpillar C32 ACERT e sistema de controle digital avançado, o gerador oferece desempenho consistente 
                      mesmo nas condições mais adversas. O sistema de monitoramento remoto permite acompanhamento em tempo real de todos os 
                      parâmetros operacionais, garantindo máxima eficiência e segurança.
                    </p>
                    <p>
                      Ideal para plataformas offshore, refinarias, complexos industriais e instalações que requerem fornecimento de energia 
                      confiável e contínuo. A manutenção preventiva incluída garante operação otimizada e longa vida útil do equipamento.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-blue-50 rounded-lg p-6 text-center">
                    <Zap className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                    <h3 className="font-semibold text-gray-900 mb-2">Alta Performance</h3>
                    <p className="text-sm text-gray-600">Potência constante de 750kW com eficiência energética superior</p>
                  </div>
                  
                  <div className="bg-green-50 rounded-lg p-6 text-center">
                    <Shield className="h-8 w-8 text-green-600 mx-auto mb-3" />
                    <h3 className="font-semibold text-gray-900 mb-2">Confiabilidade</h3>
                    <p className="text-sm text-gray-600">Sistema robusto projetado para operação contínua 24/7</p>
                  </div>
                  
                  <div className="bg-purple-50 rounded-lg p-6 text-center">
                    <Settings className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                    <h3 className="font-semibold text-gray-900 mb-2">Tecnologia Avançada</h3>
                    <p className="text-sm text-gray-600">Controle inteligente e monitoramento remoto IoT</p>
                  </div>
                </div>
              </div>
            )}

            {/* ===== ABA ESPECIFICAÇÕES ===== */}
            {activeTab === 'specifications' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Especificações Técnicas</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {specifications.map((category, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-6">
                        <h3 className="font-bold text-lg text-gray-900 mb-4">{category.category}</h3>
                        <div className="space-y-3">
                          {category.specs.map((spec, specIndex) => (
                            <div key={specIndex} className="flex justify-between">
                              <span className="text-gray-600">{spec.label}:</span>
                              <span className="font-medium text-gray-900">{spec.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-yellow-800 mb-1">Importante</h4>
                      <p className="text-sm text-yellow-700">
                        As especificações podem variar conforme a configuração solicitada. 
                        Entre em contato com nossa equipe técnica para personalização específica do seu projeto.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ===== ABA DOCUMENTAÇÕES ===== */}
            {activeTab === 'documents' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Documentações Técnicas</h2>
                  <p className="text-gray-600 mb-6">
                    Baixe todos os documentos técnicos, manuais e certificações do produto.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[].map((_, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg bg-gray-100`}>
                            <FileText className="h-5 w-5" />
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900">Documento Técnico</h3>
                            <p className="text-sm text-gray-500">PDF</p>
                          </div>
                        </div>
                        <button className="flex items-center gap-2 text-red-600 hover:text-red-700 font-medium text-sm">
                          <Download className="h-4 w-4" />
                          Baixar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <div className="flex items-start gap-3">
                    <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-800 mb-1">Precisa de mais informações?</h4>
                      <p className="text-sm text-blue-700 mb-3">
                        Nossa equipe técnica pode fornecer documentação adicional personalizada para seu projeto específico.
                      </p>
                      <button className="text-blue-700 hover:text-blue-800 font-medium text-sm underline">
                        Entrar em contato
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ===== FOOTER COM AÇÕES RÁPIDAS ===== */}
      <div className="bg-white border-t border-gray-200 sticky bottom-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors">
                <Phone className="h-4 w-4" />
                Falar com Consultor
              </button>
              <button onClick={addToCart} className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors">
                <ShoppingCart className="h-4 w-4" />
                Solicitar Orçamento
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;