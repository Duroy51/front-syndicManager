import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    Building,
    LifeBuoy,
    Building2,
    Edit,
    Search,
    Bell,
    Settings,
    Home,
    Users,
    Compass,
    ChevronRight,
    Calendar,
    FileText,
    LogOut,
    X,
    AlertCircle,
    CheckCircle,
    ChevronLeft,
    Briefcase,
} from "lucide-react"
import { AcceuilSection } from "../components/HomePage/AcceuilSection.jsx"
import { MesSyndicats } from "../components/HomePage/MesSyndicatSection.jsx"
import { Explorer } from "../components/HomePage/ExploreSection.jsx"
import { SyndicatConfigSection } from "./SyndicatConfigSection.jsx"
import { getFirstNameToken, getLastNameToken } from "../services/AccountService.js"
import {SyndicatManagement} from "./SyndicatConfig/SyndicatConfig.jsx";
import {ProfilUser} from "../components/HomePage/ProfilUser/ProfilUser.jsx";
import {OrganisationNavigationTabs} from "./OrganisationGestion/OrganisationSection.jsx";
import {BusinessNavigationTabs} from "./BusinessSection/BusinessSection.jsx";

import { useTranslation } from "react-i18next"
const navItems = [
    {
        id: "dashboard",
        icon: Home,
        label: "Accueil",
        gradient: "from-blue-500 to-indigo-600",
        description: "Actualité",
    },
    {
        id: "organisation",
        icon: Building2,
        label: "Organisation",
        gradient: "from-blue-500 to-indigo-600",
        description: "Gérez votre Syndicat",
    },
    {
        id: "business",
        icon: Briefcase,
        label: "Business",
        gradient: "from-blue-500 to-indigo-600",
        /*gradient: "from-green-500 to-emerald-600",*/
        description: "Gérer vos organisations",
    },
    {
        id: "parametres",
        icon: Settings,
        label: "Paramètres",
        gradient: "from-blue-500 to-indigo-600",
        /*gradient: "from-orange-500 to-red-600",*/
        description: "Configuration du compte",
    },
    {
        id: "help",
        icon: LifeBuoy,
        label: "Help",
        gradient: "from-blue-500 to-indigo-600",
        /*gradient: "from-purple-500 to-pink-600",*/
        description: "Découvrir de nouveaux syndicats",
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

export const SyndicalistHomePage = () => {
    const [activeSection, setActiveSection] = useState("dashboard")
    const [searchTerm, setSearchTerm] = useState("")
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)
    const [isNotificationOpen, setIsNotificationOpen] = useState(false)
    const [lastName, setLastName] = useState(null)
    const [firstName, setFirstName] = useState(null)

    const {t}  =useTranslation();

    useEffect(() => {
        const savedSection = localStorage.getItem("activeSection")
        if (savedSection) {
            setActiveSection(savedSection)
        }
    }, [])

    useEffect(() => {
        localStorage.setItem("activeSection", activeSection)
    }, [activeSection])

    useEffect(() => {
        setFirstName(getFirstNameToken())
        setLastName(getLastNameToken())
    }, [])

    const renderContent = () => {
        switch (activeSection) {
            case "dashboard":
                return <AcceuilSection />
            case "organisation":
                return <OrganisationNavigationTabs />
            case "business":
                return <BusinessNavigationTabs />
            case "explorer":
                return <Explorer />

            case "parametres":
                return  <ProfilUser />

            default:
                return null
        }
    }

    return (
        <div className="flex flex-col h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            {/* Header */}
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
                                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
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
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            </div>

                            <div className="relative">
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="relative bg-white p-2 rounded-xl text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
                                    onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                                >
                                    <Bell className="h-6 w-6" />
                                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    4
                  </span>
                                </motion.button>
                            </div>

                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white flex items-center justify-center cursor-pointer shadow-lg"
                            >
                                {firstName && lastName && (
                                    <span className="font-semibold text-lg">
                    {firstName.charAt(0)}
                                        {lastName.charAt(0)}
                  </span>
                                )}
                            </motion.div>
                        </div>
                    </div>
                </div>
            </motion.header>

            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <motion.nav
                    initial={{ width: isSidebarOpen ? 256 : 64 }}
                    animate={{ width: isSidebarOpen ? 256 : 64 }}
                    transition={{ duration: 0.3 }}
                    className={`bg-white shadow-xl flex flex-col z-20 ${isSidebarOpen ? "" : "absolute inset-y-0 left-0"}`}
                >
                    <div className="flex-grow overflow-y-auto p-6">
                        <nav className="space-y-4">
                            {navItems.map((item) => (
                                <motion.button
                                    key={item.id}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => setActiveSection(item.id)}
                                    className={`w-full p-3 rounded-xl transition-all duration-300 group ${
                                        activeSection === item.id
                                            ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg`
                                            : "bg-white text-gray-600 hover:bg-gray-50"
                                    } ${isSidebarOpen ? "flex items-center" : "flex justify-center"}`}
                                >
                                    <item.icon className={`w-5 h-5 ${isSidebarOpen ? "mr-3" : ""}`} />
                                    {isSidebarOpen && (
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
                            className={`w-full p-3 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center ${isSidebarOpen ? "justify-center" : ""}`}
                        >
                            <LogOut className="w-5 h-5" />
                            {isSidebarOpen && <span className="font-medium ml-2">Déconnexion</span>}
                        </motion.button>
                    </div>
                </motion.nav>

                {/* Main Content */}
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

                {/* Notifications Panel */}
                <AnimatePresence>
                    {isNotificationOpen && (
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
                                        <h3 className="text-xl font-bold text-gray-800">{t("notifications")}</h3>
                                        <p className="text-sm text-gray-500">Vous avez 4 nouvelles notifications</p>
                                    </div>
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => setIsNotificationOpen(false)}
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
                                    {t("voir_toutes_les_notifications")}
                                </motion.button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Footer */}
            {/*<footer className="bg-white border-t border-gray-100 py-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <div className="text-center md:text-left">
                            <h3 className="font-bold text-lg mb-2">SyndicManager</h3>
                            <p className="text-sm text-gray-500">
                                &copy; 2023 Syndicat des Taxi. Tous droits réservés.
                            </p>
                        </div>

                        <div className="flex space-x-6">
                            <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors duration-200">
                                Conditions d'utilisation
                            </a>
                            <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors duration-200">
                                Politique de confidentialité
                            </a>
                        </div>
                    </div>
                </div>
            </footer>*/}

            {/* <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="fixed bottom-8 right-8 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center"
            >
                <PlusCircle className="w-5 h-5 mr-2" />
                <span className="font-medium">Nouveau Syndicat</span>
            </motion.button>*/}
        </div>
    )
}

