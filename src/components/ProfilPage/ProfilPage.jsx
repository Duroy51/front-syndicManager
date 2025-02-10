import { useState } from "react"
import { motion } from "framer-motion"
import { Users, Calendar, Mail, Phone, MapPin, ChevronRight, ChevronLeft, ExternalLink, LogIn, 
    Clock, Globe,  Facebook, Twitter, Instagram, Award, Building, Printer, MapPinned, GraduationCap, 
    Factory, AlignCenterVertical as Certificate,  Network 
} from "lucide-react"
import { useNavigate } from "react-router-dom"

// Mise à jour des données du syndicat
const syndicatData = {
    id: 1,
    name: "Syndicat Des Taxi Du Cameroun",
    logo: "/placeholder.svg",
    coverImage: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80",
    description: "Le Syndicat National de l'Éducation est dédié à la protection des droits et à l'amélioration des conditions de travail des chauffeurs dans tout le pays.",
    members: 250000,
    foundedYear: 1950,
    category: "Transport",
    contact: {
        phone: "+237 99 52 02 21",
        fax: "+237 99 52 02 22",
        email: "contact@sne-education.fr",
        poBox: "BP 1234",
        location: "Quartier Melen, Rue 12.234, Yaoundé (En face de la station Total, à 100m du Carrefour Melen, à côté de l'ancien siège de MTN)",
        website: "www.TaxiCam.fr",
        operatingHours: "Lundi - Vendredi: 8h00 - 17h00",
        interventionZone: "Territoire national",
        socialMedia: {
            facebook: "facebook.com/TaxiCam",
            twitter: "twitter.com/TaxiCam",
            instagram: "instagram.com/TaxiCam"
        }
    },
    services: [
        {
            title: "Formations professionnelles",
            description: "Formation continue des chauffeurs de taxi",
            icon: GraduationCap
        },
        {
            title: "Fabrication de bâches",
            description: "Production de bâches personnalisées pour les taxis",
            icon: Factory
        }
    ],
    certifications: [
        {
            title: "Agrément Ministériel N°00123/MINTSS/CAB",
            year: "2020",
            description: "Autorisation d'exercice en tant que syndicat professionnel sur le territoire national",
            issuer: "Ministère du Travail et de la Sécurité Sociale"
        },
        {
            title: "ISO 9001:2015",
            year: "2022",
            description: "Certification de management de la qualité",
            issuer: "Bureau Veritas"
        },
        {
            title: "Prix d'Excellence",
            year: "2023",
            description: "Meilleur syndicat de l'année",
            issuer: "Chambre de Commerce"
        }
    ],
    branches: [
        {
            name: "Agence Régionale du Centre",
            location: "Quartier Melen, Rue 12.234, Yaoundé (En face de la station Total)",
            contact: "+237 99 52 02 23",
            director: {
                name: "Jean-Paul Mbarga",
                title: "Directeur Régional",
                phone: "+237 99 52 02 25",
                email: "jp.mbarga@taxicam.fr"
            },
            coverage: "Région du Centre",
            members: 5000,
            services: ["Formation", "Assistance juridique", "Support administratif"]
        },
        {
            name: "Agence Régionale du Littoral",
            location: "Quartier Akwa, Boulevard de la Liberté (À côté de l'ancien cinéma Le Paris)",
            contact: "+237 99 52 02 24",
            director: {
                name: "Marie Ndom",
                title: "Directrice Régionale",
                phone: "+237 99 52 02 26",
                email: "m.ndom@taxicam.fr"
            },
            coverage: "Région du Littoral",
            members: 4500,
            services: ["Formation", "Assistance juridique", "Support technique"]
        },
        {
            name: "Agence Régionale de l'Ouest",
            location: "Avenue des Banques, Bafoussam (Face Banque Atlantique)",
            contact: "+237 99 52 02 27",
            director: {
                name: "Pierre Kamdem",
                title: "Directeur Régional",
                phone: "+237 99 52 02 28",
                email: "p.kamdem@taxicam.fr"
            },
            coverage: "Région de l'Ouest",
            members: 3000,
            services: ["Formation", "Support administratif"]
        },
        {
            name: "Direction Régionale du Sud-Ouest",
            location: "Main Street, Buea (Opposite Council Building)",
            contact: "+237 99 52 02 29",
            director: {
                name: "John Ewang",
                title: "Directeur Régional",
                phone: "+237 99 52 02 30",
                email: "j.ewang@taxicam.fr"
            },
            coverage: "Région du Sud-Ouest",
            members: 2500,
            services: ["Formation", "Assistance juridique"]
        }
    ]
}

