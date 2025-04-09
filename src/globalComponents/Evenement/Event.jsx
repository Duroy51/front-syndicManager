import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Clock, MapPin, Users, X, Heart, Share2, MessageCircle } from 'lucide-react';
import { EventButton } from './EventButton';

export const Event = ({ event, onParticipantUpdate }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isParticipating, setIsParticipating] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showParticipants, setShowParticipants] = useState(false);

  const handleParticipate = () => {
    setIsParticipating(!isParticipating);
    const updatedParticipants = isParticipating
      ? event.participants.filter(p => p.name !== "Vous")
      : [...event.participants, { name: "Vous" }];
    
    onParticipantUpdate(event.id, updatedParticipants);
  };

  const ParticipantsList = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={() => setShowParticipants(false)}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800">Participants</h3>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowParticipants(false)}
            className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100"
          >
            <X className="w-6 h-6" />
          </motion.button>
        </div>
        <div className="max-h-96 overflow-y-auto">
          {event.participants.map((participant, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center py-3 px-4 hover:bg-gray-50 rounded-lg transition-colors duration-200"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-medium">
                {participant.name.charAt(0)}
              </div>
              <span className="ml-3 font-medium text-gray-700">{participant.name}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8 relative w-full max-w-2xl mx-auto transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
    >
      {event.isUpcoming && (
        <div className="absolute top-4 right-4 z-10">
          <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
            À venir
          </span>
        </div>
      )}

      <div className="p-8">
        <div className="flex items-center mb-6">
          <div className="relative">
            <img 
              src={event.author.profileImage} 
              alt={event.author.name}
              className="w-14 h-14 rounded-full object-cover ring-4 ring-blue-100"
            />
            <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></div>
          </div>
          <div className="ml-4 flex-grow">
            <h3 className="font-bold text-2xl text-gray-800 mb-1 hover:text-blue-600 transition-colors duration-200">
              {event.title}
            </h3>
            <div className="flex items-center text-sm text-gray-600">
              <User className="w-4 h-4 mr-1 text-blue-500"/>
              <span className="font-medium">{event.author.name}</span>
            </div>
          </div>
        </div>

        <div className="prose prose-blue max-w-none mb-6">
          <p className="text-gray-700 leading-relaxed">
            {isExpanded ? event.description : `${event.description.slice(0, 150)}...`}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="ml-2 text-blue-500 hover:text-blue-700 font-medium focus:outline-none"
            >
              {isExpanded ? 'Voir moins' : 'Voir plus'}
            </button>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 mb-6">
          <div className="flex items-center px-4 py-2 bg-blue-50 rounded-lg">
            <Clock className="w-5 h-5 mr-2 text-blue-500"/>
            <span className="text-blue-800 font-medium">
              {event.startDate.toLocaleTimeString('fr-FR', { 
                hour: '2-digit',
                minute: '2-digit'
              })} - {event.endDate.toLocaleTimeString('fr-FR', {
                hour: '2-digit',
                minute: '2-digit'
              })}
            </span>
          </div>
          {event.location && (
            <div className="flex items-center px-4 py-2 bg-purple-50 rounded-lg">
              <MapPin className="w-5 h-5 mr-2 text-purple-500"/>
              <span className="text-purple-800 font-medium">{event.location}</span>
            </div>
          )}
        </div>

        {event.images && event.images.length > 0 && (
          <div className="relative rounded-xl overflow-hidden mb-6">
            <img 
              src={event.images[0]} 
              alt="Event" 
              className="w-full h-80 object-cover transform hover:scale-105 transition-transform duration-500"
            />
            {event.images.length > 1 && (
              <button className="absolute bottom-4 right-4 bg-black bg-opacity-75 text-white px-4 py-2 rounded-lg text-sm hover:bg-opacity-90 transition-colors duration-200 backdrop-blur-sm">
                +{event.images.length - 1} photos
              </button>
            )}
          </div>
        )}

        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => setShowParticipants(true)}
            className="flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-200"
          >
            <Users className="w-5 h-5 mr-2"/>
            <span className="font-medium">{event.participants.length} participants</span>
          </button>
          
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsLiked(!isLiked)}
              className={`p-2 rounded-full ${isLiked ? 'text-red-500 bg-red-50' : 'text-gray-400 hover:text-red-500 hover:bg-red-50'} transition-colors duration-200`}
            >
              <Heart className="w-6 h-6" fill={isLiked ? "currentColor" : "none"} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full text-gray-400 hover:text-blue-500 hover:bg-blue-50 transition-colors duration-200"
            >
              <Share2 className="w-6 h-6" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full text-gray-400 hover:text-green-500 hover:bg-green-50 transition-colors duration-200"
            >
              <MessageCircle className="w-6 h-6" />
            </motion.button>
          </div>
        </div>

        <EventButton 
          isParticipating={isParticipating}
          onClick={handleParticipate}
        />
      </div>

      <AnimatePresence>
        {showParticipants && <ParticipantsList />}
      </AnimatePresence>
    </motion.div>
  );
};