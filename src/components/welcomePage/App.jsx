import React, { useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Building, LogIn, UserPlus, BookOpen, Radio, Mail, MessageCircle, Users, Bot, ChevronDown, Home } from 'lucide-react';

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

            <nav className="flex space-x-4">
              {menuItems.map((menu) => (
                  <div
                      key={menu.label}
                      className="relative"
                      onMouseEnter={() => handleMouseEnter(menu.label)}
                      onMouseLeave={handleMouseLeave}
                  >
                    <button className="text-2xl text-gray-700 hover:text-blue-600 px-4 py-2 rounded-full flex items-center transition duration-300">
                      {menu.label}
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </button>
                    <AnimatePresence>
                      {openDropdown === menu.label && (
                          <motion.div
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 8 }}
                              transition={{ duration: 0.2 }}
                              className="absolute left-0 mt-1 py-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200"
                          >
                            {menu.links.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.path}
                                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-blue-50 transition-colors"
                                >
                                  {link.icon} {link.name}
                                </a>
                            ))}
                          </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
              ))}
            </nav>
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
