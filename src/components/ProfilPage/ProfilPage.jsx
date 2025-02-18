"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    Users,
    Calendar,
    Mail,
    Phone,
    MapPin,
    ChevronRight,
    ChevronLeft,
    ExternalLink,
    LogIn,
    Loader2,
    Download,
    Trophy,
    Newspaper,
    FileText,
    HeartHandshake,
    ShoppingBag,
    Package,
} from "lucide-react"
import { useNavigate } from "react-router-dom"
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

// Assurez-vous que ces images existent dans le dossier public
import markerIcon2x from "/marker-icon-2x.png"
import markerShadow from "/marker-shadow.png"
import markerIcon from "../../../public/marker-icon.png"
import { Button, Alert } from "antd"

// Configuration de l'icône par défaut pour Leaflet
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
})

const GeolocationControl = ({ onLocationUpdate }) => {
    const map = useMap()
    const [isLocating, setIsLocating] = useState(false)
    const [error, setError] = useState(null)

    const handleLocationFound = (e) => {
        setIsLocating(false)
        onLocationUpdate(e.latlng)
        map.setView(e.latlng, 13)
    }

    const handleLocationError = (e) => {
        setIsLocating(false)
        setError("Impossible d'obtenir votre position. Veuillez vérifier vos paramètres de localisation.")
    }

    const locateUser = () => {
        setIsLocating(true)
        setError(null)
        map.locate({ setView: true, maxZoom: 13 })
    }

    useEffect(() => {
        map.on("locationfound", handleLocationFound)
        map.on("locationerror", handleLocationError)

        return () => {
            map.off("locationfound", handleLocationFound)
            map.off("locationerror", handleLocationError)
        }
    }, [map]) // Removed handleLocationFound and handleLocationError

    return (
        <div className="absolute top-4 right-4 z-[1000]">
            <Button onClick={locateUser} disabled={isLocating} className="shadow-lg">
                {isLocating ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <MapPin className="h-4 w-4 mr-2" />}
                Ma position
            </Button>
            {error && <Alert message={error} type="error" showIcon className="mt-2" />}
        </div>
    )
}

