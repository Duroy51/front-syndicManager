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
import {Header} from "./localcomponent/Header.jsx"
import {NotificationsPanel} from "./localcomponent/NotificationPanel.jsx"
import {Sidebar} from "./localcomponent/SideBar.jsx";







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
            dashboard: <AcceuilSection />,
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
