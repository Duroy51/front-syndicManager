import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Building, ArrowRight, Users, BarChart, MessageCircle, Shield, ChevronRight, Star } from 'lucide-react'
import { useNavigate } from 'react-router-dom';


const Button = ({ children, primary = false, className = '' }) => (
    <button
        className={`px-6 py-2 rounded-full font-semibold transition-colors duration-300 ${
            primary
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : 'bg-white text-blue-500 hover:bg-blue-50'
        } ${className}`}
    >
        {children}
    </button>
)

const Section = ({ children, className = '' }) => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    })

    return (
        <motion.section
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className={`py-20 ${className}`}
        >
            {children}
        </motion.section>
    )
}

const Feature = ({ icon: Icon, title, description }) => (
    <motion.div
        whileHover={{ scale: 1.05 }}
        className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-lg"
    >
        <Icon className="w-12 h-12 text-blue-500 mb-4" />
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
    </motion.div>
)

const Testimonial = ({ quote, author, role }) => (
    <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-white p-6 rounded-lg shadow-lg"
    >
        <p className="text-gray-600 mb-4">"{quote}"</p>
        <div className="font-semibold">{author}</div>
        <div className="text-sm text-gray-500">{role}</div>
    </motion.div>
)


export const WelcomePage = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-gray-50">
            {/* Hero Section */}
            <Section className="bg-gradient-to-r from-blue-400 to-blue-600 text-white min-h-screen flex items-center">
                <div className="container mx-auto px-6 flex flex-col md:flex-row items-center">
                    <div className="flex-1">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h1 className="text-4xl md:text-6xl font-bold mb-4">
                                Gérez votre syndicat efficacement avec SyndicManager
                            </h1>
                            <p className="text-xl mb-8">
                                La solution complète et gratuite pour la gestion moderne des syndicats
                            </p>
                            <div className="flex space-x-4">
                                <Button primary onClick={() => navigate('/register')}>Commencer gratuitement</Button>
                                <Button>En savoir plus</Button>
                            </div>
                        </motion.div>
                    </div>
                    <div className="flex-1 mt-10 md:mt-0">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            className="relative"
                        >
                            <Building className="w-full h-auto text-blue-100" />
                            <div className="absolute inset-0 bg-blue-500 opacity-20 rounded-full filter blur-3xl"></div>
                        </motion.div>
                    </div>
                </div>
            </Section>

            {/* Features Section */}
            <Section>
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center mb-12">Fonctionnalités principales</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <Feature
                            icon={Users}
                            title="Gestion des membres"
                            description="Gérez facilement les adhésions, les cotisations et les informations des membres."
                        />
                        <Feature
                            icon={BarChart}
                            title="Rapports et analyses"
                            description="Obtenez des insights précieux grâce à des rapports détaillés et des tableaux de bord interactifs."
                        />
                        <Feature
                            icon={MessageCircle}
                            title="Communication intégrée"
                            description="Facilitez la communication entre les membres grâce à des outils de messagerie et de forum intégrés."
                        />
                    </div>
                </div>
            </Section>

            {/* How It Works Section */}
            <Section className="bg-blue-50 relative overflow-hidden">
                <div className="container mx-auto px-6 relative z-10">
                    <h2 className="text-3xl font-bold text-center mb-12">Comment ça marche</h2>
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="md:w-1/2 mb-8 md:mb-0"
                        >
                            <img src="/placeholder.svg?height=400&width=600" alt="SyndicManager en action" className="rounded-lg shadow-xl" />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="md:w-1/2 md:pl-12"
                        >
                            <ol className="space-y-6">
                                <li className="flex items-center">
                                    <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4">1</div>
                                    <div>
                                        <h3 className="font-semibold text-lg">Inscrivez-vous</h3>
                                        <p className="text-gray-600">Créez votre compte SyndicManager en quelques clics.</p>
                                    </div>
                                </li>
                                <li className="flex items-center">
                                    <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4">2</div>
                                    <div>
                                        <h3 className="font-semibold text-lg">Configurez votre syndicat</h3>
                                        <p className="text-gray-600">Personnalisez les paramètres selon vos besoins spécifiques.</p>
                                    </div>
                                </li>
                                <li className="flex items-center">
                                    <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4">3</div>
                                    <div>
                                        <h3 className="font-semibold text-lg">Invitez vos membres</h3>
                                        <p className="text-gray-600">Ajoutez facilement vos membres et gérez leurs accès.</p>
                                    </div>
                                </li>
                                <li className="flex items-center">
                                    <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4">4</div>
                                    <div>
                                        <h3 className="font-semibold text-lg">Commencez à gérer</h3>
                                        <p className="text-gray-600">Profitez de toutes les fonctionnalités pour gérer efficacement votre syndicat.</p>
                                    </div>
                                </li>
                            </ol>
                        </motion.div>
                    </div>
                </div>
                <div className="absolute inset-0 bg-blue-500 opacity-5 transform -skew-y-6"></div>
            </Section>

            {/* Testimonials Section */}
            <Section>
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center mb-12">Ce que disent nos utilisateurs</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <Testimonial
                            quote="SyndicManager a révolutionné la façon dont nous gérons notre syndicat. C'est un outil indispensable pour nous."
                            author="Marie Dupont"
                            role="Présidente du Syndicat des Enseignants"
                        />
                        <Testimonial
                            quote="La facilité d'utilisation et les fonctionnalités complètes de SyndicManager ont grandement amélioré notre efficacité."
                            author="Jean Martin"
                            role="Secrétaire Général du Syndicat des Transports"
                        />
                        <Testimonial
                            quote="Grâce à SyndicManager, nous avons pu moderniser nos processus et mieux servir nos membres."
                            author="Sophie Lefebvre"
                            role="Trésorière du Syndicat des Infirmiers"
                        />
                    </div>
                </div>
            </Section>

            {/* New Section: Avantages de la plateforme gratuite */}
            <Section className="bg-gradient-to-b from-blue-400 to-blue-600 text-white">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center mb-12">Pourquoi choisir SyndicManager ?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { title: "100% Gratuit", description: "Aucun frais caché, utilisez toutes les fonctionnalités sans coût" },
                            { title: "Sécurisé", description: "Vos données sont protégées par un cryptage de niveau bancaire" },
                            { title: "Support réactif", description: "Notre équipe est là pour vous aider à tout moment" },
                            { title: "Mises à jour régulières", description: "Bénéficiez des dernières fonctionnalités et améliorations" }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-white text-gray-800 rounded-lg shadow-lg p-6"
                            >
                                <Star className="w-12 h-12 text-blue-500 mb-4" />
                                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                                <p>{item.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </Section>

            {/* CTA Section */}
            <Section className="bg-blue-50">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold mb-4">Prêt à transformer la gestion de votre syndicat ?</h2>
                    <p className="text-xl text-gray-600 mb-8">Rejoignez des milliers de syndicats qui font confiance à SyndicManager</p>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Button primary className="text-lg px-8 py-3"  onClick={() => navigate('/register')}>
                            Commencer gratuitement <ArrowRight className="inline-block ml-2" />
                        </Button>
                    </motion.div>
                </div>
            </Section>

            {/* Footer */}
            <footer className="bg-gray-800 text-white py-12">
                <div className="container mx-auto px-6">
                    <div className="flex flex-wrap justify-between">
                        <div className="w-full md:w-1/4 mb-8 md:mb-0">
                            <div className="flex items-center mb-4">
                                <Building className="w-8 h-8 mr-2 text-blue-400" />
                                <span className="text-2xl font-bold">SyndicManager</span>
                            </div>
                            <p className="text-gray-400">La solution moderne pour la gestion des syndicats</p>
                        </div>
                        <div className="w-full md:w-1/4 mb-8 md:mb-0">
                            <h4 className="text-lg font-semibold mb-4">Produit</h4>
                            <ul className="space-y-2">
                                <li><a href="#" className="hover:text-blue-400">Fonctionnalités</a></li>
                                <li><a href="#" className="hover:text-blue-400">FAQ</a></li>
                                <li><a href="#" className="hover:text-blue-400">Sécurité</a></li>
                            </ul>
                        </div>
                        <div className="w-full md:w-1/4 mb-8 md:mb-0">
                            <h4 className="text-lg font-semibold mb-4">Ressources</h4>
                            <ul className="space-y-2">
                                <li><a href="#" className="hover:text-blue-400">Blog</a></li>
                                <li><a href="#" className="hover:text-blue-400">Guides</a></li>
                                <li><a href="#" className="hover:text-blue-400">Support</a></li>
                            </ul>
                        </div>
                        <div className="w-full md:w-1/4">
                            <h4 className="text-lg font-semibold mb-4">Nous contacter</h4>
                            <ul className="space-y-2">
                                <li><a href="#" className="hover:text-blue-400">Contact</a></li>
                                <li><a href="#" className="hover:text-blue-400">Partenariats</a></li>
                                <li><a href="#" className="hover:text-blue-400">Carrières</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-700 mt-8 pt-8 text-center">
                        <p>&copy; 2024 SyndicManager. Tous droits réservés.</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}