const BranchOfficesMap = () => {
    const [userLocation, setUserLocation] = useState(null)
    const [selectedOffice, setSelectedOffice] = useState(null)

    const handleLocationUpdate = (location) => {
        setUserLocation(location)
    }

    const getClosestOffice = () => {
        if (!userLocation) return null

        return branchOffices.reduce((closest, office) => {
            const distance = L.latLng(office.lat, office.lng).distanceTo(userLocation)
            if (!closest || distance < closest.distance) {
                return { ...office, distance }
            }
            return closest
        }, null)
    }

    useEffect(() => {
        if (userLocation) {
            const closest = getClosestOffice()
            setSelectedOffice(closest)
        }
    }, [userLocation]) // Removed getClosestOffice

    const defaultCenter = [4.6125, 13.1535] // Centre du Cameroun

    return (
        <div className="relative h-[500px] w-full rounded-lg overflow-hidden">
            <MapContainer center={defaultCenter} zoom={6} className="h-full w-full">
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                />

                <GeolocationControl onLocationUpdate={handleLocationUpdate} />

                {userLocation && (
                    <Marker
                        position={[userLocation.lat, userLocation.lng]}
                        icon={
                            new L.Icon({
                                iconUrl: "/user-marker.png",
                                iconSize: [25, 41],
                                iconAnchor: [12, 41],
                            })
                        }
                    >
                        <Popup>Votre position</Popup>
                    </Marker>
                )}

                {branchOffices.map((office) => (
                    <Marker
                        key={office.id}
                        position={[office.lat, office.lng]}
                        eventHandlers={{
                            click: () => setSelectedOffice(office),
                        }}
                    >
                        <Popup>
                            <div className="p-2">
                                <h3 className="font-bold mb-2">{office.name}</h3>
                                <p className="text-sm text-gray-600">{office.address}</p>
                                <p className="text-sm text-gray-600">{office.phone}</p>
                                {userLocation && (
                                    <p className="text-sm font-semibold mt-2">
                                        Distance: {(L.latLng(office.lat, office.lng).distanceTo(userLocation) / 1000).toFixed(1)} km
                                    </p>
                                )}
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>

            <AnimatePresence>
                {selectedOffice && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        className="absolute bottom-4 left-4 right-4 bg-white p-4 rounded-lg shadow-lg z-[1000]"
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="font-bold text-lg">{selectedOffice.name}</h3>
                                <p className="text-sm text-gray-600">{selectedOffice.address}</p>
                                <p className="text-sm text-gray-600">{selectedOffice.phone}</p>
                                {selectedOffice.distance && (
                                    <p className="text-sm font-semibold mt-1">
                                        Distance: {(selectedOffice.distance / 1000).toFixed(1)} km
                                    </p>
                                )}
                            </div>
                            <Button size="small" onClick={() => setSelectedOffice(null)}>
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

// --- Données fictives ---

const syndicatData = {
    id: 1,
    name: "Syndicat Des Taxi Du Cameroun",
    logo: "/placeholder.svg",
    coverImage:
        "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80",
    description:
        "Le Syndicat National de l'Éducation est dédié à la protection des droits et à l'amélioration des conditions de travail des chauffeurs dans tout le pays.",
    members: 250000,
    foundedYear: 1950,
    category: "Transport",
    website: "www.TaxiCam.fr",
    email: "contact@sne-education.fr",
    phone: "+237 99 52 02 21",
    address: "123 Rue Melen, Emia",
}

const stats = [
    { name: "Membres actifs", value: "250K" },
    { name: "Délégués", value: "5,000" },
    { name: "Sections locales", value: "500" },
    { name: "Années d'existence", value: "73" },
]

const activities = [
    {
        id: 1,
        title: "Assemblée Générale Annuelle",
        date: "15 Juin 2023",
        type: "Événement",
        image: "https://images.unsplash.com/photo-1559829604-549c5c1a3a5f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    },
    {
        id: 2,
        title: "Négociations tarifaires avec la Mairie",
        date: "22 Mai 2023",
        type: "Négociation",
        image: "https://images.unsplash.com/photo-1517436073-3b1b3d72b6a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    },
    {
        id: 3,
        title: "Campagne pour l'amélioration des conditions de travail",
        date: "1 Mai 2023",
        type: "Campagne",
        image:
            "https://images.unsplash.com/photo-1534787238916-9ba6764efd4f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    },
    {
        id: 4,
        title: "Formation sur les nouvelles réglementations",
        date: "10 Avril 2023",
        type: "Formation",
        image:
            "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    },
]

const members = [
    { id: 1, name: "Marie Dubois", role: "Présidente", avatar: "https://i.pravatar.cc/150?img=1" },
    { id: 2, name: "Pierre Martin", role: "Secrétaire Général", avatar: "https://i.pravatar.cc/150?img=2" },
    { id: 3, name: "Sophie Lefebvre", role: "Trésorière", avatar: "https://i.pravatar.cc/150?img=3" },
    { id: 4, name: "Lucas Moreau", role: "Responsable Communication", avatar: "https://i.pravatar.cc/150?img=4" },
    { id: 5, name: "Camille Rousseau", role: "Déléguée Régionale", avatar: "https://i.pravatar.cc/150?img=5" },
    { id: 6, name: "Thomas Bernard", role: "Responsable Juridique", avatar: "https://i.pravatar.cc/150?img=6" },
]

const branchOffices = [
    {
        id: 1,
        name: "Antenne Douala",
        address: "456 Rue Akwa, Douala",
        phone: "+237 99 12 34 56",
        lat: 4.0511,
        lng: 9.7679,
    },
    {
        id: 2,
        name: "Antenne Yaoundé",
        address: "789 Avenue Kennedy, Yaoundé",
        phone: "+237 99 98 76 54",
        lat: 3.848,
        lng: 11.5021,
    },
    {
        id: 3,
        name: "Antenne Bafoussam",
        address: "321 Rue de la Paix, Bafoussam",
        phone: "+237 99 45 67 89",
        lat: 5.4768,
        lng: 10.4214,
    },
]

const services = [
    {
        id: 1,
        name: "Assistance Juridique",
        description: "Consultation et représentation légale pour les membres du syndicat.",
        image:
            "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    },
    {
        id: 2,
        name: "Formation Continue",
        description: "Programmes de formation pour améliorer les compétences des chauffeurs.",
        image:
            "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    },
    {
        id: 3,
        name: "Médiation Professionnelle",
        description: "Résolution de conflits entre chauffeurs et employeurs.",
        image:
            "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    },
    {
        id: 4,
        name: "Veste de Cérémonie",
        description: "Veste élégante pour événements officiels du syndicat.",
        image: "https://images.unsplash.com/photo-1551488831-00ddcb626696?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        price: 129.99
    },
    {
        id: 5,
        name: "Gilet de Sécurité",
        description: "Gilet haute visibilité pour interventions techniques.",
        image: "https://images.unsplash.com/photo-1583885376563-8d99a48b8a0d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        price: 49.95
    },
    {
        id: 6,
        name: "Casquette Fonctionnelle",
        description: "Casquette anti-UV avec logo du syndicat brodé.",
        image: "https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        price: 29.99
    },
    {
        id: 7,
        name: "Chaussures de Sécurité",
        description: "Chaussures de travail renforcées normes CE.",
        image: "https://images.unsplash.com/photo-1549298916-f52d724204b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        price: 159.95
    }
]

const products = [
    {
        id: 1,
        name: "Kit de Sécurité Routière",
        description: "Ensemble complet d'équipements de sécurité pour votre véhicule.",
        image: "https://images.unsplash.com/photo-1563299796-17596ed6b017?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        price: 75.99,
    },
    {
        id: 2,
        name: "GPS Professionnel",
        description: "Système de navigation avancé pour chauffeurs professionnels.",
        image:
            "https://images.unsplash.com/photo-1581093458791-9f3c3700e8a0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        price: 199.99,
    },
    {
        id: 3,
        name: "Uniforme Officiel",
        description: "Tenue professionnelle aux couleurs du syndicat.",
        image:
            "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        price: 89.99,
    },
    {
        id: 4,
        name: "Veste de Cérémonie",
        description: "Veste élégante pour événements officiels du syndicat.",
        image: "https://images.unsplash.com/photo-1551488831-00ddcb626696?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        price: 129.99
    },
    {
        id: 5,
        name: "Gilet de Sécurité",
        description: "Gilet haute visibilité pour interventions techniques.",
        image: "https://images.unsplash.com/photo-1583885376563-8d99a48b8a0d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        price: 49.95
    },
    {
        id: 6,
        name: "Casquette Fonctionnelle",
        description: "Casquette anti-UV avec logo du syndicat brodé.",
        image: "https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        price: 29.99
    },
    {
        id: 7,
        name: "Chaussures de Sécurité",
        description: "Chaussures de travail renforcées normes CE.",
        image: "https://images.unsplash.com/photo-1549298916-f52d724204b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        price: 159.95
    }
]

export const SyndicatProfile = ({ syndicat }) => {
    const navigate = useNavigate()
    const [currentPage, setCurrentPage] = useState(1)
    const membersPerPage = 4
    const totalPages = Math.ceil(members.length / membersPerPage)

    const paginatedMembers = members.slice((currentPage - 1) * membersPerPage, currentPage * membersPerPage)

    // Nouvelle section : Historique du syndicat
    const timeline = [
        { year: 1950, event: "Fondation du syndicat" },
        { year: 1972, event: "Première convention collective nationale" },
        { year: 1998, event: "Ouverture de la première antenne régionale" },
        { year: 2015, event: "Adoption de la charte écologique" },
    ]

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
            {/* En-tête amélioré */}
            <div className="relative h-96 w-full overflow-hidden">
                <motion.img
                    src={syndicat.image || syndicatData.coverImage}
                    alt="Cover"
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end pb-12">
                    <div className="container mx-auto px-4 relative">
                        <motion.div
                            className="flex items-center space-x-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <img
                                src={syndicat.image || syndicatData.coverImage || "/placeholder.svg"}
                                alt="Logo"
                                className="w-32 h-32 rounded-2xl border-4 border-white shadow-xl"
                            />
                            <div className="text-white">
                                <h1 className="text-4xl font-bold mb-2">{syndicat.name || syndicatData.name}</h1>
                                <div className="flex items-center space-x-4">
                  <span className="px-4 py-1 bg-blue-600/80 rounded-full text-sm">
                    {syndicat.category || syndicatData.category}
                  </span>
                                    <span className="flex items-center">
                    <Trophy className="h-5 w-5 mr-2" />
                    Membre d'or depuis 2018
                  </span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                <motion.button
                    className="absolute top-6 right-6 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center space-x-2 group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate("/register")}
                >
                    <LogIn className="h-6 w-6 transition-transform group-hover:rotate-12" />
                    <span className="font-semibold">Espace Membre</span>
                </motion.button>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="grid gap-12 lg:grid-cols-3">
                    {/* Colonne principale améliorée */}
                    <div className="lg:col-span-2 space-y-12">
                        {/* Section À propos redessinée */}
                        <motion.section
                            className="bg-white rounded-2xl shadow-xl p-8"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            <h2 className="text-3xl font-bold text-blue-800 mb-6 flex items-center">
                                <HeartHandshake className="h-8 w-8 mr-3 text-blue-600" />
                                Notre Mission
                            </h2>
                            <p className="text-lg text-gray-700 leading-relaxed">{syndicatData.description}</p>
                        </motion.section>

                        {/* Statistiques enrichies */}
                        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {stats.map((stat) => (
                                <motion.div
                                    key={stat.name}
                                    className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-blue-600"
                                    whileHover={{ y: -5 }}
                                >
                                    <div className="text-4xl font-bold text-blue-600 mb-2">{stat.value}</div>
                                    <div className="text-sm font-medium text-gray-500">{stat.name}</div>
                                </motion.div>
                            ))}
                        </section>

                        {/* Nouvelle section Timeline */}
                        <section className="bg-white rounded-2xl shadow-xl p-8">
                            <h2 className="text-3xl font-bold text-blue-800 mb-8 flex items-center">
                                <FileText className="h-8 w-8 mr-3 text-blue-600" />
                                Notre Histoire
                            </h2>
                            <div className="relative pl-8 border-l-2 border-blue-100 space-y-8">
                                {timeline.map((item, index) => (
                                    <div key={index} className="relative">
                                        <div className="absolute w-4 h-4 bg-blue-600 rounded-full -left-[25px] top-2 border-4 border-white shadow"></div>
                                        <div className="pl-6">
                                            <div className="text-xl font-semibold text-blue-900">{item.year}</div>
                                            <p className="mt-1 text-gray-600">{item.event}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Carte interactive améliorée */}
                        <section className="bg-white rounded-2xl shadow-xl overflow-hidden">
                            <div className="p-8 pb-0">
                                <h2 className="text-3xl font-bold text-blue-800 mb-6 flex items-center">
                                    <MapPin className="h-8 w-8 mr-3 text-blue-600" />
                                    Nos Implantations
                                </h2>
                            </div>
                            <BranchOfficesMap />
                        </section>

                        {/* Activités redessinées */}
                        <section className="bg-white rounded-2xl shadow-xl p-8">
                            <h2 className="text-3xl font-bold text-blue-800 mb-8 flex items-center">
                                <Calendar className="h-8 w-8 mr-3 text-blue-600" />
                                Agenda Syndical
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {activities.map((activity) => (
                                    <motion.div
                                        key={activity.id}
                                        className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-shadow"
                                        whileHover={{ scale: 1.02 }}
                                    >
                                        <img
                                            src={activity.image || "/placeholder.svg"}
                                            alt={activity.title}
                                            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 p-6">
                                            <h3 className="text-lg font-semibold text-white">{activity.title}</h3>
                                            <div className="flex items-center mt-2 text-blue-100">
                                                <Calendar className="h-4 w-4 mr-2" />
                                                {activity.date}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </section>

                        {/* New Services Catalog Section */}
                        <section className="bg-white rounded-2xl shadow-xl p-8">
                            <h2 className="text-3xl font-bold text-blue-800 mb-8 flex items-center">
                                <Package className="h-8 w-8 mr-3 text-blue-600" />
                                Nos Services
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {services.map((service) => (
                                    <motion.div
                                        key={service.id}
                                        className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-shadow"
                                        whileHover={{ scale: 1.02 }}
                                    >
                                        <img
                                            src={service.image || "/placeholder.svg"}
                                            alt={service.name}
                                            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 p-6">
                                            <h3 className="text-lg font-semibold text-white mb-2">{service.name}</h3>
                                            <p className="text-sm text-blue-100 line-clamp-2">{service.description}</p>
                                            <motion.button
                                                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-semibold hover:bg-blue-700 transition-colors flex items-center"
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                <Phone className="h-4 w-4 mr-2" />
                                                Contacter un conseiller
                                            </motion.button>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </section>

                        {/* New Products Catalog Section */}
                        <section className="bg-white rounded-2xl shadow-xl p-8">
                            <h2 className="text-3xl font-bold text-blue-800 mb-8 flex items-center">
                                <ShoppingBag className="h-8 w-8 mr-3 text-blue-600" />
                                Boutique du Syndicat
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {products.map((product) => (
                                    <motion.div
                                        key={product.id}
                                        className="bg-white rounded-xl shadow-md overflow-hidden"
                                        whileHover={{ y: -5 }}
                                    >
                                        <img
                                            src={product.image || "/placeholder.svg"}
                                            alt={product.name}
                                            className="w-full h-48 object-cover"
                                        />
                                        <div className="p-4">
                                            <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>
                                            <p className="text-sm text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                                            <div className="flex justify-between items-center">
                                                <span className="text-lg font-bold text-blue-600">{product.price.toFixed(2)} €</span>
                                                <motion.button
                                                    className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-semibold hover:bg-blue-700 transition-colors"
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    Commander
                                                </motion.button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Colonne latérale améliorée */}
                    <div className="space-y-12">
                        {/* Contact enrichi */}
                        <section className="bg-white rounded-2xl shadow-xl p-8">
                            <h2 className="text-3xl font-bold text-blue-800 mb-6 flex items-center">
                                <Mail className="h-8 w-8 mr-3 text-blue-600" />
                                Nous Contacter
                            </h2>
                            <div className="space-y-5">
                                {[
                                    { icon: Mail, value: syndicatData.email, type: "email" },
                                    { icon: Phone, value: syndicatData.phone, type: "tel" },
                                    { icon: MapPin, value: syndicatData.address },
                                    { icon: ExternalLink, value: syndicatData.website, type: "website" },
                                ].map((item, index) => (
                                    <motion.a
                                        key={index}
                                        href={
                                            item.type === "email"
                                                ? `mailto:${item.value}`
                                                : item.type === "tel"
                                                    ? `tel:${item.value}`
                                                    : item.type === "website"
                                                        ? `https://${item.value}`
                                                        : "#"
                                        }
                                        className="flex items-center p-4 rounded-xl bg-gray-50 hover:bg-blue-50 transition-colors"
                                        whileHover={{ x: 5 }}
                                    >
                                        <item.icon className="h-6 w-6 text-blue-600 mr-4" />
                                        <span className="text-gray-700">{item.value}</span>
                                    </motion.a>
                                ))}
                            </div>
                        </section>

                        {/* Membres clés améliorés */}

                        <section className="bg-white rounded-2xl shadow-xl p-8">
                            <h2 className="text-3xl font-bold text-blue-800 mb-6 flex items-center">
                                <Users className="h-8 w-8 mr-3 text-blue-600" />
                                Équipe Directrice
                            </h2>
                            <div className="grid grid-cols-1 gap-4">
                                {paginatedMembers.map((member) => (
                                    <motion.div
                                        key={member.id}
                                        className="flex items-center p-4 rounded-xl bg-gray-50 hover:bg-blue-50 transition-colors"
                                        whileHover={{ scale: 1.02 }}
                                    >
                                        <img
                                            src={member.avatar || "/placeholder.svg"}
                                            alt={member.name}
                                            className="w-14 h-14 rounded-xl object-cover"
                                        />
                                        <div className="ml-4">
                                            <div className="font-semibold text-gray-900">{member.name}</div>
                                            <div className="text-sm text-blue-600">{member.role}</div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                            {/* Pagination améliorée */}
                            {totalPages > 1 && (
                                <div className="mt-6 flex justify-center items-center space-x-4">
                                    <motion.button
                                        className="p-2 rounded-lg hover:bg-gray-100"
                                        onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                                        disabled={currentPage === 1}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <ChevronLeft className="h-6 w-6 text-gray-600" />
                                    </motion.button>
                                    <span className="text-sm font-medium text-gray-600">
                    Page {currentPage} / {totalPages}
                  </span>
                                    <motion.button
                                        className="p-2 rounded-lg hover:bg-gray-100"
                                        onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                                        disabled={currentPage === totalPages}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <ChevronRight className="h-6 w-6 text-gray-600" />
                                    </motion.button>
                                </div>
                            )}
                        </section>

                        {/* Nouvelle section : Actualités */}
                        <section className="bg-white rounded-2xl shadow-xl p-8">
                            <h2 className="text-3xl font-bold text-blue-800 mb-6 flex items-center">
                                <Newspaper className="h-8 w-8 mr-3 text-blue-600" />
                                Dernières Actualités
                            </h2>
                            <div className="space-y-6">
                                <article className="group relative overflow-hidden rounded-xl">
                                    <img
                                        src="https://images.unsplash.com/photo-1584433144859-1fc3ab64a957?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                                        alt="Nouvelle convention"
                                        className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                    <div className="p-4">
                                        <h3 className="font-semibold text-lg mb-2">Signature d'une nouvelle convention collective</h3>
                                        <p className="text-sm text-gray-500 line-clamp-3">
                                            Une avancée historique pour les droits des travailleurs...
                                        </p>
                                    </div>
                                </article>
                            </div>
                        </section>

                        {/* Documents officiels améliorés */}
                        <section className="bg-white rounded-2xl shadow-xl p-8">
                            <h2 className="text-3xl font-bold text-blue-800 mb-6 flex items-center">
                                <FileText className="h-8 w-8 mr-3 text-blue-600" />
                                Documents Officiels
                            </h2>
                            <div className="space-y-4">
                                {["Statuts du syndicat", "Règlement intérieur", "Rapport annuel"].map((doc, index) => (
                                    <motion.a
                                        key={index}
                                        href="#"
                                        className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-blue-50 transition-colors"
                                        whileHover={{ x: 5 }}
                                    >
                                        <div className="flex items-center">
                                            <FileText className="h-5 w-5 text-blue-600 mr-3" />
                                            <span className="text-gray-700">{doc}</span>
                                        </div>
                                        <Download className="h-5 w-5 text-gray-400" />
                                    </motion.a>
                                ))}
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    )
}

