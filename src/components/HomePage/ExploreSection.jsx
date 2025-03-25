"use client"
import { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Users, Search, ChevronRight, UserPlus, X, MapPin, AlertCircle, ChevronLeft, Sparkles, ShieldCheck, Star } from "lucide-react"
import { getUserIdFromToken } from "../../services/AccountService.js"
import { AdhereSyndicatForm } from "./AdhesionForm/AdhesionForm.jsx"
import { SyndicatProfile } from "../ProfilPage/ProfilPage.jsx"
import {ExploreCard} from "./ExploreSection/ExploreCard.jsx";
import {exploresyndicat} from "../../fakeData/exploreSyndicatFake.js";

import { useTranslation } from 'react-i18next';


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
    const [syndicats, setSyndicats] = useState(exploresyndicat)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [selectedSyndicat, setSelectedSyndicat] = useState(null)
    const [showAdhesionForm, setShowAdhesionForm] = useState(false)
    const [viewingSyndicatProfile, setViewingSyndicatProfile] = useState(false)
    const { t } = useTranslation(); // Récupération de la fonction de traduction

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

    const handleSyndicatClick = (syndicat) => {
        setSelectedSyndicat(syndicat)
        setViewingSyndicatProfile(true)
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
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 py-12">
            {viewingSyndicatProfile ? (
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <button
                        className="mb-6 flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors group"
                        onClick={() => setViewingSyndicatProfile(false)}
                    >
                        <ChevronLeft className="h-6 w-6 transition-transform group-hover:-translate-x-1" />
                        <span className="text-lg font-medium">{t("retour_exploration")}</span>
                    </button>
                    <SyndicatProfile syndicat={selectedSyndicat} />
                </div>
            ) : (
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.header
                        initial={{opacity: 0, y: -20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.6}}
                        className="text-center mb-16 relative"
                    >
                        <div className="max-w-4xl mx-auto relative">
                            <div
                                className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-blue-100 rounded-full blur-3xl opacity-30"></div>
                            <h1 className="text-4xl sm:text-5xl font-bold mb-6 relative z-10">
                            <span
                                className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                {t("explorer_syndicats")}s
                            </span>
                                <div
                                    className="mt-2 w-24 h-1 bg-gradient-to-r from-blue-400 to-indigo-400 mx-auto rounded-full"></div>
                            </h1>
                            <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
                                {t("trouver_communautes")}
                                <span className="block mt-2 text-blue-600 flex items-center justify-center">
                                <Sparkles className="h-5 w-5 mr-2"/>
                                {t("plus_syndicats")}
                            </span>
                            </p>
                        </div>
                    </motion.header>
                    <motion.div
                        className="mb-16 max-w-3xl mx-auto"
                        initial={{opacity: 0, y: -10}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.6, delay: 0.3}}
                    >
                        <div className="relative">
                            <input
                                type="text"
                                placeholder={t("rechercher_syndicat")}
                                className="w-full pl-14 pr-6 py-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 text-lg placeholder-gray-400 shadow-sm"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 h-6 w-6"/>
                        </div>

                        {getSuggestionMessage() && (
                            <motion.div
                                initial={{opacity: 0}}
                                animate={{opacity: 1}}
                                className="mt-4 flex items-center bg-blue-100 text-blue-800 px-4 py-3 rounded-lg"
                            >
                                <AlertCircle className="h-5 w-5 mr-3 flex-shrink-0"/>
                                <span className="text-sm leading-tight">{getSuggestionMessage()}</span>
                            </motion.div>
                        )}
                    </motion.div>
                    {/* Syndicat suggéré */}
                    {filteredSyndicats.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-16"
                        >
                            <div className="flex items-center mb-6">
                                <h2 className="text-2xl font-semibold text-gray-900 mr-4">
                                    {t("syndicat_suggere")}
                                </h2>
                                <div className="flex-1 h-px bg-gradient-to-r from-blue-100 to-indigo-100"></div>
                            </div>

                            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                                <div className="flex flex-col md:flex-row">
                                    <div className="md:w-1/3 relative">
                                        <img
                                            src={filteredSyndicats[0].image}
                                            alt={filteredSyndicats[0].name}
                                            className="w-full h-64 object-cover"
                                        />
                                        <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-medium shadow-sm">
                                            {t("recommande")}
                                        </div>
                                    </div>
                                    <div className="md:w-2/3 p-8">
                                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                            {filteredSyndicats[0].name}
                                        </h3>
                                        <div className="grid grid-cols-2 gap-4 mb-6">
                                            <div className="flex items-center">
                                                <Users className="h-5 w-5 text-blue-600 mr-2" />
                                                <span>{filteredSyndicats[0].members.toLocaleString()} membres</span>
                                            </div>
                                            <div className="flex items-center">
                                                <MapPin className="h-5 w-5 text-blue-600 mr-2" />
                                                <span>{filteredSyndicats[0].location}</span>
                                            </div>
                                            <div className="flex items-center">
                                                <ShieldCheck className="h-5 w-5 text-blue-600 mr-2" />
                                                <span>{t("certifie_etat")}</span>
                                            </div>
                                            <div className="flex items-center">
                                                <Star className="h-5 w-5 text-blue-600 mr-2" />
                                                <span>4.8/5 (256 avis)</span>
                                            </div>
                                        </div>
                                        <div className="flex gap-4">
                                            <motion.button
                                                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                                                whileHover={{ scale: 1.05 }}
                                            >
                                                <UserPlus className="h-5 w-5 mr-2" />
                                               {t("adherer_maintenant")}
                                            </motion.button>
                                            <motion.button
                                                className="px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                                                whileHover={{ scale: 1.05 }}
                                            >
                                                {t("voir_details")}
                                            </motion.button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {loading && (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-pulse flex space-x-4">
                                <div className="rounded-full bg-blue-100 h-12 w-12"></div>
                            </div>
                        </div>
                    )}

                    {error && (
                        <div className="mx-auto max-w-md bg-red-50 text-red-700 p-6 rounded-xl text-center">
                            <AlertCircle className="h-6 w-6 mx-auto mb-3"/>
                            {error}
                        </div>
                    )}

                    <ExploreCard
                        listSyndicat = {filteredSyndicats}
                        containerVariants = {containerVariants}
                        itemVariants = {itemVariants}
                        details = {(syndicat) => handleSyndicatClick(syndicat)}
                        adherer = {(syndicat)=> handleDemandeAdhesion(syndicat)}
                        >
                    </ExploreCard>

                </div>
            )}

            <AnimatePresence>
                {showAdhesionForm && (
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
                                    Adhésion à {selectedSyndicat?.name}
                                </h3>
                                <button
                                    className="p-2 hover:bg-gray-50 rounded-full transition-colors"
                                    onClick={() => setShowAdhesionForm(false)}
                                >
                                    <X className="h-6 w-6 text-gray-500"/>
                                </button>
                            </div>
                            <AdhereSyndicatForm syndicat={selectedSyndicat}/>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

