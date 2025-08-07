import React from 'react';
import { Target, Eye, Heart, Users, Award, Clock } from 'lucide-react';

const About = () => {
  // ===== DADOS DOS VALORES DA EMPRESA =====
  // Array contendo os valores fundamentais da empresa que serão exibidos na seção "Our Values"
  const values = [
    {
      icon: Award,
      title: 'Quality First',
      description: 'We never compromise on quality. Every product we offer meets the highest industrial standards.'
    },
    {
      icon: Users,
      title: 'Client-Centered Service',
      description: 'Our clients are at the heart of everything we do. We provide personalized solutions and support.'
    },
    {
      icon: Heart,
      title: 'Sustainability',
      description: 'We are committed to sustainable practices and environmentally responsible solutions.'
    }
  ];

  // ===== DADOS DAS ESTATÍSTICAS =====
  // Array contendo as estatísticas da empresa que serão exibidas na seção "Our Track Record"
  const stats = [
    { number: '10+', label: 'Years of Experience' },
    { number: '500+', label: 'Satisfied Clients' },
    { number: '156+', label: 'Products Available' },
    { number: '24/7', label: 'Customer Support' }
  ];

  return (
    <div className="min-h-screen page-content">
      {/* ===== SEÇÃO HERO - CABEÇALHO PRINCIPAL ===== */}
      {/* Seção principal com título e descrição da empresa */}
      <section className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About YMR Industrial</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Your trusted partner in delivering industrial-grade products that improve safety, 
              performance, and durability across Angola.
            </p>
          </div>
        </div>
      </section>

      {/* ===== SEÇÃO MISSÃO E VISÃO ===== */}
      {/* Seção que apresenta a missão e visão da empresa com layout em duas colunas */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="mb-12">
                <div className="flex items-center mb-4">
                  <Target className="h-8 w-8 text-red-600 mr-3" />
                  <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
                </div>
                <p className="text-lg text-gray-600 leading-relaxed">
                  To deliver industrial-grade products that improve safety, performance, and durability. 
                  We are committed to providing our clients with reliable solutions that meet the highest 
                  quality standards while ensuring exceptional service and support.
                </p>
              </div>
              
              <div>
                <div className="flex items-center mb-4">
                  <Eye className="h-8 w-8 text-red-600 mr-3" />
                  <h2 className="text-3xl font-bold text-gray-900">Our Vision</h2>
                </div>
                <p className="text-lg text-gray-600 leading-relaxed">
                  To become Angola's leading provider of industrial solutions, recognized for our commitment 
                  to quality, innovation, and customer satisfaction. We envision a future where every 
                  industrial project is powered by reliable, sustainable solutions.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src="https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="Industrial facility"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== SEÇÃO VALORES DA EMPRESA ===== */}
      {/* Seção que exibe os valores fundamentais da empresa em formato de cards */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do and shape our relationships with clients and partners.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div 
                key={value.title}
                className="bg-white rounded-xl p-8 shadow-md text-center card-hover animate-fade-in-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="bg-red-50 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                  <value.icon className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SEÇÃO ESTATÍSTICAS ===== */}
      {/* Seção que exibe números e estatísticas da empresa em formato de grid */}
      <section className="section-padding bg-red-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Track Record</h2>
            <p className="text-xl text-red-100 max-w-2xl mx-auto">
              Numbers that reflect our commitment to excellence and client satisfaction.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={stat.label}
                className="text-center animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-red-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SEÇÃO DEPOIMENTO ===== */}
      {/* Seção que exibe um depoimento de cliente para aumentar a credibilidade */}
      <section className="section-padding bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <blockquote className="text-2xl md:text-3xl font-medium text-gray-900 mb-8 leading-relaxed">
            "Over 10 years supplying professionals with what they need to build, repair and maintain. 
            YMR Industrial has been our trusted partner for reliable industrial solutions."
          </blockquote>
          <div className="flex items-center justify-center">
            <img 
              src="https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=200" 
              alt="Client testimonial"
              className="w-16 h-16 rounded-full mr-4"
            />
            <div className="text-left">
              <div className="font-semibold text-gray-900">Construction Professional</div>
              <div className="text-gray-600">Long-term Client</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;