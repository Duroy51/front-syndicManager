import React, { useState, useCallback, memo, useEffect } from 'react';
import { useParams, useNavigate, Outlet, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Users, Bot, ChevronRight, Search, Calendar, Clock, User, ThumbsUp, MessageSquare, Share2, Download, Filter, Bell, Send, Paperclip, Smile, Mic, Video, Phone, MoreHorizontal, Hash, AtSign, Star, BookOpen, Mail, ArrowRight, ArrowLeft, Plus, X, HelpCircle, Settings, Menu, RefreshCw } from 'lucide-react';
import { AppRoutesPaths } from '../../router/appRouter';
// Pour les icônes Font Awesome
import { FaEye } from 'react-icons/fa';

// Ou si vous utilisez une autre bibliothèque d'icônes
import { Eye } from 'lucide-react'; // Exemple avec Lucide
// Configuration
const CONFIG = {
  AVATARS: {
    USER: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    FEMALE1: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    FEMALE2: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    MALE1: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    MALE2: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    BOT: "https://images.unsplash.com/photo-1531747118685-ca8fa6e08806?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  FORUM_IMAGES: {
    COVER1: "https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    COVER2: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    COVER3: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  }
};

// Composant Chat
const ChatContent = () => {
  const [message, setMessage] = useState('');
  const [activeChat, setActiveChat] = useState('syndicalistes');
  
  // Données de démonstration pour les chats
  const chatGroups = [
    {
      id: 'syndicalistes',
      name: 'Syndicalistes',
      unread: 3,
      lastMessage: 'Bonjour à tous, j\'ai une question concernant...',
      lastTime: '10:45',
      members: [
        { id: 1, name: 'Marie Dupont', avatar: CONFIG.AVATARS.FEMALE1, status: 'online' },
        { id: 2, name: 'Thomas Leroy', avatar: CONFIG.AVATARS.MALE1, status: 'online' },
        { id: 3, name: 'Sophie Martin', avatar: CONFIG.AVATARS.FEMALE2, status: 'offline' },
        { id: 4, name: 'Lucas Bernard', avatar: CONFIG.AVATARS.MALE2, status: 'away' }
      ]
    },
    {
      id: 'juridique',
      name: 'Support Juridique',
      unread: 0,
      lastMessage: 'Merci pour ces précisions, nous allons étudier votre dossier.',
      lastTime: 'Hier',
      members: [
        { id: 5, name: 'Maître Dubois', avatar: CONFIG.AVATARS.MALE1, status: 'online' },
        { id: 6, name: 'Maître Lefèvre', avatar: CONFIG.AVATARS.FEMALE1, status: 'offline' }
      ]
    },
    {
      id: 'formation',
      name: 'Formation Syndicale',
      unread: 1,
      lastMessage: 'La prochaine session aura lieu le 15 avril.',
      lastTime: 'Lun',
      members: [
        { id: 7, name: 'Jean Formateur', avatar: CONFIG.AVATARS.MALE2, status: 'online' },
        { id: 8, name: 'Émilie Coordinatrice', avatar: CONFIG.AVATARS.FEMALE2, status: 'online' }
      ]
    }
  ];
  
  // Messages de démonstration
  const chatMessages = [
    {
      id: 1,
      sender: { id: 1, name: 'Marie Dupont', avatar: CONFIG.AVATARS.FEMALE1 },
      message: 'Bonjour à tous, j\'ai une question concernant les nouvelles dispositions sur le télétravail. Comment les appliquer dans notre convention collective ?',
      time: '10:30',
      isMe: false
    },
    {
      id: 2,
      sender: { id: 2, name: 'Thomas Leroy', avatar: CONFIG.AVATARS.MALE1 },
      message: 'Bonjour Marie, les dispositions sur le télétravail doivent être adaptées selon votre secteur. Avez-vous consulté l\'accord de branche ?',
      time: '10:35',
      isMe: false
    },
    {
      id: 3,
      sender: { id: 0, name: 'Vous', avatar: CONFIG.AVATARS.USER },
      message: 'Je peux partager un document récapitulatif que j\'ai préparé sur ce sujet. Il contient les points essentiels à négocier.',
      time: '10:40',
      isMe: true
    },
    {
      id: 4,
      sender: { id: 1, name: 'Marie Dupont', avatar: CONFIG.AVATARS.FEMALE1 },
      message: 'Ce serait très utile, merci !',
      time: '10:42',
      isMe: false
    },
    {
      id: 5,
      sender: { id: 3, name: 'Sophie Martin', avatar: CONFIG.AVATARS.FEMALE2 },
      message: 'Je suggère aussi d\'organiser une réunion pour discuter de ces points en détail. Qui serait disponible la semaine prochaine ?',
      time: '10:45',
      isMe: false
    }
  ];
  
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      // Ici, vous ajouteriez la logique pour envoyer le message
      setMessage('');
    }
  };
  
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Messagerie instantanée</h1>
        <p className="text-gray-600 max-w-3xl">
          Communiquez en temps réel avec vos collègues syndicalistes, partagez des documents et coordonnez vos actions efficacement.
        </p>
      </div>
      
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="flex h-[calc(80vh-100px)]">
          {/* Sidebar */}
          <div className="w-80 bg-gray-50 border-r border-gray-200 flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Rechercher une conversation..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
            </div>
            
            <div className="overflow-y-auto flex-grow">
              {chatGroups.map((chat) => (
                <div
                  key={chat.id}
                  className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-blue-50 transition-colors ${
                    activeChat === chat.id ? 'bg-blue-50' : ''
                  }`}
                  onClick={() => setActiveChat(chat.id)}
                >
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-semibold text-gray-800">{chat.name}</h3>
                    <span className="text-xs text-gray-500">{chat.lastTime}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2 line-clamp-1">{chat.lastMessage}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex -space-x-2">
                      {chat.members.slice(0, 3).map((member) => (
                        <div key={member.id} className="w-6 h-6 rounded-full overflow-hidden border-2 border-white">
                          <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
                        </div>
                      ))}
                      {chat.members.length > 3 && (
                        <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs text-gray-600 border-2 border-white">
                          +{chat.members.length - 3}
                        </div>
                      )}
                    </div>
                    {chat.unread > 0 && (
                      <span className="bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {chat.unread}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-4 border-t border-gray-200">
              <button className="w-full bg-blue-600 text-white py-2 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors">
                <Plus className="w-5 h-5 mr-2" />
                <span>Nouvelle conversation</span>
              </button>
            </div>
          </div>
          
          {/* Chat area */}
          <div className="flex-grow flex flex-col">
            {/* Chat header */}
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <div className="flex items-center">
                <h2 className="font-semibold text-gray-800 mr-3">
                  {chatGroups.find(chat => chat.id === activeChat)?.name}
                </h2>
                <div className="flex items-center text-sm text-gray-500">
                  <span>{chatGroups.find(chat => chat.id === activeChat)?.members.length} membres</span>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors">
                  <Phone className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors">
                  <Video className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            {/* Messages */}
            <div className="flex-grow p-4 overflow-y-auto bg-gray-50">
              <div className="space-y-4">
                {chatMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex max-w-[70%] ${msg.isMe ? 'flex-row-reverse' : ''}`}>
                      {!msg.isMe && (
                        <div className="flex-shrink-0 mr-3">
                          <img
                            src={msg.sender.avatar}
                            alt={msg.sender.name}
                            className="w-10 h-10 rounded-full"
                          />
                        </div>
                      )}
                      <div>
                        {!msg.isMe && (
                          <div className="text-sm text-gray-500 mb-1">{msg.sender.name}</div>
                        )}
                        <div
                          className={`rounded-lg p-3 ${
                            msg.isMe
                              ? 'bg-blue-600 text-white rounded-tr-none'
                              : 'bg-white text-gray-800 rounded-tl-none shadow-sm'
                          }`}
                        >
                          <p>{msg.message}</p>
                          <div
                            className={`text-xs mt-1 ${
                              msg.isMe ? 'text-blue-200' : 'text-gray-500'
                            }`}
                          >
                            {msg.time}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Message input */}
            <div className="p-4 border-t border-gray-200">
              <form onSubmit={handleSendMessage} className="flex items-center">
                <button
                  type="button"
                  className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                >
                  <Paperclip className="w-5 h-5" />
                </button>
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Écrivez votre message..."
                  className="flex-grow mx-3 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors mr-2"
                >
                  <Smile className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors mr-2"
                >
                  <Mic className="w-5 h-5" />
                </button>
                <button
                  type="submit"
                  className={`p-2 rounded-full ${
                    message.trim()
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-200 text-gray-500'
                  } transition-colors`}
                  disabled={!message.trim()}
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      
      {/* Features section */}
      <div className="mt-12 grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <Bell className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Notifications en temps réel</h3>
          <p className="text-gray-600">
            Restez informé des nouvelles communications et ne manquez jamais un message important.
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <Share2 className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Partage de documents</h3>
          <p className="text-gray-600">
            Échangez facilement des fichiers, des images et des documents avec vos interlocuteurs.
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <Video className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Appels audio et vidéo</h3>
          <p className="text-gray-600">
            Organisez des réunions virtuelles directement depuis l'interface de messagerie.
          </p>
        </div>
      </div>
    </div>
  );
};

