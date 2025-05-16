"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    Check, X, Download, Search, ChevronDown, MoreHorizontal, Eye, Edit, Trash2, UserPlus, 
    Filter, Lock, Unlock, Slash, User, Mail, Phone, Calendar, Building, CreditCard, DollarSign, 
    CheckCircle, AlertTriangle, Clock, BadgeCheck, Shield, Award, Briefcase, FileText, Settings,
    RefreshCw, ArrowUpRight, TrendingUp, ChevronRight, ChevronLeft, Upload, Users, Star, 
    BarChart2, PieChart, Activity, Zap, Layers
} from "lucide-react"
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

// Fausses données pour les demandes d'adhésion
const dummyRequests = [
    {
        id: 1,
        name: "Jean Dupont",
        email: "jean.dupont@example.com",
        profilePic: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
        motivation: "Je souhaite rejoindre le syndicat pour défendre mes droits et contribuer à l'amélioration des conditions de travail dans notre secteur.",
        idCardFront: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=500&auto=format&fit=crop",
        idCardBack: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=500&auto=format&fit=crop",
        phone: "+237 698 123 456",
        profession: "Chauffeur de taxi",
        dateSubmitted: "2023-05-15",
    },
    {
        id: 2,
        name: "Sophie Martin",
        email: "sophie.martin@example.com",
        profilePic: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
        motivation: "Passionnée par l'action syndicale et la défense des travailleurs, je souhaite mettre mes compétences juridiques au service de notre communauté.",
        idCardFront: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=500&auto=format&fit=crop",
        idCardBack: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=500&auto=format&fit=crop",
        phone: "+237 699 234 567",
        profession: "Juriste",
        dateSubmitted: "2023-05-18",
    },
    {
        id: 3,
        name: "Lucas Petit",
        email: "lucas.petit@example.com",
        profilePic: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
        motivation: "Je veux contribuer à l'amélioration des conditions de travail et participer activement aux négociations collectives pour notre secteur.",
        idCardFront: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=500&auto=format&fit=crop",
        idCardBack: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=500&auto=format&fit=crop",
        phone: "+237 697 345 678",
        profession: "Conducteur de bus",
        dateSubmitted: "2023-05-20",
    },
    {
        id: 4,
        name: "Emma Leroy",
        email: "emma.leroy@example.com",
        profilePic: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
        motivation: "Engagée pour la justice sociale et l'équité au travail, je souhaite rejoindre votre syndicat pour faire entendre la voix des travailleurs.",
        idCardFront: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=500&auto=format&fit=crop",
        idCardBack: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=500&auto=format&fit=crop",
        phone: "+237 696 456 789",
        profession: "Assistante administrative",
        dateSubmitted: "2023-05-22",
    },
    {
        id: 5,
        name: "Thomas Roux",
        email: "thomas.roux@example.com",
        profilePic: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
        motivation: "Je souhaite participer activement à la vie syndicale et apporter mon expertise technique pour améliorer nos conditions de travail.",
        idCardFront: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=500&auto=format&fit=crop",
        idCardBack: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=500&auto=format&fit=crop",
        phone: "+237 695 567 890",
        profession: "Mécanicien",
        dateSubmitted: "2023-05-25",
    }
]

// Fausses données pour les membres du syndicat
const dummyMembers = [
    {
        id: 1,
        name: "Marie Martin",
        email: "marie.martin@example.com",
        phone: "+237 698 765 432",
        profilePic: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
        status: "active",
        joinDate: "2023-01-15",
        role: "Membre",
        profession: "Chauffeur de taxi",
        paymentStatus: "paid",
        lastPayment: "2023-05-10",
        paymentHistory: [
            { date: "2023-05-10", amount: 15000, status: "completed" },
            { date: "2023-04-10", amount: 15000, status: "completed" },
            { date: "2023-03-10", amount: 15000, status: "completed" }
        ],
        totalPaid: 45000,
        dueAmount: 0,
        nextPaymentDate: "2023-06-10"
    },
    {
        id: 2,
        name: "Pierre Durand",
        email: "pierre.durand@example.com",
        phone: "+237 699 876 543",
        profilePic: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
        status: "blocked",
        joinDate: "2023-02-20",
        role: "Membre",
        profession: "Conducteur de bus",
        paymentStatus: "unpaid",
        lastPayment: "2023-03-15",
        paymentHistory: [
            { date: "2023-03-15", amount: 15000, status: "completed" },
            { date: "2023-02-15", amount: 15000, status: "completed" }
        ],
        totalPaid: 30000,
        dueAmount: 30000,
        nextPaymentDate: "2023-04-15"
    },
    {
        id: 3,
        name: "Lucie Bernard",
        email: "lucie.bernard@example.com",
        phone: "+237 697 987 654",
        profilePic: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
        status: "active",
        joinDate: "2023-03-10",
        role: "Trésorière",
        profession: "Comptable",
        paymentStatus: "paid",
        lastPayment: "2023-05-12",
        paymentHistory: [
            { date: "2023-05-12", amount: 15000, status: "completed" },
            { date: "2023-04-10", amount: 15000, status: "completed" },
            { date: "2023-03-10", amount: 15000, status: "completed" }
        ],
        totalPaid: 45000,
        dueAmount: 0,
        nextPaymentDate: "2023-06-12"
    },
    {
        id: 4,
        name: "François Lemoine",
        email: "francois.lemoine@example.com",
        phone: "+237 696 098 765",
        profilePic: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
        status: "active",
        joinDate: "2023-04-05",
        role: "Membre",
        profession: "Chauffeur de taxi",
        paymentStatus: "partial",
        lastPayment: "2023-05-05",
        paymentHistory: [
            { date: "2023-05-05", amount: 7500, status: "completed" },
            { date: "2023-04-05", amount: 15000, status: "completed" }
        ],
        totalPaid: 22500,
        dueAmount: 7500,
        nextPaymentDate: "2023-05-20"
    },
    {
        id: 5,
        name: "Isabelle Rousseau",
        email: "isabelle.rousseau@example.com",
        phone: "+237 695 109 876",
        profilePic: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&h=150&fit=crop",
        status: "active",
        joinDate: "2023-05-12",
        role: "Secrétaire",
        profession: "Assistante administrative",
        paymentStatus: "paid",
        lastPayment: "2023-05-12",
        paymentHistory: [
            { date: "2023-05-12", amount: 15000, status: "completed" }
        ],
        totalPaid: 15000,
        dueAmount: 0,
        nextPaymentDate: "2023-06-12"
    },
    {
        id: 6,
        name: "Thierry Moreau",
        email: "thierry.moreau@example.com",
        phone: "+237 694 210 987",
        profilePic: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
        status: "blocked",
        joinDate: "2023-06-18",
        role: "Membre",
        profession: "Mécanicien",
        paymentStatus: "unpaid",
        lastPayment: null,
        paymentHistory: [],
        totalPaid: 0,
        dueAmount: 15000,
        nextPaymentDate: "2023-07-18"
    },
    {
        id: 7,
        name: "Sophie Lefevre",
        email: "sophie.lefevre@example.com",
        phone: "+237 693 321 098",
        profilePic: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop",
        status: "active",
        joinDate: "2023-07-22",
        role: "Membre",
        profession: "Conductrice de bus",
        paymentStatus: "paid",
        lastPayment: "2023-05-22",
        paymentHistory: [
            { date: "2023-05-22", amount: 15000, status: "completed" }
        ],
        totalPaid: 15000,
        dueAmount: 0,
        nextPaymentDate: "2023-06-22"
    },
    {
        id: 8,
        name: "Nicolas Girard",
        email: "nicolas.girard@example.com",
        phone: "+237 692 432 109",
        profilePic: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop",
        status: "active",
        joinDate: "2023-08-30",
        role: "Membre",
        profession: "Chauffeur de taxi",
        paymentStatus: "partial",
        lastPayment: "2023-05-15",
        paymentHistory: [
            { date: "2023-05-15", amount: 10000, status: "completed" }
        ],
        totalPaid: 10000,
        dueAmount: 5000,
        nextPaymentDate: "2023-05-30"
    },
    {
        id: 9,
        name: "Céline Dupuis",
        email: "celine.dupuis@example.com",
        phone: "+237 691 543 210",
        profilePic: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop",
        status: "active",
        joinDate: "2023-09-14",
        role: "Membre",
        profession: "Assistante administrative",
        paymentStatus: "paid",
        lastPayment: "2023-05-14",
        paymentHistory: [
            { date: "2023-05-14", amount: 15000, status: "completed" }
        ],
        totalPaid: 15000,
        dueAmount: 0,
        nextPaymentDate: "2023-06-14"
    },
    {
        id: 10,
        name: "Julien Mercier",
        email: "julien.mercier@example.com",
        phone: "+237 690 654 321",
        profilePic: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
        status: "blocked",
        joinDate: "2023-10-05",
        role: "Membre",
        profession: "Conducteur de bus",
        paymentStatus: "unpaid",
        lastPayment: null,
        paymentHistory: [],
        totalPaid: 0,
        dueAmount: 15000,
        nextPaymentDate: "2023-11-05"
    }
]