const stats = [
    { name: "Membres actifs", value: "250K" },
    { name: "Délégués", value: "5,000" },
    { name: "Sections locales", value: "500" },
    { name: "Années d'existence", value: "73" },
]

const members = [
    { id: 1, name: "Marie Dubois", role: "Présidente", avatar: "https://i.pravatar.cc/150?img=1" },
    { id: 2, name: "Pierre Martin", role: "Secrétaire Général", avatar: "https://i.pravatar.cc/150?img=2" },
    { id: 3, name: "Sophie Lefebvre", role: "Trésorière", avatar: "https://i.pravatar.cc/150?img=3" },
    { id: 4, name: "Lucas Moreau", role: "Responsable Communication", avatar: "https://i.pravatar.cc/150?img=4" },
    { id: 5, name: "Camille Rousseau", role: "Déléguée Régionale", avatar: "https://i.pravatar.cc/150?img=5" },
    { id: 6, name: "Thomas Bernard", role: "Responsable Juridique", avatar: "https://i.pravatar.cc/150?img=6" },
]

export const SyndicatProfile = () => {
    const navigate = useNavigate()
    const [currentPage, setCurrentPage] = useState(1)
    const membersPerPage = 4
    const totalPages = Math.ceil(members.length / membersPerPage)

    const paginatedMembers = members.slice((currentPage - 1) * membersPerPage, currentPage * membersPerPage)

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
            {/* Cover Image */}
            <div className="h-64 md:h-80 w-full relative">
                <img src={syndicatData.coverImage || "/placeholder.svg"} alt="Cover" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end">
                    <div className="container mx-auto px-4 py-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <img
                                    src={syndicatData.logo || "/placeholder.svg"}
                                    alt="Logo"
                                    className="w-24 h-24 rounded-full border-4 border-white"
                                />
                                <div className="text-white">
                                    <h1 className="text-3xl font-bold">{syndicatData.name}</h1>
                                    <p className="text-xl">{syndicatData.category}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <motion.button
                className="fixed top-4 right-4 px-6 py-3 bg-yellow-400 text-black text-lg font-bold rounded-full shadow-lg hover:bg-yellow-300 transition duration-300 flex items-center space-x-2 z-50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={{
                    boxShadow: ["0px 0px 0px 0px rgba(0,0,0,0.2)", "0px 0px 0px 10px rgba(0,0,0,0)"],
                }}
                transition={{
                    duration: 1,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                }}
                onClick={() => navigate("/register")}
            >
                <LogIn className="w-6 h-6" />
                <span>Espace Membre</span>
            </motion.button>

            <div className="container mx-auto px-4 py-12">
                <div className="grid gap-8 md:grid-cols-3">
                    {/* Left column */}
                    <div className="md:col-span-2 space-y-8">
                        {/* About section */}
                        <section className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-2xl font-bold text-blue-800 mb-4">À propos</h2>
                            <p className="text-gray-600">{syndicatData.description}</p>
                        </section>

                        {/* Stats section */}
                        <section className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-2xl font-bold text-blue-800 mb-4">Statistiques</h2>
                            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                                {stats.map((stat) => (
                                    <div key={stat.name} className="text-center">
                                        <div className="text-2xl font-semibold text-blue-600">{stat.value}</div>
                                        <div className="text-sm text-gray-500">{stat.name}</div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Members section */}
                        <section className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-2xl font-bold text-blue-800 mb-4">Membres clés</h2>
                            <div className="grid gap-4 sm:grid-cols-2">
                                {paginatedMembers.map((member) => (
                                    <div key={member.id} className="flex items-center space-x-4 p-2 rounded-lg hover:bg-gray-100">
                                        <img
                                            src={member.avatar || "/placeholder.svg"}
                                            alt={member.name}
                                            className="w-12 h-12 rounded-full"
                                        />
                                        <div>
                                            <div className="font-medium">{member.name}</div>
                                            <div className="text-sm text-gray-500">{member.role}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {totalPages > 1 && (
                                <div className="flex justify-between items-center mt-4">
                                    <button
                                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
                                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                        disabled={currentPage === 1}
                                    >
                                        <ChevronLeft className="h-4 w-4 mr-2 inline" />
                                        Précédent
                                    </button>
                                    <span className="text-sm text-gray-500">
                                        Page {currentPage} sur {totalPages}
                                    </span>
                                    <button
                                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
                                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                        disabled={currentPage === totalPages}
                                    >
                                        Suivant
                                        <ChevronRight className="h-4 w-4 ml-2 inline" />
                                    </button>
                                </div>
                            )}
                        </section>

                        {/* Services et Prestations */}
                        <section className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-2xl font-bold text-blue-800 mb-4">Services et Prestations</h2>
                            <div className="grid gap-4 sm:grid-cols-2">
                                {syndicatData.services.map((service, index) => (
                                    <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                                        <service.icon className="h-8 w-8 text-blue-600 mb-2" />
                                        <h3 className="font-semibold text-lg mb-2">{service.title}</h3>
                                        <p className="text-gray-600">{service.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Certifications et Récompenses */}
                        <section className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-2xl font-bold text-blue-800 mb-4">
                                <Certificate className="h-6 w-6 inline-block mr-2" />
                                Agréments, Certifications et Récompenses
                            </h2>
                            <div className="space-y-4">
                                {syndicatData.certifications.map((cert, index) => (
                                    <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                                        <Award className="h-8 w-8 text-yellow-500" />
                                        <div>
                                            <h3 className="font-semibold">{cert.title}</h3>
                                            <p className="text-sm text-gray-600">{cert.description}</p>
                                            <p className="text-sm text-gray-500">Délivré par: {cert.issuer}</p>
                                            <p className="text-sm text-gray-500">Obtenu en {cert.year}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Démembrements */}
                        <section className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-2xl font-bold text-blue-800 mb-4">
                                <Network className="h-6 w-6 inline-block mr-2" />
                                Agences Régionales
                            </h2>
                            <div className="grid gap-6 sm:grid-cols-2">
                                {syndicatData.branches.map((branch, index) => (
                                    <div key={index} className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
                                        <div className="flex items-start justify-between mb-4">
                                            <div>
                                                <Building className="h-6 w-6 text-blue-600 mb-2" />
                                                <h3 className="font-bold text-lg text-blue-800">{branch.name}</h3>
                                            </div>
                                            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                                                {branch.members} membres
                                            </span>
                                        </div>
                                        
                                        <div className="space-y-3">
                                            <div className="space-y-1">
                                                <p className="font-semibold text-gray-700">Directeur Régional</p>
                                                <p className="text-gray-600">{branch.director.name}</p>
                                                <p className="text-sm text-gray-500">{branch.director.title}</p>
                                            </div>

                                            <div className="space-y-2">
                                                <p className="text-sm text-gray-600 flex items-center">
                                                    <MapPin className="h-4 w-4 mr-2 text-blue-600" />
                                                    {branch.location}
                                                </p>
                                                <p className="text-sm text-gray-600 flex items-center">
                                                    <Phone className="h-4 w-4 mr-2 text-blue-600" />
                                                    {branch.contact}
                                                </p>
                                                <p className="text-sm text-gray-600 flex items-center">
                                                    <Mail className="h-4 w-4 mr-2 text-blue-600" />
                                                    {branch.director.email}
                                                </p>
                                            </div>

                                            <div>
                                                <p className="font-semibold text-gray-700 mb-2">Services disponibles</p>
                                                <div className="flex flex-wrap gap-2">
                                                    {branch.services.map((service, idx) => (
                                                        <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                                                            {service}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Right column */}
                    <div className="space-y-8">
                        {/* Contact information */}
                        <section className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-2xl font-bold text-blue-800 mb-4">Informations de contact</h2>
                            <div className="space-y-4">
                                <div className="flex items-center space-x-2">
                                    <Phone className="h-5 w-5 text-blue-600" />
                                    <span>Tél: {syndicatData.contact.phone}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Printer className="h-5 w-5 text-blue-600" />
                                    <span>Fax: {syndicatData.contact.fax}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Mail className="h-5 w-5 text-blue-600" />
                                    <span>{syndicatData.contact.email}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <MapPin className="h-5 w-5 text-blue-600" />
                                    <span>{syndicatData.contact.location}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Mail className="h-5 w-5 text-blue-600" />
                                    <span>BP: {syndicatData.contact.poBox}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <MapPinned className="h-5 w-5 text-blue-600" />
                                    <span>Zone d'intervention: {syndicatData.contact.interventionZone}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Clock className="h-5 w-5 text-blue-600" />
                                    <span>{syndicatData.contact.operatingHours}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Globe className="h-5 w-5 text-blue-600" />
                                    <a
                                        href={`https://${syndicatData.contact.website}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:underline"
                                    >
                                        {syndicatData.contact.website}
                                    </a>
                                </div>
                                <div className="pt-4 border-t">
                                    <h3 className="text-lg font-semibold mb-2">Réseaux sociaux</h3>
                                    <div className="flex space-x-4">
                                        <a
                                            href={`https://${syndicatData.contact.socialMedia.facebook}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:text-blue-800"
                                        >
                                            <Facebook className="h-6 w-6" />
                                        </a>
                                        <a
                                            href={`https://${syndicatData.contact.socialMedia.twitter}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-400 hover:text-blue-600"
                                        >
                                            <Twitter className="h-6 w-6" />
                                        </a>
                                        <a
                                            href={`https://${syndicatData.contact.socialMedia.instagram}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-pink-600 hover:text-pink-800"
                                        >
                                            <Instagram className="h-6 w-6" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Membership growth */}
                        <section className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-2xl font-bold text-blue-800 mb-4">Croissance des adhésions</h2>
                            <p className="text-sm text-gray-500 mb-4">Progression sur les 12 derniers mois</p>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-1">
                                        <p className="text-sm font-medium">Nouveaux membres</p>
                                        <p className="text-sm text-gray-500">+2,350 (+15%)</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-medium">15,000</p>
                                        <p className="text-sm text-gray-500">Sur 250,000</p>
                                    </div>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "15%" }}></div>
                                </div>
                            </div>
                        </section>

                        {/* Quick actions */}
                        <section className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-2xl font-bold text-blue-800 mb-4">Actions rapides</h2>
                            <div className="space-y-2">
                                <motion.button
                                    className="w-full py-3 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 flex items-center justify-center font-semibold"
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => navigate("/register")}
                                >
                                    <Users className="mr-2 h-5 w-5" />
                                    Devenir membre
                                </motion.button>
                                <motion.button
                                    className="w-full py-3 px-4 bg-white text-blue-600 border-2 border-blue-600 rounded-md hover:bg-blue-50 transition duration-300 flex items-center justify-center font-semibold"
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <Calendar className="mr-2 h-5 w-5" />
                                    Voir les événements
                                </motion.button>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SyndicatProfile