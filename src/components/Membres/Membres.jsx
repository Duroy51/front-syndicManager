import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Users, UserPlus, UserMinus, UserX, Search, Filter,
    Check, X, AlertTriangle, MoreHorizontal, Eye, Edit,
    Mail, Phone, MapPin, Calendar, Building, Shield,
    ChevronRight, Star, Award, TrendingUp, UserCheck
} from 'lucide-react';

const StatCard = ({ icon: Icon, value, label, color }) => (
    <motion.div
        whileHover={{ scale: 1.05 }}
        className={`bg-white p-6 rounded-2xl shadow-lg border-l-4 ${color}`}
    >
        <div className="flex items-center">
            <div className={`p-3 rounded-xl ${color.replace('border-', 'bg-').replace('-500', '-100')}`}>
                <Icon className={`w-6 h-6 ${color.replace('border-', 'text-')}`} />
            </div>
            <div className="ml-4">
                <div className="text-2xl font-bold text-gray-800">{value}</div>
                <div className="text-sm text-gray-600">{label}</div>
            </div>
        </div>
    </motion.div>
);

const TabButton = ({ active, icon: Icon, label, onClick }) => (
    <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
        className={`flex items-center px-6 py-3 rounded-xl transition-all duration-300 ${
            active
                ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50'
        }`}
    >
        <Icon className={`w-5 h-5 mr-2 ${active ? 'text-white' : 'text-blue-500'}`} />
        <span className="font-medium">{label}</span>
        {active && (
            <motion.div
                className="ml-2 bg-white rounded-full w-2 h-2"
                layoutId="activeTab"
            />
        )}
    </motion.button>
);

