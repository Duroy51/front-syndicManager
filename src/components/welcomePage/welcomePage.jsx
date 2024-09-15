'use client'

import { useState, useEffect } from 'react'

import { motion, useScroll, useTransform } from 'framer-motion'
import { Users, Briefcase, Shield, BarChart, Star, Zap, Smile } from 'lucide-react'

export const WelcomePage = () => {
    const [, setCurrentSlide] = useState(0)
    const { scrollY } = useScroll()
    useTransform(scrollY, [0, 300], [0, -300]);
    const y2 = useTransform(scrollY, [300, 600], [300, 0])
    const y3 = useTransform(scrollY, [600, 900], [300, 0])
    const y4 = useTransform(scrollY, [900, 1200], [300, 0])

    useEffect(() => {
        const handleScroll = () => {
            const newSlide = Math.floor(window.scrollY / 300)
            setCurrentSlide(newSlide)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const iconVariants = {
        hidden: { opacity: 0, scale: 0 },
        visible: { opacity: 1, scale: 1 }
    }

    return (
        <div className="min-h-screen bg-white text-gray-800">
            <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
                <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
                    <div className="text-2xl font-bold text-blue-600">SyndicManager</div>
                    <div className="space-x-4">
                        <a href="/login" className="text-blue-600 hover:text-blue-800">Se connecter</a>
                        <a href="/register" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">S'inscrire</a>
                    </div>
                </nav>
            </header>

            <main className="pt-16">
                <section className="h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-blue-500 to-blue-700 text-white">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center z-10"
                    >
                        <h1 className="text-6xl font-bold mb-6">Bienvenue sur SyndicManager</h1>
                        <p className="text-2xl mb-12">La gestion de syndicat réinventée</p>
                        <div className="flex justify-center space-x-8 mb-12">
                            <motion.div variants={iconVariants} initial="hidden" animate="visible" transition={{ delay: 0.2 }}>
                                <Users size={64} className="text-yellow-300" />
                                <p className="mt-2">Membres Unis</p>
                            </motion.div>
                            <motion.div variants={iconVariants} initial="hidden" animate="visible" transition={{ delay: 0.4 }}>
                                <Briefcase size={64} className="text-green-300" />
                                <p className="mt-2">Gestion Efficace</p>
                            </motion.div>
                            <motion.div variants={iconVariants} initial="hidden" animate="visible" transition={{ delay: 0.6 }}>
                                <Shield size={64} className="text-red-300" />
                                <p className="mt-2">Protection Assurée</p>
                            </motion.div>
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-white text-blue-600 px-8 py-3 rounded-full text-xl font-semibold hover:bg-blue-100 transition-colors"
                        >
                            Découvrir SyndicManager
                        </motion.button>
                    </motion.div>
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            rotate: [0, 180, 360],
                        }}
                        transition={{
                            duration: 20,
                            ease: "linear",
                            repeat: Infinity,
                        }}
                        className="absolute top-10 left-10 text-blue-300 opacity-50"
                    >
                        <Star size={48} />
                    </motion.div>
                    <motion.div
                        animate={{
                            y: [0, -30, 0],
                        }}
                        transition={{
                            duration: 5,
                            ease: "easeInOut",
                            repeat: Infinity,
                        }}
                        className="absolute bottom-20 right-20 text-blue-300 opacity-50"
                    >
                        <Zap size={48} />
                    </motion.div>
                    <motion.div
                        animate={{
                            rotate: [0, 360],
                        }}
                        transition={{
                            duration: 30,
                            ease: "linear",
                            repeat: Infinity,
                        }}
                        className="absolute top-1/2 left-1/4 text-blue-300 opacity-50"
                    >
                        <Smile size={48} />
                    </motion.div>
                </section>

                <motion.section style={{ y: y2 }} className="min-h-screen flex items-center justify-center bg-white">
                    <div className="text-center">
                        <h2 className="text-4xl font-bold mb-6 text-blue-600">Nos Services</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="bg-blue-600 text-white p-6 rounded-lg shadow-md">
                                <Users size={48} className="mx-auto mb-4" />
                                <h3 className="text-xl font-semibold mb-2">Gestion des Membres</h3>
                                <p>Gérez facilement vos adhérents et leurs informations.</p>
                            </div>
                            <div className="bg-blue-600 text-white p-6 rounded-lg shadow-md">
                                <Briefcase size={48} className="mx-auto mb-4" />
                                <h3 className="text-xl font-semibold mb-2">Gestion des Cotisations</h3>
                                <p>Suivez et gérez les cotisations de vos membres.</p>
                            </div>
                            <div className="bg-blue-600 text-white p-6 rounded-lg shadow-md">
                                <Shield size={48} className="mx-auto mb-4" />
                                <h3 className="text-xl font-semibold mb-2">Protection des Droits</h3>
                                <p>Outils pour défendre les droits de vos adhérents.</p>
                            </div>
                        </div>
                    </div>
                </motion.section>

                <motion.section style={{ y: y3 }} className="min-h-screen flex items-center justify-center bg-blue-600 text-white">
                    <div className="text-center">
                        <h2 className="text-4xl font-bold mb-6">Pourquoi Nous Choisir</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="p-6 rounded-lg shadow-md bg-white text-blue-600">
                                <BarChart size={48} className="mx-auto mb-4" />
                                <h3 className="text-xl font-semibold mb-2">Analyses Détaillées</h3>
                                <p>Obtenez des insights précieux sur les activités de votre syndicat.</p>
                            </div>
                            <div className="p-6 rounded-lg shadow-md bg-white text-blue-600">
                                <img src="/placeholder.svg?height=200&width=300" width={300} height={200} alt="Interface utilisateur" className="mx-auto rounded-lg shadow-lg mb-4" />
                                <h3 className="text-xl font-semibold mb-2">Interface Intuitive</h3>
                                <p>Une plateforme facile à utiliser pour tous vos membres.</p>
                            </div>
                        </div>
                    </div>
                </motion.section>

                <motion.section style={{ y: y4 }} className="min-h-screen flex items-center justify-center bg-white">
                    <div className="text-center">
                        <h2 className="text-4xl font-bold mb-6 text-blue-600">Rejoignez-nous</h2>
                        <p className="text-xl mb-8 text-gray-600">Simplifiez la gestion de votre syndicat dès aujourd'hui</p>
                        <img src="/placeholder.svg?height=300&width=500" width={500} height={300} alt="Syndicat en action" className="mx-auto rounded-lg shadow-lg mb-8" />
                        <a href="/register" className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700 transition-colors">
                            Commencer maintenant
                        </a>
                    </div>
                </motion.section>
            </main>

            <footer className="bg-gray-100 py-6">
                <div className="container mx-auto px-6 text-center">
                    <p>&copy; 2023 SyndicManager. Tous droits réservés.</p>
                </div>
            </footer>
        </div>
    )
}