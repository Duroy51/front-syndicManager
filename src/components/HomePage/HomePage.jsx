import { useState, useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { Search, Plus, ChevronRight, User, Users, Calendar, Bell, MessageCircle, Settings, ArrowRight, Info, Shield } from 'lucide-react'
import { useNavigate } from 'react-router-dom';



export const HomePage = () =>{
    const [userSyndicates, setUserSyndicates] = useState([
        { id: 1, name: "Syndicat des Enseignants", members: 1200, isAdmin: true },
        { id: 2, name: "Syndicat des Infirmiers", members: 800, isAdmin: false },
        { id: 3, name: "Syndicat des Ingénieurs", members: 1500, isAdmin: true },
        { id: 4, name: "Syndicat des Artistes", members: 500, isAdmin: false },
    ])

    const controls = useAnimation()
    const navigate = useNavigate();

    useEffect(() => {
        controls.start(i => ({
            opacity: 1,
            y: 0,
            transition: { delay: i * 0.1 }
        }))
    }, [])

    return (
        <div className="min-h-screen bg-blue-50">
            <nav className="bg-blue-600 text-white p-4 sticky top-0 z-10">
                <div className="container mx-auto flex justify-between items-center">
                    <motion.h1
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-2xl font-bold flex items-center"
                    >
                        <Users className="mr-2" /> SyndicManager
                    </motion.h1>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-white text-blue-600 px-4 py-2 rounded-full hover:bg-blue-100 transition-colors flex items-center"
                    >
                        <User className="mr-2" /> Mon Profil
                    </motion.button>
                </div>
            </nav>

            <main className="container mx-auto mt-8 px-4">
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12 relative overflow-hidden py-20"
                >
                    <motion.div
                        animate={{
                            y: [0, -10, 0],
                            transition: { repeat: Infinity, duration: 5, ease: "easeInOut" }
                        }}
                        className="absolute inset-0 z-0"
                    >
                        <div className="absolute inset-0 bg-blue-200 opacity-50 transform rotate-3 scale-110"></div>
                    </motion.div>
                    <motion.h2
                        className="text-4xl font-bold text-blue-800 mb-4 relative z-10"
                        animate={{ scale: [1, 1.02, 1] }}
                        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                    >
                        Bienvenue sur SyndiManager
                    </motion.h2>
                    <p className="text-xl text-blue-600 relative z-10">Gérez vos syndicats en toute simplicité</p>
                </motion.section>

                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={controls}
                    custom={0}
                    className="bg-white rounded-lg shadow-lg p-6 mb-8"
                >
                    <h3 className="text-2xl font-semibold text-blue-800 mb-4 flex items-center">
                        <Users className="mr-2" /> Mes Syndicats
                    </h3>
                    <ul className="space-y-2">
                        {userSyndicates.map((syndicate, index) => (
                            <motion.li
                                key={syndicate.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={controls}
                                custom={index + 1}
                                whileHover={{ scale: 1.02 }}
                                className={`p-3 rounded-md flex justify-between items-center ${
                                    syndicate.isAdmin ? 'bg-blue-200' : 'bg-blue-100'
                                }`}
                            >
                <span className="flex items-center">
                  {syndicate.isAdmin && <Shield className="mr-2 text-blue-600" size={16} />}
                    {syndicate.name}
                </span>
                                <div className="flex items-center">
                                    <Users className="mr-2 text-blue-600" size={16} />
                                    <span className="text-blue-600 mr-4">{syndicate.members}</span>
                                    <ChevronRight className="text-blue-600" />
                                </div>
                            </motion.li>
                        ))}
                    </ul>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-full flex items-center hover:bg-blue-700 transition-colors"
                        
                        onClick={() => navigate('/home/createSyndicat')}
                    >
                        <Plus className="mr-2" /> Créer un nouveau syndicat
                    </motion.button>
                </motion.section>

                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={controls}
                    custom={4}
                    className="bg-white rounded-lg shadow-lg p-6 mb-8"
                >
                    <h3 className="text-2xl font-semibold text-blue-800 mb-4 flex items-center">
                        <Search className="mr-2" /> Rechercher des Syndicats
                    </h3>
                    <motion.div
                        className="flex items-center bg-blue-100 rounded-full p-2"
                        whileHover={{ boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.5)" }}
                    >
                        <Search className="text-blue-600 mr-2" />
                        <input
                            type="text"
                            placeholder="Nom du syndicat..."
                            className="bg-transparent flex-grow focus:outline-none"
                        />
                    </motion.div>
                </motion.section>

                <motion.section
                    initial={{ opacity: 0 }}
                    animate={controls}
                    custom={5}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
                >
                    {[
                        { icon: Calendar, title: "Gestion Simplifiée", description: "Gérez facilement vos syndicats et leurs membres." },
                        { icon: Bell, title: "Communication Efficace", description: "Restez en contact avec tous les membres de vos syndicats." },
                        { icon: MessageCircle, title: "Suivi des Activités", description: "Suivez toutes les activités et événements de vos syndicats." },
                    ].map((feature, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ y: -5, boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)" }}
                            className="bg-white p-6 rounded-lg shadow-md transition-shadow"
                        >
                            <feature.icon className="text-blue-600 mb-2" size={32} />
                            <h4 className="text-xl font-semibold text-blue-800 mb-2">{feature.title}</h4>
                            <p className="text-blue-600">{feature.description}</p>
                        </motion.div>
                    ))}
                </motion.section>

                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={controls}
                    custom={6}
                    className="bg-blue-100 rounded-lg p-8 mb-8"
                >
                    <h3 className="text-2xl font-bold text-blue-800 mb-4 flex items-center">
                        <Info className="mr-2" /> En savoir plus sur SyndiManager
                    </h3>
                    <p className="text-blue-600 mb-4">
                        Découvrez comment SyndiManager peut transformer la gestion de vos syndicats et améliorer la communication entre les membres.
                    </p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold flex items-center hover:bg-blue-700 transition-colors"
                    >
                        Explorer les fonctionnalités <ArrowRight className="ml-2" />
                    </motion.button>
                </motion.section>
            </main>

            <footer className="bg-blue-800 text-white py-8">
                <div className="container mx-auto text-center">
                    <p>&copy; 2023 SyndiManager. Tous droits réservés.</p>
                    <div className="mt-4 flex justify-center space-x-4">
                        <motion.a href="#" whileHover={{ y: -2 }}><MessageCircle /></motion.a>
                        <motion.a href="#" whileHover={{ y: -2 }}><Settings /></motion.a>
                        <motion.a href="#" whileHover={{ y: -2 }}><Bell /></motion.a>
                    </div>
                </div>
            </footer>
        </div>
    )
}