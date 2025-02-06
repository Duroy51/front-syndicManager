"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Users, Calendar, Mail, Phone, MapPin, ChevronRight, ChevronLeft, ExternalLink, LogIn } from "lucide-react"
import { useNavigate } from "react-router-dom"

// Mock data for the syndicat
const syndicatData = {
    id: 1,
    name: "Syndicat Des Taxi Du Cameroun",
    logo: "/placeholder.svg",
    coverImage:
        "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80",
    description:
        "Le Syndicat National de l'Éducation est dédié à la protection des droits et à l'amélioration des conditions de travail des chauffeurs dans tout le pays.",
    members: 250000,
    foundedYear: 1950,
    category: "Transport",
    website: "www.TaxiCam.fr",
    email: "contact@sne-education.fr",
    phone: "+237 99 52 02 21",
    address: "123 Rue Melen, Emia",
}

const stats = [
    { name: "Membres actifs", value: "250K" },
    { name: "Délégués", value: "5,000" },
    { name: "Sections locales", value: "500" },
    { name: "Années d'existence", value: "73" },
]

const activities = [
    {
        id: 1,
        title: "Assemblée Générale Annuelle",
        date: "15 Juin 2023",
        type: "Événement",
        image: "https://images.unsplash.com/photo-1559829604-549c5c1a3a5f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    },
    {
        id: 2,
        title: "Négociations tarifaires avec la Mairie",
        date: "22 Mai 2023",
        type: "Négociation",
        image: "https://images.unsplash.com/photo-1517436073-3b1b3d72b6a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    },
    {
        id: 3,
        title: "Campagne pour l'amélioration des conditions de travail",
        date: "1 Mai 2023",
        type: "Campagne",
        image:
            "https://images.unsplash.com/photo-1534787238916-9ba6764efd4f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    },
    {
        id: 4,
        title: "Formation sur les nouvelles réglementations",
        date: "10 Avril 2023",
        type: "Formation",
        image:
            "https://images.unsplash.com/photo-1521791055366-0d553872125f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    },
]

const members = [
    { id: 1, name: "Marie Dubois", role: "Présidente", avatar: "https://i.pravatar.cc/150?img=1" },
    { id: 2, name: "Pierre Martin", role: "Secrétaire Général", avatar: "https://i.pravatar.cc/150?img=2" },
    { id: 3, name: "Sophie Lefebvre", role: "Trésorière", avatar: "https://i.pravatar.cc/150?img=3" },
    { id: 4, name: "Lucas Moreau", role: "Responsable Communication", avatar: "https://i.pravatar.cc/150?img=4" },
    { id: 5, name: "Camille Rousseau", role: "Déléguée Régionale", avatar: "https://i.pravatar.cc/150?img=5" },
    { id: 6, name: "Thomas Bernard", role: "Responsable Juridique", avatar: "https://i.pravatar.cc/150?img=6" },
]

export const SyndicatProfile = () => {
    const navigate = useNavigate()
    const [currentPage, setCurrentPage] = useState(1)
    const membersPerPage = 4
    const totalPages = Math.ceil(members.length / membersPerPage)

    const paginatedMembers = members.slice((currentPage - 1) * membersPerPage, currentPage * membersPerPage)

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
            {/* Cover Image */}
            <div className="h-64 md:h-80 w-full relative">
                <img src={syndicatData.coverImage || "/placeholder.svg"} alt="Cover" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end">
                    <div className="container mx-auto px-4 py-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <img
                                    src={syndicatData.logo || "/placeholder.svg"}
                                    alt="Logo"
                                    className="w-24 h-24 rounded-full border-4 border-white"
                                />
                                <div className="text-white">
                                    <h1 className="text-3xl font-bold">{syndicatData.name}</h1>
                                    <p className="text-xl">{syndicatData.category}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <motion.button
                className="fixed top-4 right-4 px-6 py-3 bg-yellow-400 text-black text-lg font-bold rounded-full shadow-lg hover:bg-yellow-300 transition duration-300 flex items-center space-x-2 z-50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={{
                    boxShadow: ["0px 0px 0px 0px rgba(0,0,0,0.2)", "0px 0px 0px 10px rgba(0,0,0,0)"],
                }}
                transition={{
                    duration: 1,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                }}
                onClick={() => navigate("/register")}
            >
                <LogIn className="w-6 h-6" />
                <span>Espace Membre</span>
            </motion.button>

            <div className="container mx-auto px-4 py-12">
                <div className="grid gap-8 md:grid-cols-3">
                    {/* Left column */}
                    <div className="md:col-span-2 space-y-8">
                        {/* About section */}
                        <section className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-2xl font-bold text-blue-800 mb-4">À propos</h2>
                            <p className="text-gray-600">{syndicatData.description}</p>
                        </section>

                        {/* Stats section */}
                        <section className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-2xl font-bold text-blue-800 mb-4">Statistiques</h2>
                            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                                {stats.map((stat) => (
                                    <div key={stat.name} className="text-center">
                                        <div className="text-2xl font-semibold text-blue-600">{stat.value}</div>
                                        <div className="text-sm text-gray-500">{stat.name}</div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Members section */}
                        <section className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-2xl font-bold text-blue-800 mb-4">Membres clés</h2>
                            <div className="grid gap-4 sm:grid-cols-2">
                                {paginatedMembers.map((member) => (
                                    <div key={member.id} className="flex items-center space-x-4 p-2 rounded-lg hover:bg-gray-100">
                                        <img
                                            src={member.avatar || "/placeholder.svg"}
                                            alt={member.name}
                                            className="w-12 h-12 rounded-full"
                                        />
                                        <div>
                                            <div className="font-medium">{member.name}</div>
                                            <div className="text-sm text-gray-500">{member.role}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {totalPages > 1 && (
                                <div className="flex justify-between items-center mt-4">
                                    <button
                                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
                                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                        disabled={currentPage === 1}
                                    >
                                        <ChevronLeft className="h-4 w-4 mr-2 inline" />
                                        Précédent
                                    </button>
                                    <span className="text-sm text-gray-500">
                    Page {currentPage} sur {totalPages}
                  </span>
                                    <button
                                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
                                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                        disabled={currentPage === totalPages}
                                    >
                                        Suivant
                                        <ChevronRight className="h-4 w-4 ml-2 inline" />
                                    </button>
                                </div>
                            )}
                        </section>

                        {/* Activities section */}
                        <section className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-2xl font-bold text-blue-800 mb-4">Activités récentes</h2>
                            <div className="space-y-4">
                                {activities.map((activity) => (
                                    <div key={activity.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                                        <img
                                            src={activity.image || "/placeholder.svg"}
                                            alt={activity.title}
                                            className="w-24 h-24 object-cover rounded-md"
                                        />
                                        <div>
                                            <h3 className="font-semibold text-lg">{activity.title}</h3>
                                            <p className="text-sm text-gray-500">
                                                {activity.date} - {activity.type}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Right column */}
                    <div className="space-y-8">
                        {/* Contact information */}
                        <section className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-2xl font-bold text-blue-800 mb-4">Informations de contact</h2>
                            <div className="space-y-4">
                                <div className="flex items-center space-x-2">
                                    <Mail className="h-5 w-5 text-blue-600" />
                                    <span>{syndicatData.email}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Phone className="h-5 w-5 text-blue-600" />
                                    <span>{syndicatData.phone}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <MapPin className="h-5 w-5 text-blue-600" />
                                    <span>{syndicatData.address}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <ExternalLink className="h-5 w-5 text-blue-600" />
                                    <a
                                        href={`https://${syndicatData.website}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:underline"
                                    >
                                        {syndicatData.website}
                                    </a>
                                </div>
                            </div>
                        </section>

                        {/* Membership growth */}
                        <section className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-2xl font-bold text-blue-800 mb-4">Croissance des adhésions</h2>
                            <p className="text-sm text-gray-500 mb-4">Progression sur les 12 derniers mois</p>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-1">
                                        <p className="text-sm font-medium">Nouveaux membres</p>
                                        <p className="text-sm text-gray-500">+2,350 (+15%)</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-medium">15,000</p>
                                        <p className="text-sm text-gray-500">Sur 250,000</p>
                                    </div>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "15%" }}></div>
                                </div>
                            </div>
                        </section>

                        {/* Quick actions */}
                        <section className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-2xl font-bold text-blue-800 mb-4">Actions rapides</h2>
                            <div className="space-y-2">
                                <motion.button
                                    className="w-full py-3 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 flex items-center justify-center font-semibold"
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => navigate("/register")}
                                >
                                    <Users className="mr-2 h-5 w-5" />
                                    Devenir membre
                                </motion.button>
                                <motion.button
                                    className="w-full py-3 px-4 bg-white text-blue-600 border-2 border-blue-600 rounded-md hover:bg-blue-50 transition duration-300 flex items-center justify-center font-semibold"
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <Calendar className="mr-2 h-5 w-5" />
                                    Voir les événements
                                </motion.button>
                                {/*<motion.button
                                    className="w-full py-3 px-4 bg-white text-blue-600 border-2 border-blue-600 rounded-md hover:bg-blue-50 transition duration-300 flex items-center justify-center font-semibold"
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <Mail className="mr-2 h-5 w-5" />
                                    S'abonner à la newsletter
                                </motion.button>*/}
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    )
}

