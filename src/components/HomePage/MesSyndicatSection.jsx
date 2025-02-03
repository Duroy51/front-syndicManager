import React, {useEffect, useState} from "react"
import { motion } from "framer-motion"
import {Users, Search, ChevronRight, Plus, Briefcase, TrendingUp, Calendar, MessageSquare, X} from "lucide-react"
import {OrganisationForm} from "./OrganisationForm/OrganisationForm.jsx"
import {BusinessActorForm} from "@/components/HomePage/BusinessActorForm/BusinessActorForm.jsx";
// Mock data for demonstration
import {apiClient} from '../../services/AxiosConfig.js';
import {getUserIdFromToken} from "../../services/AccountService.js";
import Swal from "sweetalert2";
import {useNavigate} from "react-router-dom";
import * as responseData from "framer-motion/m";


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

export const MesSyndicats = () => {
    const [searchTerm, setSearchTerm] = useState("")
    const [syndicats, setSyndicats] = useState([]);
    const [loading, setLoading] = useState(false);


    const [isBusinessFormOpen, setIsBusinessFormOpen] = useState(false);
    const openBusinessActorForm = () => setIsBusinessFormOpen(true);
    const closeBusinessActorForm = () => setIsBusinessFormOpen(false);
    const UserId = getUserIdFromToken();
    const navigate = useNavigate();
    useEffect(() => {
        const fetchSyndicats = async () => {
            try {
                const response = await apiClient.get("/organisation/list_of_my_syndicat", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}` // Si tu utilises JWT
                    },
                    params: {
                        userId: UserId }

                });
                setSyndicats(response.data.data); // Stocke la liste récupérée dans l'état
            } catch (error) {
                console.error("Erreur lors de la récupération des syndicats :", error);
            }
        };

        fetchSyndicats();
    }, []);


    const handleJoinSyndicat = async (organisationId) => {
        setLoading(true);
        try {
            const response = await apiClient.get("/organisation/connect", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
                params: {
                    userId: UserId,
                    organisationId: organisationId
                }
            });

            if (response.data.data && response.data.data.organisationToken) {
                localStorage.setItem("organisationToken", response.data.data.organisationToken.Bearer);
                setLoading(false);
                navigate("/syndicat-app");
                Swal.fire({
                    icon: 'success',
                    title: 'Inscription réussie !',
                    text: response.data.data.text || 'Votre compte a été créé avec succès.',
                    confirmButtonText: 'Ok',
                });
            } else {
                throw new Error("Token non reçu !");
            }
        } catch (error) {
            console.error("Erreur lors de la connexion au syndicat :", error);
            setLoading(false);
            await Swal.fire({
                icon: "error",
                title: "Erreur",
                text: "Une erreur est survenue lors de la communication avec le serveur",
                confirmButtonText: 'Ok',
            });
        }
    };

    const filteredSyndicats = syndicats.filter((syndicat) =>
        syndicat.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-8">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold mb-2">Mes Syndicats</h1>
                    <p className="text-xl opacity-90">Gérez et explorez vos affiliations syndicales</p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <motion.div
                    className="mb-8 flex flex-col md:flex-row justify-between items-center"
                    initial={{opacity: 0, y: -20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.5}}
                >
                    <div className="relative w-full md:w-96 mb-4 md:mb-0">
                        <input
                            type="text"
                            placeholder="Rechercher un syndicat..."
                            className="w-full pl-10 pr-4 py-2 rounded-full border-2 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-300"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"/>
                    </div>

                    <div className="mt-12 text-center"><div>
                      <motion.button
                        className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-2 rounded-full flex items-center transition duration-300 hover:from-green-600 hover:to-blue-600 transform hover:scale-105"
                        whileHover={{scale: 1.05}}
                        whileTap={{scale: 0.95}}
                        onClick={openBusinessActorForm}
                      >
                        <Plus className="mr-2"/>
                        Créer un nouveau syndicat
                      </motion.button>


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


                                        <OrganisationForm/>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {filteredSyndicats.map((syndicat) => (
                        <motion.div
                            key={syndicat.id}
                            className="bg-white rounded-lg shadow-lg overflow-hidden border-t-4 border-blue-500 hover:shadow-xl transition duration-300"
                            variants={itemVariants}
                            whileHover={{y: -5}}
                        >
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <h2 className="text-xl font-semibold text-gray-800">{syndicat.name}</h2>
                                    <span className="text-sm font-medium text-white bg-blue-500 rounded-full px-3 py-1">
                    {syndicats.type}
                  </span>
                                </div>
                                <div className="flex items-center text-gray-600 mb-4">
                                    <Users className="h-5 w-5 mr-2 text-blue-500"/>
                                    <span>{syndicat.members} membres</span>
                                    {syndicat.trend === "up" && <TrendingUp className="h-5 w-5 ml-2 text-green-500"/>}
                                    {syndicat.trend === "down" && (
                                        <TrendingUp className="h-5 w-5 ml-2 text-red-500 transform rotate-180"/>
                                    )}
                                    {syndicat.trend === "stable" &&
                                        <div className="h-5 w-5 ml-2 border-t-2 border-gray-400"/>}
                                </div>
                                <div className="flex justify-between items-center text-sm text-gray-500">
                                    <div className="flex items-center">
                                        <Calendar className="h-4 w-4 mr-1" />
                                        <span>Prochain événement: 15 juin</span>
                                    </div>
                                    <div className="flex items-center">
                                        <MessageSquare className="h-4 w-4 mr-1" />
                                        <span>3 nouveaux messages</span>
                                    </div>
                                </div>
                            </div>
                            <div onClick={() => handleJoinSyndicat(syndicat.id)}
                                className="bg-gray-50 px-6 py-4">
                                <button className="w-full bg-blue-500 text-white py-2 rounded-md flex items-center justify-center transition duration-300 hover:bg-blue-600">
                                    Voir les détails
                                    <ChevronRight className="ml-2 h-4 w-4" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
            {loading && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <p className="text-lg font-semibold">Connexion en cours...</p>
                    </div>
                </div>
            )}
        </div>

    )
}

