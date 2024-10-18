import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Users, UserPlus, UserMinus, UserX, Search, Filter,
    Check, X, AlertTriangle, MoreHorizontal, Eye, Edit,
    Mail, Phone, MapPin, Calendar
} from 'lucide-react'

export const MemberManagement = () => {
    const [activeTab, setActiveTab] = useState('members')
    const [searchTerm, setSearchTerm] = useState('')
    const [filterStatus, setFilterStatus] = useState('all')
    const [showConfirmModal, setShowConfirmModal] = useState(false)
    const [selectedAction, setSelectedAction] = useState(null)
    const [selectedMember, setSelectedMember] = useState(null)

    const members = [
        { id: 1, name: 'Jean Dupont', email: 'jean@example.com', phone: '0123456789', address: '123 Rue de Paris', joinDate: '2021-05-15', status: 'active' },
        { id: 2, name: 'Marie Curie', email: 'marie@example.com', phone: '0987654321', address: '456 Avenue des Sciences', joinDate: '2020-11-23', status: 'active' },
        { id: 3, name: 'Pierre Martin', email: 'pierre@example.com', phone: '0654321987', address: '789 Boulevard du Progrès', joinDate: '2022-02-01', status: 'suspended' },
    ]

    const membershipRequests = [
        { id: 1, name: 'Sophie Lefebvre', email: 'sophie@example.com', phone: '0612345678', requestDate: '2023-06-01' },
        { id: 2, name: 'Lucas Dubois', email: 'lucas@example.com', phone: '0698765432', requestDate: '2023-06-02' },
    ]

    const handleAction = (action, member) => {
        setSelectedAction(action)
        setSelectedMember(member)
        setShowConfirmModal(true)
    }

    const confirmAction = () => {
        // Implement the actual action here
        console.log(`Confirmed ${selectedAction} for member:`, selectedMember)
        setShowConfirmModal(false)
    }

    const renderMembers = () => {
        const filteredMembers = members.filter(member =>
            member.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (filterStatus === 'all' || member.status === filterStatus)
        )

        return (
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead className="bg-gray-100">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Téléphone</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                    <AnimatePresence>
                        {filteredMembers.map(member => (
                            <motion.tr
                                key={member.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 h-10 w-10">
                                            <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                                                <span className="text-xl font-medium text-gray-700">{member.name[0]}</span>
                                            </div>
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900">{member.name}</div>
                                            <div className="text-sm text-gray-500">Membre depuis {member.joinDate}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{member.email}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{member.phone}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                            member.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                        }`}>
                                            {member.status === 'active' ? 'Actif' : 'Suspendu'}
                                        </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <div className="flex space-x-2">
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            className="text-indigo-600 hover:text-indigo-900"
                                            onClick={() => {/* Implement view details */}}
                                        >
                                            <Eye className="h-5 w-5" />
                                        </motion.button>
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            className="text-blue-600 hover:text-blue-900"
                                            onClick={() => {/* Implement edit */}}
                                        >
                                            <Edit className="h-5 w-5" />
                                        </motion.button>
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            className="text-yellow-600 hover:text-yellow-900"
                                            onClick={() => handleAction('suspend', member)}
                                        >
                                            <AlertTriangle className="h-5 w-5" />
                                        </motion.button>
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            className="text-red-600 hover:text-red-900"
                                            onClick={() => handleAction('remove', member)}
                                        >
                                            <UserX className="h-5 w-5" />
                                        </motion.button>
                                    </div>
                                </td>
                            </motion.tr>
                        ))}
                    </AnimatePresence>
                    </tbody>
                </table>
            </div>
        )
    }

    const renderMembershipRequests = () => (
        <div className="space-y-4">
            <AnimatePresence>
                {membershipRequests.map(request => (
                    <motion.div
                        key={request.id}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white p-4 rounded-lg shadow-md"
                    >
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="text-lg font-semibold">{request.name}</h3>
                                <p className="text-sm text-gray-500">{request.email} | {request.phone}</p>
                                <p className="text-sm text-gray-500">Demande soumise le : {request.requestDate}</p>
                            </div>
                            <div className="flex space-x-2">
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600"
                                    onClick={() => {/* Implement approve action */}}
                                >
                                    <Check className="h-5 w-5" />
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                                    onClick={() => {/* Implement reject action */}}
                                >
                                    <X className="h-5 w-5" />
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    )

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Gestion des Membres</h1>

            <div className="mb-6">
                <div className="flex space-x-4">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`px-4 py-2 rounded-md ${activeTab === 'members' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                        onClick={() => setActiveTab('members')}
                    >
                        <Users className="inline-block mr-2 h-5 w-5" />
                        Membres
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`px-4 py-2 rounded-md ${activeTab === 'requests' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                        onClick={() => setActiveTab('requests')}
                    >
                        <UserPlus className="inline-block mr-2 h-5 w-5" />
                        Demandes d'adhésion
                    </motion.button>
                </div>
            </div>

            {activeTab === 'members' && (
                <div className="mb-6 flex justify-between">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Rechercher un membre..."
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                    <div className="relative">
                        <select
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                        >
                            <option value="all">Tous les statuts</option>
                            <option value="active">Actif</option>
                            <option value="suspended">Suspendu</option>
                        </select>
                        <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
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

            {showConfirmModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="bg-white p-6 rounded-lg shadow-xl"
                    >
                        <h2 className="text-xl font-bold mb-4">Confirmer l'action</h2>
                        <p className="mb-6">
                            Êtes-vous sûr de vouloir {selectedAction === 'suspend' ? 'suspendre' : 'retirer'} le membre {selectedMember?.name} ?
                        </p>
                        <div className="flex justify-end space-x-4">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md"
                                onClick={() => setShowConfirmModal(false)}
                            >
                                Annuler
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-4 py-2 bg-red-500 text-white rounded-md"
                                onClick={confirmAction}
                            >
                                Confirmer
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>

    )
}

