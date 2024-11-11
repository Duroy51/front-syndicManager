import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, MapPin, Clock, User, Image as ImageIcon, MoreHorizontal, Plus, Users, X } from 'lucide-react'

export const EventsList = () => {
    const [selectedEvent, setSelectedEvent] = useState(null)

    const events = [
        {
            id: 1,
            title: "Assemblée Générale Annuelle",
            description: "Rejoignez-nous pour notre Assemblée Générale Annuelle où nous discuterons des réalisations de l'année écoulée et planifierons l'avenir de notre syndicat. Votre voix compte ! Nous aborderons les sujets importants tels que les négociations collectives à venir, les initiatives de bien-être au travail et les projets de développement professionnel.",
            location: "Salle de conférence principale, 123 Rue du Syndicat",
            startDate: new Date("2023-06-15T09:00:00"),
            endDate: new Date("2023-06-15T17:00:00"),
            author: {
                name: "Marie Dupont",
                profileImage: "/placeholder.svg?height=100&width=100"
            },
            images: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
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
                profileImage: "/placeholder.svg?height=100&width=100"
            },
            images: ["/placeholder.svg?height=400&width=600"],
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
                profileImage: "/placeholder.svg?height=100&width=100"
            },
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
                profileImage: "/placeholder.svg?height=100&width=100"
            },
            images: ["/placeholder.svg?height=400&width=600"],
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
                profileImage: "/placeholder.svg?height=100&width=100"
            },
            isUpcoming: false,
            participants: [
                { name: "Jean Dupont" },
                { name: "Marie Curie" },
                { name: "Thomas Bernard" },
                { name: "Camille Roux" },
                { name: "Antoine Dubois" },
                { name: "Antoine Dubois" },
                { name: "Antoine Dubois" },
                { name: "Antoine Dubois" },
                { name: "Antoine Dubois" },
                { name: "Antoine Dubois" },
                { name: "Antoine Dubois" },
            ]
        }
    ]

    const EventCard = ({ event }) => {
        const [isExpanded, setIsExpanded] = useState(false)
        const [isParticipating, setIsParticipating] = useState(false)

        const handleParticipate = () => {
            setIsParticipating(!isParticipating)
            if (!isParticipating) {
                event.participants.push({ name: "Vous" })
            } else {
                event.participants = event.participants.filter(p => p.name !== "Vous")
            }
        }

        return (
            
            <motion.div
                layout
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                exit={{opacity: 0, y: -20}}
                className="bg-white rounded-lg shadow-lg overflow-hidden mb-6 relative w-full max-w-xl mx-auto transition-shadow duration-300 hover:shadow-xl"

            >

                {event.isUpcoming && (
                    <div className="absolute top-0 right-0 w-32 h-32 overflow-hidden">

                        <div
                            className="absolute top-0 right-0 -mt-4 -mr-16 w-48 h-12 bg-red-500 text-white text-sm font-bold text-center leading-12 transform rotate-45">

                        </div>
                    </div>
                )}

                <div className="p-6">

                    <div className="flex items-center mb-4">
                        <img src={event.author.profileImage} alt={event.author.name}
                             className="w-12 h-12 rounded-full mr-4 object-cover border-2 border-blue-500"/>
                        <div>
                            <h3 className="font-bold text-xl text-gray-800 mb-1">{event.title}</h3>
                            <div className="flex items-center text-sm text-gray-600">
                                <User className="w-4 h-4 mr-1"/>
                                <span>{event.author.name}</span>
                                <span className="mx-2">•</span>
                                <Calendar className="w-4 h-4 mr-1"/>
                                <span>{event.startDate.toLocaleDateString()}</span>
                            </div>
                        </div>
                        <button className="ml-auto text-gray-400 hover:text-gray-600 transition-colors duration-200">
                            <MoreHorizontal className="w-5 h-5"/>
                        </button>
                    </div>
                    <p className="text-gray-700 mb-4">
                        {isExpanded ? event.description : `${event.description.slice(0, 100)}...`}
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="text-blue-500 hover:text-blue-600 ml-2 font-medium"
                        >
                            {isExpanded ? 'Voir moins' : 'Voir plus'}
                        </button>
                    </p>
                    <div className="flex flex-wrap items-center text-sm text-gray-600 mb-4">
                        <div className="flex items-center mr-4 mb-2">
                            <Clock className="w-4 h-4 mr-1 text-blue-500"/>
                            <span>{event.startDate.toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit'
                            })} - {event.endDate.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}</span>
                        </div>
                        {event.location && (
                            <div className="flex items-center mb-2">
                                <MapPin className="w-4 h-4 mr-1 text-blue-500"/>
                                <span>{event.location}</span>
                            </div>
                        )}
                    </div>
                    <button
                        onClick={() => setSelectedEvent(event)}
                        className="flex items-center text-blue-500 hover:text-blue-600 transition-colors duration-200"
                    >
                        <Users className="w-5 h-5 mr-2"/>
                        {event.participants.length} participants
                    </button>
                </div>
                {event.images && event.images.length > 0 && (
                    <div className="relative h-64 bg-gray-200">
                        <img src={event.images[0]} alt="Event" className="w-full h-full object-cover"/>
                        {event.images.length > 1 && (
                            <button
                                className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm hover:bg-opacity-70 transition-colors duration-200">
                                +{event.images.length - 1} photos
                            </button>
                        )}
                    </div>
                )}
                <div className="p-6 bg-gray-50 border-t border-gray-200">
                    <motion.button
                        whileHover={{scale: 1.03}}
                        whileTap={{scale: 0.98}}
                        onClick={handleParticipate}
                        className={`w-full py-3 ${isParticipating ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'} text-white rounded-lg transition duration-200 flex items-center justify-center font-semibold text-lg shadow-md`}
                    >
                        <Calendar className="w-5 h-5 mr-2"/>
                        {isParticipating ? "Vous participez à l'événement" : "Participer à l'événement"}
                    </motion.button>
                </div>
            </motion.div>
        )
    }

    const ParticipantsList = ({event, onClose }) => {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 max-w-md w-full">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold">Participants</h3>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                    <ul className="max-h-96 overflow-y-auto">
                        {event.participants.map((participant, index) => (
                            <li key={index} className="py-2 border-b last:border-b-0">
                                {participant.name}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }

    return (
        <div className="max-w-4xl mx-auto py-8 px-4">
            <div className="mb-8 flex flex-col sm:flex-row items-center justify-between">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-full inline-flex items-center text-lg transition duration-200 shadow-md"
                >
                    <Plus className="mr-2 h-5 w-5" />
                    Créer un événement
                </motion.button>
            </div>

            <AnimatePresence>
                {events.map((event) => (
                    <EventCard key={event.id} event={event} />
                ))}
            </AnimatePresence>

            {selectedEvent && (
                <ParticipantsList event={selectedEvent} onClose={() => setSelectedEvent(null)} />
            )}
        </div>
    )
}
