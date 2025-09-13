import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { contactInfo } from '../data/contactInfo';
import { 
  Linkedin, Instagram, Facebook, ChevronUp, Mail, 
  ArrowRight, Shield, Award, Users, Globe, 
  Heart, TrendingUp, User, Activity, ShoppingBag, MessageCircle, Settings
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Footer = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleUserMenuClick = (tab: string) => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    setTimeout(() => navigate(`/userprofile?tab=${tab}`), 80);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Mostrar botão de scroll quando a página for rolada
  React.useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
 
  return (
    <>
      {/* Floating Scroll Button */}
      {showScrollButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 p-3 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-700 transition-colors duration-200 border border-gray-600"
        >
          <ChevronUp className="h-5 w-5" />
        </button>
      )}

      <footer className="relative bg-gray-900 dark:bg-gray-950 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-3">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='20' cy='20' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        {/* Main Footer Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Company Info */}
            <div className="col-span-1 lg:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <img
                  src="https://ymrindustrial.com/assets/ymrlogo.png"
                  alt="YMR Industrial"
                  className="h-10"
                />
              </div>

              <p className="text-gray-300 mb-8 max-w-lg text-lg leading-relaxed">
                Empowering industrial progress with reliable tools, equipment, and solutions.
                <span className="block mt-2 text-gray-200 font-medium">
                  Your trusted partner for over 10 years in Angola.
                </span>
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                  <div className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-gray-400" />
                    <span className="text-2xl font-bold text-white">500+</span>
                  </div>
                  <p className="text-sm text-gray-400">Happy Clients</p>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                  <div className="flex items-center space-x-2">
                    <Award className="h-5 w-5 text-gray-400" />
                    <span className="text-2xl font-bold text-white">10+</span>
                  </div>
                  <p className="text-sm text-gray-400">Years Experience</p>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-4">
                {contactInfo.slice(0, 3).map((item, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="p-2 bg-gray-800 rounded-lg">
                      <item.icon className="h-5 w-5 text-gray-400" />
                    </div>
                    <div className="text-gray-300 text-sm">
                      {Array.isArray(item.details) ? (
                        item.details.map((detail, i) => <div key={i}>{detail}</div>)
                      ) : (
                        <div>{item.details}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-bold mb-6 text-white">
                Quick Links
              </h3>
              <ul className="space-y-3">
                {[
                  { name: 'Home', path: '/' },
                  { name: 'Products', path: '/products' },
                  { name: 'Categories', path: '/categories' },
                  { name: 'About Us', path: '/about' },
                  { name: 'Contact', path: '/contact' },
                  { name: 'Settings', path: '/settings' },
                ].map((link) => (
                  <li key={link.name}>
                    <Link 
                      to={link.path} 
                      className="group flex items-center space-x-3 text-gray-300 hover:text-white transition-colors duration-200"
                    >
                      <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      <span>{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* User Menu (apenas autenticado) */}
            {isAuthenticated && (
              <div>
                <h3 className="text-xl font-bold mb-6 text-white">User Menu</h3>
                <ul className="space-y-3">
                  {[ 
                    { name: 'Perfil', tab: 'profile', icon: User },
                    { name: 'Atividades', tab: 'activity', icon: Activity },
                    { name: 'Pedidos', tab: 'orders', icon: ShoppingBag },
                    { name: 'Mensagens', tab: 'messages', icon: MessageCircle },
                    { name: 'Configurações', tab: 'settings', icon: Settings },
                  ].map((link) => (
                    <li key={link.tab}>
                      <button
                        onClick={() => link.tab === 'settings' ? navigate('/settings') : handleUserMenuClick(link.tab)}
                        className="w-full flex items-center space-x-3 text-left text-gray-300 hover:text-white transition-colors duration-200"
                      >
                        <link.icon className="h-4 w-4" />
                        <span>{link.name}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Social Media & Newsletter */}
            <div>
              <h3 className="text-xl font-bold mb-6 text-white">
                Connect With Us
              </h3>
              
              {/* Social Links */}
              <div className="flex space-x-4 mb-8">
                {[
                  { name: 'LinkedIn', icon: Linkedin, href: '#' },
                  { name: 'Instagram', icon: Instagram, href: '#' },
                  { name: 'Facebook', icon: Facebook, href: '#' },
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors duration-200"
                  >
                    <social.icon className="h-6 w-6 text-gray-400" />
                  </a>
                ))}
              </div>

              {/* Newsletter */}
              <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
                <h4 className="font-semibold mb-3 flex items-center space-x-2 text-white">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span>Stay Updated</span>
                </h4>
                <p className="text-sm text-gray-400 mb-4">
                  Get the latest news and offers
                </p>
                <div className="flex space-x-2">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  />
                  <button className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200">
                    <TrendingUp className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="bg-gray-800 border-t border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex items-center space-x-4">
                <p className="text-gray-400 text-sm">
                  © 2024 YMR Industrial. All rights reserved.
                </p>
                <div className="hidden md:flex items-center space-x-4 text-xs text-gray-500">
                  <span className="flex items-center space-x-1">
                    <Shield className="h-3 w-3" />
                    <span>Secure</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Globe className="h-3 w-3" />
                    <span>Global</span>
                  </span>
                </div>
              </div>
              
              <div className="flex items-center space-x-6 text-sm">
                <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Privacy Policy
                </Link>
                <Link to="/terms" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Terms of Service
                </Link>
                <div className="flex items-center space-x-1 text-gray-400">
                  <span>Made with</span>
                  <Heart className="h-4 w-4 text-gray-500" />
                  <span>in Angola</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;