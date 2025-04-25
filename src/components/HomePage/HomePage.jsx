"use client"
import { useState, useEffect, useMemo, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    Building, Search, Bell, Settings, Home, Users, Compass,
    ChevronRight, ChevronLeft, LogOut, X, AlertCircle, Calendar,
    CheckCircle, FileText
} from "lucide-react"
import { useNavigate } from "react-router-dom"
import { logout, getFirstNameToken, getLastNameToken, getProfilFromToken } from "../../services/AccountService"
import { AcceuilSection } from "./AcceuilSection.jsx"
import { MesSyndicats } from "./MesSyndicatSection.jsx"
import { Explorer } from "./ExploreSection.jsx" 
import { ProfilUser } from "./ProfilUser/ProfilUser.jsx"

const navItems = [
    {
        id: "dashboard",
        icon: Home,
        label: "Accueil",
        gradient: "from-blue-500 to-indigo-600",
        description: "Actualité",
    },
    {
        id: "syndicats",
        icon: Users,
        label: "Mes Syndicats",
        gradient: "from-blue-500 to-indigo-600",
        description: "Gérer vos organisations",
    },
    {
        id: "explorer",
        icon: Compass,
        label: "Explorer",
        gradient: "from-blue-500 to-indigo-600",
        description: "Découvrir de nouveaux syndicats",
    },
    {
        id: "parametres",
        icon: Settings,
        label: "Paramètres",
        gradient: "from-blue-500 to-indigo-600",
        description: "Configuration du compte",
    },
]

const notifications = [
    {
        title: "Nouvelle réunion planifiée",
        description: "Assemblée générale prévue pour demain à 14h",
        time: "Il y a 5 minutes",
        icon: Calendar,
        gradient: "from-blue-500 to-indigo-600",
    },
    {
        title: "Cotisation reçue",
        description: "Paiement confirmé de Jean Dupont",
        time: "Il y a 30 minutes",
        icon: CheckCircle,
        gradient: "from-green-500 to-emerald-600",
    },
    {
        title: "Nouveau document partagé",
        description: "Rapport mensuel disponible",
        time: "Il y a 1 heure",
        icon: FileText,
        gradient: "from-purple-500 to-pink-600",
    },
    {
        title: "Alerte importante",
        description: "Mise à jour des statuts requise",
        time: "Il y a 2 heures",
        icon: AlertCircle,
        gradient: "from-orange-500 to-red-600",
    },
]

const NotificationItem = ({ title, description, time, icon: Icon, gradient }) => (
    <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer group"
    >
        <div className={`h-1 bg-gradient-to-r ${gradient}`} />
        <div className="p-4">
            <div className="flex items-center mb-2">
                <div className={`p-2 rounded-lg bg-gradient-to-r ${gradient} text-white`}>
                    <Icon className="h-5 w-5" />
                </div>
                <span className="ml-auto text-xs text-gray-500">{time}</span>
            </div>
            <h3 className="font-semibold text-gray-800 mb-1">{title}</h3>
            <p className="text-sm text-gray-600">{description}</p>
        </div>
    </motion.div>
)

const SettingsPlaceholder = () => (
    <div className="text-center py-12">
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-md mx-auto"
        >
            <Settings className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Paramètres en développement</h3>
            <p className="text-gray-600">Cette section sera bientôt disponible avec de nouvelles fonctionnalités.</p>
        </motion.div>
    </div>
)

const Header = ({ isSidebarOpen, searchTerm, userData, onSidebarToggle, onSearchChange, onNotificationToggle, onProfileClick }) => (
    <motion.header
        className="bg-white shadow-lg z-20"
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
    >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
                <div className="flex items-center space-x-4">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={onSidebarToggle}
                        className="text-gray-600 hover:text-blue-600 focus:outline-none"
                    >
                        {isSidebarOpen ? <ChevronLeft className="h-6 w-6" /> : <ChevronRight className="h-6 w-6" />}
                    </motion.button>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center">
                        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-2 rounded-lg">
                            <Building className="h-8 w-8 text-white" />
                        </div>
                        <h1 className="ml-3 text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            SyndicManager
                        </h1>
                    </motion.div>
                </div>

                <div className="flex items-center space-x-6">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Rechercher..."
                            className="w-64 pl-10 pr-4 py-2 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all duration-200"
                            value={searchTerm}
                            onChange={(e) => onSearchChange(e.target.value)}
                        />
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="relative bg-white p-2 rounded-xl text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
                        onClick={onNotificationToggle}
                    >
                        <Bell className="h-6 w-6" />
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            4
                        </span>
                    </motion.button>

                    {/* Modification : ajout de onClick pour afficher la section "Paramètres" */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onProfileClick}
                        className="w-10 h-10 rounded-full overflow-hidden cursor-pointer shadow-lg border-2 border-white"
                    >
                        <img
                            src={userData?.profile}
                            alt="Photo de profil"
                            className="w-full h-full object-cover"
                        />
                    </motion.div>
                </div>
            </div>
        </div>
    </motion.header>
)

