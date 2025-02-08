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

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <div className="container mx-auto px-4 py-8">
                {/* Welcome Section */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
                        Bienvenue, {firstName} {lastName} !
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Votre tableau de bord syndical personnalisé
                    </p>
                    {/* Bouton "Devenir Syndicaliste" */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={openBusinessActorForm}
                        className="mt-6 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-full shadow-2xl hover:shadow-2xl transition-all duration-300 inline-flex items-center"
                    >
                        <Star className="w-6 h-6 mr-2" />
                        Devenir Syndicaliste
                    </motion.button>
                </motion.div>

                {/* Stats Grid */}
                <motion.div
                    className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            whileHover={{ scale: 1.02 }}
                            className="bg-white rounded-2xl shadow-lg overflow-hidden"
                        >
                            <div className={`h-1 bg-gradient-to-r ${stat.gradient}`} />
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                                        <stat.icon className={`h-6 w-6 ${stat.color}`} />
                                    </div>
                                    <div className="flex items-center text-sm font-medium text-green-600">
                                        <TrendingUp className="w-4 h-4 mr-1" />
                                        {stat.trend}
                                    </div>
                                </div>
                                <h3 className="text-gray-600 text-sm mb-2">{stat.title}</h3>
                                <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Quick Access Section */}
                <div className="mt-12">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">
                            Accès rapide
                        </h2>
                        {/* Vous pouvez conserver ou supprimer d'autres boutons ici */}
                    </div>

                    <motion.div
                        className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {quickAccess.map((item, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                whileHover={{ scale: 1.02 }}
                                className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer group"
                            >
                                <div className={`h-1 bg-gradient-to-r ${item.gradient}`} />
                                <div className="p-6">
                                    <div className="flex items-center mb-4">
                                        <div className={`p-3 rounded-xl ${item.bgColor}`}>
                                            <item.icon className={`h-6 w-6 ${item.color}`} />
                                        </div>
                                        <ChevronRight className={`ml-auto h-5 w-5 ${item.color} opacity-0 group-hover:opacity-100 transition-all duration-300`} />
                                    </div>
                                    <h3 className="font-semibold text-gray-800 mb-2">{item.title}</h3>
                                    <p className="text-sm text-gray-600">{item.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* Activities and Events Section */}
                <div className="mt-12 grid gap-6 lg:grid-cols-3">
                    {/* Recent Activities */}
                    <div className="lg:col-span-2">
                        <motion.div
                            whileHover={{ scale: 1.01 }}
                            className="bg-white rounded-2xl shadow-lg overflow-hidden h-full"
                        >
                            <div className="h-1 bg-gradient-to-r from-green-500 to-emerald-600" />
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-bold text-gray-800">
                                        Activités récentes
                                    </h2>
                                    <div className="flex space-x-2">
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className={`px-4 py-2 rounded-xl transition-colors duration-200 ${
                                                activeTab === "activities"
                                                    ? "bg-green-500 text-white"
                                                    : "text-gray-600 hover:bg-gray-100"
                                            }`}
                                            onClick={() => setActiveTab("activities")}
                                        >
                                            <Activity className="w-5 h-5" />
                                        </motion.button>
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className={`px-4 py-2 rounded-xl transition-colors duration-200 ${
                                                activeTab === "notifications"
                                                    ? "bg-green-500 text-white"
                                                    : "text-gray-600 hover:bg-gray-100"
                                            }`}
                                            onClick={() => setActiveTab("notifications")}
                                        >
                                            <Bell className="w-5 h-5" />
                                        </motion.button>
                                    </div>
                                </div>

                                <motion.div
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate="visible"
                                    className="space-y-4"
                                >
                                    {recentActivities.map((activity, index) => (
                                        <motion.div
                                            key={index}
                                            variants={itemVariants}
                                            whileHover={{ scale: 1.02 }}
                                            className="bg-gray-50 rounded-xl p-4 cursor-pointer hover:bg-gray-100 transition-all duration-200"
                                        >
                                            <div className="flex items-center">
                                                <div className={`p-3 rounded-xl ${activity.bgColor}`}>
                                                    <activity.icon className={`h-5 w-5 ${activity.color}`} />
                                                </div>
                                                <div className="ml-4 flex-1">
                                                    <h3 className="font-semibold text-gray-800">{activity.title}</h3>
                                                    <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                                                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                                                </div>
                                                <ChevronRight className="w-5 h-5 text-gray-400" />
                                            </div>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Upcoming Events */}
                    <div>
                        <motion.div
                            whileHover={{ scale: 1.01 }}
                            className="bg-white rounded-2xl shadow-lg overflow-hidden h-full"
                        >
                            <div className="h-1 bg-gradient-to-r from-purple-500 to-pink-600" />
                            <div className="p-6">
                                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                                    Prochains événements
                                </h2>
                                <motion.div
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate="visible"
                                    className="space-y-4"
                                >
                                    {upcomingEvents.map((event, index) => (
                                        <motion.div
                                            key={index}
                                            variants={itemVariants}
                                            whileHover={{ scale: 1.02 }}
                                            className="rounded-xl overflow-hidden cursor-pointer group"
                                        >
                                            <div className={`bg-gradient-to-r ${event.gradient} p-4 text-white`}>
                                                <div className="flex items-center justify-between mb-2">
                                                    <event.icon className="w-5 h-5" />
                                                    <span className="text-sm opacity-75">{event.date}</span>
                                                </div>
                                                <h3 className="font-semibold">{event.title}</h3>
                                                <p className="text-sm opacity-75 mt-1">{event.description}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Modal */}
                <AnimatePresence>
                    {isBusinessFormOpen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50"
                            onClick={closeBusinessActorForm}
                        >
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                className="bg-white rounded-2xl shadow-2xl w-full max-w-7xl max-h-[80vh] overflow-y-auto m-4"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="relative">
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={closeBusinessActorForm}
                                        className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-red-100 text-gray-600 hover:text-red-600 transition-colors duration-200"
                                    >
                                        <X className="w-5 h-5" />
                                    </motion.button>
                                    <div className="p-8">
                                        {formType === "Syndicat" ? (
                                            <OrganisationForm />
                                        ) : (
                                            <BusinessActorForm />
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};
