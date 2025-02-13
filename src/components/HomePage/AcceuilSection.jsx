import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    X,
    Users,
    Calendar,
    MessageSquare,
    Plus,
    List,
    Compass,
    Bell,
    Briefcase,
    TrendingUp,
    MapPin,
    Award,
    FileText,
    ChevronRight,
    Shield,
    Star,
    Zap,
    Activity,
    Target,
    Gift,
    Sparkles
} from "lucide-react";
import {
    getFirstNameToken,
    getLastNameToken,
    getUserIdFromToken
} from "../../services/AccountService.js";
import { BusinessActorForm } from "./BusinessActorForm/BusinessActorForm.jsx";
import { OrganisationForm } from "@/components/HomePage/OrganisationForm/OrganisationForm.jsx";
import { apiClient } from "../../services/AxiosConfig.js";
import {AdhereSyndicatForm} from "./AdhesionForm/AdhesionForm.jsx";
import {CreateSyndicatForm} from "../NewCreateSyndicatPage/CreateSyndicatForm.jsx";

const stats = [
    {
        title: "Syndicats",
        value: 3,
        trend: "+12%",
        icon: Users,
        color: "text-blue-600",
        bgColor: "bg-blue-100",
        gradient: "from-blue-500 to-indigo-600"
    },
    {
        title: "Évènements publiés",
        value: 12,
        trend: "+8%",
        icon: Calendar,
        color: "text-emerald-600",
        bgColor: "bg-emerald-100",
        gradient: "from-emerald-500 to-green-600"
    },
    {
        title: "Messages non lus",
        value: 5,
        trend: "+15%",
        icon: MessageSquare,
        color: "text-purple-600",
        bgColor: "bg-purple-100",
        gradient: "from-purple-500 to-pink-600"
    },
    {
        title: "Membres actifs",
        value: 150,
        trend: "+25%",
        icon: TrendingUp,
        color: "text-orange-600",
        bgColor: "bg-orange-100",
        gradient: "from-orange-500 to-red-600"
    }
];

const quickAccess = [
    {
        title: "Accéder à la liste de mes syndicats",
        description: "Gérez vos syndicats existants",
        icon: List,
        color: "text-blue-600",
        bgColor: "bg-blue-100",
        borderColor: "border-blue-200",
        gradient: "from-blue-500 to-indigo-600"
    },
    {
        title: "Explorer",
        description: "Découvrez de nouveaux syndicats",
        icon: Compass,
        color: "text-purple-600",
        bgColor: "bg-purple-100",
        borderColor: "border-purple-200",
        gradient: "from-purple-500 to-pink-600"
    },
    {
        title: "Gérer les documents",
        description: "Accédez à vos documents importants",
        icon: FileText,
        color: "text-orange-600",
        bgColor: "bg-orange-100",
        borderColor: "border-orange-200",
        gradient: "from-orange-500 to-red-600"
    }
];

const recentActivities = [
    {
        title: "Nouvelle annonce dans Syndicat A",
        description: "Une nouvelle communication importante a été publiée",
        time: "Il y a 2 heures",
        icon: Bell,
        color: "text-pink-500",
        bgColor: "bg-pink-100"
    },
    {
        title: "Réunion planifiée pour Syndicat B",
        description: "Assemblée générale prévue pour la semaine prochaine",
        time: "Il y a 1 jour",
        icon: Calendar,
        color: "text-blue-500",
        bgColor: "bg-blue-100"
    },
    {
        title: "Mise à jour des statuts du Syndicat C",
        description: "Les nouveaux statuts ont été approuvés",
        time: "Il y a 3 jours",
        icon: FileText,
        color: "text-green-500",
        bgColor: "bg-green-100"
    },
    {
        title: "Nouveau membre dans Syndicat A",
        description: "Jean Dupont a rejoint l'organisation",
        time: "Il y a 4 jours",
        icon: Users,
        color: "text-purple-500",
        bgColor: "bg-purple-100"
    }
];

const upcomingEvents = [
    {
        title: "Réunion générale",
        date: "Demain, 14:00",
        type: "important",
        description: "Discussion sur les nouvelles mesures",
        icon: Target,
        gradient: "from-blue-500 to-indigo-600"
    },
    {
        title: "Formation syndicale",
        date: "12 Juin, 09:00",
        type: "formation",
        description: "Formation sur les droits des travailleurs",
        icon: Gift,
        gradient: "from-green-500 to-emerald-600"
    },
    {
        title: "Assemblée extraordinaire",
        date: "15 Juin, 10:00",
        type: "urgent",
        description: "Vote sur les nouvelles propositions",
        icon: Sparkles,
        gradient: "from-purple-500 to-pink-600"
    }
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
    },
};

