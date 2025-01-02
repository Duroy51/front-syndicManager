import React, { useState, useEffect } from 'react';
import { Bell, Building, ChevronDown } from 'lucide-react';
import DashboardSection from './DashboardSection';
import SearchSection from './SearchSection';

const userSyndicats = [
    { id: 1, name: "Syndicat des Travailleurs du Numérique", members: 1500, newMessages: 3 },
    { id: 2, name: "Union des Développeurs Indépendants", members: 750, newMessages: 1 },
    { id: 3, name: "Collectif des Designers UX/UI", members: 1200, newMessages: 0 }
];

const allSyndicats = [
    ...userSyndicats,
    { id: 4, name: "Association des Data Scientists", members: 980, newMessages: 5 },
    { id: 5, name: "Syndicat des Ingénieurs en IA", members: 600, newMessages: 2 }
];

const notifications = [
    { id: 1, content: "Nouvelle réunion planifiée pour le Syndicat des Travailleurs du Numérique", time: "Il y a 1 heure" },
    { id: 2, content: "Votre demande d'adhésion à l'Union des Développeurs Indépendants a été acceptée", time: "Il y a 3 heures" },
    { id: 3, content: "Nouveau sondage disponible dans le Collectif des Designers UX/UI", time: "Il y a 1 jour" }
];

export const HomePage  = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showNotifications, setShowNotifications] = useState(false);
    const [activeTab, setActiveTab] = useState('mes-syndicats');
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [lastReadNotification, setLastReadNotification] = useState(0);

    useEffect(() => {
        const handleSearch = () => {
            if (searchTerm) {
                setIsLoading(true);
                setTimeout(() => setIsLoading(false), 800);
            }
        };
        const debounce = setTimeout(handleSearch, 300);
        return () => clearTimeout(debounce);
    }, [searchTerm]);

    const unreadNotifications = notifications.length - lastReadNotification;

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            {/* Header */}
            <header className="bg-white shadow-lg sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center">
                            <Building className="h-8 w-8 text-blue-600 mr-2" />
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                SyndicManager
                            </h1>
                        </div>

                        <div className="flex items-center space-x-4">
                            {/* Notifications */}
                            <div className="relative">
                                <button
                                    onClick={() => setShowNotifications(!showNotifications)}
                                    className="relative p-2 text-gray-500 hover:text-blue-600 focus:outline-none transition-colors duration-200"
                                >
                                    <Bell className="h-6 w-6" />
                                    {unreadNotifications > 0 && (
                                        <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {unreadNotifications}
                    </span>
                                    )}
                                </button>

                                {showNotifications && (
                                    <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-xl">
                                        <div className="p-4 border-b">
                                            <h3 className="text-lg font-semibold">Notifications</h3>
                                        </div>
                                        <div className="max-h-96 overflow-y-auto">
                                            {notifications.map((notif) => (
                                                <div key={notif.id} className="p-4 hover:bg-gray-50">
                                                    <p className="text-sm">{notif.content}</p>
                                                    <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* User Menu */}
                            <div className="relative">
                                <button
                                    onClick={() => setShowUserMenu(!showUserMenu)}
                                    className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100"
                                >
                                    <img
                                        className="h-8 w-8 rounded-full object-cover"
                                        src="/api/placeholder/32/32"
                                        alt="User"
                                    />
                                    <span className="text-sm font-medium">John Doe</span>
                                    <ChevronDown className="h-4 w-4" />
                                </button>

                                {showUserMenu && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl">
                                        <div className="p-2">
                                            <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 rounded">
                                                Mon profil
                                            </button>
                                            <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 rounded">
                                                Paramètres
                                            </button>
                                            <div className="border-t my-2" />
                                            <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded">
                                                Déconnexion
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Navigation Tabs */}
                <div className="mb-8">
                    <div className="border-b border-gray-200">
                        <nav className="flex -mb-px">
                            <button
                                onClick={() => setActiveTab('mes-syndicats')}
                                className={`py-4 px-6 font-medium text-sm ${
                                    activeTab === 'mes-syndicats'
                                        ? 'border-b-2 border-blue-500 text-blue-600'
                                        : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                            >
                                Tableau de bord
                            </button>
                            <button
                                onClick={() => setActiveTab('recherche')}
                                className={`ml-8 py-4 px-6 font-medium text-sm ${
                                    activeTab === 'recherche'
                                        ? 'border-b-2 border-blue-500 text-blue-600'
                                        : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                            >
                                Rechercher
                            </button>
                        </nav>
                    </div>
                </div>

                {activeTab === 'mes-syndicats' ? (
                    <DashboardSection syndicats={userSyndicats} />
                ) : (
                    <SearchSection
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        isLoading={isLoading}
                        allSyndicats={allSyndicats}
                        userSyndicats={userSyndicats}
                    />
                )}
            </main>
        </div>
    );
};


