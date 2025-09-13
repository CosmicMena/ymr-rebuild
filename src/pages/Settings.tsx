import { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  Bell, 
  Palette, 
  Shield, 
  Eye,
  Save,
  RotateCcw
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

const Settings = () => {
  const { theme, setTheme } = useTheme();
  const { isAuthenticated } = useAuth();
  const isRestricted = !isAuthenticated;
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    marketing: false,
    orderUpdates: true,
    promotions: false,
    securityAlerts: true
  });

  const [privacy, setPrivacy] = useState({
    profileVisibility: 'public',
    showEmail: false,
    showPhone: false,
    allowMessages: true,
    dataSharing: false
  });

  const [security, setSecurity] = useState({
    twoFactor: false,
    loginAlerts: true,
    sessionTimeout: '30',
    passwordExpiry: '90'
  });

  const [language, setLanguage] = useState('pt');
  const [currency, setCurrency] = useState('AOA');
  const [timezone, setTimezone] = useState('Africa/Luanda');

  const handleNotificationChange = (key: string) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }));
  };

  const handlePrivacyChange = (key: string) => {
    setPrivacy(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }));
  };

  const handleSecurityChange = (key: string) => {
    setSecurity(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }));
  };

  const handleSave = () => {
    // Aqui você salvaria as configurações na API
    console.log('Configurações salvas:', { notifications, privacy, security, theme, language, currency, timezone });
  };

  const handleReset = () => {
    // Resetar para configurações padrão
    setNotifications({
      email: true,
      sms: false,
      push: true,
      marketing: false,
      orderUpdates: true,
      promotions: false,
      securityAlerts: true
    });
    setPrivacy({
      profileVisibility: 'public',
      showEmail: false,
      showPhone: false,
      allowMessages: true,
      dataSharing: false
    });
    setSecurity({
      twoFactor: false,
      loginAlerts: true,
      sessionTimeout: '30',
      passwordExpiry: '90'
    });
    setLanguage('pt');
    setCurrency('AOA');
    setTimezone('Africa/Luanda');
  };

  return (
    <div className="min-h-screen page-content bg-gray-50 dark:bg-gray-900">
      {/* ===== HEADER ===== */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <SettingsIcon className="h-5 w-5" />
              <span className="text-sm font-medium">Configurações</span>
            </div>
            <p className="text-lg text-blue-100 max-w-3xl mx-auto">
              Gerencie suas preferências, notificações e configurações de segurança
            </p>
          </div>
        </div>
      </section>

      {/* ===== CONFIGURAÇÕES ===== */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            
            {/* ===== NOTIFICAÇÕES ===== */}
            <div className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100 dark:border-gray-700 ${isRestricted ? 'opacity-50 pointer-events-none' : ''}`}
            aria-disabled={isRestricted}
            >
              <div className="flex items-center mb-6">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-xl mr-4">
                  <Bell className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Notificações</h2>
                  <p className="text-gray-600 dark:text-gray-300">Configure como você deseja receber notificações</p>
                </div>
              </div>

              <div className="space-y-4">
                {Object.entries(notifications).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {key === 'email' && 'Receber notificações por email'}
                        {key === 'sms' && 'Receber notificações por SMS'}
                        {key === 'push' && 'Receber notificações push no navegador'}
                        {key === 'marketing' && 'Receber ofertas e promoções'}
                        {key === 'orderUpdates' && 'Atualizações sobre pedidos'}
                        {key === 'promotions' && 'Promoções especiais'}
                        {key === 'securityAlerts' && 'Alertas de segurança'}
                      </p>
                    </div>
                    <button
                      onClick={() => handleNotificationChange(key)}
                      disabled={isRestricted}
                      aria-disabled={isRestricted}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        value ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                      } disabled:opacity-50 disabled:cursor-not-allowed`}
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

            {/* ===== APARÊNCIA ===== */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-xl mr-4">
                  <Palette className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Aparência</h2>
                  <p className="text-gray-600 dark:text-gray-300">Personalize a aparência da aplicação</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tema</label>
                  <select 
                    value={theme}
                    onChange={(e) => setTheme(e.target.value as 'light' | 'dark' | 'auto')}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="light">Claro</option>
                    <option value="dark">Escuro</option>
                    <option value="auto">Automático</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Idioma</label>
                  <select 
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="pt">Português</option>
                    <option value="en">English</option>
                    <option value="es">Español</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Moeda</label>
                  <select 
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="AOA">Kwanza (AOA)</option>
                    <option value="USD">Dólar (USD)</option>
                    <option value="EUR">Euro (EUR)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Fuso Horário</label>
                  <select 
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="Africa/Luanda">Luanda (GMT+1)</option>
                    <option value="UTC">UTC (GMT+0)</option>
                    <option value="Europe/Lisbon">Lisboa (GMT+0)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* ===== PRIVACIDADE ===== */}
            <div className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100 dark:border-gray-700 ${isRestricted ? 'opacity-50 pointer-events-none' : ''}`}
            aria-disabled={isRestricted}
            >
              <div className="flex items-center mb-6">
                <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-xl mr-4">
                  <Eye className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Privacidade</h2>
                  <p className="text-gray-600 dark:text-gray-300">Controle sua privacidade e visibilidade</p>
                </div>
              </div>

              <div className="space-y-4">
                {Object.entries(privacy).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white capitalize">
                        {key === 'profileVisibility' && 'Perfil Público'}
                        {key === 'showEmail' && 'Mostrar Email'}
                        {key === 'showPhone' && 'Mostrar Telefone'}
                        {key === 'allowMessages' && 'Permitir Mensagens'}
                        {key === 'dataSharing' && 'Compartilhar Dados'}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {key === 'profileVisibility' && 'Tornar perfil visível para outros usuários'}
                        {key === 'showEmail' && 'Exibir email no perfil público'}
                        {key === 'showPhone' && 'Exibir telefone no perfil público'}
                        {key === 'allowMessages' && 'Permitir que outros usuários enviem mensagens'}
                        {key === 'dataSharing' && 'Compartilhar dados para melhorar o serviço'}
                      </p>
                    </div>
                    <button
                      onClick={() => handlePrivacyChange(key)}
                      disabled={isRestricted}
                      aria-disabled={isRestricted}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        value ? 'bg-green-600' : 'bg-gray-300 dark:bg-gray-600'
                      } disabled:opacity-50 disabled:cursor-not-allowed`}
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

            {/* ===== SEGURANÇA ===== */}
            <div className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100 dark:border-gray-700 ${isRestricted ? 'opacity-50 pointer-events-none' : ''}`}
            aria-disabled={isRestricted}
            >
              <div className="flex items-center mb-6">
                <div className="p-3 bg-red-100 dark:bg-red-900/20 rounded-xl mr-4">
                  <Shield className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Segurança</h2>
                  <p className="text-gray-600 dark:text-gray-300">Configure as opções de segurança da sua conta</p>
                </div>
              </div>

              <div className="space-y-4">
                {Object.entries(security).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white capitalize">
                        {key === 'twoFactor' && 'Autenticação de Dois Fatores'}
                        {key === 'loginAlerts' && 'Alertas de Login'}
                        {key === 'sessionTimeout' && 'Timeout de Sessão'}
                        {key === 'passwordExpiry' && 'Expiração de Senha'}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {key === 'twoFactor' && 'Adicionar camada extra de segurança'}
                        {key === 'loginAlerts' && 'Receber alertas quando alguém fizer login'}
                        {key === 'sessionTimeout' && `${value} minutos de inatividade`}
                        {key === 'passwordExpiry' && `Senha expira a cada ${value} dias`}
                      </p>
                    </div>
                    {key === 'sessionTimeout' || key === 'passwordExpiry' ? (
                      <select 
                        value={String(value)}
                        onChange={(e) => setSecurity(prev => ({ ...prev, [key]: e.target.value }))}
                        disabled={isRestricted}
                        aria-disabled={isRestricted}
                        className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {key === 'sessionTimeout' && (
                          <>
                            <option value="15">15 min</option>
                            <option value="30">30 min</option>
                            <option value="60">1 hora</option>
                            <option value="120">2 horas</option>
                          </>
                        )}
                        {key === 'passwordExpiry' && (
                          <>
                            <option value="30">30 dias</option>
                            <option value="60">60 dias</option>
                            <option value="90">90 dias</option>
                            <option value="180">180 dias</option>
                          </>
                        )}
                      </select>
                    ) : (
                      <button
                        onClick={() => handleSecurityChange(key)}
                        disabled={isRestricted}
                        aria-disabled={isRestricted}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          value ? 'bg-red-600' : 'bg-gray-300 dark:bg-gray-600'
                        } disabled:opacity-50 disabled:cursor-not-allowed`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            value ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* ===== BOTÕES DE AÇÃO ===== */}
            <div className="flex flex-col sm:flex-row gap-4 justify-end">
              <button
                onClick={handleReset}
                className="flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Restaurar Padrões
              </button>
              <button
                onClick={handleSave}
                className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-200"
              >
                <Save className="h-4 w-4 mr-2" />
                Salvar Configurações
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Settings;
