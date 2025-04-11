import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Handshake, Plus, X, Star, ChevronDown, ChevronUp,
    Phone, Mail, Globe, MapPin, Tag, Calendar, Gift
} from 'lucide-react'

import { useTranslation } from 'react-i18next'
// Custom Button component
const Button = ({ children, onClick, className = "", variant = "default" }) => {
    const baseStyle = "px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2"
    const variantStyles = {
        default: "bg-blue-500 text-white hover:bg-blue-600",
        outline: "border border-gray-300 text-gray-700 hover:bg-gray-50",
        ghost: "text-gray-600 hover:bg-gray-100",
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
const Input = ({ id, value, onChange, placeholder, className = "" }) => (
    <input
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-3 py-2 border rounded-md ${className}`}
    />
)

// Custom TextArea component
const TextArea = ({ id, value, onChange, placeholder, className = "" }) => (
    <textarea
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-3 py-2 border rounded-md resize-none ${className}`}
    />
)

// Partner Card component
const PartnerCard = ({ partner }) => {
    const [expanded, setExpanded] = useState(false)

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-lg shadow-md p-4 mb-4"
        >
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                    <img src={partner.logo} alt={partner.name} className="w-16 h-16 object-contain mr-4" />
                    <div>
                        <h3 className="text-xl font-semibold text-gray-800">{partner.name}</h3>
                        <p className="text-sm text-gray-500">{partner.category}</p>
                    </div>
                </div>
                <Button variant="ghost" onClick={() => setExpanded(!expanded)}>
                    {expanded ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
                </Button>
            </div>
            <AnimatePresence>
                {expanded && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-4"
                    >
                        <div className="flex items-center text-gray-600">
                            <MapPin className="w-5 h-5 mr-2" />
                            <span>{partner.address}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                            <Phone className="w-5 h-5 mr-2" />
                            <span>{partner.phone}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                            <Mail className="w-5 h-5 mr-2" />
                            <span>{partner.email}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                            <Globe className="w-5 h-5 mr-2" />
                            <a href={partner.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                {partner.website}
                            </a>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold mb-2 flex items-center">
                                <Gift className="w-5 h-5 mr-2 text-green-500" />
                                Avantages offerts
                            </h4>
                            <ul className="list-disc list-inside space-y-2">
                                {partner.benefits.map((benefit, index) => (
                                    <li key={index} className="flex items-start">
                                        <Star className="w-5 h-5 mr-2 text-yellow-500 flex-shrink-0 mt-1" />
                                        <span>{benefit}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {partner.validUntil && (
                            <div className="flex items-center text-gray-600">
                                <Calendar className="w-5 h-5 mr-2" />
                                <span>Valable jusqu'au {partner.validUntil}</span>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

// Main component
export const Partnerships = () => {
    const {t} =useTranslation();

    const [partners, setPartners] = useState([
        {
            id: 1,
            name: "MegaGym",
            logo: "/placeholder.svg?height=64&width=64",
            category: "Santé et Bien-être",
            address: "123 Rue du Sport, 75001 Paris",
            phone: "+33 1 23 45 67 89",
            email: "contact@megagym.com",
            website: "https://www.megagym.com",
            benefits: [
                "20% de réduction sur l'abonnement annuel",
                "1 séance gratuite avec un coach personnel",
                "Accès illimité à toutes les salles MegaGym en France"
            ],
            validUntil: "31/12/2024"
        },
        {
            id: 2,
            name: "TechStore",
            logo: "/placeholder.svg?height=64&width=64",
            category: "Électronique",
            address: "456 Avenue de la Technologie, 69002 Lyon",
            phone: "+33 4 56 78 90 12",
            email: "support@techstore.com",
            website: "https://www.techstore.com",
            benefits: [
                "10% de réduction sur tous les produits",
                "Extension de garantie gratuite de 1 an",
                "Service de réparation prioritaire"
            ],
            validUntil: "30/06/2025"
        }
    ])

    const [showNewPartnerModal, setShowNewPartnerModal] = useState(false)
    const [newPartner, setNewPartner] = useState({
        name: "",
        category: "",
        address: "",
        phone: "",
        email: "",
        website: "",
        benefits: [""]
    })

    const handleAddBenefit = () => {
        setNewPartner(prev => ({ ...prev, benefits: [...prev.benefits, ""] }))
    }

    const handleRemoveBenefit = (index) => {
        setNewPartner(prev => ({
            ...prev,
            benefits: prev.benefits.filter((_, i) => i !== index)
        }))
    }

    const handleBenefitChange = (index, value) => {
        setNewPartner(prev => ({
            ...prev,
            benefits: prev.benefits.map((benefit, i) => i === index ? value : benefit)
        }))
    }

    const handleNewPartner = () => {
        if (newPartner.name && newPartner.category) {
            const partner = {
                ...newPartner,
                id: partners.length + 1,
                logo: "/placeholder.svg?height=64&width=64",
                benefits: newPartner.benefits.filter(b => b.trim() !== "")
            }
            setPartners([...partners, partner])
            setNewPartner({
                name: "",
                category: "",
                address: "",
                phone: "",
                email: "",
                website: "",
                benefits: [""]
            })
            setShowNewPartnerModal(false)
        }
    }

    return (
        <div className="container mx-auto p-4 relative min-h-screen bg-gray-100">
            <h1 className="text-3xl font-bold text-blue-600 mb-6 flex items-center">
                <Handshake className="w-8 h-8 mr-2" />
                {t("partenariats")}
            </h1>

            {partners.map(partner => (
                <PartnerCard key={partner.id} partner={partner} />
            ))}

            <motion.button
                className="fixed bottom-20 right-20 bg-blue-500 text-white rounded-full p-4 shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowNewPartnerModal(true)}
            >
                <Plus className="w-6 h-6" />
            </motion.button>

            <AnimatePresence>
                {showNewPartnerModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 overflow-y-auto"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto"
                        >
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-2xl font-bold">Nouveau Partenaire</h2>
                                <Button variant="ghost" onClick={() => setShowNewPartnerModal(false)}>
                                    <X className="w-8 h-8" />
                                </Button>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">{t("nom")}</label>
                                    <Input
                                        id="name"
                                        value={newPartner.name}
                                        onChange={(e) => setNewPartner(prev => ({ ...prev, name: e.target.value }))}
                                        placeholder= {t("nom_du_partenaire")}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">{t("categorie")}</label>
                                    <Input
                                        id="category"
                                        value={newPartner.category}
                                        onChange={(e) => setNewPartner(prev => ({ ...prev, category: e.target.value }))}
                                        placeholder= {t("categorie_du_partenaire")}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">{t("adresse")}</label>
                                    <Input
                                        id="address"
                                        value={newPartner.address}
                                        onChange={(e) => setNewPartner(prev => ({ ...prev, address: e.target.value }))}
                                        placeholder= {t("adresse_du_partenaire")}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">{t("telephone")}</label>
                                    <Input
                                        id="phone"
                                        value={newPartner.phone}
                                        onChange={(e) => setNewPartner(prev => ({ ...prev, phone: e.target.value }))}
                                        placeholder= {t("numero_de_telephone")}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">{t("email")}</label>
                                    <Input
                                        id="email"
                                        value={newPartner.email}
                                        onChange={(e) => setNewPartner(prev => ({ ...prev, email: e.target.value }))}
                                        placeholder= {t("adresse_email")}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">{t("site_web")}</label>
                                    <Input
                                        id="website"
                                        value={newPartner.website}
                                        onChange={(e) => setNewPartner(prev => ({ ...prev, website: e.target.value }))}
                                        placeholder= {t("site_web_du_partenaire")}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">{t("avantages")}</label>
                                    {newPartner.benefits.map((benefit, index) => (
                                        <div key={index} className="flex items-center mb-2">
                                            <Input
                                                value={benefit}
                                                onChange={(e) => handleBenefitChange(index, e.target.value)}
                                                placeholder={`t("avantage") ${index + 1}`}
                                                className="flex-grow mr-2"
                                            />
                                            <Button variant="ghost" onClick={() => handleRemoveBenefit(index)}>
                                                <X className="w-5 h-5 text-red-500" />
                                            </Button>
                                        </div>
                                    ))}
                                    <Button variant="outline" onClick={handleAddBenefit} className="mt-2">
                                        <Plus className="w-5 h-5 mr-2" />
                                        Ajouter un avantage
                                    </Button>
                                </div>
                            </div>
                            <div className="mt-6 flex justify-end">
                                <Button onClick={handleNewPartner}>
                                    t{("ajouter_le_partenaire")}
                                </Button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}