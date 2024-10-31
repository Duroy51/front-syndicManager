'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Building, Download, Upload, Eye, EyeOff, Phone, Mail, FileText, Users, MapPin, FileSignature, Book } from 'lucide-react'
// Custom Button component
const Button = ({ children, onClick, className = "", variant = "default" }) => {
    const baseStyle = "px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2"
    const variantStyles = {
        default: "bg-blue-500 text-white hover:bg-blue-600",
        outline: "border border-gray-300 text-gray-700 hover:bg-gray-50"
    }
    return (
        <button
            onClick={onClick}
            className={`${baseStyle} ${variantStyles[variant]} ${className}`}
        >
            {children}
        </button>
    )
}

// Custom Input component
const Input = ({ id, value, onChange, disabled = false, className = "" }) => (
    <input
        id={id}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`w-full px-3 py-2 border rounded-md ${disabled ? 'bg-gray-100' : ''} ${className}`}
    />
)

// Custom Label component
const Label = ({ htmlFor, children }) => (
    <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700 mb-1">
        {children}
    </label>
)

// Custom Switch component
const Switch = ({ checked, onChange }) => (
    <button
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`${checked ? 'bg-blue-600' : 'bg-gray-200'} relative inline-flex h-6 w-11 items-center rounded-full`}
    >
        <span className={`${checked ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition`} />
    </button>
)

// Custom DropdownMenu components
const DropdownMenu = ({ children }) => (
    <div className="relative inline-block text-left">
        {children}
    </div>
)

const DropdownMenuTrigger = ({ children }) => (
    <div>{children}</div>
)

const DropdownMenuContent = ({ children }) => (
    <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
        <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {children}
        </div>
    </div>
)

const DropdownMenuItem = ({ onClick, children }) => (
    <a
        href="#"
        onClick={onClick}
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
        role="menuitem"
    >
        {children}
    </a>
)

// Custom Accordion components
const Accordion = ({ children }) => (
    <div className="space-y-2">
        {children}
    </div>
)

const AccordionItem = ({ children }) => (
    <div className="border rounded-md">
        {children}
    </div>
)

const AccordionTrigger = ({ children, onClick, isExpanded }) => (
    <button
        className="flex justify-between w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-100"
        onClick={onClick}
    >
        {children}
        <ChevronDown className={`w-5 h-5 transition-transform ${isExpanded ? 'transform rotate-180' : ''}`} />
    </button>
)

const AccordionContent = ({ children, isExpanded }) => (
    <div className={`px-4 py-2 ${isExpanded ? 'block' : 'hidden'}`}>
        {children}
    </div>
)

// Custom Dialog components
const Dialog = ({ children, isOpen, onClose }) => (
    isOpen && (
        <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-8 max-w-md w-full">
                {children}
                <button onClick={onClose} className="mt-4 px-4 py-2 bg-gray-200 rounded-md">Close</button>
            </div>
        </div>
    )
)

const DialogContent = ({ children }) => (
    <div>{children}</div>
)

const DialogHeader = ({ children }) => (
    <div className="mb-4">{children}</div>
)

const DialogTitle = ({ children }) => (
    <h3 className="text-lg font-semibold">{children}</h3>
)


type BoardMember = {
    role: string; name: string; email: string; phone: string; photo: string; cv: string; isProfileVisible: boolean;
}

type SyndicatProfile = {
    name: string; headquarters: string; logo: string; statute: string; internalRules: string;
    boardMembers: Record<string, BoardMember>; memberCount: number;
}

