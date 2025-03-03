"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Check, X, Download, Search, ChevronDown, MoreHorizontal, Filter, Lock, Unlock, Slash } from "lucide-react"

// Fausses données pour les demandes d'adhésion
const dummyRequests = [
    {
        id: 1,
        name: "Jean Dupont",
        email: "jean.dupont@example.com",
        profilePic: "https://i.pravatar.cc/150?img=1",
        motivation: "Je souhaite rejoindre le syndicat pour défendre mes droits.",
        idCardFront: "https://picsum.photos/200/300",
        idCardBack: "https://picsum.photos/200/301",
    },
    {
        id: 2,
        name: "Sophie Martin",
        email: "sophie.martin@example.com",
        profilePic: "https://i.pravatar.cc/150?img=2",
        motivation: "Passionnée par l'action syndicale et la défense des travailleurs.",
        idCardFront: "https://picsum.photos/200/302",
        idCardBack: "https://picsum.photos/200/303",
    },
    {
        id: 3,
        name: "Lucas Petit",
        email: "lucas.petit@example.com",
        profilePic: "https://i.pravatar.cc/150?img=3",
        motivation: "Je veux contribuer à l'amélioration des conditions de travail.",
        idCardFront: "https://picsum.photos/200/304",
        idCardBack: "https://picsum.photos/200/305",
    },
    {
        id: 4,
        name: "Emma Leroy",
        email: "emma.leroy@example.com",
        profilePic: "https://i.pravatar.cc/150?img=4",
        motivation: "Engagée pour la justice sociale et l'équité au travail.",
        idCardFront: "https://picsum.photos/200/306",
        idCardBack: "https://picsum.photos/200/307",
    },
    {
        id: 5,
        name: "Thomas Roux",
        email: "thomas.roux@example.com",
        profilePic: "https://i.pravatar.cc/150?img=5",
        motivation: "Je souhaite participer activement à la vie syndicale.",
        idCardFront: "https://picsum.photos/200/308",
        idCardBack: "https://picsum.photos/200/309",
    },
    {
        id: 6,
        name: "Chloé Dubois",
        email: "chloe.dubois@example.com",
        profilePic: "https://i.pravatar.cc/150?img=6",
        motivation: "Déterminée à lutter contre les inégalités au travail.",
        idCardFront: "https://picsum.photos/200/310",
        idCardBack: "https://picsum.photos/200/311",
    },
    {
        id: 7,
        name: "Antoine Moreau",
        email: "antoine.moreau@example.com",
        profilePic: "https://i.pravatar.cc/150?img=7",
        motivation: "Je veux m'impliquer dans la défense des droits des travailleurs.",
        idCardFront: "https://picsum.photos/200/312",
        idCardBack: "https://picsum.photos/200/313",
    },
    {
        id: 8,
        name: "Léa Bernard",
        email: "lea.bernard@example.com",
        profilePic: "https://i.pravatar.cc/150?img=8",
        motivation: "Passionnée par le droit du travail et l'action collective.",
        idCardFront: "https://picsum.photos/200/314",
        idCardBack: "https://picsum.photos/200/315",
    },
    {
        id: 9,
        name: "Maxime Girard",
        email: "maxime.girard@example.com",
        profilePic: "https://i.pravatar.cc/150?img=9",
        motivation: "Je souhaite apporter mon expertise pour renforcer notre syndicat.",
        idCardFront: "https://picsum.photos/200/316",
        idCardBack: "https://picsum.photos/200/317",
    },
    {
        id: 10,
        name: "Camille Fournier",
        email: "camille.fournier@example.com",
        profilePic: "https://i.pravatar.cc/150?img=10",
        motivation: "Engagée pour un monde du travail plus juste et équitable.",
        idCardFront: "https://picsum.photos/200/318",
        idCardBack: "https://picsum.photos/200/319",
    },
]

