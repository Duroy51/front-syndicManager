"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"


import { useTranslation } from "react-i18next"
import {
    X,
    Users,
    Calendar,
    MapPin,
    Zap,
    Heart,
    Share2,
    MessageCircle,
    Clock,
    User,
    Bookmark,
    Send,
} from "lucide-react"
import {
    getFirstNameToken,
    getFullNameFromToken,
    getLastNameToken,
    getUserIdFromToken
} from "../../services/AccountService.js"
import { CreateSyndicatForm } from "../NewCreateSyndicatPage/CreateSyndicatForm.jsx"
import {Layout} from "./localcomponent/Layout.jsx";


const stats = [
    { id: 1, title: "Membres", value: 1200, icon: Users },
    { id: 2, title: "Événements", value: 30, icon: Calendar },
    { id: 3, title: "Syndicats", value: 15, icon: MapPin },
]

const quickAccess = [
    { id: 1, title: "Créer un événement", icon: Calendar },
    { id: 2, title: "Envoyer un message", icon: MessageCircle },
    { id: 3, title: "Consulter les statistiques", icon: Zap },
]

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
}

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
    },
}

const fakePublications = [
    {
        id: 1,
        author: {
            name: "Jean Dupont",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
        },
        content:
            "Aujourd'hui, nous avons eu une réunion productive sur les nouvelles mesures de sécurité. Qu'en pensez-vous ?",
        image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&h=800&fit=crop",
        timestamp: "Il y a 2 heures",
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
        likes: 15,
        comments: [
            {
                author: {
                    name: "Marie Martin",
                    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
                },
                content: "Excellente initiative ! J'ai hâte de voir les résultats.",
            },
            {
                author: {
                    name: "Luc Dubois",
                    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
                },
                content: "Pouvons-nous avoir plus de détails sur ces mesures ?",
            },
        ],
        syndicat: {
            name: "Syndicat des Travailleurs de l'Industrie",
            coverImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=400&fit=crop",
        },
    },
    {
        id: 2,
        author: {
            name: "Sophie Lefebvre",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
        },
        content:
            "Rappel : la formation sur les nouveaux outils de communication aura lieu demain à 14h. N'oubliez pas de vous inscrire !",
        timestamp: "Il y a 5 heures",
        createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
        likes: 8,
        comments: [],
        syndicat: {
            name: "Syndicat de l'Éducation Nationale",
            coverImage: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=1200&h=400&fit=crop",
        },
    },

    {
        id: 3,
        author: {
            name: "Sophie Martin",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
        },
        content: "Nouvelle proposition pour l'amélioration des conditions de travail en atelier. Vos suggestions sont les bienvenues !",
        image: "https://images.unsplash.com/photo-1521791055366-8d8d9e4c0f3c?w=1200&h=800&fit=crop",
        timestamp: "Il y a 3 heures",
        createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
        likes: 24,
        comments: [
            {
                author: {
                    name: "Marc Lambert",
                    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
                },
                content: "Il faudrait revoir l'ergonomie des postes de travail",
            },
            {
                author: {
                    name: "Julie Roux",
                    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop",
                },
                content: "Je propose une réunion thématique la semaine prochaine",
            },
        ],
        syndicat: {
            name: "Union des Ouvriers du Commerce",
            coverImage: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&h=400&fit=crop",
        },
    },

    {
        id: 4,
        author: {
            name: "Éric Leroy",
            avatar: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=150&h=150&fit=crop",
        },
        content: "Appel à mobilisation pour la défense de nos acquis sociaux ! Réunion prévue vendredi à 18h.",
        image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ba?w=1200&h=800&fit=crop",
        timestamp: "Il y a 1 jour",
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
        likes: 42,
        comments: [
            {
                author: {
                    name: "Nathalie Petit",
                    avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&h=150&fit=crop",
                },
                content: "Présente ! Comptez sur moi pour diffuser l'info",
            }
        ],
        syndicat: {
            name: "Confédération des Métallurgistes",
            coverImage: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&h=400&fit=crop",
        },
    },

    {
        id: 5,
        author: {
            name: "Isabelle Bernard",
            avatar: "https://images.unsplash.com/photo-1593104547489-5cfb3839a3b5?w=150&h=150&fit=crop",
        },
        content: "Résultats du sondage sur la réforme des horaires : 78% d'avis favorables !",
        image: "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=1200&h=800&fit=crop",
        timestamp: "Il y a 5 heures",
        createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
        likes: 33,
        comments: [
            {
                author: {
                    name: "Pauline Girard",
                    avatar: "https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?w=150&h=150&fit=crop",
                },
                content: "Super nouvelle ! Merci pour ce travail",
            },
            {
                author: {
                    name: "Antoine Moreau",
                    avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=150&h=150&fit=crop",
                },
                content: "Quand sera mise en place cette réforme ?",
            }
        ],
        syndicat: {
            name: "Fédération des Services Publics",
            coverImage: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200&h=400&fit=crop",
        },
    },

    {
        id: 6,
        author: {
            name: "Mohamed Ali",
            avatar: "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?w=150&h=150&fit=crop",
        },
        content: "Atelier formation aux premiers secours : inscrivez-vous avant vendredi !",
        image: "https://images.unsplash.com/photo-1584722065001-ee7f8d5e0294?w=1200&h=800&fit=crop",
        timestamp: "Il y a 6 heures",
        createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
        likes: 19,
        comments: [],
        syndicat: {
            name: "Syndicat National des Transports",
            coverImage: "https://images.unsplash.com/photo-1473163928189-364b2c4e1135?w=1200&h=400&fit=crop",
        },
    },

    {
        id: 7,
        author: {
            name: "Camille Rousseau",
            avatar: "https://images.unsplash.com/photo-1545167622-3a6ac756afa4?w=150&h=150&fit=crop",
        },
        content: "Retour sur la manifestation d'hier : plus de 500 participants ! Merci à tous 🎉",
        image: "https://images.unsplash.com/photo-1519817914152-22d216bb9170?w=1200&h=800&fit=crop",
        timestamp: "Il y a 4 jours",
        createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
        likes: 87,
        comments: [
            {
                author: {
                    name: "Thomas Legrand",
                    avatar: "https://images.unsplash.com/photo-1546820389-44d77e1f3b31?w=150&h=150&fit=crop",
                },
                content: "C'était historique ! À refaire vite",
            },
            {
                author: {
                    name: "Léa Fontaine",
                    avatar: "https://images.unsplash.com/photo-1597223557154-721c1cecc4b0?w=150&h=150&fit=crop",
                },
                content: "Quelle belle énergie ! Fière de notre mobilisation",
            }
        ],
        syndicat: {
            name: "Confédération Générale du Travail",
            coverImage: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1200&h=400&fit=crop",
        },
    },

        {
            id: 8,
            author: {
                name: "Lucas Dupont",
                avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop",
            },
            content: "Victoire ! Notre négociation a abouti à une augmentation de 5% pour tous les employés. Merci à tous pour votre soutien indéfectible ! 💪",
            image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=800&fit=crop",
            timestamp: "Il y a 2 jours",
            createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
            likes: 156,
            comments: [
                {
                    author: {
                        name: "Sophie Martin",
                        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
                    },
                    content: "Bravo à toute l'équipe de négociation ! C'est une belle avancée pour nous tous.",
                },
                {
                    author: {
                        name: "Antoine Lefebvre",
                        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
                    },
                    content: "Excellent travail ! Cela montre l'importance d'un syndicat fort et uni.",
                }
            ],
            syndicat: {
                name: "Union des Travailleurs de l'Industrie",
                coverImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=400&fit=crop",
            },
        },
            {
                id: 9,
                author: {
                    name: "Marie Dubois",
                    avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&h=150&fit=crop",
                },
                content: "Rappel : Assemblée générale ce jeudi à 18h. Ordre du jour : conditions de travail et primes de fin d'année. Votre présence est cruciale !",
                image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=1200&h=800&fit=crop",
                timestamp: "Il y a 6 heures",
                createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
                likes: 42,
                comments: [
                    {
                        author: {
                            name: "Pierre Moreau",
                            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
                        },
                        content: "Je serai présent. Ces sujets sont vraiment importants pour nous tous.",
                    }
                ],
                syndicat: {
                    name: "Syndicat National de l'Éducation",
                    coverImage: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=1200&h=400&fit=crop",
                },
            },
            {
                id: 10,
                author: {
                    name: "Julien Leroy",
                    avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=150&h=150&fit=crop",
                },
                content: "Nouvelle loi sur le télétravail : quels sont vos droits ? Retrouvez notre analyse complète sur notre site web. Lien en commentaire.",
                image: "https://images.unsplash.com/photo-1585859615975-57a2e3e7c5a9?w=1200&h=800&fit=crop",
                timestamp: "Il y a 1 jour",
                createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
                likes: 95,
                comments: [
                    {
                        author: {
                            name: "Emma Petit",
                            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
                        },
                        content: "Merci pour cette analyse ! Voici le lien pour ceux qui cherchent : www.syndicat-info.fr/teletravail",
                    },
                    {
                        author: {
                            name: "Thomas Roux",
                            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
                        },
                        content: "Très utile, surtout avec tous ces changements récents. Merci !",
                    }
                ],
                syndicat: {
                    name: "Fédération Française des Travailleurs",
                    coverImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=400&fit=crop",
                },
            },
            {
                id: 11,
                author: {
                    name: "Aurélie Blanc",
                    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop",
                },
                content: "Journée de la femme : retour sur notre table ronde sur l'égalité salariale. Merci à toutes les participantes pour ces échanges enrichissants !",
                image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=1200&h=800&fit=crop",
                timestamp: "Il y a 3 jours",
                createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
                likes: 128,
                comments: [
                    {
                        author: {
                            name: "Claire Durand",
                            avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop",
                        },
                        content: "Une journée inspirante ! J'espère que cela se traduira par des actions concrètes.",
                    },
                    {
                        author: {
                            name: "Marc Lemoine",
                            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
                        },
                        content: "Bravo pour cette initiative. L'égalité salariale est un combat qui nous concerne tous.",
                    }
                ],
                syndicat: {
                    name: "Syndicat pour l'Égalité Professionnelle",
                    coverImage: "https://images.unsplash.com/photo-1573164713619-24c711fe7878?w=1200&h=400&fit=crop",
                },
            },
            {
                id: 12,
                author: {
                    name: "François Girard",
                    avatar: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=150&h=150&fit=crop",
                },
                content: "Alerte : projet de fermeture de l'usine annoncé. Réunion d'urgence demain à 10h. Mobilisation générale !",
                image: "https://images.unsplash.com/photo-1565098772267-60af42b81ef2?w=1200&h=800&fit=crop",
                timestamp: "Il y a 5 heures",
                createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
                likes: 215,
                comments: [
                    {
                        author: {
                            name: "Nathalie Rousseau",
                            avatar: "https://images.unsplash.com/photo-1597223557154-721c1cecc4b0?w=150&h=150&fit=crop",
                        },
                        content: "C'est inadmissible ! Nous serons tous là pour défendre nos emplois.",
                    },
                    {
                        author: {
                            name: "Philippe Mercier",
                            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
                        },
                        content: "Je contacte la presse locale. Il faut que cette nouvelle soit connue de tous.",
                    },
                    {
                        author: {
                            name: "Isabelle Fournier",
                            avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop",
                        },
                        content: "Nous ne laisserons pas faire ! Unissons-nous pour sauver notre usine et nos emplois.",
                    }
                ],
                syndicat: {
                    name: "Syndicat des Métallurgistes Unis",
                    coverImage: "https://images.unsplash.com/photo-1565098772267-60af42b81ef2?w=1200&h=400&fit=crop",
                },
            },
            {
                id: 13,
                author: {
                    name: "Élodie Lambert",
                    avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop",
                },
                content: "Succès de notre campagne pour de meilleures conditions de travail dans les hôpitaux ! La direction s'engage à embaucher 50 infirmiers supplémentaires. Continuons le combat ! 🏥👩‍⚕️👨‍⚕️",
                image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&h=800&fit=crop",
                timestamp: "Il y a 8 heures",
                createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000),
                likes: 176,
                comments: [
                    {
                        author: {
                            name: "Dr. Martin Dupuis",
                            avatar: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=150&h=150&fit=crop",
                        },
                        content: "Une excellente nouvelle pour notre personnel et nos patients ! Merci pour votre engagement.",
                    },
                    {
                        author: {
                            name: "Sarah Nguyen",
                            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
                        },
                        content: "Enfin une avancée concrète ! Cela va vraiment améliorer nos conditions de travail.",
                    }
                ],
                syndicat: {
                    name: "Syndicat National de la Santé Publique",
                    coverImage: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&h=400&fit=crop",
                },
            }



]

