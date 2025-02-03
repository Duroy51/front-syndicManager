import { useState } from "react"
import { motion } from "framer-motion"
import { Users, Search, ChevronRight, Plus, Calendar, MessageSquare, UserPlus, X } from "lucide-react"

// Mock data for demonstration
const mockSyndicats = [
    { id: 1, name: "Syndicat des Enseignants", members: 1250, type: "Éducation", trend: "up" },
    { id: 2, name: "Union des Travailleurs de la Santé", members: 3780, type: "Santé", trend: "down" },
    { id: 3, name: "Syndicat des Transports Publics", members: 2100, type: "Transport", trend: "stable" },
    { id: 4, name: "Association des Ingénieurs", members: 950, type: "Technologie", trend: "up" },
    { id: 5, name: "Syndicat de l'Industrie Alimentaire", members: 1800, type: "Industrie", trend: "up" },
]

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
}

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
    },
}

export const Explorer = () => {
    const [searchTerm, setSearchTerm] = useState("")
    const [membershipRequests, setMembershipRequests] = useState({})

    const filteredSyndicats = mockSyndicats.filter((syndicat) =>
        syndicat.name.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    const toggleMembershipRequest = (syndicatId) => {
        setMembershipRequests((prev) => ({
            ...prev,
            [syndicatId]: !prev[syndicatId],
        }))
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-8">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold mb-2">Explorer les Syndicats</h1>
                    <p className="text-xl opacity-90">Découvrez et rejoignez des syndicats correspondant à vos intérêts</p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <motion.div
                    className="mb-8 flex flex-col md:flex-row justify-between items-center"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="relative w-full md:w-96 mb-4 md:mb-0">
                        <input
                            type="text"
                            placeholder="Rechercher un syndicat..."
                            className="w-full pl-10 pr-4 py-2 rounded-full border-2 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-300"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                    <motion.button
                        className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-2 rounded-full flex items-center transition duration-300 hover:from-green-600 hover:to-blue-600 transform hover:scale-105"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Plus className="mr-2" />
                        Créer un nouveau syndicat
                    </motion.button>
                </motion.div>

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
                            whileHover={{ y: -5 }}
                        >
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <h2 className="text-xl font-semibold text-gray-800">{syndicat.name}</h2>
                                    <span className="text-sm font-medium text-white bg-blue-500 rounded-full px-3 py-1">
                    {syndicat.type}
                  </span>
                                </div>
                                <div className="flex items-center text-gray-600 mb-4">
                                    <Users className="h-5 w-5 mr-2 text-blue-500" />
                                    <span>{syndicat.members} membres</span>
                                    {syndicat.trend === "up" && (
                                        <motion.div
                                            initial={{ y: 2 }}
                                            animate={{ y: -2 }}
                                            transition={{ yoyo: Number.POSITIVE_INFINITY, duration: 0.5 }}
                                            className="ml-2 text-green-500"
                                        >
                                            ↑
                                        </motion.div>
                                    )}
                                    {syndicat.trend === "down" && (
                                        <motion.div
                                            initial={{ y: -2 }}
                                            animate={{ y: 2 }}
                                            transition={{ yoyo: Number.POSITIVE_INFINITY, duration: 0.5 }}
                                            className="ml-2 text-red-500"
                                        >
                                            ↓
                                        </motion.div>
                                    )}
                                    {syndicat.trend === "stable" && <div className="ml-2 text-gray-500">→</div>}
                                </div>
                                <div className="flex justify-between items-center text-sm text-gray-500">
                                    <div className="flex items-center">
                                        <Calendar className="h-4 w-4 mr-1" />
                                        <span>Prochain événement: 15 juin</span>
                                    </div>
                                    <div className="flex items-center">
                                        <MessageSquare className="h-4 w-4 mr-1" />
                                        <span>3 nouveaux messages</span>
                                    </div>
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
                                    className={`w-full ${membershipRequests[syndicat.id] ? "bg-blue-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"} text-white py-2 rounded-md flex items-center justify-center transition duration-300`}
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => toggleMembershipRequest(syndicat.id)}
                                >
                                    {membershipRequests[syndicat.id] ? (
                                        <>
                                            Annuler la demande d&#39;adhésion
                                            <X className="ml-2 h-4 w-4" />
                                        </>
                                    ) : (
                                        <>
                                            Demander l&#39;adhésion
                                            <UserPlus className="ml-2 h-4 w-4" />
                                        </>
                                    )}
                                </motion.button>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    )
}

