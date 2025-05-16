import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CreditCard, Check, X, ChevronDown, ChevronUp, Download, Calendar,
  Clock, AlertTriangle, CheckCircle, FileText, User, Mail, Phone,
  Shield, Zap, Award, Star, Gift, Lock, CreditCard as CardIcon,
  DollarSign, ArrowRight, Bell, Settings, HelpCircle, RefreshCw,
  Printer, ExternalLink, Edit, Trash2, Plus, Info
} from 'lucide-react';

// Composant pour afficher un plan d'abonnement
const SubscriptionPlan = ({ plan, currentPlan, onSelect, onUpgrade }) => {
  const isActive = currentPlan && currentPlan.id === plan.id;
  
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className={`bg-white rounded-xl shadow-lg overflow-hidden border-2 ${
        isActive ? 'border-blue-500' : 'border-transparent'
      }`}
    >
      {plan.popular && (
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-center py-2 font-medium">
          Le plus populaire
        </div>
      )}
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-800">{plan.name}</h3>
            <p className="text-gray-600">{plan.description}</p>
          </div>
          {plan.icon}
        </div>
        
        <div className="mb-6">
          <div className="flex items-baseline">
            <span className="text-3xl font-bold text-gray-800">{plan.price.toLocaleString()}</span>
            <span className="text-gray-600 ml-1">FCFA/mois</span>
          </div>
          {plan.discount && (
            <div className="text-sm text-green-600 font-medium mt-1">
              Économisez {plan.discount}% avec un abonnement annuel
            </div>
          )}
        </div>
        
        <div className="space-y-3 mb-6">
          {plan.features.map((feature, index) => (
            <div key={index} className="flex items-start">
              <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-600">{feature}</span>
            </div>
          ))}
          
          {plan.limitations && plan.limitations.map((limitation, index) => (
            <div key={`limit-${index}`} className="flex items-start">
              <X className="w-5 h-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-600">{limitation}</span>
            </div>
          ))}
        </div>
        
        {isActive ? (
          <div className="flex flex-col space-y-3">
            <div className="bg-blue-50 text-blue-700 py-2 px-4 rounded-lg text-center font-medium">
              Votre plan actuel
            </div>
            <button
              onClick={() => onSelect(plan)}
              className="py-2 px-4 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Gérer l'abonnement
            </button>
          </div>
        ) : (
          <button
            onClick={() => onUpgrade(plan)}
            className={`w-full py-3 rounded-lg font-medium ${
              plan.highlight
                ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:shadow-lg'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            } transition-all duration-200`}
          >
            {currentPlan ? 'Changer de plan' : 'Choisir ce plan'}
          </button>
        )}
      </div>
    </motion.div>
  );
};