// Fonction pour formater les montants en FCFA
const formatCurrency = (amount) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XAF' }).format(amount);
}

// Fonction pour obtenir le badge de statut de paiement
const getPaymentStatusBadge = (status) => {
    switch(status) {
        case 'paid':
            return (
                <span className="px-3 py-1 inline-flex items-center rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Payé
                </span>
            );
        case 'partial':
            return (
                <span className="px-3 py-1 inline-flex items-center rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    <Clock className="w-3 h-3 mr-1" />
                    Partiel
                </span>
            );
        case 'unpaid':
            return (
                <span className="px-3 py-1 inline-flex items-center rounded-full text-xs font-medium bg-red-100 text-red-800">
                    <AlertTriangle className="w-3 h-3 mr-1" />
                    Non payé
                </span>
            );
        default:
            return null;
    }
}

// Fonction pour obtenir le badge de statut du membre
const getMemberStatusBadge = (status) => {
    switch(status) {
        case 'active':
            return (
                <span className="px-3 py-1 inline-flex items-center rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Actif
                </span>
            );
        case 'blocked':
            return (
                <span className="px-3 py-1 inline-flex items-center rounded-full text-xs font-medium bg-red-100 text-red-800">
                    <Lock className="w-3 h-3 mr-1" />
                    Bloqué
                </span>
            );
        default:
            return null;
    }
}

// Composant pour les statistiques
const StatCard = ({ icon: Icon, title, value, bgColor, textColor, borderColor }) => (
    <motion.div
        whileHover={{ scale: 1.03 }}
        className={`${bgColor} ${borderColor} rounded-xl shadow-md p-6`}
    >
        <div className="flex items-center mb-2">
            <div className={`p-3 rounded-full ${bgColor} ${textColor}`}>
                <Icon className="h-6 w-6" />
            </div>
        </div>
        <h3 className="text-gray-700 font-medium">{title}</h3>
        <p className={`text-2xl font-bold mt-1 ${textColor}`}>{value}</p>
    </motion.div>
);

