import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Clock, User, Image as ImageIcon, MoreHorizontal, Plus, Users, X, Heart, Share2, MessageCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const EventsList = () => {
    const { t } = useTranslation();
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [events, setEvents] = useState([
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
        },
        {
            id: 3,
            title: "Barbecue Annuel du Syndicat",
            description: "C'est l'heure de notre barbecue annuel ! Venez vous détendre, rencontrer vos collègues et profiter d'une journée ensoleillée. N'oubliez pas d'apporter votre bonne humeur ! Au programme : des jeux en plein air, un concours de pétanque, des activités pour les enfants et bien sûr, un délicieux barbecue.",
            location: "Parc Municipal, Espace de Pique-nique 3",
            startDate: new Date("2023-08-05T12:00:00"),
            endDate: new Date("2023-08-05T20:00:00"),
            author: {
                name: "Sophie Lefebvre",
                profileImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop"
            },
            images: ["https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=1200&h=600&fit=crop"],
            isUpcoming: true,
            participants: [
                { name: "Antoine Dubois" },
                { name: "Émilie Lambert" },
                { name: "François Girard" },
                { name: "Isabelle Bouchard" },
                { name: "Julien Tremblay" },
            ]
        },
        {
            id: 4,
            title: "Séminaire sur la Négociation Collective",
            description: "Participez à notre séminaire intensif sur les techniques de négociation collective. Apprenez à défendre efficacement les intérêts des travailleurs lors des négociations avec la direction. Ce séminaire couvrira les stratégies de négociation, la préparation des dossiers, et les meilleures pratiques pour obtenir des accords favorables.",
            location: "Centre de Conférences, 78 Rue de la République",
            startDate: new Date("2023-09-20T09:00:00"),
            endDate: new Date("2023-09-21T17:00:00"),
            author: {
                name: "Jean Dubois",
                profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop"
            },
            images: ["https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=1200&h=600&fit=crop"],
            isUpcoming: false,
            participants: [
                { name: "Marie Dupont" },
                { name: "Pierre Martin" },
                { name: "Sophie Lefebvre" },
                { name: "Lucie Moreau" },
            ]
        },
        {
            id: 5,
            title: "Atelier sur la Santé et la Sécurité au Travail",
            description: "Cet atelier pratique se concentrera sur l'amélioration de la santé et de la sécurité dans votre environnement de travail. Des experts partageront des conseils sur l'identification des risques, la prévention des accidents et la promotion d'une culture de sécurité positive.",
            location: "Salle de Formation C, 56 Avenue de la Sécurité",
            startDate: new Date("2023-10-15T10:00:00"),
            endDate: new Date("2023-10-15T16:00:00"),
            author: {
                name: "Lucie Moreau",
                profileImage: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&h=150&fit=crop"
            },
            images: ["https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=600&fit=crop"],
            isUpcoming: false,
            participants: [
                { name: "Jean Dupont" },
                { name: "Marie Curie" },
                { name: "Thomas Bernard" },
                { name: "Camille Roux" },
                { name: "Antoine Dubois" },
            ]
        }
    ]);

    const EventCard = ({ event }) => {
        const [isExpanded, setIsExpanded] = useState(false);
        const [isParticipating, setIsParticipating] = useState(false);
        const [isLiked, setIsLiked] = useState(false);

        const handleParticipate = () => {
            setIsParticipating(!isParticipating);
            if (!isParticipating) {
                event.participants.push({ name: "Vous" });
            } else {
                event.participants = event.participants.filter(p => p.name !== "Vous");
            }
        };

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
                                <span className="mx-2">•</span>
                                <Calendar className="w-4 h-4 mr-1 text-blue-500"/>
                                <span>{event.startDate.toLocaleDateString('fr-FR', { 
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric'
                                })}</span>
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
                                    +{event.images.length - 1} {t("photos")}
                                </button>
                            )}
                        </div>
                    )}

                    <div className="flex items-center justify-between mb-6">
                        <button
                            onClick={() => setSelectedEvent(event)}
                            className="flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-200"
                        >
                            <Users className="w-5 h-5 mr-2"/>
                            <span className="font-medium">{event.participants.length} {t('participants')}</span>
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

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleParticipate}
                        className={`w-full py-4 rounded-xl transition duration-200 flex items-center justify-center font-semibold text-lg shadow-lg ${
                            isParticipating 
                                ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700' 
                                : 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700'
                        }`}
                    >
                        <Calendar className="w-6 h-6 mr-2"/>
                        {isParticipating ? "Vous participez à l'événement" : "Participer à l'événement"}
                    </motion.button>
                </div>
            </motion.div>
        );
    };

    const ParticipantsList = ({ event, onClose }) => {
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
                    className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl"
                    onClick={e => e.stopPropagation()}
                >
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-2xl font-bold text-gray-800">{t('participants')}</h3>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={onClose}
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
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-3 px-8 rounded-xl inline-flex items-center text-lg transition duration-200 shadow-lg"
                >
                    <Plus className="mr-2 h-5 w-5" />
                    {t('creerUnEvenement')}
                </motion.button>
            </motion.div>

            <AnimatePresence>
                {events.map((event) => (
                    <EventCard key={event.id} event={event} />
                ))}
            </AnimatePresence>

            <AnimatePresence>
                {selectedEvent && (
                    <ParticipantsList event={selectedEvent} onClose={() => setSelectedEvent(null)} />
                )}
            </AnimatePresence>
        </div>
    );
};