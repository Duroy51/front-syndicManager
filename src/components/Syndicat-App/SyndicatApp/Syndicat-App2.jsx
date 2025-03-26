import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {EventsList} from "../Evenement/Evenement";
import {ChatBox} from "../Chat/ChatBox";
import {VotesList} from "../Vote/VoteSpace";
import {ContributionsList, Finances} from "../t("cotisations")/Finances";
import {PartnershipsList} from "../Partenaire/Partenaires";
import { Calendar, MessageSquare, Vote, CreditCard, Handshake, Home, Bell, User, LogOut, ChevronRight, Search } from 'lucide-react'
import {useNavigate} from "react-router-dom";
import {Footer} from "./Footer"
import { useTranslation } from "react-i18next";
import i18n from '../../../i18n';


export const SyndicatApp2 = () => {
    const { t } = useTranslation();
    const [activeSection, setActiveSection] = useState('événements')
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)
    const navigate = useNavigate();
    const navItems = [
        { id: 'événements', icon: Calendar, label: t("evenements") },
        { id: 'chat', icon: MessageSquare, label: t("chat") },
        { id: 'votes', icon: Vote, label: t("votes") },
        { id: 'contributions', icon: CreditCard, label: t("cotisations") },
        { id: 'partnerships', icon: Handshake, label: t("partenariats") },
    ]

    const renderContent = () => {
        switch (activeSection) {
            case 'événements':
                return <EventsList />
            case 'chat':
                return <ChatBox />
            case 'votes':
                return <VotesList />
            case 'contributions':
                return <Finances />
            case 'partnerships':
                return  <PartnershipsList />
            default:
                return <div>Bienvenue sur la page d'accueil</div>
        }
    }

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            <div className="flex h-screen bg-gray-100">

                {/* Sidebar */}
                <motion.div
                    initial={{ x: isSidebarOpen ? 0 : -300 }}
                    animate={{ x: isSidebarOpen ? 0 : -300 }}
                    transition={{ duration: 0.3 }}
                    className={`w-64 bg-white shadow-lg flex flex-col z-20 ${isSidebarOpen ? '' : 'absolute inset-y-0 left-0'}`}
                >
                    <div className="p-6 border-b border-gray-200">
                        <h1 className="text-2xl font-bold text-blue-600">Syndicat des Taxi</h1>
                    </div>
                    <div className="flex-grow overflow-y-auto">
                        <nav className="mt-6">
                            {navItems.map((item) => (
                                <motion.button
                                    key={item.id}
                                    whileHover={{ x: 5 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`flex items-center w-full px-6 py-3 text-left transition-colors duration-200 ${
                                        activeSection === item.id
                                            ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600'
                                            : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                                    onClick={() => setActiveSection(item.id)}
                                >
                                    <item.icon className="mr-3 h-5 w-5" />
                                    {item.label}
                                </motion.button>
                            ))}
                        </nav>
                    </div>
                    <div className="p-4 border-t border-gray-200">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            onClick={() => navigate('/home')}
                        >
                            <Home className="mr-2 h-4 w-4" />
                            {t("accueil")}
                        </motion.button>
                    </div>
                </motion.div>

                {/* Main content */}
                <div className="flex-1 flex flex-col overflow-hidden">
                    {/* Header */}
                    <header className="bg-white shadow-sm z-10">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex justify-between items-center py-4">
                                <div className="flex items-center">
                                    <button
                                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                                        className="text-gray-500 focus:outline-none focus:text-gray-600 lg:hidden"
                                    >
                                        <ChevronRight className={`h-6 w-6 transition-transform duration-200 ${isSidebarOpen ? 'transform rotate-180' : ''}`} />
                                    </button>
                                    <h2 className="ml-2 text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                                        {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
                                    </h2>
                                </div>
                                <div className="flex items-center">

                                    <button className="ml-4 bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                        <Bell className="h-6 w-6" />
                                    </button>

                                </div>
                            </div>
                        </div>
                    </header>

                    {/* Page content */}
                    <main className="flex-1 overflow-y-auto bg-gray-100 p-6">
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
                </div>

            </div>
            <Footer></Footer>
        </div>
    )
}