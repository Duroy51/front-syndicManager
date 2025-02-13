"use client"

import { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    Users,
    Search,
    ChevronRight,
    X,
    MapPin,
    AlertCircle,
    Calendar,
    Sparkles,
    MessageSquare,
    TrendingUp,
    Filter,
    PlusCircle,
    ArrowRightCircle,
    BarChart2,
    Bell
} from "lucide-react"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import {OrganisationForm} from "./OrganisationForm/OrganisationForm.jsx"
import {getUserIdFromToken} from "../../services/AccountService.js";

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
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* En-tête premium */}
                <motion.header
                    initial={{opacity: 0, y: -20}}
                    animate={{opacity: 1, y: 0}}
                    className="text-center mb-16 relative"
                >
                    <div
                        className="absolute inset-x-0 top-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-200 to-indigo-200 opacity-20 blur-3xl h-32 -z-10"></div>
                    <div className="max-w-4xl mx-auto space-y-4">
                        <div
                            className="inline-flex items-center bg-white/80 backdrop-blur-sm px-6 py-2 rounded-full shadow-sm mb-4">
                            <Sparkles className="h-6 w-6 text-blue-600 mr-2"/>
                            <span className="font-medium text-blue-600">Gestion syndicale</span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-800 to-indigo-800 bg-clip-text text-transparent">
                            Mes Syndicats
                            <div
                                className="mt-4 w-16 h-1.5 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full mx-auto"></div>
                        </h1>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                            Votre hub central pour gérer toutes vos affiliations syndicales en un seul endroit
                        </p>
                    </div>
                </motion.header>

                {/* Section de recherche améliorée */}
                <motion.div
                    className="mb-16 max-w-4xl mx-auto"
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                >
                    <div className="relative group">
                        <input
                            type="text"
                            placeholder="Rechercher un syndicat..."
                            className="w-full pl-16 pr-6 py-4 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 text-lg placeholder-gray-400 shadow-lg"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Search
                            className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 h-6 w-6 group-hover:text-blue-500 transition-colors"/>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-2">
                            <motion.button
                                whileHover={{scale: 1.05}}
                                className="px-4 py-2 bg-white border-2 border-gray-200 rounded-xl hover:border-blue-500 transition-colors flex items-center"
                            >
                                <Filter className="h-5 w-5 mr-2 text-gray-500"/>
                                <span className="font-medium">Filtrer</span>
                            </motion.button>
                        </div>
                    </div>

                    {getSuggestionMessage() && (
                        <motion.div
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            className="mt-4 flex items-center bg-blue-100 text-blue-800 px-4 py-3 rounded-xl border border-blue-200"
                        >
                            <AlertCircle className="h-5 w-5 mr-3 flex-shrink-0"/>
                            <span className="text-sm leading-tight">{getSuggestionMessage()}</span>
                        </motion.div>
                    )}
                </motion.div>

                {/* Grille de syndicats premium */}
                <motion.div
                    className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {filteredSyndicats.map((syndicat) => (
                        <motion.div
                            key={syndicat.id}
                            className="group bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden"
                            variants={itemVariants}
                            whileHover={{y: -8}}
                        >
                            <div className="relative aspect-video">
                                <img
                                    src={syndicat.image}
                                    alt={syndicat.name}
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    loading="lazy"
                                />
                                <div
                                    className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                                    <div className="flex justify-between items-end">
                                    <span
                                        className="text-sm font-semibold text-white bg-blue-600/90 rounded-lg px-3 py-1.5">
                                        {syndicat.type}
                                    </span>
                                        <div className="flex items-center space-x-2">
                                        <span className="text-xs text-white bg-black/30 px-2 py-1 rounded-full">
                                            {syndicat.location}
                                        </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 space-y-4">
                                <h2 className="text-xl font-bold text-gray-900 line-clamp-2 leading-snug">
                                    {syndicat.name}
                                </h2>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <Users className="h-5 w-5 text-blue-500"/>
                                        <span className="text-sm font-medium">
                                        {syndicat.members.toLocaleString()} membres
                                    </span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        {syndicat.trend === "up" && (
                                            <TrendingUp className="h-5 w-5 text-green-500 animate-pulse"/>
                                        )}
                                        {syndicat.trend === "down" && (
                                            <TrendingUp className="h-5 w-5 text-red-500 rotate-180"/>
                                        )}
                                        {syndicat.trend === "stable" && (
                                            <BarChart2 className="h-5 w-5 text-gray-400"/>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-3 text-sm">
                                    <div className="flex items-center justify-between text-gray-600">
                                        <div className="flex items-center space-x-2">
                                            <Calendar className="h-4 w-4"/>
                                            <span>Prochain événement</span>
                                        </div>
                                        <span className="font-medium">
                                        {new Date().toLocaleDateString("fr-FR", {
                                            weekday: 'short',
                                            day: 'numeric',
                                            month: 'short'
                                        })}
                                    </span>
                                    </div>

                                    <div className="flex items-center justify-between text-gray-600">
                                        <div className="flex items-center space-x-2">
                                            <Bell className="h-4 w-4"/>
                                            <span>Notifications</span>
                                        </div>
                                        <span className="font-medium bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                                        {Math.floor(Math.random() * 10)} nouveaux
                                    </span>
                                    </div>
                                </div>
                            </div>

                            <div className="px-6 pb-6">
                                <motion.button
                                    className="w-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white py-3.5 rounded-xl hover:shadow-lg transition-all flex items-center justify-center font-semibold group"
                                    whileHover={{scale: 1.03}}
                                    whileTap={{scale: 0.98}}
                                    onClick={() => handleJoinSyndicat(syndicat)}
                                >
                                    <span>Accéder à l'espace</span>
                                    <ArrowRightCircle
                                        className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform"/>
                                </motion.button>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* État vide amélioré */}
                {filteredSyndicats.length === 0 && (
                    <motion.div
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        className="text-center py-20"
                    >
                        <div className="max-w-md mx-auto">
                            <div className="inline-block p-6 bg-blue-50 rounded-full mb-6">
                                <AlertCircle className="h-12 w-12 text-blue-600"/>
                            </div>
                            <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                                Aucun syndicat trouvé
                            </h3>
                            <p className="text-gray-600 mb-6">
                                Essayez d&#39;ajuster vos filtres ou créez un nouveau syndicat
                            </p>
                            <button
                                onClick={openBusinessActorForm}
                                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center mx-auto"
                            >
                                <PlusCircle className="h-5 w-5 mr-2"/>
                                Créer un syndicat
                            </button>
                        </div>
                    </motion.div>
                )}
            </div>

            {/* Modale améliorée */}
            <AnimatePresence>
                {isBusinessFormOpen && (
                    <motion.div
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    >
                        <motion.div
                            className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
                            initial={{scale: 0.95}}
                            animate={{scale: 1}}
                            exit={{scale: 0.95}}
                        >
                            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                                <h3 className="text-2xl font-semibold text-gray-900">
                                    Nouveau syndicat
                                </h3>
                                <button
                                    className="p-2 hover:bg-gray-50 rounded-full transition-colors"
                                    onClick={closeBusinessActorForm}
                                >
                                    <X className="h-6 w-6 text-gray-500"/>
                                </button>
                            </div>
                            <OrganisationForm/>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Loading state amélioré */}
            {loading && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
                    <div className="bg-white p-8 rounded-2xl shadow-xl flex flex-col items-center">
                        <div className="animate-spin mb-4">
                            <ArrowRightCircle className="h-12 w-12 text-blue-600"/>
                        </div>
                        <p className="text-lg font-semibold text-gray-900">
                            Connexion à l&#39;espace syndical...
                        </p>
                        <p className="text-sm text-gray-500 mt-2">
                            Veuillez patienter quelques instants
                        </p>
                    </div>
                </div>
            )}
        </div>
    )
}
