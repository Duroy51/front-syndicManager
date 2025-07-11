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
import {MySyndicatHeader} from "./MesSyndicatSection/Header.jsx";
import {SyndicatCard} from "./MesSyndicatSection/SyndicatCard.jsx";
import {fakeData} from "../../fakeData/mySyndicatFake.js";
import { useTranslation } from "react-i18next";
import i18n from '../../i18n.js';
import {Layout} from "../HomePage/localcomponent/Layout.jsx";

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


// ... autres imports ...

export const MesSyndicats = () => {
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = useState("");
    const [syndicats, setSyndicats] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isBusinessFormOpen, setIsBusinessFormOpen] = useState(false);
    const navigate = useNavigate();
    const UserId = getUserIdFromToken();

    useEffect(() => {
        setSyndicats(fakeData);
    }, []);

    const openBusinessActorForm = () => setIsBusinessFormOpen(true);
    const closeBusinessActorForm = () => setIsBusinessFormOpen(false);

    const handleJoinSyndicat = async (syndicat) => {
        setLoading(true);
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            const fakeResponse = {
                data: {
                    data: {
                        organisationToken: {
                            Bearer: `fake-organisation-token-${syndicat.id}`,
                        },
                        text: t("succèsTitre"),
                    },
                },
            };
            if (fakeResponse.data.data && fakeResponse.data.data.organisationToken) {
                localStorage.setItem("organisationToken", fakeResponse.data.data.organisationToken.Bearer);
                setLoading(false);
                navigate("/user/syndicat-app", { state: { bannerImage: syndicat.image, organisationName: syndicat.name } });
                Swal.fire({
                    title: t("succèsTitre"),
                    confirmButtonText: t("boutonConfirmer"),
                });
            } else {
                throw new Error("Token non reçu !");
            }
        } catch (error) {
            console.error("Erreur lors de la connexion au syndicat :", error);
            setLoading(false);
            await Swal.fire({
                icon: "error",
                title: t("erreurTitre"),
                text: t("erreurMessage"),
                confirmButtonText: t("boutonConfirmer"),
            });
        }
    };

    const filteredSyndicats = useMemo(() => {
        return syndicats.filter((syndicat) => syndicat.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [syndicats, searchTerm]);

    const getSuggestionMessage = () => {
        if (!searchTerm) return null;
        if (filteredSyndicats.length === 0) {
            return t("aucunSyndicatTrouvé", { searchTerm });
        }
        if (filteredSyndicats.length < syndicats.length) {
            return t("syndicatsTrouvés", { filteredSyndicats: filteredSyndicats.length, searchTerm });
        }
        return null;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <MySyndicatHeader />

                <motion.div className="mb-16 max-w-4xl mx-auto" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <div className="relative group">
                        <input
                            type="text"
                            placeholder={t("rechercherPlaceholder")}
                            className="w-full pl-16 pr-6 py-4 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 text-lg placeholder-gray-400 shadow-lg"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 h-6 w-6 group-hover:text-blue-500 transition-colors" />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-2">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                className="px-4 py-2 bg-white border-2 border-gray-200 rounded-xl hover:border-blue-500 transition-colors flex items-center"
                            >
                                <Filter className="h-5 w-5 mr-2 text-gray-500" />
                                <span className="font-medium">{t("filtrer")}</span>
                            </motion.button>
                        </div>
                    </div>

                    {getSuggestionMessage() && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="mt-4 flex items-center bg-blue-100 text-blue-800 px-4 py-3 rounded-xl border border-blue-200"
                        >
                            <AlertCircle className="h-5 w-5 mr-3 flex-shrink-0" />
                            <span className="text-sm leading-tight">{getSuggestionMessage()}</span>
                        </motion.div>
                    )}
                </motion.div>

                <SyndicatCard
                    containerVariants={containerVariants}
                    itemVariants={itemVariants}
                    onJoinSyndicat={(syndicats) => handleJoinSyndicat(syndicats)}
                    listSyndicats={filteredSyndicats}
                />

                {filteredSyndicats.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20"
                    >
                        <div className="max-w-md mx-auto">
                            <div className="inline-block p-6 bg-blue-50 rounded-full mb-6">
                                <AlertCircle className="h-12 w-12 text-blue-600" />
                            </div>
                            <h3 className="text-2xl font-semibold text-gray-900 mb-2">{t("étatVideTitre")}</h3>
                            <p className="text-gray-600 mb-6">{t("étatVideDescription")}</p>
                            <button
                                onClick={openBusinessActorForm}
                                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center mx-auto"
                            >
                                <PlusCircle className="h-5 w-5 mr-2" />
                                {t("créerSyndicat")}
                            </button>
                        </div>
                    </motion.div>
                )}
            </div>

            <AnimatePresence>
                {isBusinessFormOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    >
                        <motion.div
                            className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
                            initial={{ scale: 0.95 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.95 }}
                        >
                            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                                <h3 className="text-2xl font-semibold text-gray-900">{t("nouveauSyndicatTitre")}</h3>
                                <button
                                    className="p-2 hover:bg-gray-50 rounded-full transition-colors"
                                    onClick={closeBusinessActorForm}
                                >
                                    <X className="h-6 w-6 text-gray-500" />
                                </button>
                            </div>
                            <OrganisationForm />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {loading && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
                    <div className="bg-white p-8 rounded-2xl shadow-xl flex flex-col items-center">
                        <div className="animate-spin mb-4">
                            <ArrowRightCircle className="h-12 w-12 text-blue-600" />
                        </div>
                        <p className="text-lg font-semibold text-gray-900">{t("chargementMessage")}</p>
                        <p className="text-sm text-gray-500 mt-2">{t("chargementSousMessage")}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

