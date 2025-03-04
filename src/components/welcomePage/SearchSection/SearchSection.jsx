import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Filter, Building, Search, Clock, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";
import SyndicatCard from "./SyndicatCard";

const allSyndicats = [
    { 
        id: 1, 
        name: "Syndicat National de l'Éducation", 
        members: 250000, 
        category: "Éducation",
        logo: "https://via.placeholder.com/50?text=SNE"
    },
    { 
        id: 2, 
        name: "Union des Travailleurs de la Santé", 
        members: 180000, 
        category: "Santé",
        logo: "https://via.placeholder.com/50?text=UTS"
    },
    { 
        id: 3, 
        name: "Fédération des Employés du Commerce", 
        members: 150000, 
        category: "Commerce",
        logo: "https://via.placeholder.com/50?text=FEC"
    },
    { 
        id: 4, 
        name: "Syndicat des Transports Publics", 
        members: 120000, 
        category: "Transport",
        logo: "https://via.placeholder.com/50?text=STP"
    },
    { 
        id: 5, 
        name: "Association des Ingénieurs", 
        members: 90000, 
        category: "Ingénierie",
        logo: "https://via.placeholder.com/50?text=ADI"
    },
];

const popularSearches = ["Éducation", "Santé", "Transport", "Commerce", "Industrie"];

// Nouvelles données pour les suggestions préalables
const trendingSearches = ["Syndicat National de l'Éducation", "Union des Travailleurs de la Santé", "Droits des salariés"];
const recentSearches = ["Fédération des Employés du Commerce", "Syndicat des Transports Publics"];
const suggestedCategories = ["Éducation", "Santé", "Transport", "Commerce", "Ingénierie"];

