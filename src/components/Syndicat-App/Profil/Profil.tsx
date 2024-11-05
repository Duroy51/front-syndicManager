'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { User, Building, Download, Upload, Eye, EyeOff, Phone, Mail, FileText, Users, MapPin, FileSignature, Book, ChevronDown, ArrowLeft } from 'lucide-react'

type BoardMember = {
    role: string;
    name: string;
    email: string;
    phone: string;
    photo: string;
    cv: string;
    isProfileVisible: boolean;
}

type SyndicatProfile = {
    name: string;
    headquarters: string;
    logo: string;
    statute: string;
    internalRules: string;
    boardMembers: Record<string, BoardMember>;
    memberCount: number;
}

const initialProfile: SyndicatProfile = {
    name: "Syndicat des Taxis de Yaoundé",
    headquarters: "123 Rue de la Paix, 75001 Melen",
    logo: "/placeholder.svg?height=100&width=100",
    statute: "statut.pdf",
    internalRules: "reglement-interieur.pdf",
    boardMembers: {
        president: {
            role: "Président", name: "Eric Koghene", email: "erickoghene@gmail.com",
            phone: "+231 1 23 45 67 89", photo: "/placeholder.svg?height=200&width=200",
            cv: "cv-jean-dupont.pdf", isProfileVisible: true
        },
        vicePresident: {
            role: "Vice-Président", name: "Marie Martin", email: "marie.martin@example.com",
            phone: "+237 1 98 76 54 32", photo: "/placeholder.svg?height=200&width=200",
            cv: "cv-marie-martin.pdf", isProfileVisible: true
        },
        treasurer: {
            role: "Trésorier", name: "Pierre Durand", email: "pierre.durand@example.com",
            phone: "+237 1 11 22 33 44", photo: "/placeholder.svg?height=200&width=200",
            cv: "cv-pierre-durand.pdf", isProfileVisible: true
        },
        secretary: {
            role: "Secrétaire Général", name: "Sophie Lefebvre", email: "sophie.lefebvre@example.com",
            phone: "+237 1 55 66 77 88", photo: "/placeholder.svg?height=200&width=200",
            cv: "cv-sophie-lefebvre.pdf", isProfileVisible: true
        },
        assistantSecretary: {
            role: "Secrétaire Général Adjoint", name: "Luc Moreau", email: "luc.moreau@example.com",
            phone: "+237 1 99 88 77 66", photo: "/placeholder.svg?height=200&width=200",
            cv: "cv-luc-moreau.pdf", isProfileVisible: true
        },
        assistantTreasurer: {
            role: "Trésorier Adjoint", name: "Claire Dubois", email: "claire.dubois@example.com",
            phone: "+237 1 44 33 22 11", photo: "/placeholder.svg?height=200&width=200",
            cv: "cv-claire-dubois.pdf", isProfileVisible: true
        },
    },
    memberCount: 1250
}

