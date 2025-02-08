"use client"
import { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Users, Search, ChevronRight, UserPlus, X, MapPin, AlertCircle } from "lucide-react"
import { getUserIdFromToken } from "../../services/AccountService.js"
import { AdhereSyndicatForm } from "./AdhesionForm/AdhesionForm.jsx"

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

export const Explorer = () => {
    const [searchTerm, setSearchTerm] = useState("")
    const [syndicats, setSyndicats] = useState([
        {
            id: 1,
            name: "Fédération des Transporteurs de l'Ouest Cameroun",
            type: "Régional",
            members: 9500,
            location: "Ouest Cameroun",
            image:
                "https://images.unsplash.com/photo-1594495894542-a46cc73e081a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        },
        {
            id: 2,
            name: "Syndicat des Conducteurs de Bus de Yaoundé",
            type: "Urbain",
            members: 6200,
            location: "Yaoundé",
            image:
                "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        },
        {
            id: 3,
            name: "Association des Transporteurs Maritimes du Littoral",
            type: "Maritime",
            members: 2800,
            location: "Littoral",
            image:
                "https://images.unsplash.com/photo-1577032229840-33197764440d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        },
        {
            id: 4,
            name: "Union des Chauffeurs de Camions du Nord",
            type: "Fret",
            members: 4100,
            location: "Nord",
            image:
                "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        },
        {
            id: 5,
            name: "Coopérative des Moto-taximen de Douala",
            type: "Moto-taxi",
            members: 15000,
            location: "Douala",
            image:
                "https://images.unsplash.com/photo-1582558720963-5b43f8b2e5af?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        },
        {
            id: 6,
            name: "Syndicat National des Transporteurs Aériens",
            type: "Aérien",
            members: 1800,
            location: "National",
            image:
                "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        },
    ])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [selectedSyndicat, setSelectedSyndicat] = useState(null)
    const [showAdhesionForm, setShowAdhesionForm] = useState(false)

    const userId = getUserIdFromToken()

    useEffect(() => {
        const fetchSyndicats = async () => {
            try {
                setLoading(true)
                setTimeout(() => {
                    setLoading(false)
                }, 1000)
            } catch (err) {
                setError("Erreur lors du chargement des syndicats.")
                setLoading(false)
            }
        }
        fetchSyndicats()
    }, [])

    const filteredSyndicats = useMemo(() => {
        return syndicats.filter((syndicat) => syndicat.name.toLowerCase().includes(searchTerm.toLowerCase()))
    }, [syndicats, searchTerm])

    const handleDemandeAdhesion = (syndicat) => {
        setSelectedSyndicat(syndicat)
        setShowAdhesionForm(true)
    }

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
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
                        Explorer les Syndicats
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Découvrez et rejoignez des syndicats correspondant à vos intérêts professionnels et géographiques
                    </p>
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

                {loading && <p className="text-center text-gray-500 text-xl">Chargement des syndicats...</p>}
                {error && <p className="text-center text-red-500 text-xl">{error}</p>}

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
                                <h2 className="text-2xl font-semibold text-gray-800 mb-3 line-clamp-2">{syndicat.name}</h2>
                                <div className="flex items-center text-gray-600 mb-3">
                                    <Users className="h-5 w-5 mr-2 text-blue-500" />
                                    <span className="text-sm">{syndicat.members.toLocaleString()} membres</span>
                                </div>
                                <div className="flex items-center text-gray-600 mb-4">
                                    <MapPin className="h-5 w-5 mr-2 text-blue-500" />
                                    <span className="text-sm">{syndicat.location}</span>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-6 py-4 space-y-3">
                                <motion.button
                                    className="w-full bg-blue-500 text-white py-2 rounded-md flex items-center justify-center transition duration-300 hover:bg-blue-600"
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    Voir les détails
                                    <ChevronRight className="ml-2 h-4 w-4" />
                                </motion.button>
                                <motion.button
                                    className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-md flex items-center justify-center transition duration-300"
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => handleDemandeAdhesion(syndicat)}
                                >
                                    Demander l'adhésion
                                    <UserPlus className="ml-2 h-4 w-4" />
                                </motion.button>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            <AnimatePresence>
                {showAdhesionForm && (
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
                                    className="absolute top-4 right-4 z-10 text-gray-500 hover:text-gray-700 transition-colors"
                                    onClick={() => setShowAdhesionForm(false)}
                                >
                                    <X className="h-6 w-6" />
                                </button>
                                <AdhereSyndicatForm syndicat={selectedSyndicat} />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