export const AcceuilSection = () => {
    const [lastName, setLastName] = useState(null);
    const [firstName, setFirstName] = useState(null);
    const [isBusinessFormOpen, setIsBusinessFormOpen] = useState(false);
    const [formType, setFormType] = useState(null);
    const [activeTab, setActiveTab] = useState("activities");
    const [showCreateSyndicatForm, setCreateSyndicatForm] = useState(false)

    const userId = getUserIdFromToken();

    const closeBusinessActorForm = () => setIsBusinessFormOpen(false);

    const openBusinessActorForm = async () => {
        try {
            const response = await apiClient.get("/organisation/verify_business_actor", {
                params: { userId: userId },
            });

            setFormType(response.data.data === true ? "Syndicat" : "Business");
            setIsBusinessFormOpen(true);
        } catch (error) {
            console.error("Erreur lors de la vérification du business actor :", error);
        }
    };

    useEffect(() => {
        setFirstName(getFirstNameToken());
        setLastName(getLastNameToken());
    }, []);

    const handleCreateSyndicat = () => {
        setCreateSyndicatForm(true)
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <div className="container mx-auto px-4 py-8">
                {/* Welcome Section améliorée */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12 relative"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 opacity-30 blur-3xl -z-10"></div>
                    <div className="max-w-3xl mx-auto">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                Bienvenue, {firstName} {lastName} !
                            </span>
                            <div className="mt-3 w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full"></div>
                        </h1>
                        <p className="text-lg text-gray-600 mb-6">
                            Votre portail syndical personnalisé
                            <span className="block mt-2 text-blue-600 flex items-center justify-center">
                                <Sparkles className="h-5 w-5 mr-2" />
                                Accès à 15+ syndicats actifs
                            </span>
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleCreateSyndicat}
                            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 inline-flex items-center group"
                        >
                            <Zap className="w-6 h-6 mr-2 transform group-hover:rotate-12 transition-transform" />
                            <span>Lancer un nouveau syndicat</span>
                        </motion.button>
                    </div>
                </motion.div>

                {/* Nouvelle section Syndicat suggéré */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12 bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
                >
                    <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/3 relative">
                            <img
                                src="https://images.unsplash.com/photo-1584433144859-1fc3ab64a957?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                                alt="Syndicat suggéré"
                                className="w-full h-64 object-cover"
                            />
                            <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-medium shadow-sm flex items-center">
                                <Star className="h-4 w-4 mr-1 text-yellow-500" />
                                Recommandé
                            </div>
                        </div>
                        <div className="md:w-2/3 p-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                Syndicat National des Transporteurs Modernes
                            </h2>
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="flex items-center">
                                    <Users className="h-5 w-5 text-blue-600 mr-2" />
                                    <span>24,500 membres</span>
                                </div>
                                <div className="flex items-center">
                                    <MapPin className="h-5 w-5 text-blue-600 mr-2" />
                                    <span>National</span>
                                </div>
                                <div className="flex items-center">
                                    <Shield className="h-5 w-5 text-blue-600 mr-2" />
                                    <span>Certifié par l'État</span>
                                </div>
                                <div className="flex items-center">
                                    <Star className="h-5 w-5 text-blue-600 mr-2" />
                                    <span>4.7/5 (428 avis)</span>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <motion.button
                                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all flex items-center"
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <Briefcase className="h-5 w-5 mr-2" />
                                    Rejoindre maintenant
                                </motion.button>
                                <motion.button
                                    className="px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                                    whileHover={{ scale: 1.05 }}
                                >
                                    Explorer les avantages
                                </motion.button>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Stats Grid améliorée */}
                <motion.div
                    className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-12"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            whileHover={{ scale: 1.02 }}
                            className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
                        >
                            <div className={`h-2 bg-gradient-to-r ${stat.gradient}`} />
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`p-3 rounded-xl ${stat.bgColor} shadow-sm`}>
                                        <stat.icon className={`h-6 w-6 ${stat.color}`} />
                                    </div>
                                    <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
                                        {stat.trend}
                                    </span>
                                </div>
                                <h3 className="text-gray-600 text-sm mb-2 font-medium">{stat.title}</h3>
                                <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>


                {/* Modal */}
                <AnimatePresence>
                    <AnimatePresence>
                        {showCreateSyndicatForm && (
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
                                            onClick={() => setCreateSyndicatForm(false)}
                                        >
                                            <X className="h-6 w-6" />
                                        </button>
                                            <CreateSyndicatForm></CreateSyndicatForm>
                                    </div>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </AnimatePresence>
            </div>
        </div>
    );
};