const initialProfile: SyndicatProfile = {
    name: "Syndicat des Taxis de Paris",
    headquarters: "123 Rue de la Paix, 75001 Paris",
    logo: "/placeholder.svg?height=100&width=100",
    statute: "statut.pdf",
    internalRules: "reglement-interieur.pdf",
    boardMembers: {
        president: {
            role: "Président", name: "Jean Dupont", email: "jean.dupont@example.com",
            phone: "+33 1 23 45 67 89", photo: "/placeholder.svg?height=200&width=200",
            cv: "cv-jean-dupont.pdf", isProfileVisible: true
        },
        vicePresident: {
            role: "Vice-Président", name: "Marie Martin", email: "marie.martin@example.com",
            phone: "+33 1 98 76 54 32", photo: "/placeholder.svg?height=200&width=200",
            cv: "cv-marie-martin.pdf", isProfileVisible: true
        },
        treasurer: {
            role: "Trésorier", name: "Pierre Durand", email: "pierre.durand@example.com",
            phone: "+33 1 11 22 33 44", photo: "/placeholder.svg?height=200&width=200",
            cv: "cv-pierre-durand.pdf", isProfileVisible: true
        },
        secretary: {
            role: "Secrétaire Général", name: "Sophie Lefebvre", email: "sophie.lefebvre@example.com",
            phone: "+33 1 55 66 77 88", photo: "/placeholder.svg?height=200&width=200",
            cv: "cv-sophie-lefebvre.pdf", isProfileVisible: true
        },
        assistantSecretary: {
            role: "Secrétaire Général Adjoint", name: "Luc Moreau", email: "luc.moreau@example.com",
            phone: "+33 1 99 88 77 66", photo: "/placeholder.svg?height=200&width=200",
            cv: "cv-luc-moreau.pdf", isProfileVisible: true
        },
        assistantTreasurer: {
            role: "Trésorier Adjoint", name: "Claire Dubois", email: "claire.dubois@example.com",
            phone: "+33 1 44 33 22 11", photo: "/placeholder.svg?height=200&width=200",
            cv: "cv-claire-dubois.pdf", isProfileVisible: true
        },
    },
    memberCount: 1250
}

