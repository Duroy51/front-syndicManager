import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart, Search, Filter, Grid, List, ChevronDown, X, ShoppingCart,CheckCircle,
  Star, Clock, Calendar, MapPin, ArrowRight, Eye, Trash2, Share2,
  Plus, Check, Info, AlertTriangle, Download, Printer, Tag
} from 'lucide-react';

// Composant pour afficher un élément de la liste de souhaits
const WishlistItem = ({ item, onRemove, onAddToCart, onView, viewMode }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg ${
        viewMode === 'grid' ? 'h-full' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {viewMode === 'grid' ? (
        // Vue en grille
        <div className="h-full flex flex-col">
          <div className="relative">
            <img 
              src={item.image} 
              alt={item.name} 
              className="w-full h-48 object-cover"
            />
            <div className="absolute top-2 right-2 flex space-x-1">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onRemove(item.id)}
                className="p-2 bg-white/80 backdrop-blur-sm rounded-full text-red-500 hover:bg-red-50 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </motion.button>
            </div>
            {item.discount && (
              <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg">
                -{item.discount}%
              </div>
            )}
          </div>
          <div className="p-4 flex-grow flex flex-col">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-gray-800 text-lg">{item.name}</h3>
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-sm text-gray-600 ml-1">{item.rating}</span>
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>
            <div className="flex items-center text-sm text-gray-500 mb-3">
              <Calendar className="w-4 h-4 mr-1" />
              <span>Ajouté le {new Date(item.addedDate).toLocaleDateString()}</span>
            </div>
            <div className="mt-auto">
              <div className="flex justify-between items-center mb-3">
                <div className="text-lg font-bold text-gray-800">
                  {item.price.toLocaleString()} FCFA
                  {item.discount && (
                    <span className="text-sm text-gray-400 line-through ml-2">
                      {Math.round(item.price / (1 - item.discount / 100)).toLocaleString()} FCFA
                    </span>
                  )}
                </div>
                <div className="text-sm text-gray-500">
                  {item.availability ? (
                    <span className="text-green-600 flex items-center">
                      <Check className="w-4 h-4 mr-1" />
                      Disponible
                    </span>
                  ) : (
                    <span className="text-red-600 flex items-center">
                      <X className="w-4 h-4 mr-1" />
                      Indisponible
                    </span>
                  )}
                </div>
              </div>
              <div className="flex space-x-2">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => onView(item)}
                  className="flex-1 py-2 px-3 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-center"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Voir
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => onAddToCart(item)}
                  disabled={!item.availability}
                  className={`flex-1 py-2 px-3 rounded-lg flex items-center justify-center ${
                    item.availability
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Réserver
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Vue en liste
        <div className="p-4 flex">
          <div className="flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden mr-4">
            <img 
              src={item.image} 
              alt={item.name} 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-grow">
            <div className="flex justify-between">
              <h3 className="font-semibold text-gray-800">{item.name}</h3>
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-sm text-gray-600 ml-1">{item.rating}</span>
              </div>
            </div>
            <p className="text-gray-600 text-sm my-1 line-clamp-1">{item.description}</p>
            <div className="flex items-center text-sm text-gray-500 mb-1">
              <Calendar className="w-4 h-4 mr-1" />
              <span>Ajouté le {new Date(item.addedDate).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-lg font-bold text-gray-800">
                {item.price.toLocaleString()} FCFA
                {item.discount && (
                  <span className="text-sm text-gray-400 line-through ml-2">
                    {Math.round(item.price / (1 - item.discount / 100)).toLocaleString()} FCFA
                  </span>
                )}
              </div>
              <div className="flex space-x-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onRemove(item.id)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onView(item)}
                  className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Eye className="w-4 h-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onAddToCart(item)}
                  disabled={!item.availability}
                  className={`p-2 rounded-lg ${
                    item.availability
                      ? 'text-green-500 hover:bg-green-50'
                      : 'text-gray-300 cursor-not-allowed'
                  }`}
                >
                  <ShoppingCart className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

// Composant de vue détaillée d'un élément
const ItemDetailView = ({ item, onClose, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-xl p-6 max-w-4xl w-full mx-4 shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/2">
            <div className="rounded-xl overflow-hidden">
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-full h-auto object-cover"
              />
            </div>
            {item.gallery && item.gallery.length > 0 && (
              <div className="mt-4 grid grid-cols-4 gap-2">
                {item.gallery.map((img, index) => (
                  <div key={index} className="rounded-lg overflow-hidden">
                    <img 
                      src={img} 
                      alt={`${item.name} - image ${index + 1}`} 
                      className="w-full h-20 object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="md:w-1/2">
            <div className="flex justify-between items-start">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{item.name}</h2>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="flex items-center mb-4">
              <div className="flex items-center mr-4">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="ml-1 text-gray-700">{item.rating} ({item.reviews} avis)</span>
              </div>
              <div className="text-sm text-gray-500">
                {item.availability ? (
                  <span className="text-green-600 flex items-center">
                    <Check className="w-4 h-4 mr-1" />
                    En stock
                  </span>
                ) : (
                  <span className="text-red-600 flex items-center">
                    <X className="w-4 h-4 mr-1" />
                    Rupture de stock
                  </span>
                )}
              </div>
            </div>
            
            <div className="mb-4">
              <div className="text-3xl font-bold text-gray-800">
                {item.price.toLocaleString()} FCFA
                {item.discount && (
                  <span className="text-lg text-gray-400 line-through ml-2">
                    {Math.round(item.price / (1 - item.discount / 100)).toLocaleString()} FCFA
                  </span>
                )}
              </div>
              {item.discount && (
                <div className="mt-1 text-sm text-red-600 font-medium">
                  Économisez {item.discount}% ({Math.round(item.price / (1 - item.discount / 100) - item.price).toLocaleString()} FCFA)
                </div>
              )}
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Description</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
            
            {item.features && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Caractéristiques</h3>
                <ul className="space-y-2">
                  {item.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            <div className="mb-6">
              <div className="flex items-center mb-2">
                <h3 className="text-lg font-semibold text-gray-800">Quantité</h3>
                {item.maxQuantity && (
                  <span className="ml-2 text-sm text-gray-500">
                    (Max: {item.maxQuantity})
                  </span>
                )}
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 border border-gray-300 rounded-l-lg hover:bg-gray-100"
                  disabled={quantity <= 1}
                >
                  <span className="text-xl font-bold">-</span>
                </button>
                <input
                  type="number"
                  min="1"
                  max={item.maxQuantity || 99}
                  value={quantity}
                  onChange={(e) => setQuantity(Math.min(item.maxQuantity || 99, Math.max(1, parseInt(e.target.value) || 1)))}
                  className="w-16 text-center border-t border-b border-gray-300 py-2 focus:outline-none"
                />
                <button
                  onClick={() => setQuantity(Math.min(item.maxQuantity || 99, quantity + 1))}
                  className="p-2 border border-gray-300 rounded-r-lg hover:bg-gray-100"
                  disabled={item.maxQuantity && quantity >= item.maxQuantity}
                >
                  <span className="text-xl font-bold">+</span>
                </button>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onAddToCart(item, quantity)}
                disabled={!item.availability}
                className={`flex-1 py-3 px-6 rounded-xl font-semibold flex items-center justify-center ${
                  item.availability
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Ajouter au panier
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 py-3 px-6 border-2 border-blue-600 text-blue-600 rounded-xl font-semibold hover:bg-blue-50 flex items-center justify-center"
              >
                <Share2 className="w-5 h-5 mr-2" />
                Partager
              </motion.button>
            </div>
            
            {item.availability && item.limitedOffer && (
              <div className="mt-4 p-3 bg-yellow-50 text-yellow-800 rounded-lg flex items-start">
                <Clock className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium">Offre à durée limitée</div>
                  <div className="text-sm">Cette offre expire dans {item.limitedOffer} jours</div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {item.similarItems && item.similarItems.length > 0 && (
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Services similaires</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {item.similarItems.map((similarItem, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors">
                  <div className="w-full h-32 rounded-lg overflow-hidden mb-2">
                    <img 
                      src={similarItem.image} 
                      alt={similarItem.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="font-medium text-gray-800 line-clamp-1">{similarItem.name}</h4>
                  <div className="flex justify-between items-center mt-1">
                    <div className="text-sm font-bold">{similarItem.price.toLocaleString()} FCFA</div>
                    <div className="flex items-center">
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      <span className="text-xs text-gray-600 ml-1">{similarItem.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

// Composant principal de gestion de la liste de souhaits
export const WishlistManagement = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [filterAvailability, setFilterAvailability] = useState('all');
  const [selectedItem, setSelectedItem] = useState(null);
  const [cartNotification, setCartNotification] = useState(null);

  // Charger des données fictives
  useEffect(() => {
    const fakeWishlistItems = [
      {
        id: '1',
        name: 'Transport express de marchandises',
        description: 'Service de transport rapide pour vos marchandises urgentes avec suivi en temps réel et assurance incluse.',
        price: 75000,
        discount: 10,
        rating: 4.8,
        reviews: 124,
        image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
          'https://images.unsplash.com/photo-1494515843206-f3117d3f51b7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
          'https://images.unsplash.com/photo-1586191582151-f73872dfd183?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
          'https://images.unsplash.com/photo-1486096280674-2cd0bf401f25?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
        ],
        addedDate: '2023-05-15T10:30:00Z',
        availability: true,
        features: [
          'Livraison en 24h maximum',
          'Suivi GPS en temps réel',
          'Assurance tous risques incluse',
          'Service client 24/7',
          'Notification automatique à la livraison'
        ],
        maxQuantity: 5,
        limitedOffer: 3,
        similarItems: [
          {
            id: '2',
            name: 'Transport standard de marchandises',
            price: 45000,
            rating: 4.5,
            image: 'https://images.unsplash.com/photo-1494515843206-f3117d3f51b7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
          },
          {
            id: '3',
            name: 'Livraison express urbaine',
            price: 35000,
            rating: 4.7,
            image: 'https://images.unsplash.com/photo-1586191582151-f73872dfd183?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
          },
          {
            id: '4',
            name: 'Transport sécurisé de valeurs',
            price: 95000,
            rating: 4.9,
            image: 'https://images.unsplash.com/photo-1486096280674-2cd0bf401f25?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
          },
          {
            id: '5',
            name: 'Transport réfrigéré',
            price: 85000,
            rating: 4.6,
            image: 'https://images.unsplash.com/photo-1548534441-e99c2d96a798?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
          }
        ]
      },
      {
        id: '2',
        name: 'Location de camion avec chauffeur',
        description: 'Service de location de camion incluant un chauffeur professionnel pour vos besoins de transport. Différentes capacités disponibles.',
        price: 120000,
        rating: 4.6,
        reviews: 89,
        image: 'https://images.unsplash.com/photo-1548534441-e99c2d96a798?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        addedDate: '2023-05-18T14:45:00Z',
        availability: true,
        features: [
          'Chauffeur professionnel inclus',
          'Assurance complète',
          'Différentes capacités disponibles',
          'Réservation flexible',
          'Service d\'assistance routière'
        ]
      },
      {
        id: '3',
        name: 'Service de déménagement',
        description: 'Solution complète pour votre déménagement incluant emballage, transport et déballage de vos biens avec une équipe professionnelle.',
        price: 250000,
        rating: 4.9,
        reviews: 156,
        image: 'https://images.unsplash.com/photo-1586191582151-f73872dfd183?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        addedDate: '2023-05-20T09:15:00Z',
        availability: false,
        features: [
          'Emballage professionnel',
          'Transport sécurisé',
          'Déballage et installation',
          'Assurance tous risques',
          'Service de garde-meuble disponible'
        ]
      },
      {
        id: '4',
        name: 'Transport maritime international',
        description: 'Service de transport maritime pour vos marchandises à l\'international avec gestion des formalités douanières et suivi de cargaison.',
        price: 850000,
        discount: 5,
        rating: 4.7,
        reviews: 72,
        image: 'https://images.unsplash.com/photo-1577032229840-33197764440d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        addedDate: '2023-05-22T16:20:00Z',
        availability: true,
        features: [
          'Transport international',
          'Gestion des formalités douanières',
          'Suivi de cargaison en temps réel',
          'Assurance maritime',
          'Conseil en logistique internationale'
        ]
      },
      {
        id: '5',
        name: 'Livraison express de colis',
        description: 'Service de livraison rapide pour vos colis urgents dans toute la ville avec suivi en temps réel et confirmation de livraison.',
        price: 15000,
        rating: 4.5,
        reviews: 210,
        image: 'https://images.unsplash.com/photo-1559223607-a43c990c692c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        addedDate: '2023-05-25T11:10:00Z',
        availability: true,
        features: [
          'Livraison en moins de 3 heures',
          'Suivi en temps réel',
          'Confirmation de livraison',
          'Assurance incluse',
          'Service disponible 7j/7'
        ]
      }
    ];
    setWishlistItems(fakeWishlistItems);
  }, []);

  // Filtrer et trier les éléments
  const filteredItems = wishlistItems
    .filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesAvailability = filterAvailability === 'all' || 
                                 (filterAvailability === 'available' && item.availability) ||
                                 (filterAvailability === 'unavailable' && !item.availability);
      return matchesSearch && matchesAvailability;
    })
    .sort((a, b) => {
      if (sortBy === 'date') {
        return sortOrder === 'asc' 
          ? new Date(a.addedDate) - new Date(b.addedDate)
          : new Date(b.addedDate) - new Date(a.addedDate);
      } else if (sortBy === 'price') {
        return sortOrder === 'asc'
          ? a.price - b.price
          : b.price - a.price;
      } else if (sortBy === 'name') {
        return sortOrder === 'asc'
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else if (sortBy === 'rating') {
        return sortOrder === 'asc'
          ? a.rating - b.rating
          : b.rating - a.rating;
      }
      return 0;
    });

  const handleRemoveItem = (id) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== id));
  };

  const handleAddToCart = (item, quantity = 1) => {
    // Simuler l'ajout au panier
    console.log(`Ajout au panier: ${quantity}x ${item.name}`);
    setCartNotification({
      item,
      quantity
    });
    
    // Masquer la notification après 3 secondes
    setTimeout(() => {
      setCartNotification(null);
    }, 3000);
    
    // Fermer la vue détaillée si elle est ouverte
    if (selectedItem) {
      setSelectedItem(null);
    }
  };

  const handleViewItem = (item) => {
    setSelectedItem(item);
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const exportWishlist = () => {
    const dataStr = JSON.stringify(wishlistItems, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'wishlist.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const printWishlist = () => {
    const printWindow = window.open('', '_blank');
    
    printWindow.document.write(`
      <html>
        <head>
          <title>Ma Liste de Souhaits - SyndicManager</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h1 { color: #3b82f6; text-align: center; margin-bottom: 20px; }
            table { width: 100%; border-collapse: collapse; }
            th { background-color: #3b82f6; color: white; padding: 10px; text-align: left; }
            td { padding: 8px; border-bottom: 1px solid #ddd; }
            tr:nth-child(even) { background-color: #f2f2f2; }
            .footer { margin-top: 20px; text-align: center; font-size: 12px; color: #666; }
            .price { font-weight: bold; }
            .status { font-weight: bold; }
            .available { color: green; }
            .unavailable { color: red; }
          </style>
        </head>
        <body>
          <h1>Ma Liste de Souhaits</h1>
          <table>
            <thead>
              <tr>
                <th>Service</th>
                <th>Description</th>
                <th>Prix</th>
                <th>Disponibilité</th>
                <th>Date d'ajout</th>
              </tr>
            </thead>
            <tbody>
    `);
    
    wishlistItems.forEach(item => {
      printWindow.document.write(`
        <tr>
          <td>${item.name}</td>
          <td>${item.description.substring(0, 100)}${item.description.length > 100 ? '...' : ''}</td>
          <td class="price">${item.price.toLocaleString()} FCFA</td>
          <td class="status ${item.availability ? 'available' : 'unavailable'}">${item.availability ? 'Disponible' : 'Indisponible'}</td>
          <td>${new Date(item.addedDate).toLocaleDateString()}</td>
        </tr>
      `);
    });
    
    printWindow.document.write(`
            </tbody>
          </table>
          <div class="footer">
            Document généré le ${new Date().toLocaleDateString()} à ${new Date().toLocaleTimeString()}
          </div>
        </body>
      </html>
    `);
    
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Ma Liste de Souhaits</h1>
            <p className="text-gray-600">
              Gérez les services que vous souhaitez réserver ultérieurement
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={printWishlist}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center"
            >
              <Printer className="w-5 h-5 mr-2" />
              Imprimer
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={exportWishlist}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
            >
              <Download className="w-5 h-5 mr-2" />
              Exporter
            </motion.button>
          </div>
        </div>

        {/* Filtres et recherche */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Rechercher dans ma liste de souhaits..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
            <div>
              <select
                value={filterAvailability}
                onChange={(e) => setFilterAvailability(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">Tous les services</option>
                <option value="available">Disponibles uniquement</option>
                <option value="unavailable">Indisponibles uniquement</option>
              </select>
            </div>
          </div>
          <div className="flex flex-wrap justify-between items-center mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <span className="text-sm text-gray-600 mr-2">Trier par:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="date">Date d'ajout</option>
                  <option value="price">Prix</option>
                  <option value="name">Nom</option>
                  <option value="rating">Évaluation</option>
                </select>
                <button
                  onClick={toggleSortOrder}
                  className="ml-2 p-1 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full"
                >
                  <ChevronDown className={`w-5 h-5 transform ${sortOrder === 'asc' ? 'rotate-180' : ''}`} />
                </button>
              </div>
              <div className="text-sm text-gray-600">
                {filteredItems.length} service(s) dans votre liste
              </div>
            </div>
            <div className="flex items-center space-x-2 mt-4 sm:mt-0">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg ${
                  viewMode === 'grid'
                    ? 'bg-blue-100 text-blue-600'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg ${
                  viewMode === 'list'
                    ? 'bg-blue-100 text-blue-600'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Liste des éléments */}
        {filteredItems.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Votre liste de souhaits est vide</h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              Vous n'avez pas encore ajouté de services à votre liste de souhaits ou aucun service ne correspond à vos critères de recherche.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setFilterAvailability('all');
              }}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 inline-flex items-center"
            >
              <Search className="w-5 h-5 mr-2" />
              Explorer les services
            </button>
          </div>
        ) : (
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1'
          }`}>
            <AnimatePresence>
              {filteredItems.map(item => (
                <WishlistItem
                  key={item.id}
                  item={item}
                  viewMode={viewMode}
                  onRemove={handleRemoveItem}
                  onAddToCart={handleAddToCart}
                  onView={handleViewItem}
                />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Vue détaillée */}
      <AnimatePresence>
        {selectedItem && (
          <ItemDetailView
            item={selectedItem}
            onClose={() => setSelectedItem(null)}
            onAddToCart={handleAddToCart}
          />
        )}
      </AnimatePresence>

      {/* Notification d'ajout au panier */}
      <AnimatePresence>
        {cartNotification && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 right-6 bg-green-600 text-white p-4 rounded-xl shadow-lg max-w-md"
          >
            <div className="flex items-start">
              <CheckCircle className="w-6 h-6 mr-3 flex-shrink-0" />
              <div>
                <p className="font-medium">Ajouté au panier avec succès !</p>
                <p className="text-sm text-green-100 mt-1">
                  {cartNotification.quantity}x {cartNotification.item.name}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WishlistManagement;