import React from 'react';
import { Link } from 'react-router-dom';
import { contactInfo } from '../data/contactInfo';
import { Linkedin, Instagram, Facebook, ChevronUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
 
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <img
                src="https://ymrindustrial.com/assets/ymrlogo.png"
                alt="YMR Industrial"
                className="h-8"
              />
              {/* <span className="text-xl font-bold">YMR Industrial</span> */}
            </div>

            <p className="text-gray-300 mb-6 max-w-md">
              Empowering industrial progress with reliable tools, equipment, and solutions.
              Your trusted partner for over 10 years in Angola.
            </p>

            <div className="space-y-3">
              {contactInfo.slice(0, 3).map((item, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <item.icon className="h-5 w-5 text-red-600 mt-1" />
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
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { name: 'Home', path: '/' },
                { name: 'Products', path: '/products' },
                { name: 'Categories', path: '/categories' },
                { name: 'About Us', path: '/about' },
                { name: 'Contact', path: '/contact' },
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                <Linkedin className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                <Facebook className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-red-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2">Looking for reliable industrial solutions?</h3>
            <p className="text-red-100 mb-4">Contact us today or download our latest product catalog.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="btn-secondary">
                Contact Us Today
              </Link>
              <Link to="/catalog" className="bg-white text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
                Download Catalog
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-800 border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 YMR Industrial. All rights reserved.
            </p>
            <button 
              onClick={scrollToTop}
              className="mt-4 md:mt-0 p-2 bg-gray-700 rounded-full hover:bg-gray-600 transition-colors duration-200"
            >
              <ChevronUp className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;