export default function SyndicatProfile() {
    const [profile, setProfile] = useState<SyndicatProfile>(initialProfile)
    const [editMode, setEditMode] = useState(false)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
        setProfile(prev => ({ ...prev, [field]: e.target.value }))
    }

    const handleBoardMemberChange = (e: React.ChangeEvent<HTMLInputElement>, role: string, field: string) => {
        setProfile(prev => ({
            ...prev,
            boardMembers: {
                ...prev.boardMembers,
                [role]: { ...prev.boardMembers[role], [field]: e.target.value }
            }
        }))
    }

    const handleFileUpload = (field: 'logo' | 'statute' | 'internalRules') => {
        console.log(`Uploading new ${field}`)
    }

    const handleToggleProfileVisibility = (role: string) => {
        setProfile(prev => ({
            ...prev,
            boardMembers: {
                ...prev.boardMembers,
                [role]: { ...prev.boardMembers[role], isProfileVisible: !prev.boardMembers[role].isProfileVisible }
            }
        }))
    }

    const downloadPDF = (filename: string) => {
        console.log(`Downloading ${filename}`)
    }


    return (
        <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                    <img src={profile.logo} alt="Logo du Syndicat" className="w-16 h-16 object-cover rounded-full mr-4" />
                    <h1 className="text-3xl font-bold text-blue-600">{profile.name}</h1>
                </div>
                <div className="text-sm text-gray-500">
                    <Users className="inline-block mr-1" size={16} />
                    {profile.memberCount} membres
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                    className="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-lg shadow"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Informations Générales</h2>
                    <div className="space-y-4">
                        {['name', 'headquarters'].map(field => (
                            <div key={field}>
                                <Label htmlFor={field}>{field === 'name' ? 'Nom du Syndicat' : 'Siège Social'}</Label>
                                <div className="relative">
                                    {field === 'headquarters' && <Building className="absolute top-2.5 left-2 text-blue-500" />}
                                    <Input
                                        id={field}
                                        value= {field}
                                        onChange={(e) => handleInputChange(e, field)}
                                        disabled={!editMode}
                                        className={field === 'headquarters' ? "pl-8" : ""}
                                    />
                                    {field === 'headquarters' && <MapPin className="absolute top-2.5 right-2 text-gray-400" />}
                                </div>
                            </div>
                        ))}
                        <div>
                            <Label>Logo du Syndicat</Label>
                            <div className="flex items-center space-x-4">
                                <img src={profile.logo} alt="Logo du Syndicat" className="w-20 h-20 object-cover rounded-full" />
                                {editMode && (
                                    <Button onClick={() => handleFileUpload('logo')}>
                                        <Upload className="w-4 h-4 mr-2" />
                                        Modifier
                                    </Button>
                                )}
                            </div>
                        </div>
                        <div>
                            <Label>Documents</Label>
                            {['statute', 'internalRules'].map(doc => (
                                <div key={doc} className="flex items-center justify-between mt-2">
                                    <div className="flex items-center space-x-2">
                                        {doc === 'statute' ? <FileSignature className="text-green-500" /> : <Book className="text-purple-500" />}
                                        <span>{doc === 'statute' ? 'Statut' : 'Règlement Intérieur'}</span>
                                    </div>
                                    <div className="space-x-2">
                                        <Button onClick={}>
                                            <Download className="w-4 h-4 mr-2" />
                                            Télécharger
                                        </Button>
                                        {editMode && (
                                            <Button onClick={}>
                                                <Upload className="w-4 h-4 mr-2" />
                                                Mettre à jour
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    className="bg-gradient-to-br from-green-50 to-emerald-100 p-6 rounded-lg shadow"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <h2 className="text-2xl font-semibold mb-4 text-emerald-700">Membres du Bureau</h2>
                    <Accordion type="single" collapsible className="space-y-2">
                        {Object.entries(profile.boardMembers).map(([role, member]) => (
                            <AccordionItem value={role} key={role}>
                                <AccordionTrigger>{member.role}</AccordionTrigger>
                                <AccordionContent>
                                    <div className="space-y-2">
                                        <div className="flex items-center space-x-4 mb-4">
                                            <img src={member.photo} alt={member.name} className="w-16 h-16 rounded-full object-cover" />
                                            <div>
                                                <h3 className="font-semibold text-lg">{member.name}</h3>
                                                <p className="text-sm text-gray-500">{member.role}</p>
                                            </div>
                                        </div>
                                        {['email', 'phone'].map(field => (
                                            <div key={field} className="space-y-1">
                                                <div className="flex items-center space-x-2">
                                                    {field === 'email' ? <Mail className="text-blue-500" /> : <Phone className="text-green-500" />}
                                                    <Label htmlFor={`${role}${field}`}>{field === 'email' ? 'Email' : 'Téléphone'}</Label>
                                                </div>
                                                <Input
                                                    id={`${role}${field}`}
                                                    value={member[field as keyof typeof member] as string}

                                                    onChange={(e) => handleBoardMemberChange(e, role, field)}
                                                    disabled={!editMode}
                                                />
                                            </div>
                                        ))}
                                        <div className="flex justify-between items-center">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="outline">Actions</Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent>
                                                    <DialogTrigger asChild>
                                                        <DropdownMenuItem>
                                                            <Eye className="mr-2 h-4 w-4" />
                                                            <span>Consulter</span>
                                                        </DropdownMenuItem>
                                                    </DialogTrigger>
                                                    <DropdownMenuItem onSelect={() => handleToggleProfileVisibility(role)}>
                                                        {member.isProfileVisible ? (
                                                            <>
                                                                <EyeOff className="mr-2 h-4 w-4" />
                                                                <span>Masquer le profil</span>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <Eye className="mr-2 h-4 w-4" />
                                                                <span>Afficher le profil</span>
                                                            </>
                                                        )}
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                            <Dialog>
                                                <DialogContent>
                                                    <DialogHeader>
                                                        <DialogTitle>Profil de {member.name}</DialogTitle>
                                                    </DialogHeader>
                                                    <div className="space-y-4">
                                                        <img src={member.photo} alt={member.name} className="w-32 h-32 rounded-full mx-auto" />
                                                        {['name', 'email', 'phone'].map(field => (
                                                            <div key={field}>
                                                                <Label>{field === 'name' ? 'Nom' : field === 'email' ? 'Email' : 'Téléphone'}</Label>
                                                                <p>{member[field as keyof BoardMember]}</p>
                                                            </div>
                                                        ))}
                                                        <Button onClick={() => downloadPDF(member.cv)}>
                                                            <Download className="w-4 h-4 mr-2" />
                                                            Télécharger le CV
                                                        </Button>
                                                    </div>
                                                </DialogContent>
                                            </Dialog>
                                        </div>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </motion.div>
            </div>

            <motion.div
                className="mt-6 flex justify-end space-x-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
            >
                <Button onClick={() => setEditMode(!editMode)}>
                    {editMode ? 'Enregistrer les modifications' : 'Modifier le profil'}
                </Button>
                <Button onClick={() => downloadPDF('liste-membres-bureau.pdf')}>
                    <Download className="w-4 h-4 mr-2" />
                    Télécharger la liste des membres du bureau
                </Button>
            </motion.div>
        </div>
    )
}