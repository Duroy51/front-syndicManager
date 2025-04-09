import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { Event } from './Event';
import { EventForm } from './EventForm';

const defaultEvents = [
  {
    id: 1,
    title: "Assemblée Générale Annuelle",
    description: "Rejoignez-nous pour notre Assemblée Générale Annuelle où nous discuterons des réalisations de l'année écoulée et planifierons l'avenir de notre syndicat. Votre voix compte ! Nous aborderons les sujets importants tels que les négociations collectives à venir, les initiatives de bien-être au travail et les projets de développement professionnel.",
    location: "Salle de conférence principale, 123 Rue du Syndicat",
    startDate: new Date("2023-06-15T09:00:00"),
    endDate: new Date("2023-06-15T17:00:00"),
    author: {
      name: "Marie Dupont",
      profileImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop"
    },
    images: ["https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?w=1200&h=600&fit=crop"],
    isUpcoming: true,
    participants: [
      { name: "Jean Dupont" },
      { name: "Marie Curie" },
      { name: "Pierre Martin" },
      { name: "Sophie Lefebvre" },
    ]
  },
  {
    id: 2,
    title: "Formation sur les Droits du Travail",
    description: "Ne manquez pas notre session de formation intensive sur les dernières mises à jour des lois du travail. Un expert juridique sera présent pour répondre à toutes vos questions. Cette formation couvrira les changements récents dans la législation du travail, les droits des employés en matière de santé et de sécurité, ainsi que les procédures de résolution des conflits.",
    location: "Salle de formation B, 45 Avenue des Travailleurs",
    startDate: new Date("2023-07-10T14:00:00"),
    endDate: new Date("2023-07-10T18:00:00"),
    author: {
      name: "Pierre Martin",
      profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop"
    },
    images: ["https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1200&h=600&fit=crop"],
    isUpcoming: true,
    participants: [
      { name: "Lucie Moreau" },
      { name: "Thomas Bernard" },
      { name: "Camille Roux" },
    ]
  }
];

export const EventsList = () => {
  const [events, setEvents] = useState(defaultEvents);
  const [showEventForm, setShowEventForm] = useState(false);

  const handleParticipantUpdate = (eventId, updatedParticipants) => {
    setEvents(events.map(event => 
      event.id === eventId 
        ? { ...event, participants: updatedParticipants }
        : event
    ));
  };

  const handleCreateEvent = (newEvent) => {
    setEvents(prevEvents => [newEvent, ...prevEvents]);
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 flex flex-col sm:flex-row items-center justify-between"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowEventForm(true)}
          className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-3 px-8 rounded-xl inline-flex items-center text-lg transition duration-200 shadow-lg"
        >
          <Plus className="mr-2 h-5 w-5" />
          Créer un événement
        </motion.button>
      </motion.div>

      <AnimatePresence>
        {events.map((event) => (
          <Event 
            key={event.id} 
            event={event}
            onParticipantUpdate={handleParticipantUpdate}
          />
        ))}
      </AnimatePresence>

      <AnimatePresence>
        {showEventForm && (
          <EventForm
            onClose={() => setShowEventForm(false)}
            onSubmit={handleCreateEvent}
          />
        )}
      </AnimatePresence>
    </div>
  );
};