export const Profile = () =>  {
    const [profile, setProfile] = useState<SyndicatProfile>(initialProfile)
    const [editMode, setEditMode] = useState<boolean>(false)
    const [openAccordion, setOpenAccordion] = useState<string | null>(null)
    const [modalOpen, setModalOpen] = useState<boolean>(false)
    const [selectedMember, setSelectedMember] = useState<BoardMember | null>(null)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof SyndicatProfile): void => {
        setProfile(prev => ({ ...prev, [field]: e.target.value }))
    }

    const handleBoardMemberChange = (e: React.ChangeEvent<HTMLInputElement>, role: string, field: keyof BoardMember): void => {
        setProfile(prev => ({
            ...prev,
            boardMembers: {
                ...prev.boardMembers,
                [role]: { ...prev.boardMembers[role], [field]: e.target.value }
            }
        }))
    }

    const handleFileUpload = (field: 'logo' | 'statute' | 'internalRules'): void => {
        console.log(`Uploading new ${field}`)
    }

    const handleToggleProfileVisibility = (role: string): void => {
        setProfile(prev => ({
            ...prev,
            boardMembers: {
                ...prev.boardMembers,
                [role]: { ...prev.boardMembers[role], isProfileVisible: !prev.boardMembers[role].isProfileVisible }
            }
        }))
    }

    const downloadPDF = (filename: string): void => {
        console.log(`Downloading ${filename}`)
    }

    const toggleAccordion = (role: string): void => {
        setOpenAccordion(openAccordion === role ? null : role)
    }

    const openModal = (member: BoardMember): void => {
        setSelectedMember(member)
        setModalOpen(true)
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <header className="bg-white shadow-sm">
                <div className="container mx-auto px-4 py-4 flex items-center">
                    <button
                        onClick={() => window.history.back()}
                        className="mr-4 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        aria-label="Retour"
                    >
                        <ArrowLeft className="w-6 h-6 text-blue-600" />
                    </button>
                    <h1 className="text-xl font-semibold text-gray-800">Profil du Syndicat</h1>
                </div>
            </header>
            <main className="flex-grow container mx-auto px-4 py-8">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="p-6 sm:p-10">
                        <div className="flex flex-col sm:flex-row items-center justify-between mb-8">
                            <div className="flex items-center mb-4 sm:mb-0">
                                <img src={profile.logo} alt="Logo du Syndicat" className="w-20 h-20 object-cover rounded-full mr-6 border-4 border-blue-100" />
                                <div>
                                    <h2 className="text-3xl font-bold text-gray-800">{profile.name}</h2>
                                    <p className="text-lg text-gray-600 mt-1">
                                        <Users className="inline-block mr-2" size={20} />
                                        {profile.memberCount} membres
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => setEditMode(!editMode)}
                                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                                    editMode
                                        ? 'bg-green-500 text-white hover:bg-green-600'
                                        : 'bg-blue-500 text-white hover:bg-blue-600'
                                }`}
                            >
                                {editMode ? 'Enregistrer les modifications' : 'Modifier le profil'}
                            </button>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <motion.div
                                className="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-xl shadow-sm"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <h3 className="text-2xl font-semibold mb-6 text-indigo-800">Informations Générales</h3>
                                <div className="space-y-6">
                                    {(['name', 'headquarters'] as const).map(field => (
                                        <div key={field}>
                                            <label htmlFor={field} className="block text-sm font-medium text-gray-700 mb-1">
                                                {field === 'name' ? 'Nom du Syndicat' : 'Siège Social'}
                                            </label>
                                            <div className="relative">
                                                {field === 'headquarters' && <Building className="absolute top-3 left-3 text-gray-400" size={20} />}
                                                <input
                                                    id={field}
                                                    type="text"
                                                    value={profile[field]}
                                                    onChange={(e) => handleInputChange(e, field)}
                                                    disabled={!editMode}
                                                    className={`w-full p-3 ${field === 'headquarters' ? "pl-10" : ""} border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${!editMode ? 'bg-gray-50' : 'bg-white'}`}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                    <div>
                                        <h4 className="text-lg font-medium text-gray-700 mb-2">Documents</h4>
                                        {(['statute', 'internalRules'] as const).map(doc => (
                                            <div key={doc} className="flex items-center justify-between mt-3">
                                                <div className="flex items-center space-x-2">
                                                    {doc === 'statute' ? <FileSignature className="text-green-500" /> : <Book className="text-purple-500" />}
                                                    <span className="text-gray-700">{doc === 'statute' ? 'Statut' : 'Règlement Intérieur'}</span>
                                                </div>
                                                <div className="space-x-2">
                                                    <button
                                                        onClick={() => downloadPDF(profile[doc])}
                                                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200 flex items-center text-sm"
                                                    >
                                                        <Download className="w-4 h-4 mr-2" />
                                                        Télécharger
                                                    </button>
                                                    {editMode && (
                                                        <button
                                                            onClick={() => handleFileUpload(doc)}
                                                            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-200 flex items-center text-sm"
                                                        >
                                                            <Upload className="w-4 h-4 mr-2" />
                                                            Mettre à jour
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                className="bg-gradient-to-br from-green-50 to-emerald-100 p-6 rounded-xl shadow-sm"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
                                <h3 className="text-2xl font-semibold mb-6 text-emerald-800">Membres du Bureau</h3>
                                <div className="space-y-4">
                                    {Object.entries(profile.boardMembers).map(([role, member]) => (
                                        <div key={role} className="bg-white rounded-lg shadow-sm overflow-hidden">
                                            <button
                                                onClick={() => toggleAccordion(role)}
                                                className="w-full flex justify-between items-center p-4 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 hover:bg-gray-50"
                                            >
                                                <span className="font-medium text-gray-800">{member.role}</span>
                                                <ChevronDown className={`transform transition-transform duration-200 ${openAccordion === role ? 'rotate-180' : ''}`} />
                                            </button>
                                            <AnimatePresence>
                                                {openAccordion === role && (
                                                    <motion.div
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: 'auto' }}
                                                        exit={{ opacity: 0, height: 0 }}
                                                        transition={{ duration: 0.3 }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className="p-4 border-t border-gray-100">
                                                            <div className="flex items-center space-x-4 mb-4">
                                                                <img src={member.photo} alt={member.name} className="w-16 h-16 rounded-full object-cover" />
                                                                <div>
                                                                    <h4 className="font-semibold text-lg text-gray-800">{member.name}</h4>
                                                                    <p className="text-sm text-gray-600">{member.role}</p>
                                                                </div>
                                                            </div>
                                                            {(['email', 'phone'] as const).map(field => (
                                                                <div key={field} className="mb-4">
                                                                    <label htmlFor={`${role}-${field}`} className="block text-sm font-medium text-gray-700 mb-1">
                                                                        {field === 'email' ? 'Email' : 'Téléphone'}
                                                                    </label>
                                                                    <div className="relative">
                                                                        {field === 'email' ? <Mail className="absolute top-3 left-3 text-gray-400" size={20} /> : <Phone className="absolute top-3 left-3 text-gray-400" size={20} />}
                                                                        <input
                                                                            id={`${role}-${field}`}
                                                                            type={field === 'email' ? 'email' : 'tel'}
                                                                            value={member[field]}
                                                                            onChange={(e) => handleBoardMemberChange(e, role, field)}
                                                                            disabled={!editMode}
                                                                            className={`w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${!editMode ? 'bg-gray-50' : 'bg-white'}`}

                                                                        />
                                                                    </div>
                                                                </div>
                                                            ))}
                                                            <div className="flex justify-between items-center mt-4">
                                                                <button
                                                                    onClick={() => openModal(member)}
                                                                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200 text-sm"
                                                                >
                                                                    Voir le profil complet
                                                                </button>
                                                                <button
                                                                    onClick={() => handleToggleProfileVisibility(role)}
                                                                    className="flex items-center px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition duration-200 text-sm"
                                                                >
                                                                    {member.isProfileVisible ? (
                                                                        <>
                                                                            <EyeOff className="w-4 h-4 mr-2" />
                                                                            <span>Masquer</span>
                                                                        </>
                                                                    ) : (
                                                                        <>
                                                                            <Eye className="w-4 h-4 mr-2" />
                                                                            <span>Afficher</span>
                                                                        </>
                                                                    )}
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>

                        <motion.div
                            className="mt-8 flex justify-end"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            <button
                                onClick={() => downloadPDF('liste-membres-bureau.pdf')}
                                className="px-6 py-3 bg-green-500 text-white rounded-full hover:bg-green-600 transition duration-200 flex items-center text-sm font-medium shadow-md"
                            >
                                <Download className="w-5 h-5 mr-2" />
                                Télécharger la liste des membres du bureau
                            </button>
                        </motion.div>
                    </div>
                </div>
            </main>
            <footer className="bg-gray-800 text-white mt-12">
                <div className="container mx-auto px-4 py-8 flex flex-col sm:flex-row justify-between items-center">
                    <p className="text-sm mb-4 sm:mb-0">© 2024 SyndicManager. Tous droits réservés.</p>
                    <nav>
                        <ul className="flex space-x-6">
                            <li><a href="#" className="text-sm hover:text-blue-300 transition-colors duration-200">Mentions légales</a></li>
                            <li><a href="#" className="text-sm hover:text-blue-300 transition-colors duration-200">Politique de confidentialité</a></li>
                        </ul>
                    </nav>
                </div>
            </footer>
            {modalOpen && selectedMember && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <motion.div
                        className="bg-white rounded-xl max-w-md w-full p-6 relative"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                    >
                        <button
                            onClick={() => setModalOpen(false)}
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                            aria-label="Fermer"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <h2 className="text-2xl font-bold mb-4 text-gray-800">Profil de {selectedMember.name}</h2>
                        <img src={selectedMember.photo} alt={selectedMember.name} className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-blue-100" />
                        {(['name', 'role', 'email', 'phone'] as const).map(field => (
                            <div key={field} className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    {field === 'name' ? 'Nom' : field === 'role' ? 'Rôle' : field === 'email' ? 'Email' : 'Téléphone'}
                                </label>
                                <p className="text-gray-900">{selectedMember[field]}</p>
                            </div>
                        ))}
                        <button
                            onClick={() => downloadPDF(selectedMember.cv)}
                            className="w-full mt-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200 flex items-center justify-center"
                        >
                            <Download className="w-5 h-5 mr-2" />
                            Télécharger le CV
                        </button>
                    </motion.div>
                </div>
            )}
        </div>
    )
}