// Fausses données pour les membres du syndicat
const dummyMembers = [
    {
        id: 1,
        name: "Marie Martin",
        email: "marie.martin@example.com",
        phone: "0123456789",
        profilePic: "https://i.pravatar.cc/150?img=11",
        status: "active",
        joinDate: "2023-01-15",
    },
    {
        id: 2,
        name: "Pierre Durand",
        email: "pierre.durand@example.com",
        phone: "0987654321",
        profilePic: "https://i.pravatar.cc/150?img=12",
        status: "blocked",
        joinDate: "2023-02-20",
    },
    {
        id: 3,
        name: "Lucie Bernard",
        email: "lucie.bernard@example.com",
        phone: "0654321987",
        profilePic: "https://i.pravatar.cc/150?img=13",
        status: "active",
        joinDate: "2023-03-10",
    },
    {
        id: 4,
        name: "François Lemoine",
        email: "francois.lemoine@example.com",
        phone: "0712345678",
        profilePic: "https://i.pravatar.cc/150?img=14",
        status: "active",
        joinDate: "2023-04-05",
    },
    {
        id: 5,
        name: "Isabelle Rousseau",
        email: "isabelle.rousseau@example.com",
        phone: "0698765432",
        profilePic: "https://i.pravatar.cc/150?img=15",
        status: "active",
        joinDate: "2023-05-12",
    },
    {
        id: 6,
        name: "Thierry Moreau",
        email: "thierry.moreau@example.com",
        phone: "0756789012",
        profilePic: "https://i.pravatar.cc/150?img=16",
        status: "blocked",
        joinDate: "2023-06-18",
    },
    {
        id: 7,
        name: "Sophie Lefevre",
        email: "sophie.lefevre@example.com",
        phone: "0634567890",
        profilePic: "https://i.pravatar.cc/150?img=17",
        status: "active",
        joinDate: "2023-07-22",
    },
    {
        id: 8,
        name: "Nicolas Girard",
        email: "nicolas.girard@example.com",
        phone: "0787654321",
        profilePic: "https://i.pravatar.cc/150?img=18",
        status: "active",
        joinDate: "2023-08-30",
    },
    {
        id: 9,
        name: "Céline Dupuis",
        email: "celine.dupuis@example.com",
        phone: "0678901234",
        profilePic: "https://i.pravatar.cc/150?img=19",
        status: "active",
        joinDate: "2023-09-14",
    },
    {
        id: 10,
        name: "Julien Mercier",
        email: "julien.mercier@example.com",
        phone: "0645678901",
        profilePic: "https://i.pravatar.cc/150?img=20",
        status: "blocked",
        joinDate: "2023-10-05",
    },
]

