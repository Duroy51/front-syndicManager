import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Filter, Building } from "lucide-react"
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

// Données simulées pour les syndicats et les recherches populaires
const allSyndicats = [
    { id: 1, name: "Syndicat National de l'Éducation", members: 250000, category: "Éducation", image: "/images/education.jpeg" },
    { id: 2, name: "Union des Travailleurs de la Santé", members: 180000, category: "Santé", image: "/images/sante.jpg" },
    { id: 3, name: "Fédération des Employés du Commerce", members: 150000, category: "Commerce", image: "/images/commerce.jpeg" },
    { id: 4, name: "Syndicat des Transports Publics", members: 120000, category: "Transport", image: "/images/transport.jpeg" },
    { id: 5, name: "Association des Ingénieurs", members: 90000, category: "Ingénierie", image: "/images/ingenierie.jpg" },
]

const popularSearches = ["Éducation", "Santé", "Transport", "Commerce", "Industrie"]

export default function SearchInterface({ isOpen, onClose }) {
    const [searchTerm, setSearchTerm] = useState("")
    const [filteredSyndicats, setFilteredSyndicats] = useState([])
    const [selectedCategory, setSelectedCategory] = useState("Tous")
    const [hasSearched, setHasSearched] = useState(false)
    const navigate = useNavigate();
    const handleSearch = useCallback(() => {
        const filtered = allSyndicats.filter(
            (syndicat) =>
                syndicat.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
                (selectedCategory === "Tous" || syndicat.category === selectedCategory),
        )
        setFilteredSyndicats(filtered)
        setHasSearched(true)
    }, [searchTerm, selectedCategory])
    useEffect(() => {
        handleSearch();
    }, [selectedCategory]);

    const categories = ["Tous", ...new Set(allSyndicats.map((s) => s.category))]

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-gray-800 bg-opacity-75 z-50 flex justify-center items-start pt-20 px-4"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -50, opacity: 0 }}
                        className="bg-white rounded-lg shadow-2xl w-full max-w-4xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-6">
                            <div className="flex items-center mb-6">
                                <input
                                    type="text"
                                    placeholder="Rechercher un syndicat..."
                                    className="flex-grow text-lg focus:outline-none border-b-2 border-blue-500 pb-2"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    autoFocus
                                />
                                <button
                                    onClick={handleSearch}
                                    className="ml-4 bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition duration-300"
                                >
                                    Rechercher
                                </button>
                                <button onClick={onClose} className="ml-4 text-gray-400 hover:text-gray-600">
                                    <X className="h-6 w-6" />
                                </button>
                            </div>

                            <div className="mb-6">
                                <h3 className="text-sm font-semibold text-gray-500 mb-2 flex items-center">
                                    <Filter className="h-4 w-4 mr-1" /> Filtrer par catégorie
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {categories.map((category) => (
                                        <button
                                            key={category}
                                            onClick={() => setSelectedCategory(category)}
                                            className={`px-3 py-1 rounded-full text-sm ${
                                                selectedCategory === category
                                                    ? "bg-blue-600 text-white"
                                                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                            } transition duration-300`}
                                        >
                                            {category}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {hasSearched && (
                                <div className="max-h-80 overflow-y-auto">
                                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Résultats de la recherche</h3>
                                    {filteredSyndicats.length > 0 ? (
                                        <ul className="space-y-4">
                                            {filteredSyndicats.map((syndicat) => (
                                                <motion.li
                                                    key={syndicat.id}
                                                    className="flex items-center p-4 bg-gray-50 hover:bg-blue-100 rounded-lg transition duration-300 ease-in-out cursor-pointer"
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                    onClick={() => navigate('/profile')}
                                                >
                                                    <img src={syndicat.image} alt={syndicat.name} className="h-10 w-10 rounded-full mr-4" />
                                                    <div>
                                                        <h4 className="text-lg font-semibold text-gray-800">{syndicat.name}</h4>
                                                        <p className="text-sm text-gray-500">
                                                            {syndicat.members.toLocaleString()} membres • {syndicat.category}
                                                        </p>
                                                    </div>
                                                </motion.li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-gray-500 text-center py-4">Aucun résultat trouvé pour "{searchTerm}"</p>
                                    )}
                                </div>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
