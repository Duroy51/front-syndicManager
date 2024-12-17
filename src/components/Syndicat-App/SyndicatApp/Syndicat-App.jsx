import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Calendar, MessageSquare, Vote, CreditCard, Handshake,
    Home, Bell, ChevronRight, Search, LogOut, Facebook,
    Twitter, Linkedin, Mail, Settings, HelpCircle, User,
    Menu, X, AlertCircle, CheckCircle, TrendingUp, Users,
    MessageCircle, Info, Building, BadgeCheck
} from 'lucide-react'
import {EventsList} from "../Evenement/Evenement";
import {VotesList} from "../Vote/VoteSpace";
import {ChatBox} from "../Chat/ChatBox";
import {Finances} from "../Cotisations/Finances";
import {Partnerships} from "../Partenaire/Partenaires";
import {useNavigate} from "react-router-dom";
import {MemberManagement} from "../../Membres/Membres";
import {Publications} from "../s'exprimer/Publication";


export const SyndicatApp = () => {
    const [activeSection, setActiveSection] = useState('événements')
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)
    const [isNotificationOpen, setIsNotificationOpen] = useState(false)
    const navigate = useNavigate();
    const navItems = [
        { id: 'membres', icon: Users, label: 'Membres' },
        { id: 'événements', icon: Calendar, label: 'Événements' },
        { id: 'exprimer', icon: MessageCircle, label: "S'exprimer" },
        { id: 'chat', icon: MessageSquare, label: 'Chat' },
        { id: 'votes', icon: Vote, label: 'Votes' },
        { id: 'contributions', icon: CreditCard, label: 'Cotisations' },
        { id: 'partnerships', icon: Handshake, label: 'Partenariats' },
        { id: 'about', icon: Info, label: 'À propos' },
    ]

    const renderContent = () => {
        switch (activeSection) {
            case 'membres':
                return <MemberManagement></MemberManagement>
            case 'événements':
                return <EventsList />
            case 'exprimer':
                return <Publications></Publications>
            case 'chat':
                return <ChatBox />
            case 'votes':
                return <VotesList />
            case 'contributions':
                return <Finances />
            case 'partnerships':
                return <Partnerships />
            case 'about':
                return <h1>About</h1>
            default:
                return <div>Bienvenue sur la page d'accueil</div>
        }
    }

    return (
        <div className="flex flex-col h-screen bg-white">
            {/* Header */}
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
                            <Building className="h-8 w-8 text-sky-400" />

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
                           {/* <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Rechercher..."
                                    className="w-full pl-10 pr-4 py-2 border border-blue-300 rounded-md leading-5 bg-white text-blue-600 placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Search className="h-5 w-5 text-blue-400" />
                                </div>
                            </div>*/}
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="bg-white p-2 rounded-full text-blue-600 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                            >
                                <Bell className="h-6 w-6" />
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="bg-white p-2 rounded-full text-blue-600 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                onClick={() => navigate('/syndicat-app/profil')}
                            >
                                <BadgeCheck  className="h-6 w-6" />
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="bg-white p-2 rounded-full text-blue-600 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                onClick={() => {}}
                            >
                                <LogOut className="h-6 w-6" />
                            </motion.button>
                        </div>
                    </div>
                </div>
            </motion.header>

            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <motion.div
                    initial={{x: isSidebarOpen ? 0 : -300}}
                    animate={{x: isSidebarOpen ? 0 : -300}}
                    transition={{duration: 0.3}}
                    className={`w-64 bg-white shadow-lg flex flex-col z-20 ${isSidebarOpen ? '' : 'absolute inset-y-0 left-0'}`}
                >
                    {/*<div className="p-6 border-b border-gray-200">
                        <h1 className="text-2xl font-bold text-blue-600">Syndicat des Taxi</h1>
                    </div>*/}
                    <div className="flex-grow overflow-y-auto">
                        <nav className="mt-6">
                            {navItems.map((item) => (
                                <motion.button
                                    key={item.id}
                                    whileHover={{x: 5}}
                                    whileTap={{scale: 0.95}}
                                    className={`flex items-center w-full px-6 py-3 text-left transition-colors duration-200 ${
                                        activeSection === item.id
                                            ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600'
                                            : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                                    onClick={() => setActiveSection(item.id)}
                                >
                                    <item.icon className="mr-3 h-5 w-5"/>
                                    {item.label}
                                </motion.button>
                            ))}
                        </nav>
                    </div>
                    {/*<div className="p-4 border-t border-gray-200">
                        <motion.button
                            whileHover={{scale: 1.05}}
                            whileTap={{scale: 0.95}}
                            className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            onClick={() => navigate('/home')}
                        >
                            <Home className="mr-2 h-4 w-4"/>
                            Acceuil
                        </motion.button>
                    </div>*/}
                </motion.div>

                {/* Main content */}
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

                {/* Notification Panel */}
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
                                <div className="flex items-center p-2 bg-blue-50 rounded-md">
                                    <AlertCircle className="h-5 w-5 text-blue-500 mr-2"/>
                                    <span className="text-sm">Nouvelle réunion planifiée</span>
                                </div>
                                <div className="flex items-center p-2 bg-green-50 rounded-md">
                                    <CheckCircle className="h-5 w-5 text-green-500 mr-2"/>
                                    <span className="text-sm">Cotisation reçue</span>
                                </div>
                                <div className="flex items-center p-2 bg-yellow-50 rounded-md">
                                    <TrendingUp className="h-5 w-5 text-yellow-500 mr-2"/>
                                    <span className="text-sm">Rapport mensuel disponible</span>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Footer */}
            <footer className="bg-blue-600 text-white py-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                    <p className="text-sm">&copy; 2023 Syndicat des Taxi. Tous droits réservés.</p>
                    <div className="flex space-x-4">
                        <motion.a
                            href="#"
                            className="text-white hover:text-blue-200 transition-colors duration-200"
                            whileHover={{scale: 1.2}}
                            whileTap={{scale: 0.9}}
                        >
                            <Facebook className="h-5 w-5"/>
                        </motion.a>
                        <motion.a
                            href="#"
                            className="text-white hover:text-blue-200 transition-colors duration-200"
                            whileHover={{scale: 1.2}}
                            whileTap={{scale: 0.9}}
                        >
                            <Twitter className="h-5 w-5"/>
                        </motion.a>
                        <motion.a
                            href="#"
                            className="text-white hover:text-blue-200 transition-colors duration-200"
                            whileHover={{scale: 1.2}}
                            whileTap={{scale: 0.9}}
                        >
                            <Linkedin className="h-5 w-5"/>
                        </motion.a>
                        <motion.a
                            href="#"
                            className="text-white hover:text-blue-200 transition-colors duration-200"
                            whileHover={{scale: 1.2}}
                            whileTap={{scale: 0.9}}
                        >
                            <Mail className="h-5 w-5"/>
                        </motion.a>
                    </div>
                </div>
            </footer>
        </div>
    )
}
