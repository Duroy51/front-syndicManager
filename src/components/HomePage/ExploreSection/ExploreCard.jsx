// ExploreCard.jsx - Version mise à jour pour le nouveau système d'adhésion
"use client";

import { motion } from "framer-motion";
import { ChevronRight, MapPin, UserPlus, Users, Star, ShieldCheck, Building2 } from "lucide-react";

export const ExploreCard = ({
                                listSyndicat,
                                containerVariants,
                                itemVariants,
                                details,
                                adherer
                            }) => {
    // Fonction pour calculer la note moyenne (exemple)
    const getAverageRating = (syndicat) => {
        return syndicat.rating || 4.5; // Valeur par défaut
    };

    // Fonction pour déterminer si un syndicat est recommandé
    const isRecommended = (syndicat) => {
        return syndicat.recommended || syndicat.members > 1000;
    };

    // Fonction pour formatter le nombre de membres
    const formatMemberCount = (count) => {
        if (count >= 1000) {
            return `${(count / 1000).toFixed(1)}k`;
        }
        return count.toString();
    };

    return (
        <motion.div
            className="grid gap-8 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {listSyndicat.map((syndicat) => (
                <motion.div
                    key={syndicat.id}
                    className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
                    variants={itemVariants}
                    whileHover={{ y: -8, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    {/* Image header avec badges */}
                    <div className="relative aspect-video">
                        <img
                            src={syndicat.image}
                            alt={syndicat.name}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            loading="lazy"
                        />

                        {/* Gradient overlay */}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-semibold text-white bg-blue-600/90 rounded-lg px-3 py-1.5">
                                    {syndicat.type}
                                </span>

                                {/* Badge recommandé */}
                                {isRecommended(syndicat) && (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="bg-orange-500 text-white text-xs font-medium px-2 py-1 rounded-full flex items-center"
                                    >
                                        <Star className="w-3 h-3 mr-1" />
                                        Recommandé
                                    </motion.div>
                                )}
                            </div>
                        </div>

                        {/* Badge certification */}
                        {syndicat.certified && (
                            <div className="absolute top-4 right-4">
                                <div className="bg-green-500 text-white p-2 rounded-full shadow-lg">
                                    <ShieldCheck className="w-4 h-4" />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Contenu principal */}
                    <div className="p-6">
                        {/* Titre */}
                        <h2 className="text-xl font-semibold text-gray-900 mb-3 leading-snug line-clamp-2">
                            {syndicat.name}
                        </h2>

                        {/* Statistiques */}
                        <div className="space-y-3 text-gray-600 mb-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <Users className="h-4 w-4 mr-2 text-blue-500 flex-shrink-0"/>
                                    <span className="text-sm font-medium">
                                        {formatMemberCount(syndicat.members)} membres
                                    </span>
                                </div>

                                {/* Note */}
                                <div className="flex items-center">
                                    <Star className="h-4 w-4 mr-1 text-yellow-400 fill-current"/>
                                    <span className="text-sm font-medium">
                                        {getAverageRating(syndicat)}
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <MapPin className="h-4 w-4 mr-2 text-blue-500 flex-shrink-0 mt-0.5"/>
                                <span className="text-sm line-clamp-2">
                                    {syndicat.location}
                                </span>
                            </div>
                        </div>

                        {/* Spécialités/Secteurs */}
                        {syndicat.specialties && syndicat.specialties.length > 0 && (
                            <div className="mb-4">
                                <div className="flex flex-wrap gap-1">
                                    {syndicat.specialties.slice(0, 3).map((specialty, index) => (
                                        <span
                                            key={index}
                                            className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full font-medium"
                                        >
                                            {specialty}
                                        </span>
                                    ))}
                                    {syndicat.specialties.length > 3 && (
                                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium">
                                            +{syndicat.specialties.length - 3}
                                        </span>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Description courte */}
                        {syndicat.description && (
                            <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                                {syndicat.description}
                            </p>
                        )}

                        {/* Informations additionnelles */}
                        <div className="space-y-2 mb-4">
                            {syndicat.founded && (
                                <div className="flex items-center text-xs text-gray-500">
                                    <Building2 className="w-3 h-3 mr-2" />
                                    <span>Fondé en {syndicat.founded}</span>
                                </div>
                            )}

                            {syndicat.antennesCount && (
                                <div className="flex items-center text-xs text-gray-500">
                                    <MapPin className="w-3 h-3 mr-2" />
                                    <span>{syndicat.antennesCount} antennes disponibles</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="px-6 pb-6 flex gap-3">
                        <motion.button
                            className="flex-1 bg-white text-blue-600 py-2.5 rounded-lg border-2 border-blue-100 hover:border-blue-200 hover:bg-blue-50 transition-all duration-300 flex items-center justify-center font-medium"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => details(syndicat)}
                        >
                            <span>Voir détails</span>
                            <ChevronRight className="ml-2 h-4 w-4"/>
                        </motion.button>

                        <motion.button
                            className="flex-1 bg-gradient-to-br from-blue-600 to-indigo-600 text-white py-2.5 rounded-lg hover:shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 flex items-center justify-center font-medium"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => adherer(syndicat)}
                        >
                            <UserPlus className="mr-2 h-4 w-4"/>
                            <span>Adhérer</span>
                        </motion.button>
                    </div>

                    {/* Barre de progression de popularité (optionnelle) */}
                    {syndicat.popularityScore && (
                        <div className="px-6 pb-4">
                            <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                                <span>Popularité</span>
                                <span>{syndicat.popularityScore}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-1.5">
                                <motion.div
                                    className="bg-gradient-to-r from-blue-500 to-indigo-500 h-1.5 rounded-full"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${syndicat.popularityScore}%` }}
                                    transition={{ duration: 1, delay: 0.5 }}
                                />
                            </div>
                        </div>
                    )}
                </motion.div>
            ))}
        </motion.div>
    );
};

// Exemple d'utilisation dans Explorer.jsx
/*
<ExploreCard
    listSyndicat={filteredSyndicats}
    containerVariants={containerVariants}
    itemVariants={itemVariants}
    details={(syndicat) => handleSyndicatClick(syndicat)}
    adherer={(syndicat) => handleDemandeAdhesion(syndicat)}
/>
*/

// Exemple de structure de données syndicat étendue
/*
const exampleSyndicat = {
    id: 1,
    name: "Syndicat National des Développeurs",
    type: "Technologie",
    image: "/images/syndicat1.jpg",
    location: "Yaoundé, Cameroun",
    members: 1250,
    rating: 4.8,
    certified: true,
    recommended: true,
    founded: 2015,
    antennesCount: 4,
    description: "Le syndicat des professionnels du développement logiciel au Cameroun",
    specialties: ["Web Development", "Mobile Apps", "IA", "Blockchain"],
    popularityScore: 85
};
*/