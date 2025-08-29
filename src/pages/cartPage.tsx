import React, { useState } from 'react';
import { FileText, Eye, ExternalLink, Package, AlertCircle, Plus, CheckSquare, Square, Clock, CheckCircle, XCircle, ChevronDown, ChevronRight, Trash2 } from 'lucide-react';

// ===== TIPOS =====
type CartItem = {
  id: string;
  name: string;
  category: string;
  brand: string;
  model: string;
  cod: string;
  availability: string;
  image: string;
  description: string;
  features: string[];
  rfqId: string | null;
  status: string | null;
  addedDate: string;
};

type Rfq = {
  id: string;
  name: string;
  date: string;
  itemCount: number;
};

type StatusInfo = {
  color: string;
  icon: React.ComponentType<{ className?: string }>;
};

const CartPage = () => {
  // ===== ESTADOS DO SISTEMA DE RFQ =====
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'GEN-750-KW-2024',
      name: 'Gerador Industrial 750kW',
      category: 'Geradores de Energia',
      brand: 'YMR Power Solutions',
      model: 'YMR-750i Pro',
      cod: 'YMR-GEN-750-2024-001',
      availability: 'Em Estoque',
      image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400&h=300&fit=crop',
      description: 'Gerador industrial de alta performance com 750kW de potência, ideal para operações offshore e industriais de grande porte. Equipado com tecnologia avançada de controle automático.',
      features: [
        'Potência nominal: 750kW',
        'Sistema de partida automática',
        'Monitoramento remoto 24/7',
        'Consumo otimizado de combustível'
      ],
      rfqId: 'RFQ-2024-001',
      status: 'Em Espera',
      addedDate: '2024-08-15'
    },
    {
      id: 'COMP-500-HP-2024',
      name: 'Compressor Industrial 500HP',
      category: 'Compressores',
      brand: 'YMR Compression',
      model: 'YMR-500C Elite',
      cod: 'YMR-COMP-500-2024-002',
      availability: 'Sob Encomenda',
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop',
      description: 'Compressor de ar industrial de alta eficiência, projetado para operações contínuas em ambientes industriais exigentes.',
      features: [
        'Potência: 500HP',
        'Pressão máxima: 250 PSI',
        'Sistema de resfriamento automático',
        'Controle digital avançado'
      ],
      rfqId: 'RFQ-2024-001',
      status: 'Concluído',
      addedDate: '2024-08-15'
    },
    {
      id: 'PUMP-300-GPM-2024',
      name: 'Bomba Centrífuga 300GPM',
      category: 'Bombas',
      brand: 'YMR Pumping',
      model: 'YMR-300P Pro',
      cod: 'YMR-PUMP-300-2024-003',
      availability: 'Em Estoque',
      image: 'https://images.unsplash.com/photo-1558618047-b2c1ff18c0c3?w=400&h=300&fit=crop',
      description: 'Bomba centrífuga de alta performance para aplicações industriais, com capacidade de 300 galões por minuto.',
      features: [
        'Capacidade: 300 GPM',
        'Altura manométrica: 150 ft',
        'Material: Aço inoxidável',
        'Vedação mecânica dupla'
      ],
      rfqId: 'RFQ-2024-002',
      status: 'Em Espera',
      addedDate: '2024-08-20'
    },
    {
      id: 'VALVE-DN200-2024',
      name: 'Válvula Borboleta DN200',
      category: 'Válvulas',
      brand: 'YMR Valves',
      model: 'YMR-BF200',
      cod: 'YMR-VALVE-200-2024-004',
      availability: 'Em Estoque',
      image: 'https://images.unsplash.com/photo-1615796153287-98eacf0abb13?w=400&h=300&fit=crop',
      description: 'Válvula borboleta industrial DN200 com atuador pneumático, ideal para controle de fluxo em sistemas industriais.',
      features: [
        'Diâmetro: DN200 (8")',
        'Pressão: PN16',
        'Atuador pneumático incluído',
        'Material: Ferro fundido'
      ],
      rfqId: null,
      status: null,
      addedDate: '2024-08-25'
    }
  ]);

  // Carregar itens do localStorage se existirem
  React.useEffect(() => {
    try {
      const stored = localStorage.getItem('cartItems');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // mesclar mantendo os existentes de exemplo
          const existingIds = new Set(parsed.map((p: any) => p.id));
          const merged = [
            ...parsed,
            ...cartItems.filter((it) => !existingIds.has(it.id))
          ];
          setCartItems(merged);
        }
      }
    } catch {}
  }, []);

  const [rfqList, setRfqList] = useState<Rfq[]>([
    { id: 'RFQ-2024-001', name: 'Projeto Plataforma Alpha', date: '2024-08-15', itemCount: 2 },
    { id: 'RFQ-2024-002', name: 'Expansão Refinaria Beta', date: '2024-08-20', itemCount: 1 }
  ]);

  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<CartItem | null>(null);
  const [selectedRfqId, setSelectedRfqId] = useState<string | null>(null);
  const [showRfqModal, setShowRfqModal] = useState(false);
  const [collapsedRfqIds, setCollapsedRfqIds] = useState<Record<string, boolean>>({});

  // ===== FUNÇÕES DE SELEÇÃO =====
  const toggleItemSelection = (itemId: string) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const selectAllItems = () => {
    const unassignedItems = cartItems.filter(item => !item.rfqId).map(item => item.id);
    setSelectedItems(unassignedItems);
  };

  const clearSelection = () => {
    setSelectedItems([]);
  };

  // ===== FUNÇÕES DE RFQ =====
  const createNewRfq = (rfqName: string) => {
    if (!rfqName.trim() || selectedItems.length === 0) return;
    const newRfqId = `RFQ-2024-${String(rfqList.length + 1).padStart(3, '0')}`;
    const newRfq: Rfq = {
      id: newRfqId,
      name: rfqName,
      date: new Date().toISOString().split('T')[0],
      itemCount: selectedItems.length
    };

    setRfqList(prev => [...prev, newRfq]);
    setCartItems(prev => 
      prev.map(item => 
        selectedItems.includes(item.id) 
          ? { ...item, rfqId: newRfqId, status: 'Em Espera' }
          : item
      )
    );
    setSelectedItems([]);
    setShowRfqModal(false);
  };

  const addToExistingRfq = (rfqId: string) => {
    setCartItems(prev => 
      prev.map(item => 
        selectedItems.includes(item.id) 
          ? { ...item, rfqId, status: 'Em Espera' }
          : item
      )
    );

    setRfqList(prev => 
      prev.map(rfq => 
        rfq.id === rfqId 
          ? { ...rfq, itemCount: rfq.itemCount + selectedItems.length }
          : rfq
      )
    );

    setSelectedItems([]);
    setShowRfqModal(false);
  };

  // ===== FUNÇÕES UTILITÁRIAS =====
  const getStatusInfo = (status: string | null): StatusInfo => {
    switch (status) {
      case 'Em Espera':
        return { color: 'text-yellow-600 bg-yellow-100', icon: Clock };
      case 'Concluído':
        return { color: 'text-green-600 bg-green-100', icon: CheckCircle };
      case 'Cancelado':
        return { color: 'text-red-600 bg-red-100', icon: XCircle };
      default:
        return { color: 'text-gray-600 bg-gray-100', icon: AlertCircle };
    }
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'Em Estoque':
        return 'text-green-600 bg-green-100';
      case 'Sob Encomenda':
        return 'text-blue-600 bg-blue-100';
      case 'Indisponível':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const groupedItems = cartItems.reduce<Record<string, CartItem[]>>((groups, item) => {
    const key = item.rfqId || 'unassigned';
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(item);
    return groups;
  }, {});

  const unassignedItems = cartItems.filter(item => !item.rfqId);

  // ===== HANDLERS ADICIONAIS =====
  const toggleRfqCollapse = (rfqId: string) => {
    setCollapsedRfqIds(prev => ({ ...prev, [rfqId]: !prev[rfqId] }));
  };

  const removeFromRfq = (itemId: string, rfqId: string) => {
    setCartItems(prev => prev.map(item => item.id === itemId ? { ...item, rfqId: null, status: null } : item));
    setRfqList(prev => prev.map(r => r.id === rfqId ? { ...r, itemCount: Math.max(0, r.itemCount - 1) } : r));
    if (selectedProduct?.id === itemId) {
      setSelectedProduct(prev => prev ? { ...prev, rfqId: null, status: null } : prev);
    }
  };

  return (
    <div className="min-h-screen page-content">
      {/* ===== SEÇÃO HERO ===== */}
      <section className="bg-gradient-to-r from-red-600 to-red-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <FileText className="h-12 w-12" />
            <h1 className="text-4xl md:text-5xl font-bold">Request for Quotation</h1>
          </div>
          <p className="text-xl text-red-100 max-w-2xl mx-auto">
            Manage your product quotation requests and procurement process.
          </p>
        </div>
      </section>

      {/* ===== SEÇÃO RESUMO ===== */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <Package className="h-6 w-6 text-gray-600" />
              <span className="text-lg font-semibold text-gray-800">
                {cartItems.length} produtos • {rfqList.length} RFQs ativas
              </span>
            </div>
            {unassignedItems.length > 0 && (
              <div className="flex gap-3">
                <button
                  onClick={selectAllItems}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Selecionar Todos
                </button>
                {selectedItems.length > 0 && (
                  <>
                    <button
                      onClick={clearSelection}
                      className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      Limpar Seleção
                    </button>
                    <button
                      onClick={() => setShowRfqModal(true)}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Criar RFQ ({selectedItems.length})
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ===== SEÇÃO PRINCIPAL ===== */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* ===== LISTA DE PRODUTOS AGRUPADOS ===== */}
            <div className="lg:col-span-2 space-y-6">
              {/* Produtos Não Atribuídos */}
              {unassignedItems.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-orange-500" />
                    Produtos Não Atribuídos ({unassignedItems.length})
                  </h3>
                  <div className="space-y-3">
                    {unassignedItems.map((item) => (
                      <ProductCard 
                        key={item.id}
                        item={item}
                        isSelected={selectedItems.includes(item.id)}
                        onToggleSelect={toggleItemSelection}
                        onViewDetails={setSelectedProduct}
                        showSelection={true}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* RFQs Existentes */}
              {(Object.entries(groupedItems) as [string, CartItem[]][]).map(([rfqId, items]) => {
                if (rfqId === 'unassigned') return null;
                const rfq = rfqList.find(r => r.id === rfqId);
                
                return (
                  <div key={rfqId} className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleRfqCollapse(rfqId)}
                          className="p-2 rounded hover:bg-gray-100"
                          aria-label="Colapsar/Expandir RFQ"
                        >
                          {collapsedRfqIds[rfqId] ? (
                            <ChevronRight className="h-5 w-5" />
                          ) : (
                            <ChevronDown className="h-5 w-5" />
                          )}
                        </button>
                        <h3 className="text-xl font-bold text-gray-800">
                          {rfq?.name || rfqId}
                        </h3>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-500">
                        <span>{rfq?.date} • {items.length} itens</span>
                        <button
                          onClick={() => { setSelectedRfqId(rfqId); setSelectedProduct(null); }}
                          className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                          title="Ver resumo da RFQ"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    {!collapsedRfqIds[rfqId] && (
                      <div className="space-y-3">
                        {items.map((item) => (
                          <ProductCard 
                            key={item.id}
                            item={item}
                            onViewDetails={(p) => { setSelectedRfqId(null); setSelectedProduct(p); }}
                            showSelection={false}
                            onRemoveFromRfq={() => removeFromRfq(item.id, rfqId)}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* ===== VISUALIZADOR DE DETALHES ===== */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  {selectedRfqId ? 'Resumo da RFQ' : 'Detalhes do Produto'}
                </h2>
                
                {selectedRfqId ? (
                  <RfqDetails rfqId={selectedRfqId} items={(groupedItems[selectedRfqId] || []) as CartItem[]} />
                ) : (
                  !selectedProduct ? (
                    <div className="text-center py-8">
                      <AlertCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500 text-lg">
                        Clique em um produto ou em uma RFQ para ver os detalhes
                      </p>
                    </div>
                  ) : (
                    <ProductDetails product={selectedProduct} />
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== MODAL DE RFQ ===== */}
      {showRfqModal && (
        <RfqModal
          selectedCount={selectedItems.length}
          rfqList={rfqList}
          onCreateNew={createNewRfq}
          onAddToExisting={addToExistingRfq}
          onClose={() => setShowRfqModal(false)}
        />
      )}
    </div>
  );

  // ===== COMPONENTE CARD DO PRODUTO =====
  interface ProductCardProps {
    item: CartItem;
    isSelected?: boolean;
    onToggleSelect?: (id: string) => void;
    onViewDetails: (item: CartItem) => void;
    showSelection: boolean;
    onRemoveFromRfq?: () => void;
  }

  function ProductCard({ item, isSelected = false, onToggleSelect = () => {}, onViewDetails, showSelection, onRemoveFromRfq }: ProductCardProps) {
    const statusInfo = getStatusInfo(item.status);
    const StatusIcon = statusInfo.icon;

    return (
      <div
        className={`bg-white rounded-lg shadow-sm border-2 p-4 transition-all duration-200 cursor-pointer hover:shadow-md ${
          selectedProduct?.id === item.id 
            ? 'border-red-500 ring-2 ring-red-200' 
            : 'border-gray-200 hover:border-red-300'
        }`}
        onClick={() => onViewDetails(item)}
      >
        <div className="flex items-start gap-4">
          {/* Checkbox de Seleção */}
          {showSelection && (
            <div 
              className="mt-2 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                onToggleSelect(item.id);
              }}
            >
              {isSelected ? (
                <CheckSquare className="h-5 w-5 text-blue-600" />
              ) : (
                <Square className="h-5 w-5 text-gray-400" />
              )}
            </div>
          )}

          {/* Imagem */}
          <div className="flex-shrink-0">
            <img
              src={item.image}
              alt={item.name}
              className="w-16 h-16 object-cover rounded-lg"
            />
          </div>

          {/* Informações */}
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-gray-800 truncate">{item.name}</h4>
            <p className="text-sm text-gray-600">{item.brand} • {item.model}</p>
            <p className="text-xs text-gray-500 mt-1">COD: {item.cod}</p>
            
            <div className="flex items-center gap-2 mt-2">
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getAvailabilityColor(item.availability)}`}>
                {item.availability}
              </span>
              {item.status && (
                <span className={`px-2 py-1 text-xs font-medium rounded-full flex items-center gap-1 ${statusInfo.color}`}>
                  <StatusIcon className="h-3 w-3" />
                  {item.status}
                </span>
              )}
            </div>
          </div>

          {/* Ações */}
          <div className="flex flex-col gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onViewDetails(item);
              }}
              className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
              title="Ver Detalhes"
            >
              <Eye className="h-4 w-4" />
            </button>
            {onRemoveFromRfq && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onRemoveFromRfq();
                }}
                className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                title="Remover da RFQ"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ===== COMPONENTE DETALHES DO PRODUTO =====
  function ProductDetails({ product }: { product: CartItem }) {
    const statusInfo = getStatusInfo(product.status);
    const StatusIcon = statusInfo.icon;

    return (
      <div className="space-y-6">
        {/* Imagem */}
        <div className="text-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-full max-w-48 h-48 object-cover rounded-lg shadow-lg mx-auto"
          />
        </div>

        {/* Informações Básicas */}
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
          <p className="text-gray-600 mb-4">{product.brand} • {product.model}</p>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Código:</span>
              <span className="font-medium">{product.cod}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Categoria:</span>
              <span className="font-medium">{product.category}</span>
            </div>
          </div>

          {/* Status */}
          <div className="flex items-center justify-between mt-4">
            <span className={`px-3 py-1 text-sm font-medium rounded-full ${getAvailabilityColor(product.availability)}`}>
              {product.availability}
            </span>
            {product.status && (
              <span className={`px-3 py-1 text-sm font-medium rounded-full flex items-center gap-1 ${statusInfo.color}`}>
                <StatusIcon className="h-4 w-4" />
                {product.status}
              </span>
            )}
          </div>
        </div>

        {/* Descrição */}
        <div>
          <h4 className="font-semibold text-gray-800 mb-2">Descrição</h4>
          <p className="text-gray-700 text-sm leading-relaxed">{product.description}</p>
        </div>

        {/* Características */}
        <div>
          <h4 className="font-semibold text-gray-800 mb-2">Características Principais</h4>
          <ul className="space-y-1">
            {product.features.map((feature: string, index: number) => (
              <li key={index} className="text-gray-700 text-sm flex items-start gap-2">
                <span className="text-red-600 mt-1">•</span>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* RFQ Info */}
        {product.rfqId && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-2">Informações do RFQ</h4>
            <div className="text-sm space-y-1">
              <div className="flex justify-between">
                <span className="text-gray-500">RFQ ID:</span>
                <span className="font-medium">{product.rfqId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Adicionado em:</span>
                <span className="font-medium">{product.addedDate}</span>
              </div>
            </div>
          </div>
        )}

        {/* Link para Página */}
        <a
          href={`/products/${product.id}`}
          className="w-full bg-red-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
        >
          <ExternalLink className="h-4 w-4" />
          Ver Página do Produto
        </a>
      </div>
    );
  }

  // ===== COMPONENTE RESUMO DA RFQ =====
  function RfqDetails({ rfqId, items }: { rfqId: string; items: CartItem[] }) {
    const total = items.length;
    const firstImage = items[0]?.image;
    const statusCounts = items.reduce<Record<string, number>>((acc, it) => {
      const key = it.status || 'Sem Status';
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});

    return (
      <div className="space-y-6">
        {firstImage && (
          <div className="text-center">
            <img src={firstImage} alt={`Primeiro produto da ${rfqId}`} className="w-full max-w-48 h-48 object-cover rounded-lg shadow-lg mx-auto" />
          </div>
        )}

        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">{rfqId}</h3>
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <span className="px-3 py-1 rounded-full bg-gray-100 font-medium">{total} produtos</span>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-gray-800 mb-2">Estados dos Produtos</h4>
          <div className="flex flex-wrap gap-2">
            {Object.entries(statusCounts).map(([status, count]) => {
              const info = getStatusInfo(status === 'Sem Status' ? null : status);
              return (
                <span key={status} className={`px-3 py-1 text-sm rounded-full ${info.color}`}>
                  {status}: {count}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // ===== COMPONENTE MODAL RFQ =====
  function RfqModal({ selectedCount, rfqList, onCreateNew, onAddToExisting, onClose }: { selectedCount: number; rfqList: Rfq[]; onCreateNew: (name: string) => void; onAddToExisting: (id: string) => void; onClose: () => void; }) {
    const [rfqName, setRfqName] = useState('');
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Adicionar {selectedCount} produtos ao RFQ
            </h3>

            {/* Criar Novo RFQ */}
            <div className="mb-6">
              <h4 className="font-semibold text-gray-700 mb-3">Criar Novo RFQ</h4>
              <input
                type="text"
                placeholder="Nome do projeto/RFQ"
                value={rfqName}
                onChange={(e) => setRfqName(e.target.value)}
                autoFocus
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
              <button
                onClick={() => onCreateNew(rfqName)}
                disabled={!rfqName.trim()}
                className="w-full mt-3 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 disabled:bg-gray-400 transition-colors"
              >
                <Plus className="h-4 w-4 inline mr-2" />
                Criar Novo RFQ
              </button>
            </div>

            {/* RFQs Existentes */}
            {rfqList.length > 0 && (
              <div className="mb-6">
                <h4 className="font-semibold text-gray-700 mb-3">Adicionar a RFQ Existente</h4>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {rfqList.map((rfq) => (
                    <button
                      key={rfq.id}
                      onClick={() => onAddToExisting(rfq.id)}
                      className="w-full text-left p-3 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
                    >
                      <div className="font-medium text-gray-800">{rfq.name}</div>
                      <div className="text-sm text-gray-500">{rfq.id} • {rfq.itemCount} itens</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Botões */}
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default CartPage;