export default function SearchInterface({ isOpen, onClose }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredSyndicats, setFilteredSyndicats] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("Tous");
    const [hasSearched, setHasSearched] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [highlightedSuggestion, setHighlightedSuggestion] = useState(-1);
    const [displayMode, setDisplayMode] = useState("list"); // "list" ou "grid"
    const navigate = useNavigate();
    const inputRef = useRef(null);
    const suggestionsRef = useRef(null);

    // Nouvel état pour les suggestions préalables
    const [showPreSuggestions, setShowPreSuggestions] = useState(true);

    const handleSearch = useCallback(() => {
        setIsLoading(true);
        setTimeout(() => {
            const filtered = allSyndicats.filter(
                (syndicat) =>
                    syndicat.name.toLowerCase().includes(searchTerm.toLowerCase().trim()) &&
                    (selectedCategory === "Tous" || syndicat.category === selectedCategory),
            );
            setFilteredSyndicats(filtered);
            setHasSearched(true);
            setIsLoading(false);
            setShowSuggestions(false);
            setShowPreSuggestions(false);
        }, 1000);
    }, [searchTerm, selectedCategory]);

    const updateSuggestions = useCallback(() => {
        if (searchTerm.trim().length > 1) {
            const matchingSyndicats = allSyndicats
                .filter(syndicat => 
                    syndicat.name.toLowerCase().includes(searchTerm.toLowerCase().trim()) &&
                    (selectedCategory === "Tous" || syndicat.category === selectedCategory)
                )
                .slice(0, 5);
            setSuggestions(matchingSyndicats);
            setShowSuggestions(matchingSyndicats.length > 0);
            setShowPreSuggestions(false);
            setHighlightedSuggestion(-1);
        } else if (searchTerm.trim().length === 0) {
            setSuggestions([]);
            setShowSuggestions(false);
            setShowPreSuggestions(true);
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
            setShowPreSuggestions(false);
        }
    }, [searchTerm, selectedCategory]);

    const debouncedUpdateSuggestions = useCallback(debounce(updateSuggestions, 200), [updateSuggestions]);

    const debouncedSearch = useCallback(debounce(handleSearch, 300), [handleSearch]);

    const handleClearSearch = () => {
        setSearchTerm("");
        setFilteredSyndicats([]);
        setHasSearched(false);
        setSuggestions([]);
        setShowSuggestions(false);
        setShowPreSuggestions(true);
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    const handleSelectSuggestion = (suggestion) => {
        setSearchTerm(suggestion.name || suggestion);
        setSuggestions([]);
        setShowSuggestions(false);
        setShowPreSuggestions(false);
        setTimeout(() => handleSearch(), 100);
    };

    useEffect(() => {
        if (searchTerm.trim()) {
            debouncedUpdateSuggestions();
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
            setShowPreSuggestions(true);
        }
    }, [searchTerm, debouncedUpdateSuggestions]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                if (showSuggestions || showPreSuggestions) {
                    setShowSuggestions(false);
                    setShowPreSuggestions(false);
                } else {
                    onClose();
                }
            } else if (e.key === "Enter") {
                if (showSuggestions && highlightedSuggestion >= 0) {
                    handleSelectSuggestion(suggestions[highlightedSuggestion]);
                } else {
                    handleSearch();
                }
            } else if (e.key === "ArrowDown" && showSuggestions) {
                e.preventDefault();
                setHighlightedSuggestion(prev => 
                    prev < suggestions.length - 1 ? prev + 1 : prev
                );
            } else if (e.key === "ArrowUp" && showSuggestions) {
                e.preventDefault();
                setHighlightedSuggestion(prev => 
                    prev > 0 ? prev - 1 : -1
                );
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [onClose, handleSearch, showSuggestions, showPreSuggestions, suggestions, highlightedSuggestion]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (suggestionsRef.current && !suggestionsRef.current.contains(event.target) && 
                inputRef.current && !inputRef.current.contains(event.target)) {
                setShowSuggestions(false);
                setShowPreSuggestions(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const categories = ["Tous", ...new Set(allSyndicats.map((s) => s.category))];

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
                            <div className="flex items-center mb-6 relative">
                                <div className="relative flex-grow">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <Search className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        placeholder="Rechercher un syndicat..."
                                        className="w-full text-lg focus:outline-none border-b-2 border-blue-500 pb-2 pl-10"
                                        value={searchTerm}
                                        onChange={(e) => {
                                            setSearchTerm(e.target.value);
                                            setHasSearched(false);
                                        }}
                                        onFocus={() => {
                                            if (searchTerm.trim().length > 1) {
                                                setShowSuggestions(suggestions.length > 0);
                                                setShowPreSuggestions(false);
                                            } else if (searchTerm.trim().length === 0) {
                                                setShowPreSuggestions(true);
                                                setShowSuggestions(false);
                                            }
                                        }}
                                        autoFocus
                                    />
                                    
                                    <AnimatePresence>
                                        {showSuggestions && (
                                            <motion.div
                                                ref={suggestionsRef}
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                className="absolute left-0 right-0 mt-1 bg-white rounded-md shadow-lg z-10 border border-gray-200"
                                            >
                                                <ul className="py-1">
                                                    {suggestions.map((suggestion, index) => (
                                                        <li
                                                            key={suggestion.id}
                                                            className={`px-4 py-2 cursor-pointer flex items-center ${
                                                                index === highlightedSuggestion ? "bg-blue-100" : "hover:bg-gray-100"
                                                            }`}
                                                            onClick={() => handleSelectSuggestion(suggestion)}
                                                            onMouseEnter={() => setHighlightedSuggestion(index)}
                                                        >
                                                            <div className="w-8 h-8 mr-3 flex-shrink-0 rounded-full overflow-hidden">
                                                                <img 
                                                                    src={suggestion.logo} 
                                                                    alt={`Logo ${suggestion.name}`}
                                                                    className="w-full h-full object-cover"
                                                                />
                                                            </div>
                                                            <div>
                                                                <span className="font-medium">{suggestion.name}</span>
                                                                <span className="text-sm text-gray-500 ml-2">({suggestion.category})</span>
                                                            </div>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </motion.div>
                                        )}

                                        {/* Nouvelles suggestions préalables */}
                                        {showPreSuggestions && !hasSearched && (
                                            <motion.div
                                                ref={suggestionsRef}
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                className="absolute left-0 right-0 mt-1 bg-white rounded-md shadow-lg z-10 border border-gray-200"
                                            >
                                                <div className="p-4">
                                                    <div className="mb-4">
                                                        <h3 className="text-sm font-semibold text-gray-500 mb-2 flex items-center">
                                                            <TrendingUp className="h-4 w-4 mr-1" /> Tendances
                                                        </h3>
                                                        <ul className="space-y-2">
                                                            {trendingSearches.map((search, index) => (
                                                                <li 
                                                                    key={index}
                                                                    className="flex items-center cursor-pointer hover:bg-gray-100 p-2 rounded"
                                                                    onClick={() => handleSelectSuggestion(search)}
                                                                >
                                                                    <span className="w-6 h-6 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full mr-2 text-xs font-medium">
                                                                        {index + 1}
                                                                    </span>
                                                                    <span>{search}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>

                                                    <div className="mb-4">
                                                        <h3 className="text-sm font-semibold text-gray-500 mb-2 flex items-center">
                                                            <Clock className="h-4 w-4 mr-1" /> Recherches récentes
                                                        </h3>
                                                        <ul className="space-y-2">
                                                            {recentSearches.map((search, index) => (
                                                                <li 
                                                                    key={index}
                                                                    className="flex items-center cursor-pointer hover:bg-gray-100 p-2 rounded"
                                                                    onClick={() => handleSelectSuggestion(search)}
                                                                >
                                                                    <Clock className="h-4 w-4 mr-2 text-gray-400" />
                                                                    <span>{search}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>

                                                    <div>
                                                        <h3 className="text-sm font-semibold text-gray-500 mb-2 flex items-center">
                                                            <Building className="h-4 w-4 mr-1" /> Catégories suggérées
                                                        </h3>
                                                        <div className="flex flex-wrap gap-2">
                                                            {suggestedCategories.map((category, index) => (
                                                                <button
                                                                    key={index}
                                                                    onClick={() => {
                                                                        setSelectedCategory(category);
                                                                        setSearchTerm(category);
                                                                        handleSearch();
                                                                    }}
                                                                    className="px-3 py-1 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition duration-300"
                                                                >
                                                                    {category}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                                
                                {searchTerm && (
                                    <button
                                        onClick={handleClearSearch}
                                        className="ml-2 text-gray-400 hover:text-gray-600"
                                        aria-label="Effacer la recherche"
                                    >
                                        <X className="h-5 w-5" />
                                    </button>
                                )}
                                <button
                                    onClick={handleSearch}
                                    className="ml-4 bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition duration-300"
                                >
                                    Rechercher
                                </button>
                                <button onClick={onClose} className="ml-4 text-gray-400 hover:text-gray-600" aria-label="Fermer la recherche">
                                    <X className="h-6 w-6" />
                                </button>
                            </div>

                            <div className="mb-6">
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="text-sm font-semibold text-gray-500 flex items-center">
                                        <Filter className="h-4 w-4 mr-1" /> Filtrer par catégorie
                                    </h3>
                                    <div className="flex space-x-2">
                                        <button 
                                            onClick={() => setDisplayMode("list")}
                                            className={`p-1 rounded ${displayMode === "list" ? "bg-blue-100 text-blue-600" : "text-gray-400"}`}
                                            aria-label="Affichage en liste"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                            </svg>
                                        </button>
                                        <button 
                                            onClick={() => setDisplayMode("grid")}
                                            className={`p-1 rounded ${displayMode === "grid" ? "bg-blue-100 text-blue-600" : "text-gray-400"}`}
                                            aria-label="Affichage en grille"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {categories.map((category) => (
                                        <button
                                            key={category}
                                            onClick={() => {
                                                setSelectedCategory(category);
                                                if (searchTerm.trim()) {
                                                    updateSuggestions();
                                                }
                                            }}
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

                            {!hasSearched && !showSuggestions && !showPreSuggestions && (
                                <div className="mb-6">
                                    <h3 className="text-sm font-semibold text-gray-500 mb-2">Recherches populaires</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {popularSearches.map((search) => (
                                            <button
                                                key={search}
                                                onClick={() => {
                                                    setSearchTerm(search);
                                                    handleSearch();
                                                }}
                                                className="px-3 py-1 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition duration-300"
                                            >
                                                {search}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {isLoading ? (
                                <div className="text-gray-500 text-center py-8">
                                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600 mb-2"></div>
                                    <p>Chargement des résultats...</p>
                                </div>
                            ) : hasSearched ? (
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Résultats de la recherche</h3>
                                    {filteredSyndicats.length > 0 ? (
                                        displayMode === "list" ? (
                                            <ul className="space-y-4">
                                                {filteredSyndicats.map((syndicat) => (
                                                    <motion.li
                                                        key={syndicat.id}
                                                        className="flex items-center p-4 bg-gray-50 hover:bg-blue-100 rounded-lg transition duration-300 ease-in-out cursor-pointer"
                                                        initial={{ opacity: 0, y: 20 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, y: -20 }}
                                                        transition={{ duration: 0.3 }}
                                                        onClick={() => navigate(`/syndicat/${syndicat.id}`)}
                                                    >
                                                        <div className="w-16 h-16 rounded-full overflow-hidden mr-4 flex-shrink-0 border-2 border-blue-100">
                                                            <img 
                                                                src={syndicat.logo} 
                                                                alt={`Logo ${syndicat.name}`}
                                                                className="w-full h-full object-cover"
                                                            />
                                                        </div>
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
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {filteredSyndicats.map((syndicat) => (
                                                    <motion.div
                                                        key={syndicat.id}
                                                        initial={{ opacity: 0, y: 20 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, y: -20 }}
                                                        transition={{ duration: 0.3 }}
                                                    >
                                                        <SyndicatCard syndicat={syndicat} />
                                                    </motion.div>
                                                ))}
                                            </div>
                                        )
                                    ) : (
                                        <p className="text-gray-500 text-center py-4">Aucun résultat trouvé pour "{searchTerm}"</p>
                                    )}
                                </div>
                            ) : null}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}