export const MemberManagement = () => {
    const [activeTab, setActiveTab] = useState('members');
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [selectedAction, setSelectedAction] = useState(null);
    const [selectedMember, setSelectedMember] = useState(null);

    const members = [
        { id: 1, name: 'Jean Dupont', email: 'jean@example.com', phone: '0123456789', address: '123 Rue de Paris', joinDate: '2021-05-15', status: 'active', role: 'Membre Senior', contributions: '12/12' },
        { id: 2, name: 'Marie Curie', email: 'marie@example.com', phone: '0987654321', address: '456 Avenue des Sciences', joinDate: '2020-11-23', status: 'active', role: 'Membre du Bureau', contributions: '12/12' },
        { id: 3, name: 'Pierre Martin', email: 'pierre@example.com', phone: '0654321987', address: '789 Boulevard du Progrès', joinDate: '2022-02-01', status: 'suspended', role: 'Membre', contributions: '8/12' },
    ];

    const membershipRequests = [
        { id: 1, name: 'Sophie Lefebvre', email: 'sophie@example.com', phone: '0612345678', requestDate: '2023-06-01', motivation: 'Je souhaite rejoindre le syndicat pour contribuer activement à la défense des droits des travailleurs.' },
        { id: 2, name: 'Lucas Dubois', email: 'lucas@example.com', phone: '0698765432', requestDate: '2023-06-02', motivation: 'Fort de mon expérience dans le domaine, je pense pouvoir apporter une perspective utile au syndicat.' },
    ];

    const handleAction = (action, member) => {
        setSelectedAction(action);
        setSelectedMember(member);
        setShowConfirmModal(true);
    };

    const confirmAction = () => {
        console.log(`Confirmed ${selectedAction} for member:`, selectedMember);
        setShowConfirmModal(false);
    };

    const renderMembers = () => {
        const filteredMembers = members.filter(member =>
            member.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (filterStatus === 'all' || member.status === filterStatus)
        );

        return (
            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard
                        icon={Users}
                        value={members.length}
                        label="Membres actifs"
                        color="border-blue-500"
                    />
                    <StatCard
                        icon={UserCheck}
                        value="95%"
                        label="Taux de participation"
                        color="border-green-500"
                    />
                    <StatCard
                        icon={Award}
                        value="12"
                        label="Membres du bureau"
                        color="border-purple-500"
                    />
                    <StatCard
                        icon={TrendingUp}
                        value="+15%"
                        label="Croissance mensuelle"
                        color="border-orange-500"
                    />
                </div>

                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead>
                                <tr className="bg-gradient-to-r from-blue-50 to-indigo-50">
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Membre</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Contact</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Rôle</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Statut</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                <AnimatePresence>
                                    {filteredMembers.map(member => (
                                        <motion.tr
                                            key={member.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            className="hover:bg-gray-50 transition-colors duration-200"
                                        >
                                            <td className="px-6 py-4">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0">
                                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold text-lg">
                                                            {member.name.charAt(0)}
                                                        </div>
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-semibold text-gray-900">{member.name}</div>
                                                        <div className="text-sm text-gray-500 flex items-center">
                                                            <Calendar className="w-4 h-4 mr-1 text-blue-500" />
                                                            Depuis {member.joinDate}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-gray-900 flex items-center mb-1">
                                                    <Mail className="w-4 h-4 mr-2 text-blue-500" />
                                                    {member.email}
                                                </div>
                                                <div className="text-sm text-gray-900 flex items-center">
                                                    <Phone className="w-4 h-4 mr-2 text-green-500" />
                                                    {member.phone}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center">
                                                    <Shield className="w-4 h-4 mr-2 text-purple-500" />
                                                    <span className="text-sm text-gray-900">{member.role}</span>
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    Cotisations : {member.contributions}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                                    member.status === 'active'
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-red-100 text-red-800'
                                                }`}>
                                                    {member.status === 'active' ? 'Actif' : 'Suspendu'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex space-x-3">
                                                    <motion.button
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.9 }}
                                                        className="p-2 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors duration-200"
                                                    >
                                                        <Eye className="w-5 h-5" />
                                                    </motion.button>
                                                    <motion.button
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.9 }}
                                                        className="p-2 rounded-xl bg-purple-50 text-purple-600 hover:bg-purple-100 transition-colors duration-200"
                                                    >
                                                        <Edit className="w-5 h-5" />
                                                    </motion.button>
                                                    <motion.button
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.9 }}
                                                        className="p-2 rounded-xl bg-yellow-50 text-yellow-600 hover:bg-yellow-100 transition-colors duration-200"
                                                        onClick={() => handleAction('suspend', member)}
                                                    >
                                                        <AlertTriangle className="w-5 h-5" />
                                                    </motion.button>
                                                    <motion.button
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.9 }}
                                                        className="p-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-colors duration-200"
                                                        onClick={() => handleAction('remove', member)}
                                                    >
                                                        <UserX className="w-5 h-5" />
                                                    </motion.button>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </AnimatePresence>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    };

    const renderMembershipRequests = () => (
        <div className="space-y-6">
            <AnimatePresence>
                {membershipRequests.map(request => (
                    <motion.div
                        key={request.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                    >
                        <div className="p-6">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center">
                                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold">
                                        {request.name.charAt(0)}
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-xl font-semibold text-gray-800">{request.name}</h3>
                                        <div className="mt-1 space-y-1">
                                            <div className="flex items-center text-gray-600">
                                                <Mail className="w-4 h-4 mr-2 text-blue-500" />
                                                {request.email}
                                            </div>
                                            <div className="flex items-center text-gray-600">
                                                <Phone className="w-4 h-4 mr-2 text-green-500" />
                                                {request.phone}
                                            </div>
                                            <div className="flex items-center text-gray-600">
                                                <Calendar className="w-4 h-4 mr-2 text-purple-500" />
                                                Demande soumise le {request.requestDate}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex space-x-3">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                                    >
                                        <Check className="w-5 h-5" />
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                                    >
                                        <X className="w-5 h-5" />
                                    </motion.button>
                                </div>
                            </div>
                            <div className="mt-4 p-4 bg-gray-50 rounded-xl">
                                <h4 className="text-sm font-medium text-gray-700 mb-2">Motivation :</h4>
                                <p className="text-gray-600">{request.motivation}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-6">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-between mb-12"
                >
                    <div>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            Gestion des Membres
                        </h1>
                        <p className="text-gray-600 mt-2">
                            Gérez efficacement les membres et les demandes d'adhésion
                        </p>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center"
                    >
                        <UserPlus className="w-5 h-5 mr-2" />
                        Ajouter un membre
                    </motion.button>
                </motion.div>

                <div className="mb-8 space-x-4 flex">
                    <TabButton
                        active={activeTab === 'members'}
                        icon={Users}
                        label="Membres"
                        onClick={() => setActiveTab('members')}
                    />
                    <TabButton
                        active={activeTab === 'requests'}
                        icon={UserPlus}
                        label="Demandes d'adhésion"
                        onClick={() => setActiveTab('requests')}
                    />
                </div>

                {activeTab === 'members' && (
                    <div className="mb-8 flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-1">
                            <input
                                type="text"
                                placeholder="Rechercher un membre..."
                                className="w-full pl-12 pr-4 py-3 bg-white rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all duration-200"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>
                        <div className="relative w-full sm:w-64">
                            <select
                                className="w-full pl-12 pr-4 py-3 bg-white rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all duration-200 appearance-none"
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                            >
                                <option value="all">Tous les statuts</option>
                                <option value="active">Actif</option>
                                <option value="suspended">Suspendu</option>
                            </select>
                            <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>
                    </div>
                )}

                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        {activeTab === 'members' ? renderMembers() : renderMembershipRequests()}
                    </motion.div>
                </AnimatePresence>

                <AnimatePresence>
                    {showConfirmModal && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50"
                            onClick={() => setShowConfirmModal(false)}
                        >
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl"
                                onClick={e => e.stopPropagation()}
                            >
                                <div className="flex items-center mb-6">
                                    <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                                        <AlertTriangle className="w-6 h-6 text-red-600" />
                                    </div>
                                    <div className="ml-4">
                                        <h2 className="text-2xl font-bold text-gray-800">Confirmer l'action</h2>
                                        <p className="text-gray-600">Cette action ne peut pas être annulée</p>
                                    </div>
                                </div>
                                <p className="text-gray-700 mb-8">
                                    Êtes-vous sûr de vouloir {selectedAction === 'suspend' ? 'suspendre' : 'retirer'} le membre <span className="font-semibold">{selectedMember?.name}</span> ?
                                </p>
                                <div className="flex justify-end space-x-4">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="px-6 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors duration-200"
                                        onClick={() => setShowConfirmModal(false)}
                                    >
                                        Annuler
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="px-6 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                                        onClick={confirmAction}
                                    >
                                        Confirmer
                                    </motion.button>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};