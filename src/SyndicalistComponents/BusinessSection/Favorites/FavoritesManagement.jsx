import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart, Search, Filter, Grid, List, ChevronDown, X, ShoppingCart,
  Star, Clock, Calendar, MapPin, ArrowRight, Eye, Trash2, Share2,
  Plus, Check, Info, AlertTriangle, Download, Printer, Tag, MessageSquare,
  ThumbsUp, User, Phone, Mail, ExternalLink, Flag, BarChart2
} from 'lucide-react';

// Composant pour afficher un élément favori
const FavoriteItem = ({ item, onRemove, onAddToCart, onView, viewMode }) => {
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
                <Heart className="w-4 h-4 fill-current" />
              </motion.button>
            </div>
            {item.featured && (
              <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-lg">
                Recommandé
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
            <div className="flex items-center text-sm text-gray-500 mb-2">
              <User className="w-4 h-4 mr-1" />
              <span>{item.provider}</span>
            </div>
            <div className="flex items-center text-sm text-gray-500 mb-3">
              <MapPin className="w-4 h-4 mr-1" />
              <span>{item.location}</span>
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
                  Détails
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
            <div className="flex items-center text-xs text-gray-500 mb-1">
              <User className="w-3 h-3 mr-1" />
              <span>{item.provider}</span>
              <span className="mx-2">•</span>
              <MapPin className="w-3 h-3 mr-1" />
              <span>{item.location}</span>
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
                  <Heart className="w-4 h-4 fill-current" />
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
const ItemDetailView = ({ item, onClose, onAddToCart, onRemoveFavorite }) => {
  const [activeTab, setActiveTab] = useState('details');
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
        className="bg-white rounded-xl p-6 max-w-4xl w-full mx-4 shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-2xl font-bold text-gray-800">{item.name}</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/2">
            <div className="rounded-xl overflow-hidden mb-4">
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-full h-auto object-cover"
              />
            </div>
            
            {item.gallery && item.gallery.length > 0 && (
              <div className="grid grid-cols-4 gap-2">
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
            <div className="flex space-x-4 mb-6 border-b border-gray-200">
              <button
                onClick={() => setActiveTab('details')}
                className={`py-3 px-4 font-medium ${
                  activeTab === 'details'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Détails
              </button>
              <button
                onClick={() => setActiveTab('provider')}
                className={`py-3 px-4 font-medium ${
                  activeTab === 'provider'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Prestataire
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`py-3 px-4 font-medium ${
                  activeTab === 'reviews'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Avis ({item.reviews})
              </button>
            </div>
            
            {activeTab === 'details' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-3xl font-bold text-gray-800">
                    {item.price.toLocaleString()} FCFA
                    {item.discount && (
                      <span className="text-lg text-gray-400 line-through ml-2">
                        {Math.round(item.price / (1 - item.discount / 100)).toLocaleString()} FCFA
                      </span>
                    )}
                  </div>
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="ml-1 text-gray-700">{item.rating} ({item.reviews} avis)</span>
                  </div>
                </div>
                
                <div className="text-gray-600">
                  <p>{item.description}</p>
                </div>
                
                {item.features && (
                  <div>
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
                
                <div>
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
                
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
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
                    Réserver maintenant
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onRemoveFavorite(item.id)}
                    className="flex-1 py-3 px-6 border-2 border-red-500 text-red-500 rounded-xl font-semibold hover:bg-red-50 flex items-center justify-center"
                  >
                    <Heart className="w-5 h-5 mr-2 fill-current" />
                    Retirer des favoris
                  </motion.button>
                </div>
              </div>
            )}
            
            {activeTab === 'provider' && (
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                    <img 
                      src={item.providerImage || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop"} 
                      alt={item.provider} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">{item.provider}</h3>
                    <div className="flex items-center text-sm text-gray-500">
                      <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                      <span>{item.providerRating || 4.7} • Membre depuis {item.providerSince || '2020'}</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-800 mb-2">Coordonnées</h4>
                  <div className="space-y-2">
                    <div className="flex items-center text-gray-600">
                      <Phone className="w-4 h-4 mr-2 text-blue-500" />
                      <span>{item.providerPhone || '+237 612345678'}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Mail className="w-4 h-4 mr-2 text-blue-500" />
                      <span>{item.providerEmail || 'contact@example.com'}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                      <span>{item.providerAddress || 'Douala, Cameroun'}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">À propos du prestataire</h4>
                  <p className="text-gray-600">
                    {item.providerDescription || 
                     "Prestataire de services de transport professionnel avec plus de 10 ans d'expérience dans le secteur. Spécialisé dans les solutions logistiques fiables et efficaces pour les entreprises et les particuliers."}
                  </p>
                </div>
                
                <div className="flex space-x-3 pt-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 py-2 px-4 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 flex items-center justify-center"
                  >
                    <MessageSquare className="w-5 h-5 mr-2" />
                    Contacter
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 py-2 px-4 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 flex items-center justify-center"
                  >
                    <ExternalLink className="w-5 h-5 mr-2" />
                    Voir le profil
                  </motion.button>
                </div>
              </div>
            )}
            
            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="text-3xl font-bold text-gray-800 mr-2">{item.rating}</div>
                    <div>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-5 h-5 ${i < Math.floor(item.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                      <div className="text-sm text-gray-500">{item.reviews} avis</div>
                    </div>
                  </div>
                  <div>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                      Donner un avis
                    </button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {/* Avis fictifs */}
                  {[
                    {
                      id: 1,
                      user: "Jean Dupont",
                      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
                      rating: 5,
                      date: "Il y a 2 semaines",
                      comment: "Excellent service, très professionnel et ponctuel. Je recommande vivement !"
                    },
                    {
                      id: 2,
                      user: "Marie Martin",
                      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
                      rating: 4,
                      date: "Il y a 1 mois",
                      comment: "Bon service dans l'ensemble, mais un peu cher. La qualité est au rendez-vous cependant."
                    },
                    {
                      id: 3,
                      user: "Paul Nkeng",
                      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
                      rating: 5,
                      date: "Il y a 2 mois",
                      comment: "Service impeccable et personnel très aimable. Je n'hésiterai pas à faire appel à eux à nouveau."
                    }
                  ].map(review => (
                    <div key={review.id} className="border-b border-gray-100 pb-4">
                      <div className="flex items-center mb-2">
                        <img 
                          src={review.avatar} 
                          alt={review.user} 
                          className="w-10 h-10 rounded-full mr-3"
                        />
                        <div>
                          <div className="font-medium text-gray-800">{review.user}</div>
                          <div className="flex items-center">
                            <div className="flex mr-2">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                                />
                              ))}
                            </div>
                            <span className="text-sm text-gray-500">{review.date}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-600">{review.comment}</p>
                      <div className="flex items-center mt-2 text-sm text-gray-500">
                        <button className="flex items-center mr-4 hover:text-blue-600">
                          <ThumbsUp className="w-4 h-4 mr-1" />
                          <span>Utile (3)</span>
                        </button>
                        <button className="flex items-center hover:text-red-600">
                          <Flag className="w-4 h-4 mr-1" />
                          <span>Signaler</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="text-center">
                  <button className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                    Voir tous les avis
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Composant principal de gestion des favoris
export const FavoritesManagement = () => {
  const [favorites, setFavorites] = useState([]);
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [filterCategory, setFilterCategory] = useState('all');
  const [selectedItem, setSelectedItem] = useState(null);
  const [cartNotification, setCartNotification] = useState(null);
  const [showStats, setShowStats] = useState(false);

  // Charger des données fictives
  useEffect(() => {
    const fakeFavorites = [
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
        category: 'transport',
        provider: 'TransExpress Cameroun',
        providerImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        providerRating: 4.9,
        providerSince: '2018',
        location: 'Douala, Cameroun',
        features: [
          'Livraison en 24h maximum',
          'Suivi GPS en temps réel',
          'Assurance tous risques incluse',
          'Service client 24/7',
          'Notification automatique à la livraison'
        ],
        featured: true
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
        category: 'location',
        provider: 'CamLocation Services',
        location: 'Yaoundé, Cameroun',
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
        category: 'demenagement',
        provider: 'MoveIt Pro',
        location: 'Douala, Cameroun',
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
        category: 'maritime',
        provider: 'Global Shipping Co.',
        location: 'Kribi, Cameroun',
        features: [
          'Transport international',
          'Gestion des formalités douanières',
          'Suivi de cargaison en temps réel',
          'Assurance maritime',
          'Conseil en logistique internationale'
        ],
        featured: true
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
        category: 'livraison',
        provider: 'SpeedDelivery',
        location: 'Douala, Cameroun',
        features: [
          'Livraison en moins de 3 heures',
          'Suivi en temps réel',
          'Confirmation de livraison',
          'Assurance incluse',
          'Service disponible 7j/7'
        ]
      }
    ];
    setFavorites(fakeFavorites);
  }, []);

  // Filtrer et trier les éléments
  const filteredItems = favorites
    .filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.provider.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
      return matchesSearch && matchesCategory;
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

  const handleRemoveFavorite = (id) => {
    setFavorites(favorites.filter(item => item.id !== id));
    if (selectedItem && selectedItem.id === id) {
      setSelectedItem(null);
    }
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

  const exportFavorites = () => {
    const dataStr = JSON.stringify(favorites, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'favorites.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const printFavorites = () => {
    const printWindow = window.open('', '_blank');
    
    printWindow.document.write(`
      <html>
        <head>
          <title>Mes Favoris - SyndicManager</title>
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
          <h1>Mes Services Favoris</h1>
          <table>
            <thead>
              <tr>
                <th>Service</th>
                <th>Prestataire</th>
                <th>Localisation</th>
                <th>Prix</th>
                <th>Disponibilité</th>
              </tr>
            </thead>
            <tbody>
    `);
    
    favorites.forEach(item => {
      printWindow.document.write(`
        <tr>
          <td>${item.name}</td>
          <td>${item.provider}</td>
          <td>${item.location}</td>
          <td class="price">${item.price.toLocaleString()} FCFA</td>
          <td class="status ${item.availability ? 'available' : 'unavailable'}">${item.availability ? 'Disponible' : 'Indisponible'}</td>
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

  // Statistiques des favoris
  const favoriteStats = {
    total: favorites.length,
    byCategory: {
      transport: favorites.filter(f => f.category === 'transport').length,
      location: favorites.filter(f => f.category === 'location').length,
      demenagement: favorites.filter(f => f.category === 'demenagement').length,
      maritime: favorites.filter(f => f.category === 'maritime').length,
      livraison: favorites.filter(f => f.category === 'livraison').length
    },
    available: favorites.filter(f => f.availability).length,
    unavailable: favorites.filter(f => !f.availability).length,
    averagePrice: favorites.length > 0 
      ? Math.round(favorites.reduce((sum, f) => sum + f.price, 0) / favorites.length) 
      : 0,
    withDiscount: favorites.filter(f => f.discount).length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Mes Favoris</h1>
            <p className="text-gray-600">
              Gérez vos services préférés et réservez-les facilement
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex flex-wrap gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowStats(!showStats)}
              className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 flex items-center"
            >
              <BarChart2 className="w-5 h-5 mr-2" />
              {showStats ? 'Masquer les stats' : 'Voir les stats'}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={printFavorites}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center"
            >
              <Printer className="w-5 h-5 mr-2" />
              Imprimer
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={exportFavorites}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
            >
              <Download className="w-5 h-5 mr-2" />
              Exporter
            </motion.button>
          </div>
        </div>

        {/* Statistiques */}
        <AnimatePresence>
          {showStats && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white rounded-xl shadow-lg p-6 mb-8 overflow-hidden"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Statistiques de vos favoris</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-blue-50 p-4 rounded-xl">
                  <div className="text-sm text-blue-600 mb-1">Total des favoris</div>
                  <div className="text-3xl font-bold text-gray-800">{favoriteStats.total}</div>
                  <div className="mt-2 text-sm text-gray-600">
                    {favoriteStats.available} disponibles, {favoriteStats.unavailable} indisponibles
                  </div>
                </div>
                
                <div className="bg-green-50 p-4 rounded-xl">
                  <div className="text-sm text-green-600 mb-1">Prix moyen</div>
                  <div className="text-3xl font-bold text-gray-800">{favoriteStats.averagePrice.toLocaleString()} FCFA</div>
                  <div className="mt-2 text-sm text-gray-600">
                    {favoriteStats.withDiscount} services avec réduction
                  </div>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-xl col-span-1 md:col-span-2">
                  <div className="text-sm text-purple-600 mb-1">Répartition par catégorie</div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {Object.entries(favoriteStats.byCategory).map(([category, count]) => (
                      count > 0 && (
                        <div key={category} className="bg-white px-3 py-1 rounded-full text-sm">
                          <span className="font-medium">{category.charAt(0).toUpperCase() + category.slice(1)}:</span> {count}
                        </div>
                      )
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Filtres et recherche */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Rechercher dans mes favoris..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
            <div>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">Toutes les catégories</option>
                <option value="transport">Transport</option>
                <option value="location">Location</option>
                <option value="demenagement">Déménagement</option>
                <option value="maritime">Maritime</option>
                <option value="livraison">Livraison</option>
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
                {filteredItems.length} service(s) favori(s)
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
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Vous n'avez pas encore de favoris</h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              Ajoutez des services à vos favoris pour les retrouver facilement et les réserver quand vous en avez besoin.
            </p>
            <button
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
                <FavoriteItem
                  key={item.id}
                  item={item}
                  viewMode={viewMode}
                  onRemove={handleRemoveFavorite}
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
            onRemoveFavorite={handleRemoveFavorite}
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

export default FavoritesManagement;