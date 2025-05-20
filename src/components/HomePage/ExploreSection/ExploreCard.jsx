import React from "react";
import { motion } from "framer-motion";
import { SyndicatDefaultAvatar } from "../localcomponent/SyndicatDefaultAvatar.jsx";
import { Users, MapPin, ChevronRight, UserPlus } from "lucide-react";
import { useTranslation } from 'react-i18next';

export const ExploreCard = ({
                                listSyndicat = [],
                                containerVariants,
                                itemVariants,
                                details,
                                adherer
                            }) => {
    const { t } = useTranslation();

    // Configuration pour les types d'organisation
    const orgTypeLabels = {
        "SOLE_PROPRIETORSHIP": "Entreprise individuelle",
        "LIMITED_LIABILITY_COMPANY": "SARL",
        "CORPORATION": "Société anonyme",
        "COOPERATIVE": "Coopérative",
        "ASSOCIATION": "Association"
    };

    // Fonction pour obtenir le label du type d'organisation
    const getOrgTypeLabel = (type) => {
        return orgTypeLabels[type] || type;
    };

    return (
        <section className="mt-8">
            <div className="flex items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-900 mr-4">
                    {t("tous_syndicats")}
                </h2>
                <div className="flex-1 h-px bg-gradient-to-r from-blue-100 to-indigo-100"></div>
            </div>

            <motion.div
                className="grid gap-8 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {listSyndicat.map((syndicat) => (
                    <motion.div
                        key={syndicat.id}
                        className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 overflow-hidden"
                        variants={itemVariants}
                        whileHover={{y: -8}}
                    >
                        <div className="relative aspect-video">
                            {syndicat.image ? (
                                <img
                                    src={syndicat.image}
                                    alt={syndicat.name}
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    loading="lazy"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 transition-transform duration-300 group-hover:scale-105">
                                    <SyndicatDefaultAvatar
                                        name={syndicat.name}
                                        size={120}
                                        className="transform group-hover:scale-110 transition-transform duration-300"
                                    />
                                </div>
                            )}
                            <div
                                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                <span
                    className="text-sm font-semibold text-white bg-blue-600/90 rounded-lg px-3 py-1.5">
                  {getOrgTypeLabel(syndicat.type)}
                </span>
                            </div>
                        </div>

                        <div className="p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4 leading-snug">
                                {syndicat.name}
                            </h2>

                            <div className="space-y-3 text-gray-600">
                                <div className="flex items-center">
                                    <Users className="h-5 w-5 mr-3 text-blue-500 flex-shrink-0"/>
                                    <span className="text-sm">
                    {syndicat.members.toLocaleString()} membres actifs
                  </span>
                                </div>
                                <div className="flex items-center">
                                    <MapPin className="h-5 w-5 mr-3 text-blue-500 flex-shrink-0"/>
                                    <span className="text-sm">
                    {syndicat.location}
                  </span>
                                </div>
                            </div>
                        </div>

                        <div className="px-6 pb-6 flex gap-3">
                            <motion.button
                                className="flex-1 bg-white text-blue-600 py-2.5 rounded-lg border-2 border-blue-100 hover:border-blue-200 transition-colors duration-300 flex items-center justify-center font-medium"
                                whileHover={{scale: 1.03}}
                                whileTap={{scale: 0.98}}
                                onClick={() => details(syndicat)}
                            >
                                <span>{t("details")}</span>
                                <ChevronRight className="ml-2 h-4 w-4"/>
                            </motion.button>

                            <motion.button
                                className="flex-1 bg-gradient-to-br from-blue-600 to-indigo-600 text-white py-2.5 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center font-medium"
                                whileHover={{scale: 1.03}}
                                whileTap={{scale: 0.98}}
                                onClick={() => adherer(syndicat)}
                            >
                                <UserPlus className="mr-2 h-4 w-4"/>
                                <span>{t("adherer")}</span>
                            </motion.button>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
};

export default ExploreCard;