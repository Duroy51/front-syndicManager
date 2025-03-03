"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    Plus,
    Edit,
    Trash2,
    X,
    Check,
    Truck,
    Navigation,
    Wrench,
    Shield,
    BookOpen,
    Users,
} from "lucide-react"

export const ProductsServicesManagement = () => {
    const [activeTab, setActiveTab] = useState("products")
    const [items, setItems] = useState([])
    const [isAddingItem, setIsAddingItem] = useState(false)
    const [newItem, setNewItem] = useState({})
    const [editingItemId, setEditingItemId] = useState(null)

    // Données fictives adaptées aux syndicats de transport au Cameroun
    const fakeItems = [
        {
            id: "1",
            name: "Kit de sécurité routière",
            description: "Ensemble complet pour la sécurité des chauffeurs",
            price: 25000,
            image:
                "https://images.unsplash.com/photo-1530968033775-2c92736b131e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
            icon: <Shield className="w-6 h-6" />,
            type: "products",
        },
        {
            id: "2",
            name: "GPS Cameroun Routes",
            description: "Navigation précise pour les routes camerounaises",
            price: 75000,
            image:
                "https://images.unsplash.com/photo-1581360742512-021d5b2157d8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
            icon: <Navigation className="w-6 h-6" />,
            type: "products",
        },
        {
            id: "3",
            name: "Manuel du Code de la Route",
            description: "Édition mise à jour pour le Cameroun",
            price: 10000,
            image:
                "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=500&q=80",
            icon: <BookOpen className="w-6 h-6" />,
            type: "products",
        },
        {
            id: "4",
            name: "Formation Sécurité Routière",
            description: "Session de 2 jours pour les chauffeurs",
            price: 50000,
            image:
                "https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
            icon: <Users className="w-6 h-6" />,
            type: "services",
        },
        {
            id: "5",
            name: "Assistance Juridique",
            description: "Conseil juridique pour les membres du syndicat",
            price: 30000,
            image:
                "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
            icon: <Shield className="w-6 h-6" />,
            type: "services",
        },
        {
            id: "6",
            name: "Inspection Technique",
            description: "Vérification complète des véhicules",
            price: 20000,
            image:
                "https://images.unsplash.com/photo-1630468266477-73d8e11a2c75?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
            icon: <Wrench className="w-6 h-6" />,
            type: "services",
        },
    ]

    useEffect(() => {
        setItems(fakeItems.filter((item) => item.type === activeTab))
    }, [activeTab])

    const handleAddItem = () => {
        if (newItem.name && newItem.price) {
            const itemToAdd = {
                ...newItem,
                id: Date.now().toString(),
                type: activeTab,
                image:
                    newItem.image ||
                    "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=500&auto=format&fit=crop&q=60",
                icon: <Truck className="w-6 h-6" />,
            }
            setItems([...items, itemToAdd])
            setNewItem({})
            setIsAddingItem(false)
        }
    }

    const handleEditItem = (item) => {
        setItems(items.map((i) => (i.id === item.id ? item : i)))
        setEditingItemId(null)
    }

    const handleDeleteItem = (id) => {
        setItems(items.filter((i) => i.id !== id))
    }

    const formatPrice = (price) => {
        return new Intl.NumberFormat("fr-FR", {
            style: "currency",
            currency: "XAF",
        }).format(price)
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white p-10">
            <h1 className="text-4xl md:text-5xl font-extrabold text-center text-indigo-800 mb-10 tracking-tight">
                Gestion des Produits et Services
            </h1>

            {/* Onglets de navigation */}
            <div className="flex justify-center mb-10 space-x-4">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveTab("products")}
                    className={`px-8 py-3 rounded-full font-semibold transition duration-300 flex items-center ${
                        activeTab === "products"
                            ? "bg-indigo-600 text-white shadow-md"
                            : "bg-white text-indigo-600 border border-indigo-300 hover:bg-indigo-50"
                    }`}
                >
                    <Truck className="mr-2" />
                    Produits
                </motion.button>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveTab("services")}
                    className={`px-8 py-3 rounded-full font-semibold transition duration-300 flex items-center ${
                        activeTab === "services"
                            ? "bg-indigo-600 text-white shadow-md"
                            : "bg-white text-indigo-600 border border-indigo-300 hover:bg-indigo-50"
                    }`}
                >
                    <Users className="mr-2" />
                    Services
                </motion.button>
            </div>

            {/* Liste des éléments */}
            <motion.div
                className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <AnimatePresence>
                    {items.map((item) => (
                        <motion.div
                            key={item.id}
                            layout
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-2xl transition-all"
                        >
                            {editingItemId === item.id ? (
                                <div className="p-6 space-y-4">
                                    <input
                                        type="text"
                                        value={item.name}
                                        onChange={(e) =>
                                            handleEditItem({ ...item, name: e.target.value })
                                        }
                                        className="w-full p-3 border rounded-md focus:ring-2 focus:ring-indigo-500"
                                        placeholder="Nom"
                                    />
                                    <textarea
                                        value={item.description}
                                        onChange={(e) =>
                                            handleEditItem({ ...item, description: e.target.value })
                                        }
                                        className="w-full p-3 border rounded-md focus:ring-2 focus:ring-indigo-500"
                                        placeholder="Description"
                                    />
                                    <input
                                        type="number"
                                        value={item.price}
                                        onChange={(e) =>
                                            handleEditItem({
                                                ...item,
                                                price: Number(e.target.value),
                                            })
                                        }
                                        className="w-full p-3 border rounded-md focus:ring-2 focus:ring-indigo-500"
                                        placeholder="Prix (FCFA)"
                                    />
                                    <div className="flex justify-end space-x-3">
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => setEditingItemId(null)}
                                            className="p-3 bg-red-100 text-red-600 rounded-full transition"
                                        >
                                            <X size={20} />
                                        </motion.button>
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => handleEditItem(item)}
                                            className="p-3 bg-green-100 text-green-600 rounded-full transition"
                                        >
                                            <Check size={20} />
                                        </motion.button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="relative h-56 w-full overflow-hidden">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                        />
                                        {/*<div className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md">
                                            {item.icon}
                                        </div>*/}
                                    </div>
                                    <div className="p-6 space-y-3">
                                        <h3 className="text-xl font-bold text-indigo-800">{item.name}</h3>
                                        <p className="text-gray-600">{item.description}</p>
                                        <div className="flex items-center justify-between">
                      <span className="text-2xl font-semibold text-indigo-600">
                        {formatPrice(item.price)}
                      </span>
                                            <div className="flex space-x-2">
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={() => setEditingItemId(item.id)}
                                                    className="p-2 bg-indigo-100 text-indigo-600 rounded-full transition"
                                                >
                                                    <Edit size={20} />
                                                </motion.button>
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={() => handleDeleteItem(item.id)}
                                                    className="p-2 bg-red-100 text-red-600 rounded-full transition"
                                                >
                                                    <Trash2 size={20} />
                                                </motion.button>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

            {/* Bouton d'ajout */}
            {!isAddingItem && (
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsAddingItem(true)}
                    className="fixed bottom-10 right-10 bg-gradient-to-r from-indigo-600 to-blue-500 text-white p-5 rounded-full shadow-xl hover:from-indigo-700 hover:to-blue-600 transition"
                >
                    <Plus size={24} />
                </motion.button>
            )}

            {/* Modal d'ajout */}
            <AnimatePresence>
                {isAddingItem && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 50 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 50 }}
                            className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md"
                        >
                            <h2 className="text-2xl font-bold text-indigo-800 mb-6 flex items-center">
                                {activeTab === "products" ? (
                                    <Truck className="mr-2" />
                                ) : (
                                    <Users className="mr-2" />
                                )}
                                Ajouter un nouveau {activeTab === "products" ? "produit" : "service"}
                            </h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Nom
                                    </label>
                                    <input
                                        type="text"
                                        value={newItem.name || ""}
                                        onChange={(e) =>
                                            setNewItem({ ...newItem, name: e.target.value })
                                        }
                                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                                        placeholder={`Nom du ${activeTab === "products" ? "produit" : "service"}`}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Description
                                    </label>
                                    <textarea
                                        value={newItem.description || ""}
                                        onChange={(e) =>
                                            setNewItem({ ...newItem, description: e.target.value })
                                        }
                                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                                        rows={3}
                                        placeholder="Description détaillée"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Prix (FCFA)
                                    </label>
                                    <input
                                        type="number"
                                        value={newItem.price || ""}
                                        onChange={(e) =>
                                            setNewItem({ ...newItem, price: Number(e.target.value) })
                                        }
                                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                                        placeholder="Prix en FCFA"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Image URL
                                    </label>
                                    <input
                                        type="text"
                                        value={newItem.image || ""}
                                        onChange={(e) =>
                                            setNewItem({ ...newItem, image: e.target.value })
                                        }
                                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                                        placeholder="URL de l'image"
                                    />
                                </div>
                            </div>
                            <div className="mt-6 flex justify-end space-x-4">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setIsAddingItem(false)}
                                    className="px-5 py-2 bg-gray-200 text-gray-700 rounded-md transition"
                                >
                                    Annuler
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleAddItem}
                                    className="px-5 py-2 bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-md hover:from-indigo-700 hover:to-blue-600 transition"
                                >
                                    Ajouter
                                </motion.button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}