const fakeEvents = [
    {
        id: 1,
        title: "Assemblée Générale Annuelle",
        description:
            "Rejoignez-nous pour notre Assemblée Générale Annuelle où nous discuterons des réalisations de l'année écoulée et planifierons l'avenir de notre syndicat. Votre voix compte !",
        location: "Salle de conférence principale, 123 Rue du Syndicat",
        startDate: new Date("2023-06-15T09:00:00"),
        endDate: new Date("2023-06-15T17:00:00"),
        author: {
            name: "Marie Dupont",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
        },
        image: "https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?w=1200&h=600&fit=crop",
        isUpcoming: true,
        participants: [
            { name: "Jean Dupont" },
            { name: "Marie Curie" },
            { name: "Pierre Martin" },
            { name: "Sophie Lefebvre" },
        ],
        syndicat: {
            name: "Syndicat des Travailleurs de l'Industrie",
            coverImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=400&fit=crop",
        },
    },
    {
        id: 2,
        title: "Formation sur les Droits du Travail",
        description:
            "Ne manquez pas notre session de formation intensive sur les dernières mises à jour des lois du travail. Un expert juridique sera présent pour répondre à toutes vos questions.",
        location: "Salle de formation B, 45 Avenue des Travailleurs",
        startDate: new Date("2023-07-10T14:00:00"),
        endDate: new Date("2023-07-10T18:00:00"),
        author: {
            name: "Pierre Martin",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
        },
        image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1200&h=600&fit=crop",
        isUpcoming: true,
        participants: [{ name: "Lucie Moreau" }, { name: "Thomas Bernard" }, { name: "Camille Roux" }],
        syndicat: {
            name: "Syndicat de l'Éducation Nationale",
            coverImage: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=1200&h=400&fit=crop",
        },
    },


        {
            id: 3,
            title: "Atelier sur la Négociation Collective",
            description:
                "Participez à notre atelier interactif sur les techniques de négociation collective. Apprenez à défendre efficacement les intérêts de vos collègues lors des discussions avec la direction.",
            location: "Centre de Conférences Étoile, 78 Rue de la République",
            startDate: new Date("2023-08-15T09:30:00"),
            endDate: new Date("2023-08-15T17:00:00"),
            author: {
                name: "Sophie Dubois",
                avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
            },
            image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=1200&h=600&fit=crop",
            isUpcoming: true,
            participants: [
                { name: "Marc Lefevre" },
                { name: "Julie Rousseau" },
                { name: "Antoine Dupuis" },
                { name: "Émilie Bouchard" }
            ],
            syndicat: {
                name: "Syndicat des Travailleurs du Commerce",
                coverImage: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=1200&h=400&fit=crop",
            },
        },
        {
            id: 4,
            title: "Séminaire sur la Santé et la Sécurité au Travail",
            description:
                "Un séminaire essentiel pour tous les délégués syndicaux sur les dernières normes de santé et de sécurité au travail. Découvrez comment protéger vos collègues et améliorer les conditions de travail.",
            location: "Salle Harmonie, 15 Boulevard des Capucines",
            startDate: new Date("2023-09-05T10:00:00"),
            endDate: new Date("2023-09-05T16:30:00"),
            author: {
                name: "Laurent Mercier",
                avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
            },
            image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1200&h=600&fit=crop",
            isUpcoming: true,
            participants: [
                { name: "Nathalie Lemoine" },
                { name: "Philippe Girard" },
                { name: "Isabelle Fournier" }
            ],
            syndicat: {
                name: "Syndicat de l'Industrie Métallurgique",
                coverImage: "https://images.unsplash.com/photo-1565098772267-60af42b81ef2?w=1200&h=400&fit=crop",
            },
        },
        {
            id: 5,
            title: "Conférence sur l'Égalité Professionnelle",
            description:
                "Rejoignez-nous pour une conférence inspirante sur l'égalité professionnelle entre les hommes et les femmes. Des intervenants de renom partageront leurs expériences et stratégies pour promouvoir l'égalité sur le lieu de travail.",
            location: "Palais des Congrès, 2 Place de la Porte Maillot",
            startDate: new Date("2023-10-12T13:00:00"),
            endDate: new Date("2023-10-12T18:00:00"),
            author: {
                name: "Marie-Claire Dupont",
                avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
            },
            image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=1200&h=600&fit=crop",
            isUpcoming: true,
            participants: [
                { name: "François Moreau" },
                { name: "Céline Petit" },
                { name: "Alexandre Lambert" },
                { name: "Aurélie Roux" },
                { name: "Thierry Martin" }
            ],
            syndicat: {
                name: "Syndicat Interprofessionnel pour l'Égalité",
                coverImage: "https://images.unsplash.com/photo-1573164713619-24c711fe7878?w=1200&h=400&fit=crop",
            },
        },
        {
            id: 6,
            title: "Forum sur la Digitalisation et l'Emploi",
            description:
                "Un forum crucial sur l'impact de la digitalisation sur l'emploi. Explorez les défis et les opportunités de l'ère numérique pour les travailleurs et les syndicats.",
            location: "Centre de Conventions Numérique, 55 Rue de l'Innovation",
            startDate: new Date("2023-11-08T09:00:00"),
            endDate: new Date("2023-11-08T17:30:00"),
            author: {
                name: "Julien Leclerc",
                avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=150&h=150&fit=crop",
            },
            image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=600&fit=crop",
            isUpcoming: true,
            participants: [
                { name: "Sandrine Durand" },
                { name: "Olivier Blanchard" },
                { name: "Valérie Rousseau" },
                { name: "Éric Lemaire" }
            ],
            syndicat: {
                name: "Syndicat des Travailleurs du Numérique",
                coverImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=400&fit=crop",
            },
        },
        {
            id: 7,
            title: "Journée d'Étude sur les Retraites",
            description:
                "Une journée d'étude approfondie sur le système des retraites et les réformes en cours. Comprenez les enjeux et préparez-vous à défendre les droits des travailleurs.",
            location: "Maison des Syndicats, 32 Rue de la Solidarité",
            startDate: new Date("2023-12-03T08:30:00"),
            endDate: new Date("2023-12-03T16:00:00"),
            author: {
                name: "Gérard Bonnet",
                avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
            },
            image: "https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?w=1200&h=600&fit=crop",
            isUpcoming: true,
            participants: [
                { name: "Martine Lefebvre" },
                { name: "Bernard Dubois" },
                { name: "Christine Morel" },
                { name: "Pascal Renard" },
                { name: "Sylvie Lambert" }
            ],
            syndicat: {
                name: "Syndicat National des Retraités",
                coverImage: "https://images.unsplash.com/photo-1574010498550-47bd2d56d962?w=1200&h=400&fit=crop",
            },
        },
        {
            id: 8,
            title: "Atelier sur la Gestion du Stress Professionnel",
            description:
                "Apprenez des techniques efficaces pour gérer le stress au travail et promouvoir le bien-être de vos collègues. Cet atelier pratique vous donnera des outils concrets pour améliorer la qualité de vie au travail.",
            location: "Espace Zen, 10 Rue de la Sérénité",
            startDate: new Date("2024-01-20T14:00:00"),
            endDate: new Date("2024-01-20T18:00:00"),
            author: {
                name: "Claire Dumont",
                avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop",
            },
            image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&h=600&fit=crop",
            isUpcoming: true,
            participants: [
                { name: "Thomas Leroy" },
                { name: "Anne Garnier" },
                { name: "Nicolas Perrin" },
                { name: "Hélène Bouvier" }
            ],
            syndicat: {
                name: "Syndicat pour le Bien-être au Travail",
                coverImage: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1200&h=400&fit=crop",
            },
        }

]

