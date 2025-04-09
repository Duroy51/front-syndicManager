import React from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';

export const EventButton = ({ isParticipating, onClick }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`w-full py-4 rounded-xl transition duration-200 flex items-center justify-center font-semibold text-lg shadow-lg ${
        isParticipating 
          ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700' 
          : 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700'
      }`}
    >
      <Calendar className="w-6 h-6 mr-2"/>
      {isParticipating ? "Vous participez à l'événement" : "Participer à l'événement"}
    </motion.button>
  );
};