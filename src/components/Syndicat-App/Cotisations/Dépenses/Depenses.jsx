import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    DollarSign, PieChart, FileText, Download, Upload,
    Plus, Search, Filter, ChevronDown, Eye, EyeOff,
    Users, CreditCard, Mail, Calendar, CheckCircle, XCircle,
    Paperclip, Trash2, Edit2
} from 'lucide-react'
import * as expenseCategories from "framer-motion/m";

export const Depenses = () => {

    const [activeTab, setActiveTab] = useState('overview')
    const [showBalance, setShowBalance] = useState(false)
    const [showExpenseForm, setShowExpenseForm] = useState(false)
    const [filterCategory, setFilterCategory] = useState('')
    const [filterDate, setFilterDate] = useState('')

    const tabs = [
        { id: 'overview', label: 'Aperçu', icon: PieChart },
        { id: 'cotisations', label: 'Cotisations', icon: Users },
        { id: 'expenses', label: 'Dépenses', icon: DollarSign },
        { id: 'reports', label: 'Rapports', icon: FileText },
    ]


    const ExpenseForm = () => (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-4 w-full max-w-md">
                <h3 className="text-lg font-semibold mb-3">Ajouter une dépense</h3>
                <form className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="amount">Montant</label>
                            <input type="number" id="amount" className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm" placeholder="0.00" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="date">Date</label>
                            <input type="date" id="date" className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="category">Catégorie</label>
                        <select id="category" className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm">
                            {expenseCategories.map(category => (
                                <option key={category.id} value={category.id}>{category.label}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="beneficiary">Bénéficiaire</label>
                        <input type="text" id="beneficiary" className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm" placeholder="Nom du bénéficiaire" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="receipt">Justificatif</label>
                        <input type="file" id="receipt" className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                    </div>
                    <div className="flex justify-end space-x-2">
                        <button type="button" onClick={() => setShowExpenseForm(false)} className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50">Annuler</button>
                        <button type="submit" className="px-3 py-1 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600">Enregistrer</button>
                    </div>
                </form>
            </div>
        </div>
    )
    return (
        <div className="bg-gray-100 min-h-screen p-6">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Gestion des Finances</h1>

                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex space-x-4">
                            {tabs.map(tab => (
                                <motion.button
                                    key={tab.id}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center px-4 py-2 rounded-md transition-colors ${
                                        activeTab === tab.id
                                            ? 'bg-blue-600 text-white'
                                            : 'text-gray-600  hover:bg-gray-100'
                                    }`}
                                >
                                    <tab.icon className="mr-2 h-5 w-5" />
                                    {tab.label}
                                </motion.button>
                            ))}
                        </div>
                        <div className="flex space-x-2">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors flex items-center"
                            >
                                <Upload className="mr-2 h-5 w-5" />
                                Importer
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors flex items-center"
                            >
                                <Download className="mr-2 h-5 w-5" />
                                Exporter
                            </motion.button>
                        </div>
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.2 }}
                        >

                        </motion.div>
                    </AnimatePresence>
                </div>

                {activeTab === 'expenses' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="bg-white p-6 rounded-lg shadow-md cursor-pointer"
                        >
                            <h3 className="text-lg font-semibold mb-2">Analyse des dépenses</h3>
                            <p className="text-gray-600 mb-4">Visualisez la répartition de vos dépenses par catégorie</p>
                            <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors flex items-center">
                                <PieChart className="mr-2 h-5 w-5" />
                                Voir l'analyse
                            </button>
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="bg-white p-6 rounded-lg shadow-md cursor-pointer"
                        >
                            <h3 className="text-lg font-semibold mb-2">Exporter les dépenses</h3>
                            <p className="text-gray-600 mb-4">Téléchargez un rapport détaillé de vos dépenses</p>
                            <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors flex items-center">
                                <Download className="mr-2 h-5 w-5" />
                                Exporter le rapport
                            </button>
                        </motion.div>
                    </div>
                )}
            </div>
            {showExpenseForm && <ExpenseForm />}
        </div>
    )
}