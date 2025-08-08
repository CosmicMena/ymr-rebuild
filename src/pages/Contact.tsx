import React, { useState } from 'react';
import { contactInfo } from '../data/contactInfo';
import { MapPin, Send, MessageCircle } from 'lucide-react';

const Contact = () => {
  // ===== ESTADO DO FORMULÁRIO =====
  // Estado para controlar os dados do formulário de contato
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: ''
  });

  // ===== FUNÇÕES DE MANIPULAÇÃO DO FORMULÁRIO =====
  // Função para atualizar os campos do formulário conforme o usuário digita
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Função para processar o envio do formulário
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would send the form data to a server
    alert('Thank you for your message! Our team will get back to you shortly.');
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      message: ''
    });
  };

  // ===== DADOS DE INFORMAÇÕES DE CONTATO =====
  // Array contendo as informações de contato da empresa

  return (
    <div className="min-h-screen page-content">
      {/* ===== SEÇÃO HERO - CABEÇALHO PRINCIPAL ===== */}
      {/* Seção principal com título e descrição da página de contato */}
      <section className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Let's Talk Business</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Send us a message or request a quote. Our team will get back to you shortly.
          </p>
        </div>
      </section>

      {/* ===== SEÇÃO FORMULÁRIO E INFORMAÇÕES DE CONTATO ===== */}
      {/* Seção principal que contém o formulário de contato e informações da empresa */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Formulário de Contato */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <MessageCircle className="h-8 w-8 text-red-600 mr-3" />
                  <h2 className="text-3xl font-bold text-gray-900">Send us a Message</h2>
                </div>
                <p className="text-gray-600">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
                    placeholder="Enter your email address"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors resize-none"
                    placeholder="Tell us about your project or requirements..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full btn-primary text-lg py-4"
                >
                  <Send className="h-5 w-5" />
                  Send Message
                </button>
              </form>
            </div>

            {/* Informações de Contato */}
            <div>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Get in Touch</h2>
                <p className="text-lg text-gray-600">
                  We're here to help with all your industrial equipment needs. Choose the best way to reach us.
                </p>
              </div>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div 
                    key={info.title}
                    className="bg-white rounded-xl p-6 shadow-md card-hover animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-start">
                      <div className="bg-red-50 p-3 rounded-lg mr-4">
                        <info.icon className="h-6 w-6 text-red-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{info.title}</h3>
                        <p className="text-gray-900 font-medium mb-1">
                          {/* {info.details} */}
                          {
                            Array.isArray(info.details) ? (
                              info.details.map((phone, i) => <p key={i}>{phone}</p>)
                            ) : (
                              <p>{info.details}</p>
                            )
                          }

                        </p>
                        <p className="text-gray-600 text-sm">{info.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Placeholder do Mapa */}
              <div className="mt-8 bg-gray-200 rounded-xl h-64 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <MapPin className="h-12 w-12 mx-auto mb-2" />
                  <p>Interactive Map</p>
                  <p className="text-sm">Rua Principal nº 123, Luanda, Angola</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SEÇÃO PERGUNTAS FREQUENTES ===== */}
      {/* Seção que exibe perguntas e respostas comuns para ajudar os usuários */}
      <section className="section-padding bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              Quick answers to common questions about our products and services.
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                question: "What types of industrial products do you offer?",
                answer: "We offer a comprehensive range including ladders, construction machinery, cement tools, lubricants & sealants, safety gear, and industrial accessories."
              },
              {
                question: "Do you provide delivery services?",
                answer: "Yes, we provide fast and reliable delivery services across Angola. Contact us for specific delivery options and timelines."
              },
              {
                question: "Are your products certified?",
                answer: "All our products meet international quality standards and come with proper certifications and quality guarantees."
              },
              {
                question: "Do you offer bulk pricing for large orders?",
                answer: "Yes, we offer competitive pricing for bulk orders and long-term contracts. Contact us for a customized quote."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;