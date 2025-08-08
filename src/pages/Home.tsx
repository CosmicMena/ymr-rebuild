import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Truck, Award, Users, CheckCircle, Download, ChevronLeft, ChevronRight, ExternalLink, Star, Calendar, TrendingUp } from 'lucide-react';
import ProductCard from '../components/ProductCard';

const Home = () => {
  // ===== ESTADO DO SLIDER =====
  const [currentSlide, setCurrentSlide] = useState(0);
  const [adSlide, setAdSlide] = useState(0);
  const [productSlide, setProductSlide] = useState(0);
  const [newsSlide, setNewsSlide] = useState(0);
  const [showPromoPopup, setShowPromoPopup] = useState(false);

  // ===== DADOS DOS SLIDES =====
  const slides = [
    {
      id: 1,
      image: 'https://ymrindustrial.com/assets/hero/novas/PERKINS.jpg',
      title: 'Somos a YMR',
      subtitle: 'Sua Parceira de Confiança em Procurement Industrial',
      description: 'Somos uma empresa especializada em procurement industrial, oferecendo soluções completas em equipamentos, ferramentas e acessórios para o setor industrial. Com anos de experiência, garantimos qualidade, confiabilidade e entrega pontual para todos os nossos clientes.',
      buttons: [
        { text: 'Ver Catálogo', link: '/catalog', variant: 'primary' },
        { text: 'Explorar Produtos', link: '/products', variant: 'secondary' }
      ]
    },
    {
      id: 2,
      image: 'https://ymrindustrial.com/assets/hero/b1.jpg',
      title: 'JetLubes',
      subtitle: 'Lubrificantes Industriais de Alta Performance',
      description: 'Descubra a linha completa de lubrificantes JetLubes, desenvolvida para máxima eficiência e durabilidade em aplicações industriais. Nossos produtos garantem proteção superior e redução significativa nos custos de manutenção.',
      buttons: [
        { text: 'Ver Produtos JetLubes', link: '/products', variant: 'primary' },
        { text: 'Solicitar Orçamento', link: '/contact', variant: 'secondary' }
      ]
    },
    {
      id: 3,
      image: 'https://ymrindustrial.com/assets/hero/a1.jpg',
      title: 'Western Energy Lights',
      subtitle: 'Iluminação Industrial de Última Geração',
      description: 'Ilumine seus ambientes industriais com a tecnologia avançada da Western Energy Lights. Nossas soluções de iluminação oferecem eficiência energética, durabilidade excepcional e máxima segurança para qualquer aplicação industrial.',
      buttons: [
        { text: 'Ver Produtos Western Energy', link: '/products', variant: 'primary' },
        { text: 'Fazer Pedido', link: '/contact', variant: 'secondary' }
      ]
    }
  ];

  // ===== DADOS DOS ANÚNCIOS SLIDE =====
  const adSlides = [
    {
      id: 1,
      image: 'https://images.pexels.com/photos/precision-tools/pexels-photo-precision-tools.jpeg?auto=compress&cs=tinysrgb&w=400&h=300',
      title: 'Ferramentas de Precisão',
      discount: '25% OFF',
      cta: 'Ver Ofertas',
      link: '/products?category=tools',
      gradient: 'from-blue-600 to-purple-600'
    },
    {
      id: 2,
      image: 'https://images.pexels.com/photos/safety-equipment/pexels-photo-safety-equipment.jpeg?auto=compress&cs=tinysrgb&w=400&h=300',
      title: 'Equipamentos de Segurança',
      discount: 'NOVO',
      cta: 'Descobrir',
      link: '/products?category=safety',
      gradient: 'from-green-600 to-teal-600'
    },
    {
      id: 3,
      image: 'https://images.pexels.com/photos/industrial-lubricants/pexels-photo-industrial-lubricants.jpeg?auto=compress&cs=tinysrgb&w=400&h=300',
      title: 'Lubrificantes Premium',
      discount: 'BEST SELLER',
      cta: 'Comprar Agora',
      link: '/products?category=lubricants',
      gradient: 'from-orange-600 to-red-600'
    }
  ];

  // ===== DADOS DOS PRODUTOS SLIDE =====
  const productSlides = [
    {
      id: 1,
      name: 'Kit Ferramentas Completo',
      price: 'Kz 45.000',
      originalPrice: 'Kz 60.000',
      rating: 4.8,
      image: 'https://www.westerntechnologylights.com/wp-content/uploads/2019/02/BRICK_Gen3_Prod-SQ-WEB2.png',
      badge: 'OFERTA'
    },
    {
      id: 2,
      name: 'Capacete de Segurança Premium',
      price: 'Kz 12.500',
      rating: 4.9,
      image: 'https://ymrindustrial.com/assets/produtos/3/6656f0837caf7.jpg',
      badge: 'NOVO'
    },
    {
      id: 3,
      name: 'Óleo Hidráulico Industrial',
      price: 'Kz 28.000',
      rating: 4.7,
      image: 'https://ymrindustrial.com/assets/produtos/23/6697d5643f42c.png',
      badge: 'POPULAR'
    }
  ];

  // ===== DADOS DAS NOTÍCIAS =====
  const newsSlides = [
    {
      id: 1,
      title: 'Nova Linha de Produtos JetLubes Chegou',
      summary: 'Apresentamos a mais recente tecnologia em lubrificantes industriais com performance superior.',
      date: '05 Ago 2025',
      category: 'Produtos',
      link: '/news/jetlubes-nova-linha',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAntqKI83RbO25pJMzgQpjIn2nJy7T1iOvBw&s'
    },
    {
      id: 2,
      title: 'Expansão da YMR Industrial em Angola',
      summary: 'Novos centros de distribuição para melhor atender nossos clientes em todo o país.',
      date: '03 Ago 2025',
      category: 'Empresa',
      link: '/news/expansao-angola',
      image: 'https://ymrindustrial.com/assets/hero/about.png'
    },
    {
      id: 3,
      title: 'Certificações ISO Renovadas',
      summary: 'Mantemos nosso compromisso com a qualidade através de rigorosos padrões internacionais.',
      date: '01 Ago 2025',
      category: 'Qualidade',
      link: '/news/certificacoes-iso',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT340qopzCE3OWG7Op06yYjFbbXfnuG3Iq9dg&s'
    }
  ];

  // ===== Aside Slider ======
  const [asideSlide, setAsideSlide] = useState(0);

  // auto-slide a cada 5s
  useEffect(() => {
    const interval = setInterval(() => {
      setAsideSlide((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);


  // ===== FUNÇÕES DE CONTROLE DO SLIDER =====
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // ===== AUTO-PLAY DOS SLIDERS =====
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentSlide]);

  useEffect(() => {
    const adInterval = setInterval(() => {
      setAdSlide((prev) => (prev + 1) % adSlides.length);
    }, 3000);
    return () => clearInterval(adInterval);
  }, []);

  useEffect(() => {
    const productInterval = setInterval(() => {
      setProductSlide((prev) => (prev + 1) % productSlides.length);
    }, 4000);
    return () => clearInterval(productInterval);
  }, []);

  useEffect(() => {
    const newsInterval = setInterval(() => {
      setNewsSlide((prev) => (prev + 1) % newsSlides.length);
    }, 6000);
    return () => clearInterval(newsInterval);
  }, []);

  // Popup promocional
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPromoPopup(true);
    }, 8000);
    return () => clearTimeout(timer);
  }, []);

  // ===== DADOS DOS RECURSOS =====
  const features = [
    {
      icon: Truck,
      title: 'Fast Delivery',
      description: 'Quick and efficient delivery across Angola with reliable logistics partners.'
    },
    {
      icon: Award,
      title: 'Certified Products',
      description: 'All our products come with proper certifications and quality guarantees.'
    },
    {
      icon: Users,
      title: 'Industrial Expertise',
      description: 'Over 10 years of experience serving industrial professionals and companies.'
    }
  ];

  // ===== DADOS DOS PRODUTOS EM DESTAQUE =====

  const featuredCategories = [
    {
      name: 'Adesivos, Selantes e Fitas',
      description: 'Adesivos, selantes e fitas são essenciais para unir, vedar e isolar materiais em aplicações industriais e domésticas. Nossos produtos oferecem aderência duradoura, barreiras contra intempéries e umidade, além de fixação segura e versátil. Explore nossa linha para encontrar a solução ideal para suas necessidades, garantindo qualidade e eficiência.',
      image: 'https://ymrindustrial.com/assets/categories/abrasivo.jpg',
      category: 'Adesivos, Selantes e Fitas'
    },
    {
      name: 'Equipamentos de Pintura',
      description: 'Equipamentos de pintura são fundamentais para obter acabamentos perfeitos em projetos industriais e domésticos. Nossos produtos incluem pistolas, compressores, pincéis e rolos de alta qualidade, projetados para garantir precisão, eficiência e um resultado profissional. Descubra nossa seleção de equipamentos de pintura e encontre as ferramentas ideais para suas necessidades, garantindo durabilidade e desempenho superior em cada aplicação.',
      image: 'https://ymrindustrial.com/assets/categories/tinta.jpg',
      category: 'Equipamentos de Pintura'
    },
    {
      name: 'EPIs',
      description: 'Equipamentos de segurança são essenciais para proteger trabalhadores em ambientes industriais e domésticos, garantindo a integridade física e prevenindo acidentes. Nossa linha inclui capacetes, luvas, óculos de proteção, máscaras respiratórias e vestimentas resistentes, todos projetados para atender às mais rigorosas normas de segurança. Explore nossa seleção de equipamentos de segurança e garanta proteção confiável e conforto para suas atividades diárias.',
      image: 'https://ymrindustrial.com/wp-content/uploads/2020/07/Safety-Equipment-and-Its-Importance-in-Industries-300x300.jpg',
      category: 'EPIs'
    },
    {
      name: 'Ferramentas',
      description: 'Ferramentas são essenciais para uma variedade de tarefas em ambientes industriais, comerciais e domésticos, incluindo construção, reparos e manutenção. Nossa linha abrange ferramentas elétricas, manuais e ferramentas de medição, todas projetadas para oferecer durabilidade, precisão e eficiência. Explore nossa seleção de ferramentas para encontrar os equipamentos ideais que garantam a realização de seus projetos com qualidade e profissionalismo.',
      image: 'https://ymrindustrial.com/assets/categories/chave de fendas.jpg',
      category: 'Ferramentas'
    },
    {
      name: 'Instrumentos de teste',
      description: 'Instrumentos de teste são fundamentais para verificar e garantir a precisão e segurança em diversas aplicações industriais e de pesquisa. Nossa linha inclui multímetros, osciloscópios, medidores de temperatura e outros dispositivos especializados, projetados para oferecer medições precisas e confiáveis. Explore nossa variedade de instrumentos de teste para encontrar soluções que atendam às suas necessidades específicas, assegurando qualidade e eficiência em cada análise e diagnóstico.',
      image: 'https://ymrindustrial.com/assets/categories/detetor de gas.jpg',
      category: 'Instrumentos de teste'
    },
    {
      name: 'Lubrificantes',
      description: 'Lubrificantes desempenham um papel crucial na manutenção e eficiência de máquinas e equipamentos industriais. Nossa linha de lubrificantes inclui óleos, graxas e fluidos especializados, formulados para proporcionar proteção contra desgaste, reduzir o atrito e prolongar a vida útil dos componentes mecânicos. Descubra nossa variedade de lubrificantes para encontrar a solução ideal que mantenha seu equipamento operando com desempenho máximo e confiabilidade.',
      image: 'https://ymrindustrial.com/assets/categories/castrol.avif',
      category: 'Lubrificantes'
    },
    {
      name: 'Acessórios',
      description: 'Acessórios, também conhecidos como fittings, desempenham um papel fundamental na conexão e montagem de tubulações e sistemas hidráulicos e pneumáticos. Nossa linha de fittings inclui conexões, adaptadores, válvulas e acessórios diversos, projetados para garantir vedação adequada, resistência à pressão e facilidade de instalação. Explore nossa variedade de acessórios para encontrar soluções que atendam às suas necessidades específicas, assegurando eficiência e durabilidade em suas aplicações industriais e comerciais.',
      image: 'https://ymrindustrial.com/assets/categories/acessorios.jpg',
      category: 'Acessórios'
    },
    {
      name: 'Bombas Pneumáticas',
      description: 'As bombas pneumáticas são essenciais para transferência eficiente de líquidos e fluidos em diversas aplicações industriais. Nossa linha de bombas pneumáticas inclui modelos robustos e eficientes, projetados para proporcionar fluxo contínuo e confiável. Explore nossa variedade de bombas pneumáticas para encontrar a solução ideal que atenda às suas necessidades de bombeamento, assegurando desempenho superior e durabilidade em cada operação.',
      image: 'https://ymrindustrial.com/assets/categories/Bomba.png',
      category: 'Bombas Pneumáticas'
    },
    {
      name: 'Fixadores',
      description: 'Fixadores desempenham um papel crucial na montagem e segurança de estruturas e componentes mecânicos. Nossa linha de fixadores inclui parafusos, porcas, arruelas e outros elementos de fixação, todos projetados para oferecer resistência, durabilidade e facilidade de instalação. Explore nossa variedade de fixadores para encontrar soluções que garantam montagens seguras e eficientes em uma ampla gama de aplicações industriais e comerciais.',
      image: 'https://ymrindustrial.com/assets/categories/porca npt.jpg',
      category: 'Fixadores'
    },
    {
      name: 'Almofadas absorventes de óleo',
      description: 'Almofadas absorventes de óleo são fundamentais para a limpeza de derramamentos e vazamentos de óleo em ambientes industriais e comerciais. Nossas almofadas são fabricadas com materiais absorventes de alta qualidade, projetadas para absorver óleos, lubrificantes e outros líquidos de forma eficaz e rápida. Explore nossa linha de almofadas absorventes para encontrar soluções que ajudem a manter um ambiente limpo, seguro e livre de contaminações.',
      image: 'https://ymrindustrial.com/assets/categories/Kit absorvente de óleo.jpg',
      category: 'Almofadas absorventes de óleo'
    },
    {
      name: 'Valvulas',
      description: 'Válvulas desempenham um papel essencial no controle de fluxo de líquidos e gases em sistemas industriais e comerciais. Nossa linha de válvulas inclui uma variedade de tipos, como válvulas de esfera, válvulas de controle, válvulas de retenção e muito mais, todas projetadas para oferecer desempenho confiável, segurança e eficiência. Explore nossa seleção de válvulas para encontrar soluções que garantam operações suaves e precisas em suas aplicações específicas.',
      image: 'https://ymrindustrial.com/assets/categories/valvula.jpg',
      category: 'Valvulas'
    },
    {
      name: 'Equipamentos de navegação marítima',
      description: 'Equipamentos de navegação marítima são fundamentais para garantir a segurança e a precisão na operação de embarcações em alto mar. Nossa linha de equipamentos é constituída principalmente por leds de iluminação marítica projetados para proporcionar uma navegação mais segura. Explore nossa seleção de equipamentos de navegação marítima para encontrar soluções que assegurem uma navegação eficiente, segura e em conformidade com as regulamentações marítimas.',
      image: 'https://ymrindustrial.com/assets/categories/boat.jpg',
      category: 'Equipamentos de navegação marítima'
    },
    {
      name: 'Suplementos de Laboratório',
      description: 'Suplementos de laboratório são essenciais para resultados precisos em experimentos e processos industriais. Nossa linha inclui reagentes, meios de cultura, padrões de referência e mais, todos com alta qualidade e consistência. Explore nossa seleção para encontrar soluções que garantam eficiência e precisão em suas aplicações científicas.',
      image: 'https://ymrindustrial.com/assets/categories/laboratory_supplies.webp',
      category: 'Suplementos de Laboratório'
    },
    {
      name: 'Hidráulica',
      description: 'A categoria hidráulica abrange uma ampla gama de componentes e sistemas utilizados para o controle e movimentação de fluidos, geralmente água, óleo ou outros líquidos. Estes componentes são essenciais para uma variedade de aplicações industriais, comerciais e residenciais.',
      image: 'https://ymrindustrial.com/assets/categories/Mangueiras-Hidraulicas-_1.jpg',
      category: 'Hidráulica'
    },
    {
      name: 'JET-LUBES',
      description: 'Jet-Lube é uma marca globalmente reconhecida de lubrificantes e compostos para os mercados de campos petrolíferos, industriais e de poços de água. Seus produtos de alto desempenho suportam condições ambientais moderadas a extremas e atendem a diversas necessidades de aplicação na indústria. Desde 1949.',
      image: 'https://ymrindustrial.com/assets/categories/jet-lubes.jpg',
      category: 'JET-LUBES'
    },
    {
      name: 'Explosion Proof Lighting',
      description: 'Este tipo LED de alta performance apresenta uma iluminação robusta, segura e confiável em ambientes industriais exigentes. Com tecnologia avançada e foco em durabilidade, estas soluções de iluminação atendem a setores como petróleo e gás, mineração, construção e manufatura.',
      image: 'https://ymrindustrial.com/assets/categories/westertech.png',
      category: 'Explosion Proof Lighting'
    }
  ];
  

  return (
    <div className="min-h-screen page-content">
      {/* ===== POPUP PROMOCIONAL ===== */}
      {showPromoPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full relative overflow-hidden animate-fade-in-up">
            <button 
              onClick={() => setShowPromoPopup(false)}
              className="absolute top-4 right-4 bg-gray-100 hover:bg-gray-200 rounded-full p-2 z-10"
            >
              ✕
            </button>
            <div className="relative">
              <img 
                src="https://images.pexels.com/photos/promo-vertical/pexels-photo-promo-vertical.jpeg?auto=compress&cs=tinysrgb&w=400&h=500" 
                alt="Promoção Especial"
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-red-600 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="text-2xl font-bold mb-2">OFERTA ESPECIAL!</h3>
                <p className="text-sm mb-3">Até 30% de desconto em produtos selecionados</p>
              </div>
            </div>
            <div className="p-6">
              <Link 
                to="/promotions" 
                onClick={() => setShowPromoPopup(false)}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                Ver Ofertas
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ===== SEÇÃO HERO - SLIDER MODERNO ===== */}
      <section className="relative h-[70vh] overflow-hidden">
        {/* Slides */}
        <div className="relative h-full">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {/* Imagem de Fundo */}
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url(${slide.image})`,
                }}
              >
                {/* Overlay Escuro */}
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
              </div>

              {/* Conteúdo do Slide */}
              <div className="relative z-10 flex items-center h-full">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                  <div className="max-w-3xl animate-fade-in-up">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 text-white">
                      {slide.title}
                    </h1>
                    <h2 className="text-lg md:text-xl lg:text-2xl font-medium mb-6 text-white opacity-90">
                      {/*slide.subtitle*/}
                    </h2>
                    <p className="text-base md:text-lg lg:text-xl text-gray-200 mb-8 leading-loose">
                      {slide.description}
                    </p>
                    
                    {/* Botões de Call-to-Action */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      {slide.buttons.map((button, btnIndex) => (
                        <Link
                          key={btnIndex}
                          to={button.link}
                          className={`inline-flex items-center gap-2 px-4 py-3 rounded-lg font-regular transition-all duration-300 transform hover:scale-105 ${
                            button.variant === 'primary'
                              ? 'bg-red-600 hover:bg-red-700 text-white'
                              : 'bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900'
                          }`}
                        >
                          {button.text}
                          <ArrowRight className="h-5 w-5" />
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Botões de Navegação */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Indicadores de Slide */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-red-500 scale-125'
                  : 'bg-white bg-opacity-50 hover:bg-opacity-75'
              }`}
            />
          ))}
        </div>
      </section>

      

      {/* ===== SEÇÃO PRODUTOS E ASIDE ===== */}
      <section className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Layout Flex para Desktop e Stack para Mobile */}
          <div className="flex flex-col lg:flex-row gap-8">
            
            <div className="flex-1 min-w-0">
              {/* ===== SEÇÃO "POR QUE ESCOLHER A YMR" ===== */}
              <section className="py-10 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                      Why Choose YMR Industrial?
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                      We combine quality products with exceptional service to support your industrial needs.
                    </p>
                  </div>
                  
                  <div className="grid justify-center grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] gap-[30px]">
                    {features.map((feature, index) => (
                      <div 
                        key={feature.title} 
                        className="text-center animate-fade-in-up h-full"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className="bg-white rounded-xl p-6 shadow-md card-hover h-full flex flex-col">
                          <div className="bg-red-50 p-4 rounded-lg w-16 h-16 mx-auto mb-4 flex items-center justify-center flex-shrink-0">
                            <feature.icon className="h-8 w-8 text-red-600" />
                          </div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                          <p className="text-gray-600 flex-grow">{feature.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              </section>
              {/* ==== título ==== */}
              <div className="text-left mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-10">
                  Categories
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                { /*Discover our most popular industrial solutions trusted by professionals.*/ }
                </p>
              </div>
              {/* Produtos - Principal */}
              <div className="flex-1">
                <div className="grid grid-cols-[repeat(auto-fit,_minmax(12rem,_1fr))] gap-[30px]">
                  {featuredCategories.map((category, index) => (
                    <div 
                      key={category.name}
                      className="animate-fade-in-up"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <ProductCard {...category} />
                    </div>
                  ))}
                </div>

                <div className="text-center mt-12">
                  <Link to="/products" className="btn-primary text-lg px-8 py-4">
                    View All Products
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Aside Publicitário */}
            <aside className="min-w-[320px] max-w-xs lg:flex-shrink-0 space-y-6">
              {/* 1. PRODUTOS EM SLIDE */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-gray-900 to-gray-700 text-white p-4">
                  <h3 className="font-bold flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Produtos em Destaque
                  </h3>
                </div>
                <div className="relative h-48">
                  {productSlides.map((product, index) => (
                    <div
                      key={product.id}
                      className={`absolute inset-0 p-4 transition-opacity duration-500 ${
                        index === productSlide ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      <div className="relative">
                        {product.badge && (
                          <span className="absolute top-2 left-2 z-10 bg-red-500 text-white text-xs px-2 py-1 rounded">
                            {product.badge}
                          </span>
                        )}
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-32 object-cover rounded-lg mb-3"
                        />
                        <h4 className="font-semibold text-sm mb-2">{product.name}</h4>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 pt-0">
                  <Link 
                    to="/products" 
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-colors"
                  >
                    Ver Mais Produtos
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              {/* 1.2. BANNER ANIMADO COM GIF */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="relative w-full">
                  <img 
                    src="../src/assets/aside/2.gif" 
                    alt="Banner animado" 
                    className="w-full h-auto object-contain max-h-[600px] mx-auto"
                  />
                </div>
              </div>

              {/* 2. NOTÍCIAS SLIDE */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4">
                  <h3 className="font-bold flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Últimas Notícias
                  </h3>
                </div>
                <div className="relative h-72">
                  {newsSlides.map((news, index) => (
                    <div
                      key={news.id}
                      className={`absolute inset-0 p-4 transition-opacity duration-500 ${
                        index === newsSlide ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      <img 
                        src={news.image} 
                        alt={news.title}
                        className="w-full h-32 object-cover rounded-lg mb-3"
                      />
                      <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mb-2">
                        {news.category}
                      </span>
                      <h4 className="font-semibold text-sm mb-2 line-clamp-2">{news.title}</h4>
                      <p className="text-xs text-gray-600 mb-3 line-clamp-3">{news.summary}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">{news.date}</span>
                        <Link 
                          to={news.link}
                          className="text-blue-600 hover:text-blue-800 text-xs font-medium flex items-center gap-1"
                        >
                          Ler mais
                          <ExternalLink className="h-3 w-3" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-center py-3 gap-2">
                  {newsSlides.map((_, index) => (
                    <button
                      key={index}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === newsSlide ? 'bg-blue-500' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>


              {/* 5. NEWSLETTER SIGNUP */}
              <div className="bg-gray-900 rounded-xl p-6 text-white">
                <h3 className="font-bold text-lg mb-2">Newsletter YMR</h3>
                <p className="text-sm text-gray-300 mb-4">Receba ofertas exclusivas e novidades do setor industrial</p>
                <div className="space-y-3">
                  <input 
                    type="email" 
                    placeholder="Seu e-mail"
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 text-sm focus:outline-none focus:border-red-500"
                  />
                  <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg font-medium text-sm transition-colors">
                    Subscrever
                  </button>
                </div>
              </div>
              
              {/* 6 SLIDER VERTICAL DE IMAGENS */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="relative w-full">
                  {[
                    'https://ymrindustrial.com/assets/aside/wtl.png',
                    'https://ymrindustrial.com/assets/aside/04.png',
                    'https://ymrindustrial.com/assets/aside/jetlubes.png'
                  ].map((image, index) => (
                    <div
                      key={index}
                      className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                        index === asideSlide ? 'opacity-100 relative' : 'opacity-0 absolute'
                      }`}
                    >
                      <img 
                        src={image} 
                        alt={`Banner ${index + 1}`} 
                        className="w-full h-auto object-contain max-h-[600px] mx-auto"
                      />
                    </div>
                  ))}
                </div>
                
                {/* Indicadores (pontos) */}
                <div className="flex justify-center gap-2 py-3 bg-white">
                  {[0, 1, 2].map((i) => (
                    <button
                      key={i}
                      onClick={() => setAsideSlide(i)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        asideSlide === i ? 'bg-gray-800' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ===== SEÇÃO CALL-TO-ACTION ===== */}
      <section className="section-padding py-10 bg-red-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
            Download our comprehensive product catalog with specifications, certifications, and technical sheets.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/catalog" className="bg-white text-red-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center gap-2">
              <Download className="h-5 w-5" />
              Download PDF Catalog
            </Link>
            <Link to="/contact" className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-red-600 transition-colors duration-200">
              Contact Us Today
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;