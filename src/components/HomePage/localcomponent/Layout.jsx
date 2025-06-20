"use client"
import { useState, useMemo } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { logout, getFirstNameToken, getLastNameToken, getProfilFromToken } from "../../../services/AccountService";
import { Header } from "./Header.jsx";
import { NotificationsPanel } from "./NotificationPanel.jsx";
import { Sidebar } from "./SideBar.jsx";

export const Layout = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const navigate = useNavigate();

    const userData = useMemo(() => ({
        firstName: getFirstNameToken(),
        lastName: getLastNameToken(),
        profile: getProfilFromToken(),
    }), []);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleProfileClick = () => {
        navigate('/parametres');
    };

    return (
        <div className="flex flex-col h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <Header
                isSidebarOpen={isSidebarOpen}
                searchTerm={searchTerm}
                userData={userData}
                onSidebarToggle={() => setIsSidebarOpen(!isSidebarOpen)}
                onSearchChange={setSearchTerm}
                onNotificationToggle={() => setIsNotificationOpen(!isNotificationOpen)}
                onProfileClick={handleProfileClick}
            />

            <div className="flex flex-1 overflow-hidden">
                <Sidebar
                    isOpen={isSidebarOpen}
                    onLogout={handleLogout}
                />

                <main className="flex-1 overflow-y-auto">
                    <div className="max-w-7xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Outlet />
                        </motion.div>
                    </div>
                </main>

                <NotificationsPanel
                    isOpen={isNotificationOpen}
                    onClose={() => setIsNotificationOpen(false)}
                />
            </div>
        </div>
    );
};
