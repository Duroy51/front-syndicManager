"use client"

import { useEffect, useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Users, Search, ChevronRight, TrendingUp, Calendar, MessageSquare, X, AlertCircle, MapPin } from "lucide-react"
import { OrganisationForm } from "./OrganisationForm/OrganisationForm.jsx"
import { getUserIdFromToken } from "../../services/AccountService.js"
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 },
    },
}

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
}

export const MesSyndicats = () => {
    const [searchTerm, setSearchTerm] = useState("")
    const [syndicats, setSyndicats] = useState([])
    const [loading, setLoading] = useState(false)
    const [isBusinessFormOpen, setIsBusinessFormOpen] = useState(false)
    const navigate = useNavigate()
    const UserId = getUserIdFromToken()

    useEffect(() => {
        const fakeData = [
            {
                id: 1,
                name: "Syndicat National des Transporteurs Routiers du Cameroun",
                type: "Routier",
                members: 15000,
                location: "National",
                image:
                    "https://images.unsplash.com/photo-1494515843206-f3117d3f51b7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
                trend: "up",
            },
            {
                id: 2,
                name: "Association des Chauffeurs de Taxi de Douala",
                type: "Urbain",
                members: 8000,
                location: "Douala",
                image:
                    "https://images.unsplash.com/photo-1559223607-a43c990c692c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
                trend: "stable",
            },
            {
                id: 3,
                name: "Syndicat des Transporteurs Ferroviaires du Cameroun",
                type: "Ferroviaire",
                members: 5000,
                location: "National",
                image:
                    "https://images.unsplash.com/photo-1474487548417-781cb71495f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
                trend: "down",
            },
            {
                id: 5,
                name: "Syndicat des Conducteurs de Moto-taxis de Yaoundé",
                type: "Moto-taxi",
                members: 12000,
                location: "Yaoundé",
                image:
                    "https://images.unsplash.com/photo-1558981852-426c6c22a060?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
                trend: "up",
            },
            {
                id: 6,
                name: "Association des Transporteurs Interurbains du Cameroun",
                type: "Interurbain",
                members: 7000,
                location: "National",
                image:
                    "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
                trend: "stable",
            },
            // New fake data entries
            {
                id: 7,
                name: "Syndicat des Transporteurs Maritimes du Cameroun",
                type: "Maritime",
                members: 3500,
                location: "Littoral",
                image:
                    "https://images.unsplash.com/photo-1577432141756-3fd6edecae8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
                trend: "up",
            },
            {
                id: 8,
                name: "Association des Pilotes de Ligne du Cameroun",
                type: "Aérien",
                members: 500,
                location: "National",
                image:
                    "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
                trend: "stable",
            },
            {
                id: 9,
                name: "Syndicat des Conducteurs de Bus Scolaires de Bamenda",
                type: "Scolaire",
                members: 2000,
                location: "Bamenda",
                image:
                    "https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
                trend: "up",
            },
            {
                id: 10,
                name: "Association des Transporteurs de Marchandises du Nord",
                type: "Fret",
                members: 4500,
                location: "Nord",
                image:
                    "https://images.unsplash.com/photo-1586191582151-f73872dfd183?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
                trend: "down",
            },
            {
                id: 11,
                name: "Syndicat des Opérateurs de Transport Fluvial",
                type: "Fluvial",
                members: 1200,
                location: "Est",
                image:
                    "https://images.unsplash.com/photo-1520252729330-a1b98ac8c0ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
                trend: "stable",
            },
            {
                id: 12,
                name: "Association des Conducteurs de Taxis-Brousse de l'Ouest",
                type: "Rural",
                members: 3000,
                location: "Ouest",
                image:
                    "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
                trend: "up",
            },
            {
                id: 13,
                name: "Syndicat des Transporteurs Touristiques du Cameroun",
                type: "Tourisme",
                members: 1800,
                location: "National",
                image:
                    "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
                trend: "stable",
            },
            // … autres syndicats …
        ]
        setSyndicats(fakeData)
    }, [])

    const openBusinessActorForm = () => setIsBusinessFormOpen(true)
    const closeBusinessActorForm = () => setIsBusinessFormOpen(false)

    /**
     * Modification de la fonction pour recevoir l'objet syndicat complet
     * et transmettre l'URL de l'image via l'objet `state` de la navigation.
     */
    const handleJoinSyndicat = async (syndicat) => {
        setLoading(true)
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000))
            const fakeResponse = {
                data: {
                    data: {
                        organisationToken: {
                            Bearer: `fake-organisation-token-${syndicat.id}`,
                        },
                        text: "Connexion effectuée avec succès",
                    },
                },
            }
            if (fakeResponse.data.data && fakeResponse.data.data.organisationToken) {
                localStorage.setItem("organisationToken", fakeResponse.data.data.organisationToken.Bearer)
                setLoading(false)
                // On transmet l'URL de l'image dans state sous la clé bannerImage.
                navigate("/syndicat-app", { state: { bannerImage: syndicat.image, organisationName: syndicat.name } })
                Swal.fire({

                    title: "Vous êtes connecté !",
                    confirmButtonText: "Ok",
                })
            } else {
                throw new Error("Token non reçu !")
            }
        } catch (error) {
            console.error("Erreur lors de la connexion au syndicat :", error)
            setLoading(false)
            await Swal.fire({
                icon: "error",
                title: "Erreur",
                text: "Une erreur est survenue lors de la communication avec le serveur",
                confirmButtonText: "Ok",
            })
        }
    }

    const filteredSyndicats = useMemo(() => {
        return syndicats.filter((syndicat) => syndicat.name.toLowerCase().includes(searchTerm.toLowerCase()))
    }, [syndicats, searchTerm])

    const getSuggestionMessage = () => {
        if (!searchTerm) return null
        if (filteredSyndicats.length === 0) {
            return `Aucun syndicat trouvé pour "${searchTerm}". Essayez une autre recherche.`
        }
        if (filteredSyndicats.length < syndicats.length) {
            return `${filteredSyndicats.length} syndicat(s) trouvé(s) pour "${searchTerm}".`
        }
        return null
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <div className="relative mb-6">
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
                        Mes Syndicats
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Gérez et explorez vos affiliations syndicales
                    </p>
                    </div>
                </motion.div>

                <motion.div
                    className="mb-12 flex flex-col items-center"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <div className="relative w-full max-w-md mb-4">
                        <input
                            type="text"
                            placeholder="Rechercher un syndicat..."
                            className="w-full pl-12 pr-4 py-3 rounded-full border-2 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-300 text-lg"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-6 w-6" />
                    </div>
                    {getSuggestionMessage() && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm"
                        >
                            <AlertCircle className="h-4 w-4 mr-2" />
                            {getSuggestionMessage()}
                        </motion.div>
                    )}
                </motion.div>

                <motion.div
                    className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {filteredSyndicats.map((syndicat) => (
                        <motion.div
                            key={syndicat.id}
                            className="bg-white rounded-xl shadow-lg overflow-hidden border-t-4 border-blue-500 hover:shadow-xl transition duration-300"
                            variants={itemVariants}
                            whileHover={{ y: -5 }}
                        >
                            <div className="relative">
                                <img
                                    src={syndicat.image || "/placeholder.svg"}
                                    alt={syndicat.name}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="absolute top-0 right-0 m-4">
                                    <span className="text-sm font-medium text-white bg-blue-500 rounded-full px-3 py-1">
                                        {syndicat.type}
                                    </span>
                                </div>
                            </div>
                            <div className="p-6">
                                <h2 className="text-2xl font-semibold text-gray-800 mb-3 line-clamp-2">
                                    {syndicat.name}
                                </h2>
                                <div className="flex items-center text-gray-600 mb-3">
                                    <Users className="h-5 w-5 mr-2 text-blue-500" />
                                    <span className="text-sm">
                                        {syndicat.members.toLocaleString()} membres
                                    </span>
                                    {syndicat.trend === "up" && <TrendingUp className="h-5 w-5 ml-2 text-green-500" />}
                                    {syndicat.trend === "down" && (
                                        <TrendingUp className="h-5 w-5 ml-2 text-red-500 transform rotate-180" />
                                    )}
                                    {syndicat.trend === "stable" && (
                                        <div className="h-5 w-5 ml-2 border-t-2 border-gray-400" />
                                    )}
                                </div>
                                <div className="flex items-center text-gray-600 mb-4">
                                    <MapPin className="h-5 w-5 mr-2 text-blue-500" />
                                    <span className="text-sm">{syndicat.location}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm text-gray-500">
                                    <div className="flex items-center">
                                        <Calendar className="h-4 w-4 mr-1" />
                                        <span>
                                            Prochain événement:{" "}
                                            {new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString("fr-FR")}
                                        </span>
                                    </div>
                                    <div className="flex items-center">
                                        <MessageSquare className="h-4 w-4 mr-1" />
                                        <span>{Math.floor(Math.random() * 10)} nouveaux messages</span>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-6 py-4">
                                {/* Remplacez l'appel en passant l'objet syndicat complet */}
                                <motion.button
                                    className="w-full bg-blue-500 text-white py-2 rounded-md flex items-center justify-center transition duration-300 hover:bg-blue-600"
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => handleJoinSyndicat(syndicat)}
                                >
                                    Espace Membre
                                    <ChevronRight className="ml-2 h-4 w-4" />
                                </motion.button>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            <AnimatePresence>
                {isBusinessFormOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 overflow-y-auto"
                    >
                        <motion.div
                            className="w-full max-w-4xl p-4 mx-4 sm:mx-6 md:mx-8 lg:mx-auto max-h-[80vh] overflow-y-auto"
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.8 }}
                        >
                            <div className="relative bg-white rounded-lg shadow-lg">
                                <button
                                    onClick={closeBusinessActorForm}
                                    className="absolute top-4 right-4 z-10 text-gray-500 hover:text-gray-700 transition-colors"
                                >
                                    <X className="h-6 w-6" />
                                </button>
                                <OrganisationForm />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {loading && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <p className="text-lg font-semibold">Connexion en cours...</p>
                    </div>
                </div>
            )}
        </div>
    )
}