export const AcceuilSection = () => {
    const [fullName, setFullName] = useState(null)
    const [showCreateSyndicatForm, setCreateSyndicatForm] = useState(false)
    const [feed, setFeed] = useState([])
    const {t} = useTranslation();

    const userId = getUserIdFromToken()

    useEffect(() => {
        setFullName(getFullNameFromToken())

        // Combine and shuffle publications and events
        const combinedFeed = [...fakePublications, ...fakeEvents].sort(() => Math.random() - 0.5)
        setFeed(combinedFeed)
    }, [])

    const handleCreateSyndicat = () => {
        setCreateSyndicatForm(true)
    }

    const FeedItem = ({ item }) => {
        const [showCommentModal, setShowCommentModal] = useState(false)
        const [liked, setLiked] = useState(false)
        const [bookmarked, setBookmarked] = useState(false)
        const [newComment, setNewComment] = useState("")

        const handleAddComment = () => {
            if (newComment.trim()) {
                item.comments.push({
                    author: {
                        name: `${fullName} `,
                        avatar: "/placeholder-user.jpg", // You may want to replace this with the actual user's avatar
                    },
                    content: newComment.trim(),
                })
                setNewComment("")
            }
        }

        if ("content" in item) {
            // This is a publication
            return (
                <motion.div
                    variants={itemVariants}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 w-full max-w-2xl mx-auto"
                >
                    <div className="p-6">
                        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-4 flex items-center rounded-t-xl">
                            <img
                                src={item.syndicat.coverImage || "/placeholder.svg"}
                                alt={item.syndicat.name}
                                className="w-10 h-10 rounded-full object-cover mr-3 border-2 border-white"
                            />
                            <h3 className="text-white font-semibold">{item.syndicat.name}</h3>
                        </div>
                        <div className="p-6">
                            <div className="flex items-center mb-6">
                                <div className="relative">
                                    <img
                                        src={item.author.avatar || "/placeholder.svg"}
                                        alt={item.author.name}
                                        className="w-12 h-12 rounded-full object-cover ring-4 ring-blue-100"
                                    />
                                    <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></div>
                                </div>
                                <div className="ml-4 flex-grow">
                                    <h3 className="font-bold text-xl text-gray-800 hover:text-blue-600 transition-colors duration-200">
                                        {item.author.name}
                                    </h3>
                                    <div className="flex items-center text-sm text-gray-500">
                                        <Clock className="w-4 h-4 mr-1 text-blue-500" />
                                        <span>{item.timestamp}</span>
                                    </div>
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => setBookmarked(!bookmarked)}
                                    className={`p-2 rounded-full ${bookmarked ? "text-blue-500 bg-blue-50" : "text-gray-400 hover:text-blue-500 hover:bg-blue-50"} transition-colors duration-200`}
                                >
                                    <Bookmark className="w-6 h-6" fill={bookmarked ? "currentColor" : "none"} />
                                </motion.button>
                            </div>

                            <p className="text-gray-700 leading-relaxed mb-6">{item.content}</p>

                            {item.image && (
                                <motion.div
                                    className="rounded-xl overflow-hidden mb-6 shadow-lg"
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <img
                                        src={item.image || "/placeholder.svg"}
                                        alt="Post content"
                                        className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-500"
                                    />
                                </motion.div>
                            )}

                            <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                                <div className="flex items-center space-x-2">
                                    <div className="flex -space-x-2">
                                        <div className="w-7 h-7 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white text-xs ring-2 ring-white">
                                            {item.likes}
                                        </div>
                                        <div className="w-7 h-7 rounded-full bg-gradient-to-r from-pink-500 to-red-500 flex items-center justify-center text-white text-xs ring-2 ring-white">
                                            <Heart className="w-3 h-3" />
                                        </div>
                                    </div>
                                    <span className="ml-2">{item.likes} réactions</span>
                                </div>
                                <span>{item.comments.length} commentaires</span>
                            </div>

                            <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setLiked(!liked)}
                                    className={`flex items-center px-4 py-2 rounded-xl ${
                                        liked ? "bg-blue-500 text-white" : "text-gray-600 hover:bg-gray-50"
                                    } transition-all duration-200`}
                                >
                                    <Heart className="w-5 h-5 mr-2" fill={liked ? "currentColor" : "none"} />
                                    {t("jaime")}
                                </motion.button>

                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setShowCommentModal(true)}
                                    className="flex items-center px-4 py-2 rounded-xl text-gray-600 hover:bg-gray-50 transition-all duration-200"
                                >
                                    <MessageCircle className="w-5 h-5 mr-2" />
                                    {t("commenter")}
                                </motion.button>

                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="flex items-center px-4 py-2 rounded-xl text-gray-600 hover:bg-gray-50 transition-all duration-200"
                                >
                                    <Share2 className="w-5 h-5 mr-2" />
                                    {t("partager")}
                                </motion.button>
                            </div>
                            <AnimatePresence>
                                {showCommentModal && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                                        onClick={() => setShowCommentModal(false)}
                                    >
                                        <motion.div
                                            initial={{ scale: 0.9, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            exit={{ scale: 0.9, opacity: 0 }}
                                            className="bg-white rounded-2xl p-6 w-full max-w-2xl mx-4 overflow-y-auto max-h-[80vh]"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <div className="flex justify-between items-center mb-4">
                                                <h3 className="text-xl font-bold">Commentaires</h3>
                                                <button
                                                    onClick={() => setShowCommentModal(false)}
                                                    className="text-gray-500 hover:text-gray-700"
                                                >
                                                    <X className="w-6 h-6" />
                                                </button>
                                            </div>
                                            <div className="space-y-4 mb-4">
                                                {item.comments.map((comment, index) => (
                                                    <div key={index} className="flex items-start space-x-3">
                                                        <img
                                                            src={comment.author.avatar || "/placeholder-user.jpg"}
                                                            alt={comment.author.name}
                                                            className="w-10 h-10 rounded-full object-cover"
                                                        />
                                                        <div className="flex-1 bg-gray-100 rounded-lg p-3">
                                                            <p className="font-semibold">{comment.author.name}</p>
                                                            <p className="text-gray-700">{comment.content}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <img
                                                    src="/placeholder-user.jpg"
                                                    alt="Your avatar"
                                                    className="w-10 h-10 rounded-full object-cover"
                                                />
                                                <input
                                                    type="text"
                                                    value={newComment}
                                                    onChange={(e) => setNewComment(e.target.value)}
                                                    placeholder={t("ecrivez_un_commentaire")}
                                                    className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                />
                                                <button
                                                    onClick={handleAddComment}
                                                    className="bg-indigo-500 text-white rounded-full p-2 hover:bg-indigo-600 transition-colors duration-200"
                                                >
                                                    <Send className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </motion.div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </motion.div>
            )
        } else {
            // This is an event
            
            return (
                <motion.div
                    variants={itemVariants}
                    className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8 relative w-full max-w-2xl mx-auto transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
                >
                    {item.isUpcoming && (
                        <div className="absolute top-4 right-4 z-10">
              <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
                {t("àVenir")}
              </span>
                        </div>
                    )}

                    <div className="p-6">
                        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-4 flex items-center rounded-t-xl">
                            <img
                                src={item.syndicat.coverImage || "/placeholder.svg"}
                                alt={item.syndicat.name}
                                className="w-10 h-10 rounded-full object-cover mr-3 border-2 border-white"
                            />
                            <h3 className="text-white font-semibold">{item.syndicat.name}</h3>
                        </div>
                        <div className="p-6">
                            <div className="flex items-center mb-6">
                                <div className="relative">
                                    <img
                                        src={item.author.avatar || "/placeholder.svg"}
                                        alt={item.author.name}
                                        className="w-12 h-12 rounded-full object-cover ring-4 ring-blue-100"
                                    />
                                    <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></div>
                                </div>
                                <div className="ml-4 flex-grow">
                                    <h3 className="font-bold text-2xl text-gray-800 mb-1 hover:text-blue-600 transition-colors duration-200">
                                        {item.title}
                                    </h3>
                                    <div className="flex items-center text-sm text-gray-600">
                                        <User className="w-4 h-4 mr-1 text-blue-500" />
                                        <span className="font-medium">{item.author.name}</span>
                                        <span className="mx-2">•</span>
                                        <Calendar className="w-4 h-4 mr-1 text-blue-500" />
                                        <span>
                      {item.startDate.toLocaleDateString("fr-FR", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                      })}
                    </span>
                                    </div>
                                </div>
                            </div>

                            <div className="prose prose-blue max-w-none mb-6">
                                <p className="text-gray-700 leading-relaxed">{item.description}</p>
                            </div>

                            <div className="flex flex-wrap items-center gap-4 mb-6">
                                <div className="flex items-center px-4 py-2 bg-blue-50 rounded-lg">
                                    <Clock className="w-5 h-5 mr-2 text-blue-500" />
                                    <span className="text-blue-800 font-medium">
                    {item.startDate.toLocaleTimeString("fr-FR", {
                        hour: "2-digit",
                        minute: "2-digit",
                    })}{" "}
                                        -{" "}
                                        {item.endDate.toLocaleTimeString("fr-FR", {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                  </span>
                                </div>
                                {item.location && (
                                    <div className="flex items-center px-4 py-2 bg-purple-50 rounded-lg">
                                        <MapPin className="w-5 h-5 mr-2 text-purple-500" />
                                        <span className="text-purple-800 font-medium">{item.location}</span>
                                    </div>
                                )}
                            </div>

                            {item.image && (
                                <div className="relative rounded-xl overflow-hidden mb-6">
                                    <img
                                        src={item.image || "/placeholder.svg"}
                                        alt="Event"
                                        className="w-full h-80 object-cover transform hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                            )}

                            <div className="flex items-center justify-between mb-6">
                                <button className="flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-200">
                                    <Users className="w-5 h-5 mr-2" />
                                    <span className="font-medium">{item.participants.length} participants</span>
                                </button>

                                <div className="flex items-center gap-4">
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        className="p-2 rounded-full text-gray-400 hover:text-blue-500 hover:bg-blue-50 transition-colors duration-200"
                                    >
                                        <Share2 className="w-6 h-6" />
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        className="p-2 rounded-full text-gray-400 hover:text-green-500 hover:bg-green-50 transition-colors duration-200"
                                    >
                                        <MessageCircle className="w-6 h-6" />
                                    </motion.button>
                                </div>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full py-4 rounded-xl transition duration-200 flex items-center justify-center font-semibold text-lg shadow-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700"
                            >
                                <Calendar className="w-6 h-6 mr-2" />
                                {t("participerÉvénement")}
                            </motion.button>
                        </div>
                    </div>
                </motion.div>
            )
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <div className="container mx-auto px-4 py-8">
                {/* Welcome Section */}
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Bienvenue, {fullName}  !
            </span>
                    </h1>
                    <p className="text-xl text-gray-600 mb-8">{t("votre_portail_syndical_personnalise")}</p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleCreateSyndicat}
                        className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                        <Zap className="w-6 h-6 inline-block mr-2" />
                        {t("lancer_votre_syndicat")}
                    </motion.button>
                </motion.div>

                {/* Feed Section */}
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl font-bold mb-6">{t("actualites_et_evenements")}</h2>
                    <motion.div variants={containerVariants} initial="hidden" animate="visible">
                        {feed.map((item) => (
                            <FeedItem key={item.id} item={item} />
                        ))}
                    </motion.div>
                </div>

                {/* Create Syndicat Form Modal */}
                <AnimatePresence>
                    {showCreateSyndicatForm && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 overflow-y-auto"
                        >
                            <motion.div
                                className="w-full max-w-4xl p-4 mx-4 sm:mx-6 md:mx-8 lg:mx-auto max-h-[80vh] overflow-y-auto"
                                initial={{ scale: 0.8 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0.8 }}
                            >
                                <div className="relative bg-white rounded-lg shadow-lg">
                                    <button
                                        className="absolute top-4 right-4 z-10 text-gray-500 hover:text-gray-700 transition-colors"
                                        onClick={() => setCreateSyndicatForm(false)}
                                    >
                                        <X className="h-6 w-6" />
                                    </button>
                                    <CreateSyndicatForm />
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}

