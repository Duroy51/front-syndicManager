import React, { useState, useRef } from 'react';
import { Building, LogIn, UserPlus, BookOpen, Radio, Mail, MessageCircle, Users, Bot, ChevronDown,Home } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {AppRoutesPaths} from "../../router/AppRoutesPaths.js";



const menuItems = [
  {
    label: 'Éducation',
    links: [
      { name: 'Blog', path: '/blog', icon: <BookOpen className="w-4 h-4 mr-2" /> },
      { name: 'Podcast', path: '/podcast', icon: <Radio className="w-4 h-4 mr-2" /> },
      { name: 'Newsletter', path: '/newsletter', icon: <Mail className="w-4 h-4 mr-2" /> },
    ],
  },
  {
    label: 'Communication',
    links: [
      { name: 'Chat', path: '/chat', icon: <MessageCircle className="w-4 h-4 mr-2" /> },
      { name: 'Forum', path: '/forum', icon: <Users className="w-4 h-4 mr-2" /> },
      { name: 'ChatBot', path: '/chatbot', icon: <Bot className="w-4 h-4 mr-2" /> },
    ],
  },
];

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [openDropdown, setOpenDropdown] = useState(null);
  const timerRef = useRef();

  const handleMouseEnter = (label) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setOpenDropdown(label);
  };

  const handleMouseLeave = () => {
    timerRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 200);
  };

  const getCurrentPage = () => {
    for (const menu of menuItems) {
      for (const link of menu.links) {
        if (location.pathname === link.path) {
          return `${menu.label} > ${link.name}`;
        }
      }
    }
    return 'Accueil';
  };

  return (
      <header className="bg-white shadow-md py-4 sticky top-0 z-50">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="flex items-center space-x-2 text-blue-600 mr-8">
              <Building className="h-8 w-8" />
              <span className="text-3xl font-bold">SyndicManager</span>
            </div>


            <div className="flex space-x-2">
              {/* Éducation Dropdown */}
              <div className="relative group">
                <button className="text-2xl text-gray-700 hover:text-blue-600 px-4 py-2 rounded-full flex items-center transition duration-300">
                  Éducation
                  <ChevronDown className="ml-2 h-4 w-4" />
                </button>
                <div className="absolute hidden group-hover:block bg-white shadow-lg rounded-lg mt-2 py-2 w-48">
                  <Link to={AppRoutesPaths.education.blog} className="block px-4 py-2 text-gray-700 hover:bg-blue-100">
                    <BookOpen className="inline-block w-4 h-4 mr-2" />
                    Blog
                  </Link>
                  <Link to={AppRoutesPaths.education.podcast} className="block px-4 py-2 text-gray-700 hover:bg-blue-100">
                    <Radio className="inline-block w-4 h-4 mr-2" />
                    Podcast
                  </Link>
                  <Link to= {AppRoutesPaths.education.newsletter} className="block px-4 py-2 text-gray-700 hover:bg-blue-100">
                    <Mail className="inline-block w-4 h-4 mr-2" />
                    Newsletter
                  </Link>
                </div>
              </div>

              {/* Communication Dropdown */}
              <div className="relative group">
                <button className="text-2xl text-gray-700 hover:text-blue-600 px-4 py-2 rounded-full flex items-center transition duration-300">
                  Communication
                  <ChevronDown className="ml-2 h-4 w-4" />
                </button>
                <div className="absolute hidden group-hover:block bg-white shadow-lg rounded-lg mt-2 py-2 w-48">
                  <Link to= {AppRoutesPaths.communication.chat} className="block px-4 py-2 text-gray-700 hover:bg-blue-100">
                    <MessageCircle className="inline-block w-4 h-4 mr-2" />
                    Chat
                  </Link>
                  <Link to= {AppRoutesPaths.communication.forum} className="block px-4 py-2 text-gray-700 hover:bg-blue-100">
                    <Users className="inline-block w-4 h-4 mr-2" />
                    Forum
                  </Link>
                  <Link to= {AppRoutesPaths.communication.chatbot} className="block px-4 py-2 text-gray-700 hover:bg-blue-100">
                    <Bot className="inline-block w-4 h-4 mr-2" />
                    ChatBot
                  </Link>
                </div>
              </div>
            </div>

          </div>

          <div className="flex space-x-4">
            <motion.button
                className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full border border-blue-300 flex items-center hover:bg-blue-200 transition duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/login')}
            >
              <LogIn className="mr-2 h-4 w-4" /> Se connecter
            </motion.button>
            <motion.button
                className="bg-blue-600 text-white px-4 py-2 rounded-full flex items-center hover:bg-blue-700 transition duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/register')}
            >
              <UserPlus className="mr-2 h-4 w-4" /> S'inscrire
            </motion.button>
          </div>
        </div>

        {/* Breadcrumb Navigation */}
        <div className="bg-gray-100 py-2">
          <div className="container mx-auto px-4 flex items-center text-gray-600 text-sm">
            <Home className="w-4 h-4 mr-2 text-gray-500" />
            <span>{getCurrentPage()}</span>
          </div>
        </div>
      </header>
  );
}

export default Header;