export const MemberManagement = () => {
    const [membershipRequests, setMembershipRequests] = useState(dummyRequests)
    const [members, setMembers] = useState(dummyMembers)
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    const [paymentFilter, setPaymentFilter] = useState("all")
    const [currentPage, setCurrentPage] = useState(1)
    const [expandedRequestId, setExpandedRequestId] = useState(null)
    const [showAllRequests, setShowAllRequests] = useState(false)
    const [showAllMembers, setShowAllMembers] = useState(false)
    const [showStatusFilter, setShowStatusFilter] = useState(false)
    const [showPaymentFilter, setShowPaymentFilter] = useState(false)
    const [activeActionMenu, setActiveActionMenu] = useState(null)
    const [activeTab, setActiveTab] = useState("members")
    const [selectedMember, setSelectedMember] = useState(null)
    const [showMemberDetails, setShowMemberDetails] = useState(false)
    const [showPaymentModal, setShowPaymentModal] = useState(false)
    const [paymentAmount, setPaymentAmount] = useState("")
    const [paymentMemberId, setPaymentMemberId] = useState(null)
    const pageSize = 5

    // Traitement des demandes d'adhésion
    const handleAcceptRequest = (id) => {
        const request = membershipRequests.find(req => req.id === id);
        if (request) {
            // Créer un nouveau membre à partir de la demande
            const newMember = {
                id: Date.now(),
                name: request.name,
                email: request.email,
                phone: request.phone,
                profilePic: request.profilePic,
                status: "active",
                joinDate: new Date().toISOString().split('T')[0],
                role: "Membre",
                profession: request.profession,
                paymentStatus: "unpaid",
                lastPayment: null,
                paymentHistory: [],
                totalPaid: 0,
                dueAmount: 15000,
                nextPaymentDate: new Date(Date.now() + 30*24*60*60*1000).toISOString().split('T')[0]
            };
            
            setMembers([...members, newMember]);
            setMembershipRequests(membershipRequests.filter(req => req.id !== id));
        }
    }

    const handleRejectRequest = (id) => {
        setMembershipRequests(membershipRequests.filter(req => req.id !== id));
    }

    const toggleRequestExpansion = (id) => {
        setExpandedRequestId(expandedRequestId === id ? null : id);
    }

    // Filtrage des membres selon la recherche, le statut et le paiement
    const filteredMembers = members.filter(member => {
        const matchesSearch = 
            member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            member.phone.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesStatus = statusFilter === "all" || member.status === statusFilter;
        const matchesPayment = paymentFilter === "all" || member.paymentStatus === paymentFilter;
        
        return matchesSearch && matchesStatus && matchesPayment;
    });

    // Pagination pour les membres
    const totalPages = Math.ceil(filteredMembers.length / pageSize);
    const paginatedMembers = showAllMembers
        ? filteredMembers
        : filteredMembers.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    // Pour les demandes, on affiche 3 éléments par défaut si showAllRequests est false
    const displayedRequests = showAllRequests ? membershipRequests : membershipRequests.slice(0, 3);

    // Mise à jour du statut d'un membre
    const handleUpdateMemberStatus = (memberId, newStatus) => {
        setMembers(members.map(member => 
            member.id === memberId ? { ...member, status: newStatus } : member
        ));
    }

    // Enregistrer un paiement
    const handleRecordPayment = () => {
        if (!paymentMemberId || !paymentAmount || isNaN(parseFloat(paymentAmount))) return;
        
        const amount = parseFloat(paymentAmount);
        const member = members.find(m => m.id === paymentMemberId);
        
        if (!member) return;
        
        const newPayment = {
            date: new Date().toISOString().split('T')[0],
            amount: amount,
            status: "completed"
        };
        
        const newTotalPaid = member.totalPaid + amount;
        const newDueAmount = Math.max(0, member.dueAmount - amount);
        let newPaymentStatus = member.paymentStatus;
        
        if (newDueAmount === 0) {
            newPaymentStatus = "paid";
        } else if (newDueAmount < member.dueAmount) {
            newPaymentStatus = "partial";
        }
        
        setMembers(members.map(m => 
            m.id === paymentMemberId ? {
                ...m,
                paymentHistory: [newPayment, ...m.paymentHistory],
                totalPaid: newTotalPaid,
                dueAmount: newDueAmount,
                paymentStatus: newPaymentStatus,
                lastPayment: newPayment.date
            } : m
        ));
        
        setPaymentAmount("");
        setPaymentMemberId(null);
        setShowPaymentModal(false);
    }

    // Données pour les graphiques
    const paymentStatusData = {
        labels: ['Payé', 'Partiel', 'Non payé'],
        datasets: [
            {
                data: [
                    members.filter(m => m.paymentStatus === 'paid').length,
                    members.filter(m => m.paymentStatus === 'partial').length,
                    members.filter(m => m.paymentStatus === 'unpaid').length
                ],
                backgroundColor: [
                    'rgba(34, 197, 94, 0.8)',
                    'rgba(234, 179, 8, 0.8)',
                    'rgba(239, 68, 68, 0.8)'
                ],
                borderColor: [
                    'rgba(34, 197, 94, 1)',
                    'rgba(234, 179, 8, 1)',
                    'rgba(239, 68, 68, 1)'
                ],
                borderWidth: 1
            }
        ]
    };

    const memberStatusData = {
        labels: ['Actifs', 'Bloqués'],
        datasets: [
            {
                data: [
                    members.filter(m => m.status === 'active').length,
                    members.filter(m => m.status === 'blocked').length
                ],
                backgroundColor: [
                    'rgba(34, 197, 94, 0.8)',
                    'rgba(239, 68, 68, 0.8)'
                ],
                borderColor: [
                    'rgba(34, 197, 94, 1)',
                    'rgba(239, 68, 68, 1)'
                ],
                borderWidth: 1
            }
        ]
    };

    const monthlyJoinsData = {
        labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'],
        datasets: [
            {
                label: 'Nouveaux membres',
                data: [2, 3, 5, 4, 6, 8, 7, 5, 9, 8, 7, 10],
                backgroundColor: 'rgba(59, 130, 246, 0.8)',
                borderColor: 'rgba(59, 130, 246, 1)',
                borderWidth: 1
            }
        ]
    };

    const handleMenuClick = (e) => {
        e.stopPropagation();
    }

    useEffect(() => {
        const handleClickOutside = () => {
            // Fermer les menus déroulants si on clique ailleurs
            setShowStatusFilter(false);
            setShowPaymentFilter(false);
            setActiveActionMenu(null);
        }

        // Ajouter l'écouteur d'événement avec une petite temporisation pour éviter de fermer immédiatement
        const timer = setTimeout(() => {
            document.addEventListener("mousedown", handleClickOutside);
        }, 100);

        // Nettoyer l'écouteur d'événement
        return () => {
            clearTimeout(timer);
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, []);

    // Composant pour le modal de détails du membre
    const MemberDetailsModal = () => {
        if (!selectedMember) return null;
        
        const [activeDetailTab, setActiveDetailTab] = useState("overview");
        
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50"
                onClick={() => setShowMemberDetails(false)}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-white rounded-2xl max-w-4xl w-full mx-4 shadow-2xl max-h-[90vh] overflow-hidden flex flex-col"
                    onClick={e => e.stopPropagation()}
                >
                    {/* Header avec informations de base */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
                        <div className="flex items-start">
                            <img 
                                src={selectedMember.profilePic} 
                                alt={selectedMember.name}
                                className="w-20 h-20 rounded-full object-cover border-4 border-white mr-6"
                            />
                            <div className="flex-1">
                                <div className="flex items-center mb-1">
                                    <h2 className="text-2xl font-bold">{selectedMember.name}</h2>
                                    <div className="ml-3">
                                        {getMemberStatusBadge(selectedMember.status)}
                                    </div>
                                </div>
                                <p className="text-blue-100 mb-2">{selectedMember.profession}</p>
                                <div className="flex flex-wrap gap-4 text-sm">
                                    <div className="flex items-center">
                                        <Mail className="w-4 h-4 mr-1" />
                                        {selectedMember.email}
                                    </div>
                                    <div className="flex items-center">
                                        <Phone className="w-4 h-4 mr-1" />
                                        {selectedMember.phone}
                                    </div>
                                    <div className="flex items-center">
                                        <Calendar className="w-4 h-4 mr-1" />
                                        Membre depuis {new Date(selectedMember.joinDate).toLocaleDateString('fr-FR')}
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => setShowMemberDetails(false)}
                                className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                    
                    {/* Navigation par onglets */}
                    <div className="border-b border-gray-200">
                        <div className="flex overflow-x-auto p-4 space-x-4">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setActiveDetailTab("overview")}
                                className={`flex items-center px-4 py-2 rounded-lg transition-all duration-200 ${
                                    activeDetailTab === "overview" 
                                        ? 'bg-blue-500 text-white shadow-md' 
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                <User className="w-5 h-5 mr-2" />
                                <span>Aperçu</span>
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setActiveDetailTab("payments")}
                                className={`flex items-center px-4 py-2 rounded-lg transition-all duration-200 ${
                                    activeDetailTab === "payments" 
                                        ? 'bg-blue-500 text-white shadow-md' 
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                <CreditCard className="w-5 h-5 mr-2" />
                                <span>Cotisations</span>
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setActiveDetailTab("documents")}
                                className={`flex items-center px-4 py-2 rounded-lg transition-all duration-200 ${
                                    activeDetailTab === "documents" 
                                        ? 'bg-blue-500 text-white shadow-md' 
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                <FileText className="w-5 h-5 mr-2" />
                                <span>Documents</span>
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setActiveDetailTab("settings")}
                                className={`flex items-center px-4 py-2 rounded-lg transition-all duration-200 ${
                                    activeDetailTab === "settings" 
                                        ? 'bg-blue-500 text-white shadow-md' 
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                <Settings className="w-5 h-5 mr-2" />
                                <span>Paramètres</span>
                            </motion.button>
                        </div>
                    </div>
                    
                    {/* Contenu principal */}
                    <div className="flex-1 overflow-y-auto p-6">
                        {activeDetailTab === "overview" && (
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {/* Informations de base */}
                                    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                                        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                            <User className="w-5 h-5 mr-2 text-blue-500" />
                                            Informations générales
                                        </h3>
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between">
                                                <span className="text-gray-600">Nom complet:</span>
                                                <span className="font-medium">{selectedMember.name}</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-gray-600">Email:</span>
                                                <span className="font-medium">{selectedMember.email}</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-gray-600">Téléphone:</span>
                                                <span className="font-medium">{selectedMember.phone}</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-gray-600">Profession:</span>
                                                <span className="font-medium">{selectedMember.profession}</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-gray-600">Rôle:</span>
                                                <span className="font-medium">{selectedMember.role}</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-gray-600">Date d'adhésion:</span>
                                                <span className="font-medium">{new Date(selectedMember.joinDate).toLocaleDateString('fr-FR')}</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-gray-600">Statut:</span>
                                                <span>{getMemberStatusBadge(selectedMember.status)}</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Statut de paiement */}
                                    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                                        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                            <CreditCard className="w-5 h-5 mr-2 text-blue-500" />
                                            Statut des cotisations
                                        </h3>
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between">
                                                <span className="text-gray-600">Statut actuel:</span>
                                                <span>{getPaymentStatusBadge(selectedMember.paymentStatus)}</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-gray-600">Dernier paiement:</span>
                                                <span className="font-medium">
                                                    {selectedMember.lastPayment 
                                                        ? new Date(selectedMember.lastPayment).toLocaleDateString('fr-FR')
                                                        : "Aucun paiement"}
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-gray-600">Montant total payé:</span>
                                                <span className="font-medium">{formatCurrency(selectedMember.totalPaid)}</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-gray-600">Montant dû:</span>
                                                <span className={`font-medium ${selectedMember.dueAmount > 0 ? 'text-red-600' : 'text-green-600'}`}>
                                                    {formatCurrency(selectedMember.dueAmount)}
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-gray-600">Prochain paiement:</span>
                                                <span className="font-medium">
                                                    {selectedMember.nextPaymentDate 
                                                        ? new Date(selectedMember.nextPaymentDate).toLocaleDateString('fr-FR')
                                                        : "Non défini"}
                                                </span>
                                            </div>
                                        </div>
                                        
                                        <div className="mt-6">
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => {
                                                    setPaymentMemberId(selectedMember.id);
                                                    setShowPaymentModal(true);
                                                }}
                                                className="w-full py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg flex items-center justify-center"
                                                disabled={selectedMember.paymentStatus === 'paid'}
                                            >
                                                <CreditCard className="w-4 h-4 mr-2" />
                                                Enregistrer un paiement
                                            </motion.button>
                                        </div>
                                    </div>
                                    
                                    {/* Activité récente */}
                                    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                                        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                            <Activity className="w-5 h-5 mr-2 text-blue-500" />
                                            Activité récente
                                        </h3>
                                        <div className="space-y-4">
                                            {selectedMember.paymentHistory.length > 0 ? (
                                                selectedMember.paymentHistory.slice(0, 3).map((payment, index) => (
                                                    <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                                                        <div className="p-2 rounded-full bg-green-100 text-green-600 mr-3">
                                                            <CreditCard className="w-4 h-4" />
                                                        </div>
                                                        <div className="flex-1">
                                                            <p className="text-sm font-medium text-gray-800">Paiement de cotisation</p>
                                                            <p className="text-xs text-gray-500">{new Date(payment.date).toLocaleDateString('fr-FR')}</p>
                                                        </div>
                                                        <span className="font-medium text-green-600">{formatCurrency(payment.amount)}</span>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="text-center py-4 text-gray-500">
                                                    <Clock className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                                                    <p>Aucune activité récente</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Graphique de progression */}
                                <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                        <TrendingUp className="w-5 h-5 mr-2 text-blue-500" />
                                        Progression des cotisations
                                    </h3>
                                    <div className="mt-4">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-sm text-gray-600">Progression annuelle</span>
                                            <span className="text-sm font-medium">
                                                {selectedMember.totalPaid} / {selectedMember.totalPaid + selectedMember.dueAmount} FCFA
                                                ({selectedMember.dueAmount === 0 ? 100 : Math.round((selectedMember.totalPaid / (selectedMember.totalPaid + selectedMember.dueAmount)) * 100)}%)
                                            </span>
                                        </div>
                                        <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                                            <div 
                                                className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
                                                style={{ width: `${selectedMember.dueAmount === 0 ? 100 : Math.round((selectedMember.totalPaid / (selectedMember.totalPaid + selectedMember.dueAmount)) * 100)}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        {activeDetailTab === "payments" && (
                            <div className="space-y-6">
                                <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                                    <div className="flex justify-between items-center mb-6">
                                        <h3 className="text-lg font-semibold text-gray-800">Historique des paiements</h3>
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => {
                                                setPaymentMemberId(selectedMember.id);
                                                setShowPaymentModal(true);
                                            }}
                                            className="px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center"
                                            disabled={selectedMember.paymentStatus === 'paid'}
                                        >
                                            <Plus className="w-4 h-4 mr-2" />
                                            Nouveau paiement
                                        </motion.button>
                                    </div>
                                    
                                    {selectedMember.paymentHistory.length > 0 ? (
                                        <div className="overflow-x-auto">
                                            <table className="min-w-full divide-y divide-gray-200">
                                                <thead className="bg-gray-50">
                                                    <tr>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Montant</th>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Référence</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200">
                                                    {selectedMember.paymentHistory.map((payment, index) => (
                                                        <tr key={index} className="hover:bg-gray-50">
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                                {new Date(payment.date).toLocaleDateString('fr-FR')}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                                {formatCurrency(payment.amount)}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                                    Complété
                                                                </span>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                                REF-{1000 + index}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    ) : (
                                        <div className="text-center py-8 text-gray-500">
                                            <CreditCard className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                                            <p className="text-lg font-medium">Aucun paiement enregistré</p>
                                            <p className="mt-1">Ce membre n'a pas encore effectué de paiement.</p>
                                        </div>
                                    )}
                                </div>
                                
                                <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                        <DollarSign className="w-5 h-5 mr-2 text-blue-500" />
                                        Résumé des cotisations
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="bg-blue-50 p-4 rounded-lg">
                                            <p className="text-sm text-blue-700 mb-1">Total payé</p>
                                            <p className="text-2xl font-bold text-blue-800">{formatCurrency(selectedMember.totalPaid)}</p>
                                        </div>
                                        <div className="bg-red-50 p-4 rounded-lg">
                                            <p className="text-sm text-red-700 mb-1">Montant dû</p>
                                            <p className="text-2xl font-bold text-red-800">{formatCurrency(selectedMember.dueAmount)}</p>
                                        </div>
                                        <div className="bg-green-50 p-4 rounded-lg">
                                            <p className="text-sm text-green-700 mb-1">Prochain paiement</p>
                                            <p className="text-2xl font-bold text-green-800">
                                                {selectedMember.nextPaymentDate 
                                                    ? new Date(selectedMember.nextPaymentDate).toLocaleDateString('fr-FR')
                                                    : "Non défini"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        {activeDetailTab === "documents" && (
                            <div className="space-y-6">
                                <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                                    <div className="flex justify-between items-center mb-6">
                                        <h3 className="text-lg font-semibold text-gray-800">Documents du membre</h3>
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center"
                                        >
                                            <Upload className="w-4 h-4 mr-2" />
                                            Ajouter un document
                                        </motion.button>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                                            <div className="flex items-start">
                                                <div className="p-3 bg-blue-100 rounded-lg mr-3">
                                                    <FileText className="w-6 h-6 text-blue-600" />
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="font-medium text-gray-800">Carte d'identité</h4>
                                                    <p className="text-sm text-gray-500 mb-2">Ajouté le {new Date(selectedMember.joinDate).toLocaleDateString('fr-FR')}</p>
                                                    <div className="flex space-x-2">
                                                        <button className="text-xs text-blue-600 hover:text-blue-800">Voir</button>
                                                        <button className="text-xs text-blue-600 hover:text-blue-800">Télécharger</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                                            <div className="flex items-start">
                                                <div className="p-3 bg-green-100 rounded-lg mr-3">
                                                    <FileText className="w-6 h-6 text-green-600" />
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="font-medium text-gray-800">Formulaire d'adhésion</h4>
                                                    <p className="text-sm text-gray-500 mb-2">Ajouté le {new Date(selectedMember.joinDate).toLocaleDateString('fr-FR')}</p>
                                                    <div className="flex space-x-2">
                                                        <button className="text-xs text-blue-600 hover:text-blue-800">Voir</button>
                                                        <button className="text-xs text-blue-600 hover:text-blue-800">Télécharger</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        {activeDetailTab === "settings" && (
                            <div className="space-y-6">
                                <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                        <Settings className="w-5 h-5 mr-2 text-blue-500" />
                                        Paramètres du compte
                                    </h3>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Rôle dans le syndicat
                                            </label>
                                            <select
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                value={selectedMember.role}
                                            >
                                                <option value="Membre">Membre</option>
                                                <option value="Trésorier">Trésorier</option>
                                                <option value="Secrétaire">Secrétaire</option>
                                                <option value="Président">Président</option>
                                            </select>
                                        </div>
                                        
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Statut du compte
                                            </label>
                                            <select
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                value={selectedMember.status}
                                            >
                                                <option value="active">Actif</option>
                                                <option value="blocked">Bloqué</option>
                                            </select>
                                        </div>
                                        
                                        <div className="pt-4 border-t border-gray-200">
                                            <h4 className="font-medium text-gray-800 mb-3">Actions avancées</h4>
                                            <div className="space-y-3">
                                                <button className="w-full px-4 py-2 bg-yellow-100 text-yellow-800 rounded-lg flex items-center justify-center hover:bg-yellow-200 transition-colors">
                                                    <RefreshCw className="w-4 h-4 mr-2" />
                                                    Réinitialiser le mot de passe
                                                </button>
                                                <button className="w-full px-4 py-2 bg-red-100 text-red-800 rounded-lg flex items-center justify-center hover:bg-red-200 transition-colors">
                                                    <Trash2 className="w-4 h-4 mr-2" />
                                                    Supprimer le compte
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    
                    {/* Actions en bas */}
                    <div className="border-t border-gray-200 p-4 flex justify-end space-x-4">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setShowMemberDetails(false)}
                            className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                            Fermer
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center"
                        >
                            <Edit className="w-5 h-5 mr-2" />
                            Enregistrer les modifications
                        </motion.button>
                    </div>
                </motion.div>
            </motion.div>
        );
    };

    // Composant pour le modal d'enregistrement de paiement
    const PaymentModal = () => {
        const member = members.find(m => m.id === paymentMemberId);
        if (!member) return null;
        
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50"
                onClick={() => setShowPaymentModal(false)}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl"
                    onClick={e => e.stopPropagation()}
                >
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-2xl font-bold text-gray-800">Enregistrer un paiement</h3>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setShowPaymentModal(false)}
                            className="p-2 hover:bg-gray-100 rounded-full"
                        >
                            <X className="w-6 h-6 text-gray-600" />
                        </motion.button>
                    </div>
                    
                    <div className="mb-6">
                        <div className="flex items-center mb-4">
                            <img 
                                src={member.profilePic} 
                                alt={member.name}
                                className="w-12 h-12 rounded-full object-cover mr-4"
                            />
                            <div>
                                <h4 className="font-semibold text-gray-800">{member.name}</h4>
                                <p className="text-sm text-gray-500">{member.email}</p>
                            </div>
                        </div>
                        
                        <div className="bg-blue-50 p-4 rounded-lg mb-4">
                            <div className="flex justify-between items-center">
                                <span className="text-blue-700">Montant dû:</span>
                                <span className="font-bold text-blue-800">{formatCurrency(member.dueAmount)}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Montant du paiement
                            </label>
                            <div className="relative">
                                <input
                                    type="number"
                                    value={paymentAmount}
                                    onChange={(e) => setPaymentAmount(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-200 focus:outline-none focus:ring-2 transition-colors"
                                    placeholder="0"
                                />
                                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">FCFA</span>
                            </div>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Méthode de paiement
                            </label>
                            <select className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-200 focus:outline-none focus:ring-2 transition-colors">
                                <option value="cash">Espèces</option>
                                <option value="transfer">Virement bancaire</option>
                                <option value="mobile">Mobile Money</option>
                                <option value="check">Chèque</option>
                            </select>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Note (optionnel)
                            </label>
                            <textarea
                                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-200 focus:outline-none focus:ring-2 transition-colors"
                                rows="2"
                                placeholder="Ajouter une note à ce paiement..."
                            ></textarea>
                        </div>
                    </div>
                    
                    <div className="mt-8 flex justify-end space-x-4">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setShowPaymentModal(false)}
                            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
                        >
                            Annuler
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleRecordPayment}
                            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all"
                            disabled={!paymentAmount || isNaN(parseFloat(paymentAmount)) || parseFloat(paymentAmount) <= 0}
                        >
                            <CheckCircle className="w-5 h-5 mr-2 inline-block" />
                            Enregistrer le paiement
                        </motion.button>
                    </div>
                </motion.div>
            </motion.div>
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-6">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        Gestion des Membres
                    </h1>
                    <p className="text-gray-600 mt-2">
                        Gérez efficacement les membres et les demandes d'adhésion
                    </p>
                </motion.div>

                {/* Statistiques */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatCard 
                        icon={Users} 
                        title="Membres actifs" 
                        value={members.filter(m => m.status === 'active').length}
                        bgColor="bg-blue-50"
                        textColor="text-blue-600"
                        borderColor="border-l-4 border-blue-500"
                    />
                    <StatCard 
                        icon={CheckCircle} 
                        title="Cotisations à jour" 
                        value={members.filter(m => m.paymentStatus === 'paid').length}
                        bgColor="bg-green-50"
                        textColor="text-green-600"
                        borderColor="border-l-4 border-green-500"
                    />
                    <StatCard 
                        icon={Clock} 
                        title="Paiements partiels" 
                        value={members.filter(m => m.paymentStatus === 'partial').length}
                        bgColor="bg-yellow-50"
                        textColor="text-yellow-600"
                        borderColor="border-l-4 border-yellow-500"
                    />
                    <StatCard 
                        icon={AlertTriangle} 
                        title="Paiements en retard" 
                        value={members.filter(m => m.paymentStatus === 'unpaid').length}
                        bgColor="bg-red-50"
                        textColor="text-red-600"
                        borderColor="border-l-4 border-red-500"
                    />
                </div>

                {/* Onglets */}
                <div className="mb-8 flex space-x-4">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setActiveTab("members")}
                        className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center ${
                            activeTab === "members"
                                ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg"
                                : "bg-white text-gray-700 hover:bg-gray-50"
                        }`}
                    >
                        <Users className={`w-5 h-5 mr-2 ${activeTab === "members" ? "text-white" : "text-blue-500"}`} />
                        Membres
                        <span className="ml-2 px-2 py-0.5 rounded-full text-xs bg-white text-blue-600">
                            {members.length}
                        </span>
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setActiveTab("requests")}
                        className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center ${
                            activeTab === "requests"
                                ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg"
                                : "bg-white text-gray-700 hover:bg-gray-50"
                        }`}
                    >
                        <UserPlus className={`w-5 h-5 mr-2 ${activeTab === "requests" ? "text-white" : "text-blue-500"}`} />
                        Demandes d'adhésion
                        <span className="ml-2 px-2 py-0.5 rounded-full text-xs bg-white text-blue-600">
                            {membershipRequests.length}
                        </span>
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setActiveTab("analytics")}
                        className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center ${
                            activeTab === "analytics"
                                ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg"
                                : "bg-white text-gray-700 hover:bg-gray-50"
                        }`}
                    >
                        <BarChart2 className={`w-5 h-5 mr-2 ${activeTab === "analytics" ? "text-white" : "text-blue-500"}`} />
                        Analytiques
                    </motion.button>
                </div>

                {/* Contenu des onglets */}
                <AnimatePresence mode="wait">
                    {activeTab === "members" && (
                        <motion.div
                            key="members"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
                                <div className="w-full md:w-auto flex flex-col md:flex-row gap-4">
                                    <div className="relative w-full md:w-64">
                                        <input
                                            type="text"
                                            placeholder="Rechercher un membre..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="w-full pl-10 pr-4 py-3 bg-white rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all duration-200"
                                        />
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                    </div>
                                    
                                    <div className="relative w-full md:w-auto">
                                        <button
                                            onClick={() => setShowStatusFilter(!showStatusFilter)}
                                            className="w-full md:w-auto px-4 py-3 bg-white rounded-xl border-2 border-gray-200 flex items-center justify-between hover:border-blue-500 transition-all duration-200"
                                        >
                                            <div className="flex items-center">
                                                <Filter className="w-5 h-5 mr-2 text-gray-400" />
                                                <span className="text-gray-700">Statut: {statusFilter === "all" ? "Tous" : statusFilter === "active" ? "Actifs" : "Bloqués"}</span>
                                            </div>
                                            <ChevronDown className="w-5 h-5 text-gray-400" />
                                        </button>
                                        {showStatusFilter && (
                                            <div
                                                className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10"
                                                onClick={handleMenuClick}
                                            >
                                                <div className="py-2">
                                                    <button
                                                        onClick={() => {
                                                            setStatusFilter("all");
                                                            setCurrentPage(1);
                                                            setShowStatusFilter(false);
                                                        }}
                                                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                    >
                                                        Tous
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setStatusFilter("active");
                                                            setCurrentPage(1);
                                                            setShowStatusFilter(false);
                                                        }}
                                                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                    >
                                                        Actifs
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setStatusFilter("blocked");
                                                            setCurrentPage(1);
                                                            setShowStatusFilter(false);
                                                        }}
                                                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                    >
                                                        Bloqués
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    
                                    <div className="relative w-full md:w-auto">
                                        <button
                                            onClick={() => setShowPaymentFilter(!showPaymentFilter)}
                                            className="w-full md:w-auto px-4 py-3 bg-white rounded-xl border-2 border-gray-200 flex items-center justify-between hover:border-blue-500 transition-all duration-200"
                                        >
                                            <div className="flex items-center">
                                                <CreditCard className="w-5 h-5 mr-2 text-gray-400" />
                                                <span className="text-gray-700">
                                                    Paiement: {
                                                        paymentFilter === "all" ? "Tous" : 
                                                        paymentFilter === "paid" ? "Payé" : 
                                                        paymentFilter === "partial" ? "Partiel" : 
                                                        "Non payé"
                                                    }
                                                </span>
                                            </div>
                                            <ChevronDown className="w-5 h-5 text-gray-400" />
                                        </button>
                                        {showPaymentFilter && (
                                            <div
                                                className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10"
                                                onClick={handleMenuClick}
                                            >
                                                <div className="py-2">
                                                    <button
                                                        onClick={() => {
                                                            setPaymentFilter("all");
                                                            setCurrentPage(1);
                                                            setShowPaymentFilter(false);
                                                        }}
                                                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                    >
                                                        Tous
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setPaymentFilter("paid");
                                                            setCurrentPage(1);
                                                            setShowPaymentFilter(false);
                                                        }}
                                                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                    >
                                                        Payé
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setPaymentFilter("partial");
                                                            setCurrentPage(1);
                                                            setShowPaymentFilter(false);
                                                        }}
                                                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                    >
                                                        Partiel
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setPaymentFilter("unpaid");
                                                            setCurrentPage(1);
                                                            setShowPaymentFilter(false);
                                                        }}
                                                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                    >
                                                        Non payé
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
                                >
                                    <UserPlus className="w-5 h-5 mr-2" />
                                    Ajouter un membre
                                </motion.button>
                            </div>

                            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="min-w-full">
                                        <thead>
                                            <tr className="bg-gradient-to-r from-blue-50 to-indigo-50">
                                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Membre</th>
                                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Contact</th>
                                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Statut</th>
                                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Cotisation</th>
                                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            <AnimatePresence>
                                                {paginatedMembers.map(member => (
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
                                                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold text-lg overflow-hidden">
                                                                        {member.profilePic ? (
                                                                            <img 
                                                                                src={member.profilePic} 
                                                                                alt={member.name}
                                                                                className="w-full h-full object-cover"
                                                                            />
                                                                        ) : (
                                                                            member.name.charAt(0)
                                                                        )}
                                                                    </div>
                                                                </div>
                                                                <div className="ml-4">
                                                                    <div className="text-sm font-semibold text-gray-900">{member.name}</div>
                                                                    <div className="text-sm text-gray-500 flex items-center">
                                                                        <Calendar className="w-4 h-4 mr-1 text-blue-500" />
                                                                        Depuis {new Date(member.joinDate).toLocaleDateString('fr-FR')}
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
                                                            <div className="flex flex-col space-y-2">
                                                                {getMemberStatusBadge(member.status)}
                                                                <span className="text-xs text-gray-500">{member.role}</span>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <div className="flex flex-col space-y-2">
                                                                {getPaymentStatusBadge(member.paymentStatus)}
                                                                <div className="flex items-center text-xs text-gray-500">
                                                                    <CreditCard className="w-3 h-3 mr-1" />
                                                                    {member.lastPayment 
                                                                        ? `Dernier: ${new Date(member.lastPayment).toLocaleDateString('fr-FR')}`
                                                                        : "Aucun paiement"}
                                                                </div>
                                                                {member.paymentStatus !== 'paid' && (
                                                                    <div className="text-xs font-medium text-red-600">
                                                                        Dû: {formatCurrency(member.dueAmount)}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <div className="flex space-x-2">
                                                                <motion.button
                                                                    whileHover={{ scale: 1.1 }}
                                                                    whileTap={{ scale: 0.9 }}
                                                                    className="p-2 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors duration-200"
                                                                    onClick={() => {
                                                                        setSelectedMember(member);
                                                                        setShowMemberDetails(true);
                                                                    }}
                                                                >
                                                                    <Eye className="w-5 h-5" />
                                                                </motion.button>
                                                                {member.paymentStatus !== 'paid' && (
                                                                    <motion.button
                                                                        whileHover={{ scale: 1.1 }}
                                                                        whileTap={{ scale: 0.9 }}
                                                                        className="p-2 rounded-xl bg-green-50 text-green-600 hover:bg-green-100 transition-colors duration-200"
                                                                        onClick={() => {
                                                                            setPaymentMemberId(member.id);
                                                                            setShowPaymentModal(true);
                                                                        }}
                                                                    >
                                                                        <CreditCard className="w-5 h-5" />
                                                                    </motion.button>
                                                                )}
                                                                <div className="relative">
                                                                    <motion.button
                                                                        whileHover={{ scale: 1.1 }}
                                                                        whileTap={{ scale: 0.9 }}
                                                                        className="p-2 rounded-xl bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors duration-200"
                                                                        onClick={() => setActiveActionMenu(activeActionMenu === member.id ? null : member.id)}
                                                                    >
                                                                        <MoreHorizontal className="w-5 h-5" />
                                                                    </motion.button>
                                                                    {activeActionMenu === member.id && (
                                                                        <div
                                                                            className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-10"
                                                                            onClick={handleMenuClick}
                                                                        >
                                                                            <div className="py-2">
                                                                                <button
                                                                                    onClick={() => {
                                                                                        handleUpdateMemberStatus(member.id, member.status === "active" ? "blocked" : "active");
                                                                                        setActiveActionMenu(null);
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
                                                                                    <Edit className="inline-block mr-2" size={16} /> Modifier
                                                                                </button>
                                                                                <button
                                                                                    onClick={() => setActiveActionMenu(null)}
                                                                                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center"
                                                                                >
                                                                                    <Trash2 className="inline-block mr-2" size={16} /> Supprimer
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </motion.tr>
                                                ))}
                                            </AnimatePresence>
                                        </tbody>
                                    </table>
                                </div>
                                
                                {filteredMembers.length === 0 && (
                                    <div className="text-center py-12">
                                        <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Aucun membre trouvé</h3>
                                        <p className="text-gray-500 max-w-md mx-auto">
                                            Aucun membre ne correspond à vos critères de recherche. Essayez de modifier vos filtres ou d'ajouter de nouveaux membres.
                                        </p>
                                    </div>
                                )}
                            </div>
                            
                            {filteredMembers.length > 0 && (
                                <div className="mt-6 flex flex-col sm:flex-row justify-between items-center">
                                    <div className="text-sm text-gray-600 mb-4 sm:mb-0">
                                        Affichage de {(currentPage - 1) * pageSize + 1} à {Math.min(currentPage * pageSize, filteredMembers.length)} sur {filteredMembers.length} membres
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                            disabled={currentPage === 1}
                                            className={`p-2 rounded-lg ${
                                                currentPage === 1
                                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                    : 'bg-white text-gray-700 hover:bg-gray-100'
                                            }`}
                                        >
                                            <ChevronLeft className="w-5 h-5" />
                                        </motion.button>
                                        
                                        {[...Array(totalPages)].map((_, i) => (
                                            <motion.button
                                                key={i}
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                onClick={() => setCurrentPage(i + 1)}
                                                className={`w-10 h-10 rounded-lg ${
                                                    currentPage === i + 1
                                                        ? 'bg-blue-500 text-white'
                                                        : 'bg-white text-gray-700 hover:bg-gray-100'
                                                }`}
                                            >
                                                {i + 1}
                                            </motion.button>
                                        ))}
                                        
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                            disabled={currentPage === totalPages}
                                            className={`p-2 rounded-lg ${
                                                currentPage === totalPages
                                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                    : 'bg-white text-gray-700 hover:bg-gray-100'
                                            }`}
                                        >
                                            <ChevronRight className="w-5 h-5" />
                                        </motion.button>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    )}
                    
                    {activeTab === "requests" && (
                        <motion.div
                            key="requests"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="space-y-6">
                                {displayedRequests.length > 0 ? (
                                    displayedRequests.map((req) => (
                                        <motion.div
                                            key={req.id}
                                            className="bg-white border border-gray-200 shadow-lg rounded-2xl p-6 hover:shadow-xl transition-all duration-300"
                                            whileHover={{ scale: 1.01 }}
                                        >
                                            <div
                                                className="flex flex-col md:flex-row md:items-center md:justify-between cursor-pointer"
                                                onClick={() => toggleRequestExpansion(req.id)}
                                            >
                                                <div className="flex items-center mb-4 md:mb-0">
                                                    <img
                                                        src={req.profilePic}
                                                        alt={req.name}
                                                        className="w-16 h-16 rounded-xl object-cover mr-4 border-4 border-blue-100"
                                                    />
                                                    <div>
                                                        <h3 className="text-xl font-bold text-gray-800 mb-1">{req.name}</h3>
                                                        <div className="flex flex-wrap gap-2 text-sm text-gray-600">
                                                            <div className="flex items-center">
                                                                <Mail className="w-4 h-4 mr-1 text-blue-500" />
                                                                {req.email}
                                                            </div>
                                                            <div className="flex items-center">
                                                                <Phone className="w-4 h-4 mr-1 text-green-500" />
                                                                {req.phone}
                                                            </div>
                                                            <div className="flex items-center">
                                                                <Calendar className="w-4 h-4 mr-1 text-purple-500" />
                                                                Demande du {new Date(req.dateSubmitted).toLocaleDateString('fr-FR')}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center">
                                                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mr-4">
                                                        {req.profession}
                                                    </span>
                                                    <ChevronDown
                                                        className={`transform transition-transform duration-200 ${expandedRequestId === req.id ? "rotate-180" : ""}`}
                                                        size={24}
                                                    />
                                                </div>
                                            </div>
                                            
                                            {expandedRequestId === req.id && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: "auto" }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    className="mt-6 border-t pt-6"
                                                >
                                                    <div className="mb-6">
                                                        <h4 className="text-lg font-semibold text-gray-800 mb-2">Motivation</h4>
                                                        <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{req.motivation}</p>
                                                    </div>
                                                    
                                                    <div className="mb-6">
                                                        <h4 className="text-lg font-semibold text-gray-800 mb-2">Documents d'identité</h4>
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                            <div>
                                                                <p className="text-sm text-gray-600 mb-2">Recto de la carte d'identité</p>
                                                                <div className="relative group">
                                                                    <img
                                                                        src={req.idCardFront}
                                                                        alt="Carte d'identité - Recto"
                                                                        className="w-full h-48 object-cover rounded-lg border border-gray-300"
                                                                    />
                                                                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 flex items-center justify-center transition-all duration-200 rounded-lg">
                                                                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                                                            <motion.button
                                                                                whileHover={{ scale: 1.1 }}
                                                                                whileTap={{ scale: 0.9 }}
                                                                                className="p-2 bg-white rounded-full mr-2"
                                                                            >
                                                                                <Eye className="w-5 h-5 text-blue-600" />
                                                                            </motion.button>
                                                                            <motion.button
                                                                                whileHover={{ scale: 1.1 }}
                                                                                whileTap={{ scale: 0.9 }}
                                                                                className="p-2 bg-white rounded-full"
                                                                            >
                                                                                <Download className="w-5 h-5 text-blue-600" />
                                                                            </motion.button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <p className="text-sm text-gray-600 mb-2">Verso de la carte d'identité</p>
                                                                <div className="relative group">
                                                                    <img
                                                                        src={req.idCardBack}
                                                                        alt="Carte d'identité - Verso"
                                                                        className="w-full h-48 object-cover rounded-lg border border-gray-300"
                                                                    />
                                                                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 flex items-center justify-center transition-all duration-200 rounded-lg">
                                                                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                                                            <motion.button
                                                                                whileHover={{ scale: 1.1 }}
                                                                                whileTap={{ scale: 0.9 }}
                                                                                className="p-2 bg-white rounded-full mr-2"
                                                                            >
                                                                                <Eye className="w-5 h-5 text-blue-600" />
                                                                            </motion.button>
                                                                            <motion.button
                                                                                whileHover={{ scale: 1.1 }}
                                                                                whileTap={{ scale: 0.9 }}
                                                                                className="p-2 bg-white rounded-full"
                                                                            >
                                                                                <Download className="w-5 h-5 text-blue-600" />
                                                                            </motion.button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="flex justify-end space-x-4">
                                                        <motion.button
                                                            whileHover={{ scale: 1.05 }}
                                                            whileTap={{ scale: 0.95 }}
                                                            className="px-6 py-3 bg-red-500 text-white rounded-xl flex items-center hover:bg-red-600 transition-colors shadow-lg"
                                                            onClick={() => handleRejectRequest(req.id)}
                                                        >
                                                            <X className="w-5 h-5 mr-2" /> Rejeter
                                                        </motion.button>
                                                        <motion.button
                                                            whileHover={{ scale: 1.05 }}
                                                            whileTap={{ scale: 0.95 }}
                                                            className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl flex items-center hover:from-green-600 hover:to-emerald-700 transition-colors shadow-lg"
                                                            onClick={() => handleAcceptRequest(req.id)}
                                                        >
                                                            <Check className="w-5 h-5 mr-2" /> Accepter
                                                        </motion.button>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </motion.div>
                                    ))
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="bg-white rounded-2xl shadow-lg p-8 text-center"
                                    >
                                        <UserPlus className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Aucune demande d'adhésion</h3>
                                        <p className="text-gray-500 max-w-md mx-auto">
                                            Il n'y a actuellement aucune demande d'adhésion en attente. Les nouvelles demandes apparaîtront ici.
                                        </p>
                                    </motion.div>
                                )}
                                
                                {membershipRequests.length > 3 && (
                                    <div className="text-center mt-6">
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="px-6 py-3 bg-white text-gray-700 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
                                            onClick={() => setShowAllRequests(!showAllRequests)}
                                        >
                                            {showAllRequests ? "Voir moins" : `Voir toutes les demandes (${membershipRequests.length})`}
                                        </motion.button>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}
                    
                    {activeTab === "analytics" && (
                        <motion.div
                            key="analytics"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                                <div className="bg-white rounded-2xl shadow-lg p-6 col-span-1">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                        <CreditCard className="w-5 h-5 mr-2 text-blue-500" />
                                        Statut des cotisations
                                    </h3>
                                    <div className="h-64">
                                        <Pie data={paymentStatusData} options={{ maintainAspectRatio: false }} />
                                    </div>
                                </div>
                                
                                <div className="bg-white rounded-2xl shadow-lg p-6 col-span-1">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                        <Users className="w-5 h-5 mr-2 text-blue-500" />
                                        Statut des membres
                                    </h3>
                                    <div className="h-64">
                                        <Pie data={memberStatusData} options={{ maintainAspectRatio: false }} />
                                    </div>
                                </div>
                                
                                <div className="bg-white rounded-2xl shadow-lg p-6 col-span-1 lg:col-span-1 md:col-span-2">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                        <TrendingUp className="w-5 h-5 mr-2 text-blue-500" />
                                        Résumé financier
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="bg-blue-50 p-4 rounded-lg">
                                            <p className="text-sm text-blue-700 mb-1">Total cotisations</p>
                                            <p className="text-2xl font-bold text-blue-800">
                                                {formatCurrency(members.reduce((sum, m) => sum + m.totalPaid, 0))}
                                            </p>
                                        </div>
                                        <div className="bg-red-50 p-4 rounded-lg">
                                            <p className="text-sm text-red-700 mb-1">Montant dû</p>
                                            <p className="text-2xl font-bold text-red-800">
                                                {formatCurrency(members.reduce((sum, m) => sum + m.dueAmount, 0))}
                                            </p>
                                        </div>
                                        <div className="bg-green-50 p-4 rounded-lg">
                                            <p className="text-sm text-green-700 mb-1">Taux de recouvrement</p>
                                            <p className="text-2xl font-bold text-green-800">
                                                {Math.round((members.reduce((sum, m) => sum + m.totalPaid, 0) / 
                                                (members.reduce((sum, m) => sum + m.totalPaid, 0) + 
                                                members.reduce((sum, m) => sum + m.dueAmount, 0))) * 100)}%
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-white rounded-2xl shadow-lg p-6">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                        <Calendar className="w-5 h-5 mr-2 text-blue-500" />
                                        Nouvelles adhésions mensuelles
                                    </h3>
                                    <div className="h-64">
                                        <Bar 
                                            data={monthlyJoinsData} 
                                            options={{ 
                                                maintainAspectRatio: false,
                                                scales: {
                                                    y: {
                                                        beginAtZero: true
                                                    }
                                                }
                                            }} 
                                        />
                                    </div>
                                </div>
                                
                                <div className="bg-white rounded-2xl shadow-lg p-6">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                        <Award className="w-5 h-5 mr-2 text-blue-500" />
                                        Membres les plus actifs
                                    </h3>
                                    <div className="space-y-4">
                                        {members.slice(0, 5).map((member, index) => (
                                            <div key={member.id} className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                                <div className="flex-shrink-0 mr-4">
                                                    <div className="relative">
                                                        <div className="w-10 h-10 rounded-full overflow-hidden">
                                                            <img 
                                                                src={member.profilePic} 
                                                                alt={member.name}
                                                                className="w-full h-full object-cover"
                                                            />
                                                        </div>
                                                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full text-white text-xs flex items-center justify-center border-2 border-white">
                                                            {index + 1}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex-1">
                                                    <p className="font-medium text-gray-800">{member.name}</p>
                                                    <p className="text-xs text-gray-500">{member.role}</p>
                                                </div>
                                                <div className="flex items-center">
                                                    <Star className="w-4 h-4 text-yellow-500" />
                                                    <span className="ml-1 text-sm font-medium">{5 - index * 0.5}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            
            {/* Modals */}
            <AnimatePresence>
                {showMemberDetails && <MemberDetailsModal />}
                {showPaymentModal && <PaymentModal />}
            </AnimatePresence>
        </div>
    )
}