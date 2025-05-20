"use client"
import { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Users, Search, ChevronRight, UserPlus, X, MapPin, AlertCircle, ChevronLeft, Sparkles, ShieldCheck, Star, RefreshCcw } from "lucide-react"
import { getUserIdFromToken } from "../../services/AccountService.js"
import { AdhereSyndicatForm } from "./AdhesionForm/AdhesionForm.jsx"
import { SyndicatProfile } from "../ProfilPage/ProfilPage.jsx"
import { ExploreCard } from "./ExploreSection/ExploreCard.jsx"
import { SyndicatDefaultAvatar } from "./localcomponent/SyndicatDefaultAvatar.jsx"
import axios from "axios"
import { useTranslation } from 'react-i18next'
import { Notification } from "../../globalComponent/Notification.jsx"

// URL de l'API
const API_URL = "/api/organization-service/organizations"

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

// Fonction pour générer des données aléatoires pour les informations manquantes
const generateRandomData = (syndicat) => {
    const cities = ["Yaoundé", "Douala", "Bafoussam", "Garoua", "Bamenda", "Maroua", "Limbé", "Ngaoundéré", "Kumba", "Buea"];
    const members = Math.floor(Math.random() * 9000) + 1000; // Entre 1000 et 10000
    const city = cities[Math.floor(Math.random() * cities.length)];

    return {
        city,
        members
    };
}

