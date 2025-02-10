import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Building, LogIn, UserPlus, BookOpen, Radio, Mail, MessageCircle, Users, Bot, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();

  return (
    <div className="">
      {/* Header */}
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
                  <a href="/blog" className="block px-4 py-2 text-gray-700 hover:bg-blue-100">
                    <BookOpen className="inline-block w-4 h-4 mr-2" />
                    Blog
                  </a>
                  <a href="/podcast" className="block px-4 py-2 text-gray-700 hover:bg-blue-100">
                    <Radio className="inline-block w-4 h-4 mr-2" />
                    Podcast
                  </a>
                  <a href="/newsletter" className="block px-4 py-2 text-gray-700 hover:bg-blue-100">
                    <Mail className="inline-block w-4 h-4 mr-2" />
                    Newsletter
                  </a>
                </div>
              </div>

              {/* Communication Dropdown */}
              <div className="relative group">
                <button className="text-2xl text-gray-700 hover:text-blue-600 px-4 py-2 rounded-full flex items-center transition duration-300">
                  Communication
                  <ChevronDown className="ml-2 h-4 w-4" />
                </button>
                <div className="absolute hidden group-hover:block bg-white shadow-lg rounded-lg mt-2 py-2 w-48">
                  <a href="/chat" className="block px-4 py-2 text-gray-700 hover:bg-blue-100">
                    <MessageCircle className="inline-block w-4 h-4 mr-2" />
                    Chat
                  </a>
                  <a href="/forum" className="block px-4 py-2 text-gray-700 hover:bg-blue-100">
                    <Users className="inline-block w-4 h-4 mr-2" />
                    Forum
                  </a>
                  <a href="/chatbot" className="block px-4 py-2 text-gray-700 hover:bg-blue-100">
                    <Bot className="inline-block w-4 h-4 mr-2" />
                    ChatBot
                  </a>
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
              <LogIn className="mr-2 h-4 w-4" />
              Se connecter
            </motion.button>
            <motion.button
              className="bg-blue-600 text-white px-4 py-2 rounded-full flex items-center hover:bg-blue-700 transition duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/register')}
            >
              <UserPlus className="mr-2 h-4 w-4" />
              S'inscrire
            </motion.button>
          </div>
        </div>
      </header>

     
    </div>
  );
}

export default App;