// Composant Forum
const ForumContent = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  
  // Catégories du forum
  const categories = [
    { id: 'all', name: 'Toutes les discussions', count: 124 },
    { id: 'juridique', name: 'Questions juridiques', count: 45 },
    { id: 'negociation', name: 'Négociations collectives', count: 32 },
    { id: 'formation', name: 'Formation syndicale', count: 18 },
    { id: 'sante', name: 'Santé au travail', count: 29 }
  ];
  
  // Discussions populaires
  const popularTopics = [
    {
      id: 1,
      title: "Comment aborder la négociation sur le télétravail ?",
      excerpt: "Notre entreprise souhaite mettre en place une politique de télétravail. Quels sont les points essentiels à négocier ?",
      author: { name: "Marie Dupont", avatar: CONFIG.AVATARS.FEMALE1 },
      date: "Il y a 2 heures",
      replies: 12,
      views: 89,
      category: "negociation",
      tags: ["Télétravail", "Négociation", "Accord d'entreprise"]
    },
    {
      id: 2,
      title: "Rupture conventionnelle refusée : quels recours ?",
      excerpt: "Un salarié s'est vu refuser sa demande de rupture conventionnelle sans motif. Quelles sont les options possibles ?",
      author: { name: "Thomas Leroy", avatar: CONFIG.AVATARS.MALE1 },
      date: "Hier",
      replies: 8,
      views: 56,
      category: "juridique",
      tags: ["Rupture conventionnelle", "Droit du travail", "Recours"]
    },
    {
      id: 3,
      title: "Formation des élus CSE : quelles obligations pour l'employeur ?",
      excerpt: "Je souhaite connaître les obligations de l'employeur concernant la formation des élus du CSE, notamment en matière de santé et sécurité.",
      author: { name: "Sophie Martin", avatar: CONFIG.AVATARS.FEMALE2 },
      date: "Il y a 3 jours",
      replies: 15,
      views: 124,
      category: "formation",
      tags: ["CSE", "Formation", "SSCT"]
    }
  ];
  
  // Discussions récentes
  const recentTopics = [
    {
      id: 4,
      title: "Mise en place d'une mutuelle d'entreprise",
      excerpt: "Nous devons négocier une nouvelle mutuelle d'entreprise. Quels sont les critères à prendre en compte ?",
      author: { name: "Lucas Bernard", avatar: CONFIG.AVATARS.MALE2 },
      date: "Aujourd'hui",
      replies: 3,
      views: 27,
      category: "negociation",
      tags: ["Mutuelle", "Protection sociale", "Négociation"]
    },
    {
      id: 5,
      title: "Prévention des RPS dans le contexte post-Covid",
      excerpt: "Comment mettre en place une démarche efficace de prévention des risques psychosociaux suite à la crise sanitaire ?",
      author: { name: "Émilie Dubois", avatar: CONFIG.AVATARS.FEMALE1 },
      date: "Hier",
      replies: 6,
      views: 42,
      category: "sante",
      tags: ["RPS", "Covid-19", "Prévention"]
    },
    {
      id: 6,
      title: "Droit d'alerte du CSE : procédure à suivre",
      excerpt: "Nous envisageons d'exercer un droit d'alerte économique. Quelle est la procédure exacte à suivre ?",
      author: { name: "Jean Moreau", avatar: CONFIG.AVATARS.MALE1 },
      date: "Il y a 2 jours",
      replies: 9,
      views: 61,
      category: "juridique",
      tags: ["CSE", "Droit d'alerte", "Procédure"]
    }
  ];
  
  const filteredTopics = activeCategory === 'all' 
    ? [...popularTopics, ...recentTopics]
    : [...popularTopics, ...recentTopics].filter(topic => topic.category === activeCategory);
  
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Forum de discussion</h1>
        <p className="text-gray-600 max-w-3xl">
          Échangez avec la communauté syndicale, posez vos questions et partagez votre expertise sur des sujets variés.
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <div className="md:w-64 flex-shrink-0">
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
            <div className="p-4 bg-blue-600 text-white">
              <h2 className="font-semibold">Catégories</h2>
            </div>
            <div className="p-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`w-full text-left px-4 py-2 rounded-lg mb-1 flex justify-between items-center ${
                    activeCategory === category.id
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setActiveCategory(category.id)}
                >
                  <span>{category.name}</span>
                  <span className="bg-gray-100 text-gray-600 text-xs rounded-full px-2 py-1">
                    {category.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
            <div className="p-4 bg-blue-600 text-white">
              <h2 className="font-semibold">Statistiques</h2>
            </div>
            <div className="p-4">
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Discussions</span>
                <span className="font-semibold">124</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Messages</span>
                <span className="font-semibold">1,893</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Membres</span>
                <span className="font-semibold">342</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Dernier membre</span>
                <span className="font-semibold text-blue-600">Jean D.</span>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl shadow-md p-6 text-white">
            <h3 className="font-semibold mb-3">Besoin d'aide ?</h3>
            <p className="text-blue-100 text-sm mb-4">
              Vous ne trouvez pas de réponse à votre question ? Créez une nouvelle discussion.
            </p>
            <button className="w-full bg-white text-blue-600 font-semibold py-2 rounded-lg hover:bg-blue-50 transition-colors">
              Nouvelle discussion
            </button>
          </div>
        </div>
        
        {/* Main content */}
        <div className="flex-grow">
          {/* Search and filters */}
          <div className="bg-white rounded-xl shadow-md p-4 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Rechercher dans le forum..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                <Filter className="w-4 h-4 mr-2" />
                <span>Filtres</span>
              </button>
              <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Plus className="w-4 h-4 mr-2" />
                <span>Nouvelle discussion</span>
              </button>
            </div>
          </div>
          
          {/* Topics list */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="font-semibold text-gray-800">
                {activeCategory === 'all' ? 'Toutes les discussions' : categories.find(c => c.id === activeCategory)?.name}
              </h2>
              <div className="flex items-center text-sm text-gray-500">
                <span>{filteredTopics.length} discussions</span>
              </div>
            </div>
            
            <div>
              {filteredTopics.length > 0 ? (
                filteredTopics.map((topic) => (
                  <div key={topic.id} className="border-b border-gray-200 last:border-0 hover:bg-gray-50 transition-colors">
                    <div className="p-4">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mr-4">
                          <img
                            src={topic.author.avatar}
                            alt={topic.author.name}
                            className="w-10 h-10 rounded-full"
                          />
                        </div>
                        <div className="flex-grow">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <span className="text-xs font-semibold bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                              {categories.find(c => c.id === topic.category)?.name}
                            </span>
                            <span className="text-xs text-gray-500">
                              {topic.date}
                            </span>
                          </div>
                          <h3 className="text-lg font-semibold text-gray-800 mb-2 hover:text-blue-600 transition-colors">
                            <Link to={`/communication/forum/topic/${topic.id}`}>{topic.title}</Link>
                          </h3>
                          <p className="text-gray-600 mb-3">{topic.excerpt}</p>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {topic.tags.map((tag, index) => (
                              <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                                #{tag}
                              </span>
                            ))}
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center text-sm text-gray-500">
                              <div className="flex items-center mr-4">
                                <MessageSquare className="w-4 h-4 mr-1" />
                                <span>{topic.replies} réponses</span>
                              </div>
                              <div className="flex items-center">
                                <Eye className="w-4 h-4 mr-1" />
                                <span>{topic.views} vues</span>
                              </div>
                            </div>
                            <Link
                              to={`/communication/forum/topic/${topic.id}`}
                              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                            >
                              Lire la suite →
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Aucune discussion trouvée</h3>
                  <p className="text-gray-600 mb-4">
                    Il n'y a pas encore de discussion dans cette catégorie ou correspondant à votre recherche.
                  </p>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Créer une nouvelle discussion
                  </button>
                </div>
              )}
            </div>
          </div>
          
          {/* Community guidelines */}
          <div className="bg-blue-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Règles de la communauté</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>Restez respectueux et courtois dans vos échanges</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>Vérifiez que votre question n'a pas déjà été posée</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>Utilisez des titres clairs et descriptifs</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>Partagez votre expertise pour aider les autres membres</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

// Composant ChatBot
const ChatBotContent = () => {
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState([
    {
      id: 1,
      sender: 'bot',
      message: "Bonjour ! Je suis SyndicBot, votre assistant virtuel spécialisé dans le droit syndical et le droit du travail. Comment puis-je vous aider aujourd'hui ?",
      time: '10:00'
    }
  ]);
  
  // Suggestions de questions
  const suggestions = [
    "Quels sont les droits d'un délégué syndical ?",
    "Comment organiser des élections professionnelles ?",
    "Quelles sont les étapes d'une négociation collective ?",
    "Comment calculer les heures de délégation ?"
  ];
  
  // Fonctions d'aide pour le chatbot
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      // Ajouter le message de l'utilisateur
      const userMessage = {
        id: conversation.length + 1,
        sender: 'user',
        message: message,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setConversation([...conversation, userMessage]);
      setMessage('');
      
      // Simuler une réponse du bot après un court délai
      setTimeout(() => {
        const botResponse = {
          id: conversation.length + 2,
          sender: 'bot',
          message: getBotResponse(message),
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        
        setConversation(prev => [...prev, botResponse]);
      }, 1000);
    }
  };
  
  const handleSuggestionClick = (suggestion) => {
    setMessage(suggestion);
  };
  
  // Fonction simple pour générer des réponses du bot (à remplacer par une IA réelle)
  const getBotResponse = (userMessage) => {
    const lowerCaseMessage = userMessage.toLowerCase();
    
    if (lowerCaseMessage.includes('délégué syndical') || lowerCaseMessage.includes('droits')) {
      return "Les délégués syndicaux bénéficient de plusieurs droits importants : heures de délégation, liberté de déplacement, protection contre le licenciement, accès à un local syndical, et droit d'affichage. Ils peuvent également organiser des réunions syndicales et participer aux négociations collectives. Souhaitez-vous des informations plus détaillées sur l'un de ces aspects ?";
    } else if (lowerCaseMessage.includes('élections') || lowerCaseMessage.includes('professionnelles')) {
      return "L'organisation des élections professionnelles comprend plusieurs étapes : 1) Information du personnel, 2) Négociation du protocole d'accord préélectoral, 3) Appel à candidatures, 4) Organisation matérielle du vote, 5) Dépouillement et proclamation des résultats. Voulez-vous que je détaille l'une de ces étapes ?";
    } else if (lowerCaseMessage.includes('négociation') || lowerCaseMessage.includes('collective')) {
      return "Une négociation collective efficace suit généralement ce processus : 1) Préparation et documentation, 2) Définition des objectifs, 3) Ouverture des négociations, 4) Échanges de propositions, 5) Recherche de compromis, 6) Finalisation de l'accord, 7) Signature et validation. Puis-je vous donner des conseils sur l'une de ces phases ?";
    } else if (lowerCaseMessage.includes('heures') || lowerCaseMessage.includes('délégation')) {
      return "Le calcul des heures de délégation dépend de votre mandat et de l'effectif de l'entreprise. Pour un délégué syndical, le crédit d'heures mensuel varie de 10 à 24 heures selon la taille de l'entreprise. Ces heures sont considérées comme du temps de travail effectif et payées comme tel. Souhaitez-vous connaître le détail pour votre situation spécifique ?";
    } else {
      return "Merci pour votre question. Je recherche les informations pertinentes dans ma base de connaissances juridiques. Pourriez-vous préciser votre demande ou me donner plus de contexte pour que je puisse vous fournir une réponse plus adaptée ?";
    }
  };
  
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Assistant virtuel SyndicBot</h1>
        <p className="text-gray-600 max-w-3xl">
          Posez vos questions sur le droit syndical et le droit du travail à notre assistant virtuel spécialisé.
        </p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-4 bg-blue-600 text-white flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mr-3">
                  <Bot className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="font-semibold">SyndicBot</h2>
                  <div className="text-xs text-blue-200 flex items-center">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-1"></span>
                    <span>En ligne</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-2 text-white hover:bg-blue-500 rounded-full transition-colors">
                  <RefreshCw className="w-5 h-5" />
                </button>
                <button className="p-2 text-white hover:bg-blue-500 rounded-full transition-colors">
                  <Settings className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="h-[calc(60vh-100px)] overflow-y-auto p-4 bg-gray-50">
              {conversation.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex mb-4 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.sender === 'bot' && (
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <Bot className="w-6 h-6 text-blue-600" />
                    </div>
                  )}
                  <div
                    className={`max-w-[70%] rounded-lg p-3 ${
                      msg.sender === 'user'
                        ? 'bg-blue-600 text-white rounded-tr-none'
                        : 'bg-white text-gray-800 rounded-tl-none shadow-sm'
                    }`}
                  >
                    <p className="mb-1">{msg.message}</p>
                    <div
                      className={`text-xs ${
                        msg.sender === 'user' ? 'text-blue-200' : 'text-gray-500'
                      }`}
                    >
                      {msg.time}
                    </div>
                  </div>
                  {msg.sender === 'user' && (
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center ml-3 flex-shrink-0">
                      <User className="w-6 h-6 text-white" />
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="p-4 border-t border-gray-200">
              {suggestions.length > 0 && (
                <div className="mb-4 flex flex-wrap gap-2">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      className="text-sm bg-blue-50 text-blue-700 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
              
              <form onSubmit={handleSendMessage} className="flex items-center">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Posez votre question juridique..."
                  className="flex-grow px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className={`ml-3 p-3 rounded-lg ${
                    message.trim()
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-200 text-gray-500'
                  } transition-colors`}
                  disabled={!message.trim()}
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        </div>
        
        <div>
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
            <div className="p-4 bg-blue-600 text-white">
              <h2 className="font-semibold">À propos de SyndicBot</h2>
            </div>
            <div className="p-4">
              <p className="text-gray-600 mb-4">
                SyndicBot est un assistant virtuel spécialisé dans le droit syndical et le droit du travail. Il peut vous aider à :
              </p>
              <ul className="space-y-2 text-gray-600 mb-4">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Comprendre vos droits et obligations</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Obtenir des informations juridiques précises</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Trouver des ressources et documents utiles</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Préparer vos démarches syndicales</span>
                </li>
              </ul>
              <div className="text-sm text-gray-500">
                <p className="mb-2">
                  <strong>Note :</strong> SyndicBot fournit des informations générales et ne remplace pas un conseil juridique personnalisé.
                </p>
                <p>
                  Base de connaissances mise à jour le 15/03/2025
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
            <div className="p-4 bg-blue-600 text-white">
              <h2 className="font-semibold">Ressources populaires</h2>
            </div>
            <div className="p-4">
              <ul className="space-y-3">
                <li>
                  <a href="#" className="flex items-center text-blue-600 hover:text-blue-800">
                    <BookOpen className="w-4 h-4 mr-2" />
                    <span>Guide des droits du délégué syndical</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center text-blue-600 hover:text-blue-800">
                    <BookOpen className="w-4 h-4 mr-2" />
                    <span>Procédure de négociation collective</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center text-blue-600 hover:text-blue-800">
                    <BookOpen className="w-4 h-4 mr-2" />
                    <span>Modèles de documents syndicaux</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center text-blue-600 hover:text-blue-800">
                    <BookOpen className="w-4 h-4 mr-2" />
                    <span>Jurisprudence sociale récente</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl shadow-md p-6 text-white">
            <h3 className="font-semibold mb-3">Besoin d'un expert ?</h3>
            <p className="text-blue-100 text-sm mb-4">
              Pour des questions complexes, contactez directement nos conseillers juridiques.
            </p>
            <button className="w-full bg-white text-blue-600 font-semibold py-2 rounded-lg hover:bg-blue-50 transition-colors">
              Prendre rendez-vous
            </button>
          </div>
        </div>
      </div>
      
      {/* Features section */}
      <div className="mt-12 grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <Bot className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Intelligence artificielle spécialisée</h3>
          <p className="text-gray-600">
            SyndicBot est entraîné sur une vaste base de connaissances juridiques spécifiques au droit syndical.
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <Clock className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Disponible 24h/24, 7j/7</h3>
          <p className="text-gray-600">
            Obtenez des réponses à vos questions juridiques à tout moment, sans attendre un rendez-vous.
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <HelpCircle className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Orientation vers des experts</h3>
          <p className="text-gray-600">
            Pour les questions complexes, SyndicBot vous met en relation avec nos conseillers juridiques.
          </p>
        </div>
      </div>
    </div>
  );
};

// Configuration des sections
const SECTIONS = [
  {
    id: 'chat',
    label: 'Chat',
    Icon: MessageCircle,
  },
  {
    id: 'forum',
    label: 'Forum',
    Icon: Users,
  },
  {
    id: 'chatbot',
    label: 'ChatBot',
    Icon: Bot,
  }
];

// Hook personnalisé pour la gestion du contenu
const useContentLoader = () => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const switchSection = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => setIsTransitioning(false), 300);
  }, []);
  return { isTransitioning, switchSection };
};

// Composants mémorisés
export const MemoizedChatContent = memo(ChatContent);
export const MemoizedForumContent = memo(ForumContent);
export const MemoizedChatBotContent = memo(ChatBotContent);

// Composant principal
const CommunicationManager = () => {
  const { '*': section } = useParams();
  const navigate = useNavigate();
  const activeSection = section || 'chat';
  const { isTransitioning, switchSection } = useContentLoader();

  // Rediriger vers /communication/chat si l'URL est juste /communication
  useEffect(() => {
    if (!section || section === '/') {
      navigate('/communication/chat', { replace: true });
    }
  }, [section, navigate]);

  useEffect(() => {
    switchSection();
  }, [activeSection, switchSection]);

  // Fonction pour changer de section et mettre à jour l'URL
  const handleSectionChange = (sectionId) => {
    navigate(`/communication/${sectionId}`);
  };

  // Rendu conditionnel basé sur la section active
  const renderContent = () => {
    switch(activeSection) {
      case 'chat':
        return <MemoizedChatContent />;
      case 'forum':
        return <MemoizedForumContent />;
      case 'chatbot':
        return <MemoizedChatBotContent />;
      default:
        return <MemoizedChatContent />;
    }
  };
   
  return (
    <div className="min-h-screen bg-gray-50">
      <nav role="navigation" aria-label="Sections principales" className="sticky top-0 bg-white shadow-sm z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div role="tablist" className="flex flex-wrap justify-center gap-2 py-4">
            {SECTIONS.map((sectionItem) => (
              <motion.button
                key={sectionItem.id}
                role="tab"
                aria-controls={`${sectionItem.id}-panel`}
                aria-selected={activeSection === sectionItem.id}
                onClick={() => handleSectionChange(sectionItem.id)}
                className={`flex items-center px-4 py-2 rounded-full transition-all duration-300 ${
                  activeSection === sectionItem.id
                    ? 'bg-blue-50 text-blue-700 font-medium'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <sectionItem.Icon className="w-5 h-5 mr-2" />
                <span>{sectionItem.label}</span>
              </motion.button>
            ))}
          </div>

          <div className="flex justify-center">
            <div className="relative h-1 w-full max-w-xl">
              <motion.div
                className="absolute h-1 bg-blue-600 rounded-t"
                initial={false}
                animate={{
                  left: `${SECTIONS.findIndex(s => s.id === activeSection) * 33.33}%`,
                  width: '33.33%'
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default memo(CommunicationManager);