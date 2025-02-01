import React, {useEffect, useState} from "react"
import { motion } from "framer-motion"
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
} from "lucide-react"
import {getFirstNameToken, getLastNameToken} from "../../services/AccountService.js";
import {BusinessActorForm} from "./BusinessActorForm/BusinessActorForm.jsx"
import {OrganisationForm} from "@/components/HomePage/OrganisationForm/OrganisationForm.jsx";
import {apiClient} from '../../services/AxiosConfig.js';
import {getUserIdFromToken} from "../../services/AccountService.js";
import axios from "axios";

const stats = [
    { title: "Syndicats", value: 3, icon: Users, color: "text-blue-500", bgColor: "bg-blue-100" },
    { title: "Évènements publiés", value: 12, icon: Calendar, color: "text-green-500", bgColor: "bg-green-100" },
    { title: "Messages non lus", value: 5, icon: MessageSquare, color: "text-yellow-500", bgColor: "bg-yellow-100" },
    { title: "Membres actifs", value: 150, icon: TrendingUp, color: "text-purple-500", bgColor: "bg-purple-100" },
]

const quickAccess = [
    {
        title: "Créer un nouveau syndicat",
        icon: Plus,
        color: "text-green-600",
        bgColor: "bg-green-100",
        borderColor: "border-green-200",
    },
    {
        title: "Accéder à la liste de mes syndicats",
        icon: List,
        color: "text-blue-600",
        bgColor: "bg-blue-100",
        borderColor: "border-blue-200",
    },
    {
        title: "Explorer",
        icon: Compass,
        color: "text-purple-600",
        bgColor: "bg-purple-100",
        borderColor: "border-purple-200",
    },
    {
        title: "Gérer les documents",
        icon: FileText,
        color: "text-orange-600",
        bgColor: "bg-orange-100",
        borderColor: "border-orange-200",
    },
]