export const Explorer = () => {
    const [searchTerm, setSearchTerm] = useState("")
    const [syndicats, setSyndicats] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [selectedSyndicat, setSelectedSyndicat] = useState(null)
    const [showAdhesionForm, setShowAdhesionForm] = useState(false)
    const [viewingSyndicatProfile, setViewingSyndicatProfile] = useState(false)
    const [refreshing, setRefreshing] = useState(false)
    const { t } = useTranslation(); // Récupération de la fonction de traduction

    // État pour gérer les notifications
    const [notification, setNotification] = useState({
        isVisible: false,
        message: "",
        type: "info"
    });

    const userId = getUserIdFromToken()

    // Fonction pour afficher une notification
    const showNotification = (message, type = "info") => {
        setNotification({
            isVisible: true,
            message,
            type
        });
    };

    // Fonction pour fermer la notification
    const closeNotification = () => {
        setNotification(prev => ({
            ...prev,
            isVisible: false
        }));
    };

    useEffect(() => {
        const fetchSyndicats = async () => {
            try {
                setLoading(true)
                setError(null)

                const response = await axios.get(API_URL);

                // Transformer les données reçues pour correspondre au format attendu
                const transformedData = response.data.map(org => {
                    const randomData = generateRandomData(org);

                    return {
                        id: org.organization_id,
                        name: org.long_name,
                        shortName: org.short_name,
                        description: org.description,
                        // Utiliser logo_url s'il existe, sinon on utilisera l'image par défaut
                        image: org.logo_url || null,
                        email: org.email,
                        members: randomData.members,
                        location: randomData.city,
                        website: org.website_url || "",
                        socialNetwork: org.social_network || "",
                        business_domains: org.business_domains || [],
                        type: org.type,
                        businessRegistrationNumber: org.business_registration_number,
                        taxNumber: org.tax_number,
                        ceoName: org.ceo_name,
                        yearFounded: new Date(org.year_founded).getFullYear(),
                        status: org.status,
                        rawData: org // Garder les données brutes pour référence
                    };
                });

                setSyndicats(transformedData);
                setLoading(false);

                if (refreshing) {
                    showNotification("Liste des syndicats mise à jour avec succès", "success");
                    setRefreshing(false);
                }
            } catch (err) {
                console.error("Erreur lors du chargement des syndicats:", err);
                setError("Erreur lors du chargement des syndicats. Veuillez réessayer plus tard.");
                setLoading(false);
                setRefreshing(false);

                // Afficher une notification d'erreur
                showNotification("Impossible de charger les syndicats. Veuillez réessayer.", "error");
            }
        }

        fetchSyndicats();
    }, [refreshing])

    const filteredSyndicats = useMemo(() => {
        return syndicats.filter((syndicat) =>
            syndicat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            syndicat.shortName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (syndicat.description && syndicat.description.toLowerCase().includes(searchTerm.toLowerCase()))
        );
    }, [syndicats, searchTerm])

    const handleDemandeAdhesion = (syndicat) => {
        setSelectedSyndicat(syndicat)
        setShowAdhesionForm(true)
    }

    const handleSyndicatClick = (syndicat) => {
        setSelectedSyndicat(syndicat)
        setViewingSyndicatProfile(true)
    }

    const handleRefresh = () => {
        setRefreshing(true);
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
            {/* Composant de notification */}
            <Notification
                message={notification.message}
                type={notification.type}
                isVisible={notification.isVisible}
                onClose={closeNotification}
                autoClose={true}
                duration={5000}
            />

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
                                {t("explorer_syndicats")}
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

                        <div className="flex items-center justify-between mt-3">
                            {getSuggestionMessage() && (
                                <motion.div
                                    initial={{opacity: 0}}
                                    animate={{opacity: 1}}
                                    className="flex items-center bg-blue-100 text-blue-800 px-4 py-3 rounded-lg"
                                >
                                    <AlertCircle className="h-5 w-5 mr-3 flex-shrink-0"/>
                                    <span className="text-sm leading-tight">{getSuggestionMessage()}</span>
                                </motion.div>
                            )}

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`ml-auto flex items-center gap-2 px-4 py-2 rounded-lg ${refreshing ? 'bg-gray-200 text-gray-500' : 'bg-blue-100 text-blue-600 hover:bg-blue-200'} transition-colors`}
                                onClick={handleRefresh}
                                disabled={refreshing || loading}
                            >
                                <RefreshCcw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
                                <span>{refreshing ? 'Actualisation...' : 'Actualiser'}</span>
                            </motion.button>
                        </div>
                    </motion.div>

                    {/* Syndicat suggéré - seulement si nous avons des résultats */}
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
                                        {filteredSyndicats[0].image ? (
                                            <img
                                                src={filteredSyndicats[0].image}
                                                alt={filteredSyndicats[0].name}
                                                className="w-full h-64 object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-64 flex items-center justify-center">
                                                <SyndicatDefaultAvatar
                                                    name={filteredSyndicats[0].name}
                                                    size={200}
                                                    className="mx-auto"
                                                />
                                            </div>
                                        )}
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
                                                onClick={() => handleDemandeAdhesion(filteredSyndicats[0])}
                                            >
                                                <UserPlus className="h-5 w-5 mr-2" />
                                                {t("adherer_maintenant")}
                                            </motion.button>
                                            <motion.button
                                                className="px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                                                whileHover={{ scale: 1.05 }}
                                                onClick={() => handleSyndicatClick(filteredSyndicats[0])}
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
                        <div className="flex flex-col justify-center items-center h-64">
                            <div className="animate-spin mb-4">
                                <RefreshCcw className="h-10 w-10 text-blue-600" />
                            </div>
                            <p className="text-gray-600">Chargement des syndicats...</p>
                        </div>
                    )}

                    {error && (
                        <div className="mx-auto max-w-md bg-red-50 text-red-700 p-6 rounded-xl text-center">
                            <AlertCircle className="h-6 w-6 mx-auto mb-3"/>
                            <p className="mb-4">{error}</p>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-colors"
                                onClick={handleRefresh}
                            >
                                Réessayer
                            </motion.button>
                        </div>
                    )}

                    {!loading && !error && filteredSyndicats.length > 0 && (
                        <ExploreCard
                            listSyndicat={filteredSyndicats}
                            containerVariants={containerVariants}
                            itemVariants={itemVariants}
                            details={(syndicat) => handleSyndicatClick(syndicat)}
                            adherer={(syndicat) => handleDemandeAdhesion(syndicat)}
                        />
                    )}

                    {!loading && !error && filteredSyndicats.length === 0 && (
                        <div className="mx-auto max-w-md bg-blue-50 text-blue-700 p-6 rounded-xl text-center">
                            <AlertCircle className="h-6 w-6 mx-auto mb-3"/>
                            Aucun syndicat trouvé. Veuillez modifier votre recherche ou essayer plus tard.
                        </div>
                    )}
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
                                    {t("adhesion_ad")} {selectedSyndicat?.name}
                                </h3>
                                <button
                                    className="p-2 hover:bg-gray-50 rounded-full transition-colors"
                                    onClick={() => setShowAdhesionForm(false)}
                                >
                                    <X className="h-6 w-6 text-gray-500"/>
                                </button>
                            </div>
                            <AdhereSyndicatForm
                                syndicat={selectedSyndicat}
                                onSuccess={() => {
                                    setShowAdhesionForm(false);
                                    showNotification("Demande d'adhésion envoyée avec succès!", "success");
                                }}
                                onError={(msg) => {
                                    showNotification(msg || "Erreur lors de l'envoi de la demande d'adhésion", "error");
                                }}
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}