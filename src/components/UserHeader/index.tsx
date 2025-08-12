import React, { useEffect, useState } from "react";
import { 
  User, Settings, Activity, ShoppingBag, MessageCircle, MapPin, Mail, Camera
} from 'lucide-react';

export default function UserHeader( { userData, activeTab, setActiveTab }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 1);
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const tabs = [
    { id: 'profile', label: 'Perfil', icon: User },
    { id: 'activity', label: 'Atividades', icon: Activity },
    { id: 'orders', label: 'Pedidos', icon: ShoppingBag },
    { id: 'messages', label: 'Mensagens', icon: MessageCircle },
    { id: 'settings', label: 'Configurações', icon: Settings }
  ];
  return (
    <>
      {/* ===== HEADER DO PERFIL ===== */}
      <div
        className={`bg-gradient-to-r from-gray-900 via-gray-800 to-red-900 text-white 
  sticky top-[110px] z-50 transition-[width,height] duration-500 ease-in-out`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row items-center gap-4">
            
            {/* Avatar */}
            <div className="relative transition-all duration-300">
              <img
                src={userData.avatar}
                alt="Avatar do usuário"
                className={`rounded-full border-4 border-white/20 shadow-lg object-cover transition-[width,height] duration-500 ease-in-out ${isScrolled ? "w-12 h-12" : "w-24 h-24"}`}
              />
              {!isScrolled && (
                <button className={`absolute -bottom-2 -right-2 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full shadow-lg transition-opacity duration-500 ease-in-out ${isScrolled ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
                  <Camera className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Informações */}
            <div className={`transition-all duration-300 ${isScrolled ? "text-sm" : ""}`}>
              <h1 className="font-bold mb-1">{userData.name}</h1>
              <p className="text-gray-300">{userData.position}</p>
              {!isScrolled && (
                <div className={`transition-opacity duration-500 ease-in-out ${isScrolled ? "opacity-0" : "opacity-100"}`}>
                  <p className="text-gray-400">{userData.company}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-300">
                    <div className="flex items-center gap-1">
                      <Mail className="h-4 w-4" />
                      {userData.email}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {userData.city}, {userData.country}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Estatísticas */}
            {!isScrolled && (
              <div className="md:ml-auto">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-white/10 rounded-lg p-3">
                    <div className="text-2xl font-bold">24</div>
                    <div className="text-xs text-gray-300">Pedidos</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3">
                    <div className="text-2xl font-bold">8</div>
                    <div className="text-xs text-gray-300">Consultorias</div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
          {/* ===== NAVEGAÇÃO POR TABS ===== */}
        <div className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex space-x-8 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? 'border-red-600 text-red-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>
      
    </>
  );
}