const recentActivities = [
    {
        title: "Nouvelle annonce dans Syndicat A",
        time: "Il y a 2 heures",
        icon: Bell,
        color: "text-pink-500",
        bgColor: "bg-pink-100",
    },
    {
        title: "Réunion planifiée pour Syndicat B",
        time: "Il y a 1 jour",
        icon: Calendar,
        color: "text-blue-500",
        bgColor: "bg-blue-100",
    },
    {
        title: "Mise à jour des statuts du Syndicat C",
        time: "Il y a 3 jours",
        icon: FileText,
        color: "text-green-500",
        bgColor: "bg-green-100",
    },
    {
        title: "Nouveau membre dans Syndicat A",
        time: "Il y a 4 jours",
        icon: Users,
        color: "text-purple-500",
        bgColor: "bg-purple-100",
    },
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

export const AcceuilSection = () => {

    const [lastName, setLastName] = useState(null);
    const [firstName, setFirstName] = useState(null);
    const [isBusinessFormOpen, setIsBusinessFormOpen] = useState(false);
    /*const openBusinessActorForm = () => setIsBusinessFormOpen(true);*/
    const closeBusinessActorForm = () => setIsBusinessFormOpen(false);
    const [formType, setFormType] = useState(null);

    const userId = getUserIdFromToken();
    const openBusinessActorForm = async () => {
        try {
            // Envoyer une requête à la route /verify_business_actor
            const response = await apiClient.get("/verify_business_actor",
                {
                    params: {
                        userId: userId }
                });

            // Vérifier la réponse du serveur
            if (response.data === true) {
                setFormType("Syndicat");
            } else {
                setFormType("Business");
            }

            // Ouvrir la modal
            setIsBusinessFormOpen(true);
        } catch (error) {
            console.error("Erreur lors de la vérification du business actor :", error);
        }
    };


    useEffect(() => {
        const firstName = getFirstNameToken();
        setFirstName(firstName);
    }, []);

    useEffect(() => {
        const lastName = getLastNameToken();
        setLastName(lastName);
    }, []);


    return (
        <div>
            <motion.h2
                className="text-4xl font-bold mb-8 text-blue-600 p-4"
                initial={{x: -20}}
                animate={{x: 0}}
                transition={{type: "spring", stiffness: 100}}
            >
                Bienvenue, {firstName} {lastName} !
            </motion.h2>

            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-50">


                <div className="container mx-auto px-4 py-8">
                    <motion.div
                        className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {stats.map((stat, index) => (
                            <motion.div key={index} variants={itemVariants}>
                                <div
                                    className="bg-white rounded-lg shadow hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border-t-4 border-t-blue-500">
                                    <div className="p-4">
                                        <div className="flex items-center justify-between pb-2">
                                            <h3 className="text-sm font-medium">{stat.title}</h3>
                                            <div className={`p-2 rounded-full ${stat.bgColor}`}>
                                                <stat.icon className={`h-4 w-4 ${stat.color}`}/>
                                            </div>
                                        </div>
                                        <div className="text-2xl font-bold">{stat.value}</div>
                                        <p className="text-xs text-gray-500 mt-1">+5% par rapport au mois dernier</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    <h2 className="text-3xl font-bold mt-12 mb-6 text-blue-600">Accès rapide</h2>
                    <motion.div
                        className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {quickAccess.map((item, index) => (
                            <motion.div key={index} variants={itemVariants}>
                                <div
                                    className={`bg-white rounded-lg shadow hover:shadow-lg transition-all duration-300 cursor-pointer group border-2 ${item.borderColor}`}
                                >
                                    <div className={`flex items-center p-6 ${item.bgColor}`}>
                                        <div
                                            className={`p-3 rounded-full ${item.color} bg-opacity-20 mr-4 group-hover:bg-opacity-30 transition-all duration-300`}
                                        >
                                            <item.icon className={`h-6 w-6 ${item.color}`}/>
                                        </div>
                                        <div className="flex-grow">
                                            <h3 className="font-semibold group-hover:text-blue-600 transition-colors duration-300">
                                                {item.title}
                                            </h3>
                                        </div>
                                        <ChevronRight
                                            className={`h-5 w-5 ${item.color} opacity-0 group-hover:opacity-100 transition-all duration-300`}
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    <div className="mt-12 grid gap-6 lg:grid-cols-3">
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-lg shadow border-t-4 border-t-green-500 h-full">
                                <div className="p-6">
                                    <h2 className="text-2xl font-bold text-green-600 mb-2">Activités récentes</h2>
                                    <p className="text-gray-600 mb-4">Restez informé des dernières activités de vos
                                        syndicats</p>
                                    <motion.ul className="space-y-4" variants={containerVariants} initial="hidden"
                                               animate="visible">
                                        {recentActivities.map((activity, index) => (
                                            <motion.li key={index} variants={itemVariants}>
                                                <div
                                                    className="flex items-center p-3 rounded-lg hover:bg-gray-100 transition-all duration-300">
                                                    <div className={`p-2 rounded-full ${activity.bgColor} mr-4`}>
                                                        <activity.icon className={`h-4 w-4 ${activity.color}`}/>
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-gray-800">{activity.title}</p>
                                                        <p className="text-sm text-gray-500">{activity.time}</p>
                                                    </div>
                                                </div>
                                            </motion.li>
                                        ))}
                                    </motion.ul>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="bg-white rounded-lg shadow border-t-4 border-t-purple-500 h-full">
                                <div className="p-6">
                                    <h2 className="text-2xl font-bold text-purple-600 mb-2">Prochains événements</h2>
                                    <p className="text-gray-600 mb-4">Ne manquez aucun rendez-vous important</p>
                                    <motion.div className="space-y-4" variants={containerVariants} initial="hidden"
                                                animate="visible">
                                        <motion.div variants={itemVariants}
                                                    className="bg-blue-100 p-4 rounded-lg border border-blue-200">
                                            <p className="font-semibold text-blue-700">Réunion générale</p>
                                            <p className="text-sm text-gray-600">Demain, 14:00</p>
                                        </motion.div>
                                        <motion.div variants={itemVariants}
                                                    className="bg-green-100 p-4 rounded-lg border border-green-200">
                                            <p className="font-semibold text-green-700">Formation syndicale</p>
                                            <p className="text-sm text-gray-600">12 Juin, 09:00</p>
                                        </motion.div>
                                        <motion.div variants={itemVariants}
                                                    className="bg-yellow-100 p-4 rounded-lg border border-yellow-200">
                                            <p className="font-semibold text-yellow-700">Assemblée extraordinaire</p>
                                            <p className="text-sm text-gray-600">15 Juin, 10:00</p>
                                        </motion.div>
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 text-center">
                        <div>
                            {/* Bouton pour ouvrir la modal */}
                            <button
                                onClick={openBusinessActorForm}
                                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-lg font-semibold flex items-center justify-center mx-auto"
                            >
                                <Plus className="mr-2 h-5 w-5"/> Créer un nouveau syndicat
                            </button>

                            {/* Afficher la modal si isModalOpen est vrai */}
                            {isBusinessFormOpen && (
                                <div
                                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                                    <div
                                        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-7xl max-h-[80vh] overflow-y-auto  ">
                                        {/* Bouton pour fermer la modal */}
                                        <button
                                            onClick={closeBusinessActorForm}
                                            className="absolute top-2 right-2 bg-gray-800 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors duration-200 shadow-lg"
                                        >
                                            <X className="h-5 w-5"/>
                                        </button>

                                        {/* Affichage conditionnel des formulaires */}
                                        {formType === "Syndicat" ? (
                                            <OrganisationForm />
                                        ) : (
                                            <BusinessActorForm />
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

