import React, { useState, useEffect } from 'react';
import { 
  User, ShoppingBag, MessageCircle, 
  Mail, Calendar, Clock,
  Edit3, Save, Download, Filter,
  Package, Star,
  BarChart3, TrendingUp, Target, Award, Shield
} from 'lucide-react';

import UserHeader from '../components/UserHeader';

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    marketing: false
  });

  
  const [activeTab, setActiveTab] = useState('profile');

  // ===== DADOS DO USUÁRIO =====
  const [userData, setUserData] = useState({
    name: 'João Silva Santos',
    email: 'joao.silva@email.com',
    phone: '+244 923 456 789',
    birthDate: '1985-03-15',
    address: 'Rua da Independência, 123',
    city: 'Luanda',
    country: 'Angola',
    company: 'Petrolífera Nacional',
    position: 'Engenheiro de Projetos',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  });

  // ===== DADOS DE ATIVIDADE =====
  const activityStats = [
    { label: 'Pedidos Realizados', value: '24', icon: ShoppingBag, color: 'bg-blue-500' },
    { label: 'Consultorias Solicitadas', value: '8', icon: MessageCircle, color: 'bg-green-500' },
    { label: 'Equipamentos Alugados', value: '12', icon: Package, color: 'bg-purple-500' },
    { label: 'Pontos de Fidelidade', value: '2,340', icon: Star, color: 'bg-yellow-500' }
  ];

  // ===== HISTÓRICO DE PEDIDOS =====
  const orderHistory = [
    {
      id: 'YMR-2024-001',
      date: '2024-08-05',
      service: 'Aluguer Gerador Industrial 500kW',
      status: 'Concluído',
      value: 'Kz 850,000',
      statusColor: 'text-green-600 bg-green-100'
    },
    {
      id: 'YMR-2024-002', 
      date: '2024-07-28',
      service: 'Consultoria Engenharia de Poços',
      status: 'Em Andamento',
      value: 'Kz 1,200,000',
      statusColor: 'text-blue-600 bg-blue-100'
    },
    {
      id: 'YMR-2024-003',
      date: '2024-07-15',
      service: 'Aluguer Compressor 350 Bar',
      status: 'Entregue',
      value: 'Kz 450,000',
      statusColor: 'text-purple-600 bg-purple-100'
    },
    {
      id: 'YMR-2024-004',
      date: '2024-07-10',
      service: 'Treinamento Técnico Offshore',
      status: 'Concluído',
      value: 'Kz 320,000',
      statusColor: 'text-green-600 bg-green-100'
    }
  ];

  // ===== ATIVIDADES RECENTES =====
  const recentActivities = [
    { 
      action: 'Solicitou orçamento para gerador 750kW',
      time: '2 horas atrás',
      icon: ShoppingBag,
      color: 'text-blue-600'
    },
    {
      action: 'Atualizou informações de perfil',
      time: '1 dia atrás', 
      icon: User,
      color: 'text-green-600'
    },
    {
      action: 'Participou do webinar "Inovações em Perfuração"',
      time: '3 dias atrás',
      icon: Calendar,
      color: 'text-purple-600'
    },
    {
      action: 'Avaliou serviço de consultoria (5 estrelas)',
      time: '5 dias atrás',
      icon: Star,
      color: 'text-yellow-600'
    },
    {
      action: 'Baixou certificado de treinamento',
      time: '1 semana atrás',
      icon: Download,
      color: 'text-indigo-600'
    }
  ];

  // ===== MENSAGENS RECENTES =====
  const recentMessages = [
    {
      from: 'Suporte YMR',
      subject: 'Confirmação de Agendamento - Visita Técnica',
      time: '1 hora atrás',
      unread: true
    },
    {
      from: 'Aboud Consultoria',
      subject: 'Proposta Técnica - Projeto Offshore',
      time: '4 horas atrás',
      unread: true
    },
    {
      from: 'Equipe Comercial',
      subject: 'Desconto Especial - Equipamentos de Verão',
      time: '2 dias atrás',
      unread: false
    }
  ];

  const handleSave = () => {
    setIsEditing(false);
    // Aqui você salvaria os dados
    console.log('Dados salvos:', userData);
  };

  const handleNotificationChange = (type) => {
    setNotifications(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  return (
    <div className="min-h-screen page-content bg-gray-50">
      {/* ===== HEADER DO PERFIL e NAVEGAÇÃO POR TABS ===== */}
      <UserHeader 
        userData={userData} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />

      {/* ===== CONTEÚDO PRINCIPAL ===== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* ===== TAB PERFIL ===== */}
        {activeTab === 'profile' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Informações Pessoais</h2>
                <button
                  onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                    isEditing 
                      ? 'bg-green-600 hover:bg-green-700 text-white' 
                      : 'bg-red-600 hover:bg-red-700 text-white'
                  }`}
                >
                  {isEditing ? <Save className="h-4 w-4" /> : <Edit3 className="h-4 w-4" />}
                  {isEditing ? 'Salvar' : 'Editar'}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nome Completo</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={userData.name}
                      onChange={(e) => setUserData({...userData, name: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  ) : (
                    <div className="p-3 bg-gray-50 rounded-lg text-gray-900">{userData.name}</div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={userData.email}
                      onChange={(e) => setUserData({...userData, email: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  ) : (
                    <div className="p-3 bg-gray-50 rounded-lg text-gray-900">{userData.email}</div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Telefone</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={userData.phone}
                      onChange={(e) => setUserData({...userData, phone: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  ) : (
                    <div className="p-3 bg-gray-50 rounded-lg text-gray-900">{userData.phone}</div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Data de Nascimento</label>
                  {isEditing ? (
                    <input
                      type="date"
                      value={userData.birthDate}
                      onChange={(e) => setUserData({...userData, birthDate: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  ) : (
                    <div className="p-3 bg-gray-50 rounded-lg text-gray-900">
                      {new Date(userData.birthDate).toLocaleDateString('pt-BR')}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Empresa</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={userData.company}
                      onChange={(e) => setUserData({...userData, company: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  ) : (
                    <div className="p-3 bg-gray-50 rounded-lg text-gray-900">{userData.company}</div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Cargo</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={userData.position}
                      onChange={(e) => setUserData({...userData, position: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  ) : (
                    <div className="p-3 bg-gray-50 rounded-lg text-gray-900">{userData.position}</div>
                  )}
                </div>
              </div>
            </div>

            {/* ===== ESTATÍSTICAS RÁPIDAS ===== */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {activityStats.map((stat) => (
                <div key={stat.label} className="bg-white rounded-xl shadow-sm p-6 text-center">
                  <div className={`${stat.color} w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===== TAB ATIVIDADES ===== */}
        {activeTab === 'activity' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Atividades Recentes</h2>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className={`p-2 rounded-full bg-white shadow-sm ${activity.color}`}>
                      <activity.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{activity.action}</p>
                      <p className="text-sm text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Resumo de Atividades</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <TrendingUp className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-600">+15%</div>
                  <div className="text-sm text-gray-600">Atividade este mês</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <Target className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-600">92%</div>
                  <div className="text-sm text-gray-600">Taxa de satisfação</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <Award className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-purple-600">Gold</div>
                  <div className="text-sm text-gray-600">Status de cliente</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===== TAB PEDIDOS ===== */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Histórico de Pedidos</h2>
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors">
                    <Filter className="h-4 w-4" />
                    Filtrar
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors">
                    <Download className="h-4 w-4" />
                    Exportar
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">ID</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Serviço</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Data</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Valor</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderHistory.map((order) => (
                      <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-4 font-mono text-sm text-gray-600">{order.id}</td>
                        <td className="py-4 px-4 font-medium text-gray-900">{order.service}</td>
                        <td className="py-4 px-4 text-gray-600">
                          {new Date(order.date).toLocaleDateString('pt-BR')}
                        </td>
                        <td className="py-4 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${order.statusColor}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="py-4 px-4 font-semibold text-gray-900">{order.value}</td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <button className="text-blue-600 hover:text-blue-800 text-sm">
                              Ver Detalhes
                            </button>
                            <button className="text-green-600 hover:text-green-800 text-sm">
                              Baixar
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ===== TAB MENSAGENS ===== */}
        {activeTab === 'messages' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Mensagens Recentes</h2>
              <div className="space-y-4">
                {recentMessages.map((message, index) => (
                  <div key={index} className={`p-4 rounded-lg border-l-4 ${
                    message.unread ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-gray-50'
                  }`}>
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-gray-900">{message.from}</span>
                          {message.unread && (
                            <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                          )}
                        </div>
                        <p className="text-gray-700 mb-2">{message.subject}</p>
                        <p className="text-sm text-gray-500">{message.time}</p>
                      </div>
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        Abrir
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ===== TAB CONFIGURAÇÕES ===== */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            {/* NOTIFICAÇÕES */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Preferências de Notificação</h2>
              <div className="space-y-4">
                {Object.entries(notifications).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900 capitalize">
                        {key === 'email' && 'Notificações por Email'}
                        {key === 'sms' && 'Notificações por SMS'}
                        {key === 'push' && 'Notificações Push'}
                        {key === 'marketing' && 'Emails de Marketing'}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {key === 'email' && 'Receber atualizações importantes por email'}
                        {key === 'sms' && 'Receber alertas urgentes por SMS'}
                        {key === 'push' && 'Receber notificações no navegador'}
                        {key === 'marketing' && 'Receber ofertas e novidades'}
                      </p>
                    </div>
                    <button
                      onClick={() => handleNotificationChange(key)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 ${
                        value ? 'bg-red-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          value ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* SEGURANÇA */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Segurança</h2>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">Alterar Senha</h3>
                      <p className="text-sm text-gray-500">Última alteração: há 3 meses</p>
                    </div>
                    <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                      Alterar
                    </button>
                  </div>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">Autenticação de Dois Fatores</h3>
                      <p className="text-sm text-gray-500">Adicione uma camada extra de segurança</p>
                    </div>
                    <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                      Ativar
                    </button>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">Sessões Ativas</h3>
                      <p className="text-sm text-gray-500">Gerencie dispositivos conectados</p>
                    </div>
                    <button className="text-red-600 hover:text-red-800 px-4 py-2 rounded-lg font-medium transition-colors">
                      Ver Sessões
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* PRIVACIDADE */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Privacidade</h2>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">Baixar Meus Dados</h3>
                      <p className="text-sm text-gray-500">Exporte todas suas informações</p>
                    </div>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                      Baixar
                    </button>
                  </div>
                </div>

                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-red-900">Excluir Conta</h3>
                      <p className="text-sm text-red-700">Esta ação é irreversível</p>
                    </div>
                    <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                      Excluir
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* PREFERÊNCIAS GERAIS */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Preferências Gerais</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Idioma</label>
                  <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent">
                    <option value="pt">Português</option>
                    <option value="en">English</option>
                    <option value="fr">Français</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Fuso Horário</label>
                  <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent">
                    <option value="africa/luanda">África/Luanda (WAT)</option>
                    <option value="europe/lisbon">Europa/Lisboa (WET)</option>
                    <option value="america/sao_paulo">América/São Paulo (BRT)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Moeda</label>
                  <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent">
                    <option value="aoa">Kwanza Angolano (Kz)</option>
                    <option value="usd">Dólar Americano ($)</option>
                    <option value="eur">Euro (€)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tema</label>
                  <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent">
                    <option value="light">Claro</option>
                    <option value="dark">Escuro</option>
                    <option value="auto">Automático</option>
                  </select>
                </div>
              </div>
            </div>

            {/* INTEGRAÇÃO COM TERCEIROS */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Integrações</h2>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                        <Mail className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">Microsoft Outlook</h3>
                        <p className="text-sm text-gray-500">Sincronizar calendário e emails</p>
                      </div>
                    </div>
                    <button className="text-blue-600 hover:text-blue-800 font-medium">Conectar</button>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                        <MessageCircle className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">WhatsApp Business</h3>
                        <p className="text-sm text-gray-500">Receber notificações via WhatsApp</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                      Conectado
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                        <BarChart3 className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">Power BI</h3>
                        <p className="text-sm text-gray-500">Dashboards e relatórios avançados</p>
                      </div>
                    </div>
                    <button className="text-purple-600 hover:text-purple-800 font-medium">Conectar</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ===== FOOTER COM AÇÕES RÁPIDAS ===== */}
      <div className="bg-white border-t border-gray-200 sticky bottom-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Clock className="h-4 w-4" />
                Última atividade: há 2 horas
              </div>
              <div className="flex items-center gap-2 text-sm text-green-600">
                <Shield className="h-4 w-4" />
                Conta verificada
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors">
                <MessageCircle className="h-4 w-4" />
                Suporte
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors">
                <ShoppingBag className="h-4 w-4" />
                Novo Pedido
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ===== MODAL DE CONFIRMAÇÃO (exemplo) ===== */}
      {/* Este modal poderia ser usado para confirmações de ações importantes */}
      
      {/* ===== CSS ADICIONAL PARA ANIMAÇÕES ===== */}
      <style jsx>{`
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .transition-all {
          transition: all 0.3s ease;
        }
        
        .hover-scale:hover {
          transform: scale(1.02);
        }
      `}</style>
    </div>
  );
};

export default UserProfile;
                      