import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Users, TrendingUp, ChevronRight, LogIn, UserPlus, Building, BarChart2 } from "lucide-react"
import SearchInterface from "./SearchSection/SearchSection.jsx"
import { useNavigate } from 'react-router-dom';

// Mock data for popular syndicats
const popularSyndicats = [
    {
        id: 1,
        name: "Syndicat National de l'Éducation",
        members: 250000,
        image:
            "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    },
    {
        id: 2,
        name: "Union des Travailleurs de la Santé",
        members: 180000,
        image:
            "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    },
    {
        id: 3,
        name: "Fédération des Employés du Commerce",
        members: 150000,
        image: "https://images.unsplash.com/photo-1556740758-90de374c12ad?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    },
]

// Mock data for statistics
const statistics = [
    { id: 1, name: "Syndicats inscrits", value: 1500, icon: Building },
    { id: 2, name: "Utilisateurs actifs", value: 50000, icon: Users },
    { id: 3, name: "Taux de satisfaction", value: 98, icon: TrendingUp },
    { id: 4, name: "Événements organisés", value: 3200, icon: BarChart2 },
]

export const LandingPage = () =>{
    const [searchTerm, setSearchTerm] = useState("")
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-purple-50">
            {/* Header */}
            <header className="bg-white shadow-md py-4 sticky top-0 z-50">
                <div className="container mx-auto px-4 flex justify-between items-center">
                    <div className="flex items-center space-x-2 text-blue-600">
                        <Building className="h-8 w-8" />
                        <span className="text-2xl font-bold">SyndicManager</span>
                    </div>
                    <div className="flex space-x-4">
                        <motion.button
                            className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full border border-blue-300 flex items-center hover:bg-blue-200 transition duration-300"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate('/login')}
                        >
                            <LogIn className="mr-2 h-4 w-4" />
                            Se connecter
                        </motion.button>
                        <motion.button
                            className="bg-blue-600 text-white px-4 py-2 rounded-full flex items-center hover:bg-blue-700 transition duration-300"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate('/register')}
                        >
                            <UserPlus className="mr-2 h-4 w-4" />
                            S'inscrire
                        </motion.button>
                    </div>
                </div>
            </header>

            {/* Main content */}
            <main className="flex-grow">
                {/* Hero section */}
                <section className="bg-gradient-to-r from-blue-100 via-blue-50 to-purple-100 py-20">
                    <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
                        <div className="md:w-1/2 mb-10 md:mb-0">
                            <h1 className="text-4xl md:text-5xl font-bold text-blue-800 mb-6">
                                Gérez vos syndicats en toute simplicité
                            </h1>
                            <p className="text-xl text-blue-600 mb-8">
                                SyndicManager : la plateforme moderne pour une gestion syndicale efficace et transparente.
                            </p>
                            <motion.button
                                className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold flex items-center hover:bg-blue-700 transition duration-300"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => navigate('/register')}
                            >
                                Commencer maintenant
                                <ChevronRight className="ml-2 h-5 w-5" />
                            </motion.button>
                        </div>
                        <div className="md:w-1/2">
                            <img
                                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                                alt="Gestion syndicale"
                                className="rounded-lg shadow-xl"
                            />
                        </div>
                    </div>
                </section>

                {/* Search section */}
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-blue-800 mb-8 text-center">Trouvez votre syndicat</h2>
                        <div className="max-w-2xl mx-auto relative">
                            <input
                                type="text"
                                placeholder="Nom du syndicat..."
                                className="w-full pl-12 pr-4 py-3 rounded-full border-2 border-blue-300 focus:border-blue-500 focus:ring focus:ring-purple-200 focus:ring-opacity-50 transition duration-300"
                                onClick={() => setIsSearchOpen(true)}
                                readOnly
                            />
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400" />
                        </div>
                    </div>
                </section>

                {/* Popular syndicats section */}
                <section className="bg-gradient-to-r from-blue-50 to-purple-50 py-16">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-blue-800 mb-8 text-center">Syndicats populaires</h2>
                        <div className="grid gap-8 md:grid-cols-3">
                            {popularSyndicats.map((syndicat) => (
                                <motion.div
                                    key={syndicat.id}
                                    className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300"
                                    whileHover={{ y: -5 }}
                                >
                                    <img
                                        src={syndicat.image || "/placeholder.svg"}
                                        alt={syndicat.name}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="p-6">
                                        <h3 className="text-xl font-semibold text-blue-700 mb-4">{syndicat.name}</h3>
                                        <div className="flex items-center text-gray-600 mb-4">
                                            <Users className="h-5 w-5 mr-2 text-blue-500" />
                                            <span>{syndicat.members.toLocaleString()} membres</span>
                                        </div>
                                        <motion.button
                                            className="w-full bg-gradient-to-r from-blue-400 to-blue-600 text-white py-2 rounded-md flex items-center justify-center transition duration-300 hover:from-blue-500 hover:to-blue-700"
                                            whileHover={{ scale: 1.03 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            En savoir plus
                                            <ChevronRight className="ml-2 h-4 w-4" />
                                        </motion.button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Features section */}
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-blue-800 mb-12 text-center">Pourquoi choisir SyndicManager ?</h2>
                        <div className="grid gap-8 md:grid-cols-3">
                            <div className="text-center">
                                <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-full p-4 inline-block mb-4">
                                    <TrendingUp className="h-8 w-8 text-white" />
                                </div>
                                <h3 className="text-xl font-semibold text-blue-700 mb-2">Gestion efficace</h3>
                                <p className="text-gray-600">Optimisez la gestion de vos syndicats avec nos outils intuitifs.</p>
                            </div>
                            <div className="text-center">
                                <div className="bg-gradient-to-br from-purple-400 to-purple-600 rounded-full p-4 inline-block mb-4">
                                    <Users className="h-8 w-8 text-white" />
                                </div>
                                <h3 className="text-xl font-semibold text-blue-700 mb-2">Collaboration simplifiée</h3>
                                <p className="text-gray-600">Facilitez la communication et la coordination entre les membres.</p>
                            </div>
                            <div className="text-center">
                                <div className="bg-gradient-to-br from-blue-400 to-purple-400 rounded-full p-4 inline-block mb-4">
                                    <Building className="h-8 w-8 text-white" />
                                </div>
                                <h3 className="text-xl font-semibold text-blue-700 mb-2">Transparence accrue</h3>
                                <p className="text-gray-600">Assurez une gestion transparente et responsable de vos activités.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Statistics section */}
                <section className="py-16 bg-gradient-to-r from-blue-100 to-purple-100">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-blue-800 mb-12 text-center">SyndicManager en chiffres</h2>
                        <div className="grid gap-8 md:grid-cols-4">
                            {statistics.map((stat) => (
                                <motion.div
                                    key={stat.id}
                                    className="bg-white rounded-lg p-6 text-center shadow-md"
                                    whileHover={{ y: -5, boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)" }}
                                >
                                    <stat.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                                    <h3 className="text-2xl font-bold text-blue-800 mb-2">
                                        {stat.name === "Taux de satisfaction" ? `${stat.value}%` : stat.value.toLocaleString()}
                                    </h3>
                                    <p className="text-blue-600">{stat.name}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-8">
                <div className="container mx-auto px-4">
                    <div className="grid gap-8 md:grid-cols-3">
                        <div>
                            <div className="flex items-center space-x-2 mb-4">
                                <Building className="h-6 w-6" />
                                <span className="text-xl font-semibold">SyndicManager</span>
                            </div>
                            <p className="text-blue-100">La plateforme moderne pour une gestion syndicale efficace.</p>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold mb-4">Liens rapides</h4>
                            <ul className="space-y-2">
                                <li>
                                    <a href="#" className="text-blue-100 hover:text-purple-200 transition duration-300">
                                        À propos
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-blue-100 hover:text-purple-200 transition duration-300">
                                        Services
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-blue-100 hover:text-purple-200 transition duration-300">
                                        Contact
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold mb-4">Suivez-nous</h4>
                            <div className="flex space-x-4">
                                <a href="#" className="text-blue-100 hover:text-purple-200 transition duration-300">
                                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path
                                            fillRule="evenodd"
                                            d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </a>
                                <a href="#" className="text-blue-100 hover:text-purple-200 transition duration-300">
                                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
            <SearchInterface isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </div>
    )
}