// Composant pour afficher les détails d'un abonnement
const SubscriptionDetails = ({ subscription, onClose, onCancel, onRenew, onUpgrade }) => {
  const [activeTab, setActiveTab] = useState('details');
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
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
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-xl mr-4">
              <CreditCard className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Détails de l'abonnement</h2>
              <p className="text-gray-500">Plan {subscription.plan.name}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
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
            onClick={() => setActiveTab('billing')}
            className={`py-3 px-4 font-medium ${
              activeTab === 'billing'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Facturation
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`py-3 px-4 font-medium ${
              activeTab === 'history'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Historique
          </button>
        </div>
        
        {activeTab === 'details' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded-xl">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Informations générales</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Statut</span>
                    <span className={`font-medium ${
                      subscription.status === 'active' ? 'text-green-600' :
                      subscription.status === 'pending' ? 'text-yellow-600' :
                      subscription.status === 'cancelled' ? 'text-red-600' :
                      'text-gray-600'
                    }`}>
                      {subscription.status === 'active' ? 'Actif' :
                       subscription.status === 'pending' ? 'En attente' :
                       subscription.status === 'cancelled' ? 'Annulé' :
                       subscription.status}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date de début</span>
                    <span className="font-medium text-gray-800">{formatDate(subscription.startDate)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Prochaine facturation</span>
                    <span className="font-medium text-gray-800">{formatDate(subscription.nextBillingDate)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Période de facturation</span>
                    <span className="font-medium text-gray-800">{subscription.billingCycle}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-xl">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Informations de paiement</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Méthode de paiement</span>
                    <span className="font-medium text-gray-800">{subscription.paymentMethod}</span>
                  </div>
                  {subscription.cardInfo && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Carte</span>
                      <span className="font-medium text-gray-800">•••• •••• •••• {subscription.cardInfo.last4}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Montant mensuel</span>
                    <span className="font-medium text-gray-800">{subscription.plan.price.toLocaleString()} FCFA</span>
                  </div>
                  {subscription.discount && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Réduction</span>
                      <span className="font-medium text-green-600">-{subscription.discount}%</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Fonctionnalités incluses</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {subscription.plan.features.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onUpgrade()}
                className="flex-1 py-3 px-6 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 flex items-center justify-center"
              >
                <Zap className="w-5 h-5 mr-2" />
                Mettre à niveau
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onRenew(subscription)}
                className="flex-1 py-3 px-6 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 flex items-center justify-center"
              >
                <RefreshCw className="w-5 h-5 mr-2" />
                Renouveler
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onCancel(subscription)}
                className="flex-1 py-3 px-6 border-2 border-red-500 text-red-500 rounded-xl font-semibold hover:bg-red-50 flex items-center justify-center"
              >
                <X className="w-5 h-5 mr-2" />
                Annuler
              </motion.button>
            </div>
          </div>
        )}
        
        {activeTab === 'billing' && (
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Méthode de paiement</h3>
              <div className="flex items-center p-3 border border-gray-200 rounded-lg bg-white">
                <div className="p-2 bg-blue-100 rounded-lg mr-3">
                  <CardIcon className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-grow">
                  <div className="font-medium text-gray-800">
                    {subscription.cardInfo ? `Carte ${subscription.cardInfo.brand}` : 'Carte bancaire'}
                  </div>
                  <div className="text-sm text-gray-500">
                    {subscription.cardInfo ? `•••• •••• •••• ${subscription.cardInfo.last4}` : '•••• •••• •••• 1234'}
                  </div>
                </div>
                <button className="text-blue-600 hover:text-blue-800 p-2">
                  <Edit className="w-5 h-5" />
                </button>
              </div>
              <div className="mt-3 flex justify-end">
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  + Ajouter une nouvelle méthode de paiement
                </button>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Adresse de facturation</h3>
              <div className="space-y-2">
                <div className="flex items-start">
                  <User className="w-5 h-5 text-gray-400 mr-2 mt-0.5" />
                  <div className="text-gray-700">{subscription.billingInfo?.name || 'Jean Dupont'}</div>
                </div>
                <div className="flex items-start">
                  <Mail className="w-5 h-5 text-gray-400 mr-2 mt-0.5" />
                  <div className="text-gray-700">{subscription.billingInfo?.email || 'jean.dupont@example.com'}</div>
                </div>
                <div className="flex items-start">
                  <Phone className="w-5 h-5 text-gray-400 mr-2 mt-0.5" />
                  <div className="text-gray-700">{subscription.billingInfo?.phone || '+237 612345678'}</div>
                </div>
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-gray-400 mr-2 mt-0.5" />
                  <div className="text-gray-700">{subscription.billingInfo?.address || '123 Rue de la Paix, Douala, Cameroun'}</div>
                </div>
              </div>
              <div className="mt-3 flex justify-end">
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  Modifier l'adresse
                </button>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-xl">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold text-gray-800">Factures récentes</h3>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  Voir toutes les factures
                </button>
              </div>
              <div className="space-y-3">
                {subscription.invoices && subscription.invoices.map((invoice, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-white rounded-lg border border-gray-200">
                    <div className="flex items-center">
                      <FileText className="w-5 h-5 text-gray-400 mr-3" />
                      <div>
                        <div className="font-medium text-gray-800">Facture #{invoice.number}</div>
                        <div className="text-sm text-gray-500">{formatDate(invoice.date)}</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="mr-4 font-medium text-gray-800">{invoice.amount.toLocaleString()} FCFA</div>
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                        <Download className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
                {(!subscription.invoices || subscription.invoices.length === 0) && (
                  <div className="text-center py-6 text-gray-500">
                    <FileText className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>Aucune facture disponible pour le moment</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'history' && (
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Historique de l'abonnement</h3>
              <div className="space-y-6">
                {subscription.history && subscription.history.map((event, index) => (
                  <div key={index} className="flex">
                    <div className="flex flex-col items-center mr-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        event.type === 'success' ? 'bg-green-100 text-green-600' :
                        event.type === 'warning' ? 'bg-yellow-100 text-yellow-600' :
                        event.type === 'error' ? 'bg-red-100 text-red-600' :
                        'bg-blue-100 text-blue-600'
                      }`}>
                        {event.type === 'success' ? <CheckCircle className="w-5 h-5" /> :
                         event.type === 'warning' ? <AlertTriangle className="w-5 h-5" /> :
                         event.type === 'error' ? <X className="w-5 h-5" /> :
                         <Clock className="w-5 h-5" />}
                      </div>
                      {index < subscription.history.length - 1 && (
                        <div className="w-0.5 h-full bg-gray-200 mt-1"></div>
                      )}
                    </div>
                    <div className="pb-6">
                      <div className="text-sm font-medium text-gray-800">{event.title}</div>
                      <div className="text-xs text-gray-500">{formatDate(event.date)}</div>
                      <div className="mt-1 text-sm text-gray-600">{event.description}</div>
                    </div>
                  </div>
                ))}
                {(!subscription.history || subscription.history.length === 0) && (
                  <div className="text-center py-6 text-gray-500">
                    <Clock className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>Aucun historique disponible pour le moment</p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Paramètres de renouvellement</h3>
              <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                <div className="flex items-center">
                  <RefreshCw className="w-5 h-5 text-blue-600 mr-3" />
                  <div>
                    <div className="font-medium text-gray-800">Renouvellement automatique</div>
                    <div className="text-sm text-gray-500">Votre abonnement sera automatiquement renouvelé à la fin de la période</div>
                  </div>
                </div>
                <div className="relative inline-block w-12 h-6 mr-2">
                  <input 
                    type="checkbox" 
                    className="opacity-0 w-0 h-0" 
                    id="autoRenew"
                    defaultChecked={subscription.autoRenew}
                  />
                  <label 
                    htmlFor="autoRenew"
                    className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-all duration-300 ${
                      subscription.autoRenew ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <span 
                      className={`absolute left-1 bottom-1 bg-white w-4 h-4 rounded-full transition-all duration-300 ${
                        subscription.autoRenew ? 'transform translate-x-6' : ''
                      }`}
                    ></span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

// Composant pour le processus de paiement
const PaymentForm = ({ plan, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    saveCard: true,
    agreeTerms: false
  });
  const [errors, setErrors] = useState({});
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Clear error when field is updated
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.cardNumber.trim()) {
      newErrors.cardNumber = 'Le numéro de carte est requis';
    } else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
      newErrors.cardNumber = 'Le numéro de carte doit contenir 16 chiffres';
    }
    
    if (!formData.cardName.trim()) {
      newErrors.cardName = 'Le nom sur la carte est requis';
    }
    
    if (!formData.expiryDate.trim()) {
      newErrors.expiryDate = 'La date d\'expiration est requise';
    } else if (!/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
      newErrors.expiryDate = 'Format invalide (MM/YY)';
    }
    
    if (!formData.cvv.trim()) {
      newErrors.cvv = 'Le code de sécurité est requis';
    } else if (!/^\d{3,4}$/.test(formData.cvv)) {
      newErrors.cvv = 'Le code de sécurité doit contenir 3 ou 4 chiffres';
    }
    
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'Vous devez accepter les conditions générales';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };
  
  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };
  
  const handleCardNumberChange = (e) => {
    const formattedValue = formatCardNumber(e.target.value);
    setFormData({
      ...formData,
      cardNumber: formattedValue
    });
    
    if (errors.cardNumber) {
      setErrors({
        ...errors,
        cardNumber: null
      });
    }
  };
  
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
        className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4 shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Paiement de l'abonnement</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="mb-6 bg-blue-50 p-4 rounded-xl">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-gray-800">Plan {plan.name}</h3>
              <p className="text-gray-600 text-sm">{plan.description}</p>
            </div>
            <div className="text-xl font-bold text-gray-800">{plan.price.toLocaleString()} FCFA/mois</div>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Numéro de carte
            </label>
            <div className="relative">
              <input
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleCardNumberChange}
                placeholder="1234 5678 9012 3456"
                maxLength="19"
                className={`w-full pl-10 pr-4 py-3 border ${
                  errors.cardNumber ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                } rounded-lg focus:outline-none focus:ring-2 transition-colors`}
              />
              <CardIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            {errors.cardNumber && (
              <p className="mt-1 text-sm text-red-600">{errors.cardNumber}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nom sur la carte
            </label>
            <input
              type="text"
              name="cardName"
              value={formData.cardName}
              onChange={handleChange}
              placeholder="Jean Dupont"
              className={`w-full px-4 py-3 border ${
                errors.cardName ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
              } rounded-lg focus:outline-none focus:ring-2 transition-colors`}
            />
            {errors.cardName && (
              <p className="mt-1 text-sm text-red-600">{errors.cardName}</p>
            )}
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date d'expiration
              </label>
              <input
                type="text"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                placeholder="MM/YY"
                maxLength="5"
                className={`w-full px-4 py-3 border ${
                  errors.expiryDate ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                } rounded-lg focus:outline-none focus:ring-2 transition-colors`}
              />
              {errors.expiryDate && (
                <p className="mt-1 text-sm text-red-600">{errors.expiryDate}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Code de sécurité (CVV)
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleChange}
                  placeholder="123"
                  maxLength="4"
                  className={`w-full pl-10 pr-4 py-3 border ${
                    errors.cvv ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                  } rounded-lg focus:outline-none focus:ring-2 transition-colors`}
                />
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              {errors.cvv && (
                <p className="mt-1 text-sm text-red-600">{errors.cvv}</p>
              )}
            </div>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="saveCard"
              name="saveCard"
              checked={formData.saveCard}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="saveCard" className="ml-2 block text-sm text-gray-700">
              Enregistrer cette carte pour les paiements futurs
            </label>
          </div>
          
          <div className="flex items-start">
            <input
              type="checkbox"
              id="agreeTerms"
              name="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleChange}
              className={`h-4 w-4 ${
                errors.agreeTerms ? 'text-red-600 focus:ring-red-500' : 'text-blue-600 focus:ring-blue-500'
              } border-gray-300 rounded mt-1`}
            />
            <label htmlFor="agreeTerms" className="ml-2 block text-sm text-gray-700">
              J'accepte les <a href="#" className="text-blue-600 hover:underline">conditions générales</a> et la <a href="#" className="text-blue-600 hover:underline">politique de confidentialité</a>
            </label>
          </div>
          {errors.agreeTerms && (
            <p className="mt-1 text-sm text-red-600">{errors.agreeTerms}</p>
          )}
          
          <div className="pt-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              <Lock className="w-5 h-5 mr-2 inline-block" />
              Payer {plan.price.toLocaleString()} FCFA
            </motion.button>
            <p className="text-center text-sm text-gray-500 mt-3">
              Votre paiement est sécurisé et crypté
            </p>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

// Composant pour la confirmation d'annulation
const CancelSubscriptionModal = ({ subscription, onClose, onConfirm }) => {
  const [reason, setReason] = useState('');
  const [otherReason, setOtherReason] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm(reason === 'other' ? otherReason : reason);
  };
  
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
        className="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="text-center mb-6">
          <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <AlertTriangle className="h-8 w-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Annuler l'abonnement</h2>
          <p className="text-gray-600 mt-2">
            Êtes-vous sûr de vouloir annuler votre abonnement au plan {subscription.plan.name} ?
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Raison de l'annulation
            </label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Sélectionnez une raison</option>
              <option value="too_expensive">Trop cher</option>
              <option value="not_using">Je n'utilise pas assez le service</option>
              <option value="missing_features">Fonctionnalités manquantes</option>
              <option value="switching">Je change pour un autre service</option>
              <option value="other">Autre raison</option>
            </select>
          </div>
          
          {reason === 'other' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Précisez votre raison
              </label>
              <textarea
                value={otherReason}
                onChange={(e) => setOtherReason(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows="3"
                required
              ></textarea>
            </div>
          )}
          
          <div className="bg-yellow-50 p-4 rounded-lg">
            <div className="flex items-start">
              <Info className="w-5 h-5 text-yellow-600 mr-3 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-yellow-700">
                <p className="font-medium">Important</p>
                <p>Votre abonnement restera actif jusqu'à la fin de la période de facturation en cours, le {new Date(subscription.nextBillingDate).toLocaleDateString('fr-FR')}.</p>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 pt-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Annuler
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Confirmer l'annulation
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

// Composant principal de gestion des abonnements
export const SubscriptionManagement = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [availablePlans, setAvailablePlans] = useState([]);
  const [currentSubscription, setCurrentSubscription] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationType, setNotificationType] = useState('success');
  const [activeView, setActiveView] = useState('current'); // 'current' ou 'plans'

  // Charger des données fictives
  useEffect(() => {
    const fakePlans = [
      {
        id: 'basic',
        name: 'Basique',
        description: 'Pour les petits syndicats',
        price: 15000,
        features: [
          'Jusqu\'à 50 membres',
          'Gestion des cotisations',
          'Communication de base',
          'Support par email'
        ],
        limitations: [
          'Pas d\'analyse avancée',
          'Pas de personnalisation'
        ],
        icon: <Shield className="w-10 h-10 text-blue-500" />,
        highlight: false
      },
      {
        id: 'standard',
        name: 'Standard',
        description: 'Pour les syndicats en croissance',
        price: 35000,
        discount: 10,
        features: [
          'Jusqu\'à 200 membres',
          'Gestion des cotisations avancée',
          'Communication multi-canal',
          'Événements et réunions',
          'Support prioritaire',
          'Analyses de base'
        ],
        icon: <Award className="w-10 h-10 text-purple-500" />,
        highlight: true,
        popular: true
      },
      {
        id: 'premium',
        name: 'Premium',
        description: 'Pour les grands syndicats',
        price: 75000,
        discount: 15,
        features: [
          'Membres illimités',
          'Gestion financière complète',
          'Communication avancée',
          'Événements et réunions illimités',
          'Support dédié 24/7',
          'Analyses avancées',
          'Personnalisation complète'
        ],
        icon: <Zap className="w-10 h-10 text-yellow-500" />,
        highlight: false
      }
    ];
    
    const fakeSubscription = {
      id: 'sub_123456',
      plan: fakePlans[1], // Plan Standard
      status: 'active',
      startDate: '2023-04-15T00:00:00Z',
      nextBillingDate: '2023-06-15T00:00:00Z',
      billingCycle: 'Mensuel',
      paymentMethod: 'Carte bancaire',
      cardInfo: {
        brand: 'Visa',
        last4: '4242'
      },
      discount: 10,
      autoRenew: true,
      invoices: [
        {
          number: 'INV-2023-0001',
          date: '2023-05-15T00:00:00Z',
          amount: 35000
        },
        {
          number: 'INV-2023-0002',
          date: '2023-04-15T00:00:00Z',
          amount: 35000
        },
        {
          number: 'INV-2023-0003',
          date: '2023-03-15T00:00:00Z',
          amount: 35000
        }
      ],
      history: [
        {
          type: 'success',
          title: 'Abonnement activé',
          date: '2023-04-15T10:30:00Z',
          description: 'Votre abonnement au plan Standard a été activé avec succès.'
        },
        {
          type: 'info',
          title: 'Paiement reçu',
          date: '2023-04-15T10:25:00Z',
          description: 'Paiement de 35,000 FCFA reçu pour l\'abonnement au plan Standard.'
        },
        {
          type: 'info',
          title: 'Abonnement créé',
          date: '2023-04-15T10:20:00Z',
          description: 'Vous avez souscrit au plan Standard.'
        }
      ]
    };
    
    setAvailablePlans(fakePlans);
    setSubscriptions([fakeSubscription]);
    setCurrentSubscription(fakeSubscription);
  }, []);

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
    setShowPaymentForm(true);
  };

  const handleUpgradePlan = (plan) => {
    if (!plan) {
      // Si aucun plan n'est fourni, afficher la vue des plans
      setActiveView('plans');
      return;
    }
    setSelectedPlan(plan);
    setShowPaymentForm(true);
  };

  const handlePaymentSubmit = (paymentData) => {
    console.log('Payment data:', paymentData);
    
    // Simuler un paiement réussi
    setTimeout(() => {
      // Mettre à jour l'abonnement actuel
      const updatedSubscription = {
        ...currentSubscription,
        plan: selectedPlan,
        startDate: new Date().toISOString(),
        nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // +30 jours
        history: [
          {
            type: 'success',
            title: `Changement de plan vers ${selectedPlan.name}`,
            date: new Date().toISOString(),
            description: `Votre abonnement a été mis à jour vers le plan ${selectedPlan.name}.`
          },
          {
            type: 'info',
            title: 'Paiement reçu',
            date: new Date().toISOString(),
            description: `Paiement de ${selectedPlan.price.toLocaleString()} FCFA reçu pour l'abonnement au plan ${selectedPlan.name}.`
          },
          ...(currentSubscription.history || [])
        ]
      };
      
      setCurrentSubscription(updatedSubscription);
      setSubscriptions([updatedSubscription]);
      setShowPaymentForm(false);
      setActiveView('current');
      
      // Afficher une notification de succès
      setNotificationMessage(`Votre abonnement a été mis à jour vers le plan ${selectedPlan.name} avec succès !`);
      setNotificationType('success');
      setShowSuccessNotification(true);
      
      // Masquer la notification après 5 secondes
      setTimeout(() => {
        setShowSuccessNotification(false);
      }, 5000);
    }, 2000);
  };

  const handleCancelSubscription = (subscription) => {
    setShowCancelModal(true);
  };

  const confirmCancelSubscription = (reason) => {
    console.log('Cancellation reason:', reason);
    
    // Simuler une annulation réussie
    const updatedSubscription = {
      ...currentSubscription,
      status: 'cancelled',
      history: [
        {
          type: 'warning',
          title: 'Abonnement annulé',
          date: new Date().toISOString(),
          description: `Vous avez annulé votre abonnement au plan ${currentSubscription.plan.name}. Il restera actif jusqu'à la fin de la période de facturation en cours.`
        },
        ...(currentSubscription.history || [])
      ]
    };
    
    setCurrentSubscription(updatedSubscription);
    setSubscriptions([updatedSubscription]);
    setShowCancelModal(false);
    
    // Afficher une notification
    setNotificationMessage(`Votre abonnement a été annulé et restera actif jusqu'au ${new Date(currentSubscription.nextBillingDate).toLocaleDateString('fr-FR')}.`);
    setNotificationType('warning');
    setShowSuccessNotification(true);
    
    // Masquer la notification après 5 secondes
    setTimeout(() => {
      setShowSuccessNotification(false);
    }, 5000);
  };

  const handleRenewSubscription = (subscription) => {
    // Simuler un renouvellement réussi
    const updatedSubscription = {
      ...currentSubscription,
      nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // +30 jours
      history: [
        {
          type: 'success',
          title: 'Abonnement renouvelé',
          date: new Date().toISOString(),
          description: `Vous avez renouvelé votre abonnement au plan ${currentSubscription.plan.name} pour une période supplémentaire.`
        },
        ...(currentSubscription.history || [])
      ]
    };
    
    setCurrentSubscription(updatedSubscription);
    setSubscriptions([updatedSubscription]);
    
    // Afficher une notification
    setNotificationMessage(`Votre abonnement a été renouvelé avec succès jusqu'au ${new Date(updatedSubscription.nextBillingDate).toLocaleDateString('fr-FR')}.`);
    setNotificationType('success');
    setShowSuccessNotification(true);
    
    // Masquer la notification après 5 secondes
    setTimeout(() => {
      setShowSuccessNotification(false);
    }, 5000);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Gestion des Abonnements</h1>
            <p className="text-gray-600">
              Gérez vos plans d'abonnement et accédez à des fonctionnalités premium
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveView(activeView === 'current' ? 'plans' : 'current')}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-700 flex items-center"
            >
              {activeView === 'current' ? (
                <>
                  <Zap className="w-5 h-5 mr-2" />
                  Voir les plans disponibles
                </>
              ) : (
                <>
                  <CreditCard className="w-5 h-5 mr-2" />
                  Mon abonnement actuel
                </>
              )}
            </motion.button>
          </div>
        </div>

        {activeView === 'current' ? (
          // Vue de l'abonnement actuel
          <div>
            {currentSubscription ? (
              <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                  <div className="flex items-center mb-4 md:mb-0">
                    <div className="p-3 bg-blue-100 rounded-xl mr-4">
                      <CreditCard className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-gray-800">Votre abonnement actuel</h2>
                      <p className="text-gray-500">Plan {currentSubscription.plan.name}</p>
                    </div>
                  </div>
                  <div className={`px-4 py-2 rounded-full text-sm font-medium ${
                    currentSubscription.status === 'active' ? 'bg-green-100 text-green-800' :
                    currentSubscription.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    currentSubscription.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {currentSubscription.status === 'active' ? 'Actif' :
                     currentSubscription.status === 'pending' ? 'En attente' :
                     currentSubscription.status === 'cancelled' ? 'Annulé' :
                     currentSubscription.status}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <div className="flex items-center mb-2">
                      <Calendar className="w-5 h-5 text-blue-500 mr-2" />
                      <h3 className="font-medium text-gray-800">Période d'abonnement</h3>
                    </div>
                    <p className="text-gray-600">
                      Du {formatDate(currentSubscription.startDate)} au {formatDate(currentSubscription.nextBillingDate)}
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <div className="flex items-center mb-2">
                      <DollarSign className="w-5 h-5 text-green-500 mr-2" />
                      <h3 className="font-medium text-gray-800">Montant mensuel</h3>
                    </div>
                    <p className="text-gray-600">
                      {currentSubscription.plan.price.toLocaleString()} FCFA
                      {currentSubscription.discount && (
                        <span className="text-green-600 ml-2">(-{currentSubscription.discount}%)</span>
                      )}
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <div className="flex items-center mb-2">
                      <RefreshCw className="w-5 h-5 text-purple-500 mr-2" />
                      <h3 className="font-medium text-gray-800">Renouvellement</h3>
                    </div>
                    <p className="text-gray-600">
                      {currentSubscription.status === 'cancelled' 
                        ? 'Annulé - Pas de renouvellement'
                        : currentSubscription.autoRenew
                          ? 'Automatique'
                          : 'Manuel'
                      }
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedPlan(currentSubscription.plan)}
                    className="flex-1 py-3 px-6 bg-blue-50 text-blue-600 rounded-xl font-semibold hover:bg-blue-100 flex items-center justify-center"
                  >
                    <Eye className="w-5 h-5 mr-2" />
                    Voir les détails
                  </motion.button>
                  
                  {currentSubscription.status === 'active' && (
                    <>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleUpgradePlan()}
                        className="flex-1 py-3 px-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg flex items-center justify-center"
                      >
                        <Zap className="w-5 h-5 mr-2" />
                        Changer de plan
                      </motion.button>
                      
                      {!currentSubscription.autoRenew && (
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleRenewSubscription(currentSubscription)}
                          className="flex-1 py-3 px-6 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 flex items-center justify-center"
                        >
                          <RefreshCw className="w-5 h-5 mr-2" />
                          Renouveler
                        </motion.button>
                      )}
                      
                      {currentSubscription.status !== 'cancelled' && (
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleCancelSubscription(currentSubscription)}
                          className="flex-1 py-3 px-6 border-2 border-red-500 text-red-500 rounded-xl font-semibold hover:bg-red-50 flex items-center justify-center"
                        >
                          <X className="w-5 h-5 mr-2" />
                          Annuler
                        </motion.button>
                      )}
                    </>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-lg p-12 text-center mb-8">
                <CreditCard className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Aucun abonnement actif</h3>
                <p className="text-gray-500 mb-6 max-w-md mx-auto">
                  Vous n'avez pas encore d'abonnement actif. Découvrez nos différents plans pour accéder à des fonctionnalités premium.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveView('plans')}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 inline-flex items-center"
                >
                  <Zap className="w-5 h-5 mr-2" />
                  Voir les plans disponibles
                </motion.button>
              </div>
            )}
            
            {currentSubscription && (
              <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Historique des factures</h2>
                {currentSubscription.invoices && currentSubscription.invoices.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Numéro</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Montant</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {currentSubscription.invoices.map((invoice, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{invoice.number}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{formatDate(invoice.date)}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{invoice.amount.toLocaleString()} FCFA</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                                Payée
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <button className="text-blue-600 hover:text-blue-900">
                                <Download className="w-5 h-5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <FileText className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>Aucune facture disponible pour le moment</p>
                  </div>
                )}
              </div>
            )}
            
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Paramètres de facturation</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-700 mb-3">Méthode de paiement</h3>
                  {currentSubscription && currentSubscription.cardInfo ? (
                    <div className="flex items-center p-3 border border-gray-200 rounded-lg bg-gray-50">
                      <div className="p-2 bg-blue-100 rounded-lg mr-3">
                        <CardIcon className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="flex-grow">
                        <div className="font-medium text-gray-800">
                          Carte {currentSubscription.cardInfo.brand}
                        </div>
                        <div className="text-sm text-gray-500">
                          •••• •••• •••• {currentSubscription.cardInfo.last4}
                        </div>
                      </div>
                      <button className="text-blue-600 hover:text-blue-800 p-2">
                        <Edit className="w-5 h-5" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center p-3 border border-gray-200 rounded-lg bg-gray-50">
                      <div className="p-2 bg-gray-200 rounded-lg mr-3">
                        <CardIcon className="w-6 h-6 text-gray-500" />
                      </div>
                      <div className="flex-grow">
                        <div className="font-medium text-gray-800">
                          Aucune méthode de paiement
                        </div>
                        <div className="text-sm text-gray-500">
                          Ajoutez une méthode de paiement pour vous abonner
                        </div>
                      </div>
                      <button className="text-blue-600 hover:text-blue-800 p-2">
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-700 mb-3">Notifications</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg bg-gray-50">
                      <div className="flex items-center">
                        <Bell className="w-5 h-5 text-blue-500 mr-3" />
                        <div className="text-gray-800">Rappels de facturation</div>
                      </div>
                      <div className="relative inline-block w-12 h-6">
                        <input 
                          type="checkbox" 
                          className="opacity-0 w-0 h-0" 
                          id="billingReminders"
                          defaultChecked={true}
                        />
                        <label 
                          htmlFor="billingReminders"
                          className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full bg-blue-600"
                        >
                          <span className="absolute left-1 bottom-1 bg-white w-4 h-4 rounded-full transform translate-x-6"></span>
                        </label>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg bg-gray-50">
                      <div className="flex items-center">
                        <Mail className="w-5 h-5 text-blue-500 mr-3" />
                        <div className="text-gray-800">Emails promotionnels</div>
                      </div>
                      <div className="relative inline-block w-12 h-6">
                        <input 
                          type="checkbox" 
                          className="opacity-0 w-0 h-0" 
                          id="promoEmails"
                          defaultChecked={false}
                        />
                        <label 
                          htmlFor="promoEmails"
                          className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full bg-gray-300"
                        >
                          <span className="absolute left-1 bottom-1 bg-white w-4 h-4 rounded-full"></span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Vue des plans disponibles
          <div>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Choisissez le plan qui vous convient</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Nos plans flexibles sont conçus pour répondre aux besoins de tous les types de syndicats, quelle que soit leur taille.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {availablePlans.map(plan => (
                <SubscriptionPlan
                  key={plan.id}
                  plan={plan}
                  currentPlan={currentSubscription?.plan}
                  onSelect={setSelectedPlan}
                  onUpgrade={handleSelectPlan}
                />
              ))}
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Questions fréquentes</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-800 mb-2">Comment changer de plan ?</h3>
                  <p className="text-gray-600">
                    Vous pouvez changer de plan à tout moment. Si vous passez à un plan supérieur, la différence sera facturée au prorata. Si vous passez à un plan inférieur, le changement prendra effet à la fin de votre période de facturation actuelle.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-800 mb-2">Comment annuler mon abonnement ?</h3>
                  <p className="text-gray-600">
                    Vous pouvez annuler votre abonnement à tout moment depuis la page de gestion de votre abonnement. Votre abonnement restera actif jusqu'à la fin de la période de facturation en cours.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-800 mb-2">Quels modes de paiement acceptez-vous ?</h3>
                  <p className="text-gray-600">
                    Nous acceptons les cartes de crédit (Visa, Mastercard), les virements bancaires et les paiements par mobile money (Orange Money, MTN Mobile Money).
                  </p>
                </div>
                
                <div className="text-center mt-6">
                  <button className="text-blue-600 hover:text-blue-800 font-medium flex items-center mx-auto">
                    <HelpCircle className="w-5 h-5 mr-2" />
                    Voir toutes les questions fréquentes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <AnimatePresence>
        {selectedPlan && !showPaymentForm && (
          <SubscriptionDetails
            subscription={currentSubscription}
            onClose={() => setSelectedPlan(null)}
            onCancel={handleCancelSubscription}
            onRenew={handleRenewSubscription}
            onUpgrade={handleUpgradePlan}
          />
        )}
        
        {showPaymentForm && selectedPlan && (
          <PaymentForm
            plan={selectedPlan}
            onClose={() => setShowPaymentForm(false)}
            onSubmit={handlePaymentSubmit}
          />
        )}
        
        {showCancelModal && currentSubscription && (
          <CancelSubscriptionModal
            subscription={currentSubscription}
            onClose={() => setShowCancelModal(false)}
            onConfirm={confirmCancelSubscription}
          />
        )}
      </AnimatePresence>

      {/* Notification de succès */}
      <AnimatePresence>
        {showSuccessNotification && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className={`fixed bottom-6 right-6 p-4 rounded-xl shadow-lg max-w-md ${
              notificationType === 'success' ? 'bg-green-600 text-white' :
              notificationType === 'warning' ? 'bg-yellow-600 text-white' :
              notificationType === 'error' ? 'bg-red-600 text-white' :
              'bg-blue-600 text-white'
            }`}
          >
            <div className="flex items-start">
              {notificationType === 'success' ? <CheckCircle className="w-6 h-6 mr-3 flex-shrink-0" /> :
               notificationType === 'warning' ? <AlertTriangle className="w-6 h-6 mr-3 flex-shrink-0" /> :
               notificationType === 'error' ? <X className="w-6 h-6 mr-3 flex-shrink-0" /> :
               <Info className="w-6 h-6 mr-3 flex-shrink-0" />}
              <div>
                <p className="font-medium">{notificationMessage}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SubscriptionManagement;