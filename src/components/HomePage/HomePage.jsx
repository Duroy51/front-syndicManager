
import React, {useEffect, useState} from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    Building,
    Search,
    Bell,
    Settings,
    Home,
    Users,
    Compass,
    PlusCircle,
    ChevronRight,
    Calendar,
    FileText,
    MessageSquare,
    Vote,
    CreditCard,
    Handshake,
    LogOut,
    Menu,
    X,
    AlertCircle,
    CheckCircle,
    TrendingUp,
} from "lucide-react"
import {AcceuilSection} from "@/components/HomePage/AcceuilSection.jsx";
import {getFirstNameToken, getLastNameToken} from "@/services/AccountService.js";
import {MesSyndicats} from "@/components/HomePage/MesSyndicatSection.jsx";
import {Explorer} from "./ExploreSection.jsx";

const associations = [
    { id: 1, name: "Syndicat des Enseignants", members: 1200 },
    { id: 2, name: "Association des Infirmiers", members: 850 },
    { id: 3, name: "Union des Travailleurs du Bâtiment", members: 2100 },
    { id: 4, name: "Collectif des Artistes Indépendants", members: 650 },
    { id: 5, name: "Fédération des Commerçants", members: 1500 },
    { id: 6, name: "Syndicat des Transports Publics", members: 950 },
]

const navItems = [
    { id: "dashboard", icon: Home, label: "Accueil" },
    { id: "syndicats", icon: Users, label: "Mes Syndicats" },
    { id: "explorer", icon: Compass, label: "Explorer" },
    { id: "parametres", icon: Settings , label: "Paramètres" },
]

export const HomePage = () => {
    const [activeSection, setActiveSection] = useState("dashboard")
    const [searchTerm, setSearchTerm] = useState("")
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)
    const [isNotificationOpen, setIsNotificationOpen] = useState(false)


    const [lastName, setLastName] = useState(null);
    const [firstName, setFirstName] = useState(null);

    useEffect(() => {
        const firstName = getFirstNameToken();
        setFirstName(firstName);
    }, []);

    useEffect(() => {
        const lastName = getLastNameToken();
        setLastName(lastName);
    }, []);

    const renderContent = () => {
        switch (activeSection) {
            case 'dashboard':
                return <AcceuilSection></AcceuilSection>
            case 'syndicats':
                return <MesSyndicats></MesSyndicats>
            case 'explorer':
                return <Explorer></Explorer>
            case 'parametres':
                return <h1>Parametres</h1>
        }
    }
    return (
        <div className="flex flex-col h-screen bg-gray-50">

            {/*Header*/}
            <motion.header
                className="bg-white text-blue-600 shadow-md z-20"
                initial={{ y: -50 }}
                animate={{ y: 0 }}
                transition={{ type: "spring", stiffness: 100 }}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center">
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                                className="text-blue-600 focus:outline-none focus:text-blue-800 lg:hidden"
                            >
                                {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                            </motion.button>
                            <Building className="h-8 w-8 text-blue-600" />
                            <motion.h1
                                className="ml-2 text-2xl font-bold leading-7 sm:text-3xl sm:truncate"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                            >
                                SyndicManager
                            </motion.h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Rechercher..."
                                    className="w-full pl-10 pr-4 py-2 border border-blue-300 rounded-md leading-5 bg-white text-blue-600 placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Search className="h-5 w-5 text-blue-400" />
                                </div>
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="bg-white p-2 rounded-full text-blue-600 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                            >
                                <Bell className="h-6 w-6" />
                            </motion.button>
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center cursor-pointer hover:bg-blue-500 transition-colors duration-200"
                            >
                {/*<span className="font-semibold text-lg">
                  {firstName.charAt(0)}
                    {lastName.charAt(0)}
                </span>*/}
                            </motion.div>
                        </div>
                    </div>
                </div>
            </motion.header>

            {/*SideBar*/}
            <div className="flex flex-1 overflow-hidden">
                <motion.nav
                    initial={{x: isSidebarOpen ? 0 : -300}}
                    animate={{x: isSidebarOpen ? 0 : -300}}
                    transition={{duration: 0.3}}
                    className={`w-64 bg-blue-600 text-white shadow-lg flex flex-col z-10 ${isSidebarOpen ? "" : "absolute inset-y-0 left-0"}`}
                >
                    <div className="flex-grow overflow-y-auto">
                        <div className="px-4 py-6 border-b border-blue-500">
                            <h2 className="text-lg font-semibold text-white">Navigation</h2>
                        </div>
                        <nav className="mt-6">
                            {navItems.map((item) => (
                                <motion.button
                                    key={item.id}
                                    whileHover={{x: 5, backgroundColor: "rgba(255, 255, 255, 0.1)"}}
                                    whileTap={{scale: 0.95}}
                                    className={`flex items-center w-full px-6 py-3 text-left transition-colors duration-200 ${
                                        activeSection === item.id ? "bg-blue-700 text-white" : "text-blue-100 hover:bg-blue-500"
                                    }`}
                                    onClick={() => setActiveSection(item.id)}
                                >
                                    <item.icon className="mr-3 h-5 w-5"/>
                                    {item.label}
                                </motion.button>
                            ))}
                        </nav>
                    </div>
                    <div className="p-4 border-t border-blue-500">
                        <motion.button
                            whileHover={{scale: 1.05}}
                            whileTap={{scale: 0.95}}
                            className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-blue-600 bg-white rounded-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            <LogOut className="mr-2 h-4 w-4"/>
                            Déconnexion
                        </motion.button>
                    </div>
                </motion.nav>

                {/* Main content */}
                {/*<main className="flex-1 overflow-y-auto bg-gray-50 p-6">
                    <div className="max-w-7xl mx-auto">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeSection}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.2 }}
                            >
                                <motion.h2
                                    className="text-3xl font-bold mb-8 text-blue-600"
                                    initial={{ x: -20 }}
                                    animate={{ x: 0 }}
                                    transition={{ type: "spring", stiffness: 100 }}
                                >
                                    Bienvenue, {user.firstName} {user.lastName} !
                                </motion.h2>
                                {activeSection === "dashboard" && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {associations.map((association) => (
                                            <AssociationCard key={association.id} association={association} />
                                        ))}
                                    </div>
                                )}
                                 Add other section content here
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </main>*/}
                <main className="flex-1 overflow-y-auto bg-white p-6">
                    <div className="max-w-7xl mx-auto">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeSection}
                                initial={{opacity: 0, y: 20}}
                                animate={{opacity: 1, y: 0}}
                                exit={{opacity: 0, y: -20}}
                                transition={{duration: 0.2}}
                            >

                                {renderContent()}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </main>

                <AnimatePresence>
                    {isNotificationOpen && (
                        <motion.div
                            initial={{opacity: 0, x: 300}}
                            animate={{opacity: 1, x: 0}}
                            exit={{opacity: 0, x: 300}}
                            transition={{type: "spring", stiffness: 100}}
                            className="fixed right-0 top-0 h-full w-64 bg-white shadow-lg z-30 p-4"
                        >
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold">Notifications</h3>
                                <motion.button
                                    whileHover={{scale: 1.1}}
                                    whileTap={{scale: 0.9}}
                                    onClick={() => setIsNotificationOpen(false)}
                                >
                                    <X className="h-5 w-5"/>
                                </motion.button>
                            </div>
                            <div className="space-y-4">
                                <NotificationItem icon={AlertCircle} message="Nouvelle réunion planifiée" color="blue"/>
                                <NotificationItem icon={CheckCircle} message="Cotisation reçue" color="green"/>
                                <NotificationItem icon={TrendingUp} message="Rapport mensuel disponible"
                                                  color="yellow"/>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <footer className="bg-white border-t border-gray-200 py-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                    <p className="text-sm text-gray-500">&copy; 2023 SyndicManager. Tous droits réservés.</p>
                    <div className="flex space-x-4">
                        <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors duration-200">
                            Conditions d'utilisation
                        </a>
                        <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors duration-200">
                            Politique de confidentialité
                        </a>
                    </div>
                </div>
            </footer>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="fixed bottom-8 right-8 bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center"
            >
                <PlusCircle className="h-6 w-6 mr-2" />
                <span className="font-semibold">Nouveau Syndicat</span>
            </motion.button>
        </div>
    )
}


function NotificationItem({ icon: Icon, message, color }) {
    return (
        <motion.div
            className={`flex items-center p-2 bg-${color}-50 rounded-md`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <Icon className={`h-5 w-5 text-${color}-500 mr-2`} />
            <span className="text-sm">{message}</span>
        </motion.div>
    )
}