export const MembersManagement = () => {
    const [membershipRequests, setMembershipRequests] = useState(dummyRequests)
    const [members, setMembers] = useState(dummyMembers)
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    const [currentPage, setCurrentPage] = useState(1)
    const [expandedRequestId, setExpandedRequestId] = useState(null)
    const [showAllRequests, setShowAllRequests] = useState(false)
    const [showAllMembers, setShowAllMembers] = useState(false)
    const [showStatusFilter, setShowStatusFilter] = useState(false)
    const [activeActionMenu, setActiveActionMenu] = useState(null)
    const pageSize = 5

    // Traitement des demandes d'adhésion
    const handleAcceptRequest = (id) => {
        setMembershipRequests((prev) => prev.filter((req) => req.id !== id))
    }

    const handleRejectRequest = (id) => {
        setMembershipRequests((prev) => prev.filter((req) => req.id !== id))
    }

    const toggleRequestExpansion = (id) => {
        setExpandedRequestId(expandedRequestId === id ? null : id)
    }

    // Filtrage des membres selon la recherche et le statut
    const filteredMembers = members.filter((member) => {
        const matchesSearch =
            member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            member.email.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesStatus = statusFilter === "all" || member.status === statusFilter
        return matchesSearch && matchesStatus
    })

    // Pagination pour les membres
    const totalPages = Math.ceil(filteredMembers.length / pageSize)
    const paginatedMembers = showAllMembers
        ? filteredMembers
        : filteredMembers.slice((currentPage - 1) * pageSize, currentPage * pageSize)

    // Pour les demandes, on affiche 3 éléments par défaut si showAllRequests est false
    const displayedRequests = showAllRequests ? membershipRequests : membershipRequests.slice(0, 3)

    // Mise à jour du statut d'un membre
    const handleUpdateMemberStatus = (memberId, newStatus) => {
        setMembers((prev) => prev.map((member) => (member.id === memberId ? { ...member, status: newStatus } : member)))
    }

    const handleMenuClick = (e) => {
        e.stopPropagation()
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            // Fermer les menus déroulants si on clique ailleurs
            setShowStatusFilter(false)
            setActiveActionMenu(null)
        }

        // Ajouter l'écouteur d'événement avec une petite temporisation pour éviter de fermer immédiatement
        const timer = setTimeout(() => {
            document.addEventListener("mousedown", handleClickOutside)
        }, 100)

        // Nettoyer l'écouteur d'événement
        return () => {
            clearTimeout(timer)
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">Gestion des Membres</h1>

            {/* Section des demandes d'adhésion */}
            <section className="mb-12 border-b pb-8">
                <h2 className="text-2xl font-semibold mb-6 text-gray-700">Demandes d'adhésion</h2>
                <div className="space-y-6">
                    {displayedRequests.map((req) => (
                        <motion.div
                            key={req.id}
                            className="bg-white border border-gray-200 shadow rounded-lg p-4"
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.2 }}
                        >
                            <div
                                className="flex justify-between items-center cursor-pointer"
                                onClick={() => toggleRequestExpansion(req.id)}
                            >
                                <div className="flex items-center">
                                    <img
                                        src={req.profilePic || "/placeholder.svg"}
                                        alt={req.name}
                                        className="w-12 h-12 rounded-full mr-3 object-cover"
                                    />
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800">{req.name}</h3>
                                        <p className="text-gray-600 text-sm">{req.email}</p>
                                    </div>
                                </div>
                                <ChevronDown
                                    className={`transform transition-transform duration-200 ${expandedRequestId === req.id ? "rotate-180" : ""}`}
                                    size={20}
                                />
                            </div>
                            {expandedRequestId === req.id && (
                                <div className="mt-4 border-t pt-4">
                                    <p className="text-gray-700 mb-4">{req.motivation}</p>
                                    <div className="flex gap-4 mb-4">
                                        <div className="flex flex-col items-center">
                                            <img
                                                src={req.idCardFront || "/placeholder.svg"}
                                                alt="Carte d'identité - Avant"
                                                className="w-20 h-14 object-cover rounded border border-gray-300"
                                            />
                                            <a
                                                href={req.idCardFront}
                                                download
                                                className="mt-1 text-sm text-blue-600 hover:underline flex items-center gap-1"
                                            >
                                                <Download size={14} /> Télécharger
                                            </a>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <img
                                                src={req.idCardBack || "/placeholder.svg"}
                                                alt="Carte d'identité - Arrière"
                                                className="w-20 h-14 object-cover rounded border border-gray-300"
                                            />
                                            <a
                                                href={req.idCardBack}
                                                download
                                                className="mt-1 text-sm text-blue-600 hover:underline flex items-center gap-1"
                                            >
                                                <Download size={14} /> Télécharger
                                            </a>
                                        </div>
                                    </div>
                                    <div className="flex justify-end space-x-4">
                                        <button
                                            className="px-4 py-2 bg-green-600 text-white rounded-md flex items-center hover:bg-green-700 transition-colors"
                                            onClick={() => handleAcceptRequest(req.id)}
                                        >
                                            <Check size={16} className="mr-2" /> Accepter
                                        </button>
                                        <button
                                            className="px-4 py-2 bg-red-600 text-white rounded-md flex items-center hover:bg-red-700 transition-colors"
                                            onClick={() => handleRejectRequest(req.id)}
                                        >
                                            <X size={16} className="mr-2" /> Rejeter
                                        </button>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    ))}
                    {membershipRequests.length > 3 && (
                        <div className="text-center mt-4">
                            <button
                                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
                                onClick={() => setShowAllRequests((prev) => !prev)}
                            >
                                {showAllRequests ? "Voir moins" : "Voir plus"}
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* Section de la liste des membres */}
            <section>
                <h2 className="text-2xl font-semibold mb-6 text-gray-700">Liste des membres</h2>
                <div className="mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="relative w-full md:w-64">
                        <input
                            type="text"
                            placeholder="Rechercher un membre..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    </div>
                    <div className="relative">
                        <button
                            onClick={() => setShowStatusFilter((prev) => !prev)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center gap-2 hover:bg-blue-700 transition-colors"
                        >
                            <Filter size={16} />
                            Filtrer par statut
                            <ChevronDown size={16} />
                        </button>
                        {showStatusFilter && (
                            <div
                                className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10"
                                onClick={handleMenuClick}
                            >
                                <div className="py-2">
                                    <button
                                        onClick={() => {
                                            setStatusFilter("all")
                                            setCurrentPage(1)
                                            setShowStatusFilter(false)
                                        }}
                                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        Tous
                                    </button>
                                    <button
                                        onClick={() => {
                                            setStatusFilter("active")
                                            setCurrentPage(1)
                                            setShowStatusFilter(false)
                                        }}
                                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        Actifs
                                    </button>
                                    <button
                                        onClick={() => {
                                            setStatusFilter("blocked")
                                            setCurrentPage(1)
                                            setShowStatusFilter(false)
                                        }}
                                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        Bloqués
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto">
                        <thead>
                        <tr className="bg-gray-100">
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Email
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Téléphone
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Statut
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Date d'adhésion
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {paginatedMembers.map((member) => (
                            <tr key={member.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <img
                                            src={member.profilePic || "/placeholder.svg"}
                                            alt={member.name}
                                            className="h-10 w-10 rounded-full mr-3 object-cover"
                                        />
                                        <span className="text-sm font-medium text-gray-900">{member.name}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{member.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{member.phone}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                    <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${member.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                    >
                      {member.status === "active" ? "Actif" : "Bloqué"}
                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member.joinDate}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <div className="relative inline-block text-left">
                                        <button
                                            className="p-2 text-indigo-600 hover:text-indigo-900"
                                            onClick={() => setActiveActionMenu(activeActionMenu === member.id ? null : member.id)}
                                        >
                                            <MoreHorizontal size={18} />
                                        </button>
                                        {activeActionMenu === member.id && (
                                            <div
                                                className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-10"
                                                onClick={handleMenuClick}
                                            >
                                                <div className="py-2">
                                                    <button
                                                        onClick={() => {
                                                            handleUpdateMemberStatus(member.id, member.status === "active" ? "blocked" : "active")
                                                            setActiveActionMenu(null)
                                                        }}
                                                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                                                    >
                                                        {member.status === "active" ? (
                                                            <>
                                                                <Lock className="inline-block mr-2" size={16} /> Bloquer
                                                            </>
                                                        ) : (
                                                            <>
                                                                <Unlock className="inline-block mr-2" size={16} /> Débloquer
                                                            </>
                                                        )}
                                                    </button>
                                                    <button
                                                        onClick={() => setActiveActionMenu(null)}
                                                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                                                    >
                                                        <Slash className="inline-block mr-2" size={16} /> Bannir
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                <div className="mt-4 flex justify-end items-center gap-4">
                    <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        className="px-3 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
                        disabled={currentPage === 1}
                    >
                        Précédent
                    </button>
                    <span className="text-gray-700">
            Page {currentPage} sur {totalPages}
          </span>
                    <button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        className="px-3 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
                        disabled={currentPage === totalPages}
                    >
                        Suivant
                    </button>
                </div>
                {filteredMembers.length > pageSize && !showAllMembers && (
                    <div className="text-center mt-4">
                        <button
                            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
                            onClick={() => setShowAllMembers(true)}
                        >
                            Voir plus
                        </button>
                    </div>
                )}
                {showAllMembers && filteredMembers.length > pageSize && (
                    <div className="text-center mt-4">
                        <button
                            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
                            onClick={() => setShowAllMembers(false)}
                        >
                            Voir moins
                        </button>
                    </div>
                )}
            </section>
        </div>
    )
}