const Sidebar = ({ isOpen, activeSection, onSectionChange, onLogout }) => (
    <motion.nav
        initial={{ width: isOpen ? 256 : 64 }}
        animate={{ width: isOpen ? 256 : 64 }}
        transition={{ duration: 0.3 }}
        className="bg-white shadow-xl flex flex-col z-20"
    >
        <div className="flex-grow overflow-y-auto p-6">
            <nav className="space-y-4">
                {navItems.map((item) => (
                    <motion.button
                        key={item.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => onSectionChange(item.id)}
                        className={`w-full p-3 rounded-xl transition-all duration-300 group ${
                            activeSection === item.id
                                ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg`
                                : "bg-white text-gray-600 hover:bg-gray-50"
                        } ${isOpen ? "flex items-center" : "flex justify-center"}`}
                    >
                        <item.icon className={`w-5 h-5 ${isOpen ? "mr-3" : ""}`} />
                        {isOpen && (
                            <div className="text-left">
                                <div className="font-medium">{item.label}</div>
                                <div className={`text-xs ${activeSection === item.id ? "text-white/80" : "text-gray-500"}`}>
                                    {item.description}
                                </div>
                            </div>
                        )}
                    </motion.button>
                ))}
            </nav>
        </div>

        <div className="p-6 border-t border-gray-100">
            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full p-3 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
                onClick={onLogout}
            >
                <LogOut className="w-5 h-5" />
                {isOpen && <span className="font-medium ml-2">Déconnexion</span>}
            </motion.button>
        </div>
    </motion.nav>
)

const NotificationsPanel = ({ isOpen, onClose }) => (
    <AnimatePresence>
        {isOpen && (
            <motion.div
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 300 }}
                transition={{ type: "spring", stiffness: 100 }}
                className="fixed right-0 top-0 h-full w-80 bg-white shadow-2xl z-30"
            >
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h3 className="text-xl font-bold text-gray-800">Notifications</h3>
                            <p className="text-sm text-gray-500">Vous avez 4 nouvelles notifications</p>
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={onClose}
                            className="p-2 rounded-xl hover:bg-gray-100 text-gray-600 transition-colors duration-200"
                        >
                            <X className="w-5 h-5" />
                        </motion.button>
                    </div>

                    <div className="space-y-4">
                        {notifications.map((notification, index) => (
                            <NotificationItem key={index} {...notification} />
                        ))}
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full mt-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                    >
                        Voir toutes les notifications
                    </motion.button>
                </div>
            </motion.div>
        )}
    </AnimatePresence>
)

export const HomePage = () => {
    const [activeSection, setActiveSection] = useState("dashboard")
    const [searchTerm, setSearchTerm] = useState("")
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)
    const [isNotificationOpen, setIsNotificationOpen] = useState(false)
    const navigate = useNavigate()

    const userData = useMemo(() => ({
        firstName: getFirstNameToken(),
        lastName: getLastNameToken(),
        profile: getProfilFromToken(),
    }), [])

    useEffect(() => {
        const savedSection = localStorage.getItem("activeSection")
        if (savedSection) setActiveSection(savedSection)
    }, [])

    useEffect(() => {
        localStorage.setItem("activeSection", activeSection)
    }, [activeSection])

    const renderContent = useCallback(() => {
        const sections = {
            dashboard: <AcceuilSection/>,
            syndicats: <MesSyndicats />,
            explorer: <Explorer />,
            parametres: <ProfilUser />
        }
        return sections[activeSection] || null
    }, [activeSection])

    return (
        <div className="flex flex-col h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <Header
                isSidebarOpen={isSidebarOpen}
                searchTerm={searchTerm}
                userData={userData}
                onSidebarToggle={() => setIsSidebarOpen(!isSidebarOpen)}
                onSearchChange={setSearchTerm}
                onNotificationToggle={() => setIsNotificationOpen(!isNotificationOpen)}
                onProfileClick={() => setActiveSection("parametres")}
            />

            <div className="flex flex-1 overflow-hidden">
                <Sidebar
                    isOpen={isSidebarOpen}
                    activeSection={activeSection}
                    onSectionChange={setActiveSection}
                    onLogout={() => {
                        logout()
                        navigate('/login')
                    }}
                />

                <main className="flex-1 overflow-y-auto">
                    <div className="max-w-7xl mx-auto">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeSection}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.2 }}
                            >
                                {renderContent()}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </main>

                <NotificationsPanel
                    isOpen={isNotificationOpen}
                    onClose={() => setIsNotificationOpen(false)}
                />
            </div>
        </div>
    )
}
