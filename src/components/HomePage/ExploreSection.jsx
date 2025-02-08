"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    Users,
    Search,
    ChevronRight,
    UserPlus,
    X,
} from "lucide-react"
import { getUserIdFromToken } from "../../services/AccountService.js"
import { AdhereSyndicatForm } from "./AdhesionForm/AdhesionForm.jsx"  // Import du formulaire

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
            image:
                "https://images.unsplash.com/photo-1594495894542-a46cc73e081a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        },
        {
            id: 2,
            name: "Syndicat des Conducteurs de Bus de Yaoundé",
            type: "Urbain",
            members: 6200,
            image:
                "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        },
        {
            id: 3,
            name: "Association des Transporteurs Maritimes du Littoral",
            type: "Maritime",
            members: 2800,
            image:
                "https://images.unsplash.com/photo-1577032229840-33197764440d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        },
        {
            id: 4,
            name: "Union des Chauffeurs de Camions du Nord",
            type: "Fret",
            members: 4100,
            image:
                "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        },
        {
            id: 5,
            name: "Coopérative des Moto-taximen de Douala",
            type: "Moto-taxi",
            members: 15000,
            image:
                "https://images.unsplash.com/photo-1582558720963-5b43f8b2e5af?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        },
        {
            id: 6,
            name: "Syndicat National des Transporteurs Aériens",
            type: "Aérien",
            members: 1800,
            image:
                "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        },
    ])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    // Récupération de l'ID utilisateur (à adapter)
    const userId = getUserIdFromToken()

    useEffect(() => {
        const fetchSyndicats = async () => {
            try {
                setLoading(true)
                // Simulation d'une requête API
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

    const filteredSyndicats = syndicats.filter((syndicat) =>
        syndicat.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    // États pour gérer l'affichage du formulaire d'adhésion
    const [selectedSyndicat, setSelectedSyndicat] = useState(null)
    const [showAdhesionForm, setShowAdhesionForm] = useState(false)

    // Au clic sur "Demander l'adhésion", on mémorise le syndicat et on affiche la modale
    const handleDemandeAdhesion = (syndicat) => {
        setSelectedSyndicat(syndicat)
        setShowAdhesionForm(true)
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            {/*<div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-8">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold mb-2">Explorer les Syndicats</h1>
                    <p className="text-xl opacity-90">
                        Découvrez et rejoignez des syndicats correspondant à vos intérêts
                    </p>
                </div>
            </div>*/}
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
                Explorer les Syndicats
            </h1>
            <p className="text-xl opacity-90">
                Découvrez et rejoignez des syndicats correspondant à vos intérêts
            </p>

            <div className="container mx-auto px-4 py-8">
                <motion.div
                    className="mb-8 flex flex-col md:flex-row justify-between items-center"
                    initial={{opacity: 0, y: -20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.5}}
                >
                    <div className="relative w-full md:w-96 mb-4 md:mb-0">
                        <input
                            type="text"
                            placeholder="Rechercher un syndicat..."
                            className="w-full pl-10 pr-4 py-2 rounded-full border-2 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-300"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"/>
                    </div>
                </motion.div>

                {loading && (
                    <p className="text-center text-gray-500">Chargement des syndicats...</p>
                )}
                {error && <p className="text-center text-red-500">{error}</p>}

                <motion.div
                    className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {filteredSyndicats.map((syndicat) => (
                        <motion.div
                            key={syndicat.id}
                            className="bg-white rounded-lg shadow-lg overflow-hidden border-t-4 border-blue-500 hover:shadow-xl transition duration-300"
                            variants={itemVariants}
                            whileHover={{y: -5}}
                        >
                            <img
                                src={syndicat.image || "/placeholder.svg"}
                                alt={syndicat.name}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <h2 className="text-xl font-semibold text-gray-800">
                                        {syndicat.name}
                                    </h2>
                                    <span className="text-sm font-medium text-white bg-blue-500 rounded-full px-3 py-1">
                    {syndicat.type}
                  </span>
                                </div>
                                <div className="flex items-center text-gray-600 mb-4">
                                    <Users className="h-5 w-5 mr-2 text-blue-500"/>
                                    <span className="text-sm text-gray-500">
                    {syndicat.members.toLocaleString()} membres
                  </span>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-6 py-4 space-y-3">
                                <motion.button
                                    className="w-full bg-blue-500 text-white py-2 rounded-md flex items-center justify-center transition duration-300 hover:bg-blue-600"
                                    whileHover={{scale: 1.03}}
                                    whileTap={{scale: 0.98}}
                                >
                                    Voir les détails
                                    <ChevronRight className="ml-2 h-4 w-4"/>
                                </motion.button>
                                <motion.button
                                    className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-md flex items-center justify-center transition duration-300"
                                    whileHover={{scale: 1.03}}
                                    whileTap={{scale: 0.98}}
                                    onClick={() => handleDemandeAdhesion(syndicat)}
                                >
                                    Demander l'adhésion
                                    <UserPlus className="ml-2 h-4 w-4"/>
                                </motion.button>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Modal contenant le formulaire d'adhésion */}
            <AnimatePresence>
                {showAdhesionForm && (
                    <motion.div
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 overflow-y-auto"
                    >
                        <motion.div
                            className="w-full max-w-4xl p-4 mx-4 sm:mx-6 md:mx-8 lg:mx-auto max-h-[80vh] overflow-y-auto"
                            initial={{scale: 0.8}}
                            animate={{scale: 1}}
                            exit={{scale: 0.8}}
                        >
                            <div className="relative bg-white rounded-lg shadow-lg">
                                <button
                                    className="absolute top-2 right-2 z-10"
                                    onClick={() => setShowAdhesionForm(false)}
                                >
                                    <X className="h-6 w-6 text-gray-500"/>
                                </button>
                                {/* Affichage du formulaire d'adhésion */}
                                <AdhereSyndicatForm syndicat={selectedSyndicat}/>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    )
}
