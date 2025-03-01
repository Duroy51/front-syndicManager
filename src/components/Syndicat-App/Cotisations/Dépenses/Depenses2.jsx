import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    DollarSign, PieChart, FileText, Download, Upload,
    Plus, Search, Filter, ChevronDown, Eye, EyeOff,
    Users, CreditCard, Mail, Calendar, CheckCircle, XCircle,
    Paperclip, Trash2, Edit2
} from 'lucide-react'
import { useTranslation } from 'react-i18next'

export const FinanceManagement = () => {
    const { t } = useTranslation()
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

    const financialData = {
        balance: 150000,
        cotisations: 45000,
        expenses: 30000,
    }

    const expenseCategories = [
        { id: 'maintenance', label: 'Entretien' },
        { id: 'repairs', label: 'Réparations' },
        { id: 'purchases', label: 'Achats divers' },
        { id: 'salaries', label: 'Rémunérations' },
    ]

    const expenses = [
        { id: 1, date: '2023-05-15', category: 'maintenance', beneficiary: 'Entreprise de nettoyage', amount: 500 },
        { id: 2, date: '2023-05-20', category: 'repairs', beneficiary: 'Plombier local', amount: 350 },
        { id: 3, date: '2023-05-25', category: 'purchases', beneficiary: 'Fournitures de bureau', amount: 200 },
        { id: 4, date: '2023-05-31', category: 'salaries', beneficiary: 'Personnel administratif', amount: 2000 },
    ]

    const renderTabContent = () => {
        switch (activeTab) {
            case 'overview':
                // Overview content (unchanged)
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-lg font-semibold mb-4">{t('soldeActuel')}</h3>
                            <div className="flex items-center justify-between">
                                <span className="text-3xl font-bold">
                                    {showBalance
                                        ? `${financialData.balance.toLocaleString()} €`
                                        : '••••••• Fcfa'
                                    }
                                </span>
                                <button
                                    onClick={() => setShowBalance(!showBalance)}
                                    className="text-blue-600 hover:text-blue-800"
                                >
                                    {showBalance ? <EyeOff /> : <Eye />}
                                </button>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-lg font-semibold mb-4">{t('cotisationsVsDépenses')}</h3>
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-green-600">{t('cotisations')}</p>
                                    <p className="text-2xl font-semibold">{financialData.cotisations.toLocaleString()} €</p>
                                </div>
                                <div>
                                    <p className="text-red-600">{t('dépenses')}</p>
                                    <p className="text-2xl font-semibold">{financialData.expenses.toLocaleString()} €</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            case 'cotisations':
                // Cotisations content (unchanged)
                return <div>{t('contenuCotisations')}</div>
            case 'expenses':
                return (
                    <div>
                        <div className="mb-6 flex justify-between items-center">
                            <div className="flex space-x-4">
                                <div className="relative">
                                    <select
                                        value={filterCategory}
                                        onChange={(e) => setFilterCategory(e.target.value)}
                                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">{t('toutesLesCatégories')}</option>
                                        {expenseCategories.map(category => (
                                            <option key={category.id} value={category.id}>{category.label}</option>
                                        ))}
                                    </select>
                                    <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                </div>
                                <div className="relative">
                                    <input
                                        type="month"
                                        value={filterDate}
                                        onChange={(e) => setFilterDate(e.target.value)}
                                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                </div>
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setShowExpenseForm(true)}
                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors flex items-center"
                            >
                                <Plus className="mr-2 h-5 w-5" />
                                {t('ajouterUneDépense')}
                            </motion.button>
                        </div>
                        <div className="bg-white rounded-lg shadow-md overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('date')}</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('catégorie')}</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('bénéficiaire')}</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('montant')}</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('actions')}</th>
                                </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                {expenses.map(expense => (
                                    <tr key={expense.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">{expense.date}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {expenseCategories.find(cat => cat.id === expense.category)?.label}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">{expense.beneficiary}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{expense.amount} €</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <button className="text-blue-600 hover:text-blue-900 mr-4">
                                                <Edit2 className="h-5 w-5" />
                                            </button>
                                            <button className="text-red-600 hover:text-red-900">
                                                <Trash2 className="h-5 w-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )
            case 'reports':
                return <div>{t('contenuRapports')}</div>
            default:
                return <div>{t('sélectionnezUnOnglet')}</div>
        }
    }

    const ExpenseForm = () => (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h3 className="text-xl font-semibold mb-4">{t('ajouterUneDépense')}</h3>
                <form>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="amount">
                            {t('montant')}
                        </label>
                        <input
                            type="number"
                            id="amount"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="0.00"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="category">
                            {t('catégorie')}
                        </label>
                        <select
                            id="category"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {expenseCategories.map(category => (
                                <option key={category.id} value={category.id}>{category.label}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="date">
                            {t('date')}
                        </label>
                        <input
                            type="date"
                            id="date"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="beneficiary">
                            {t('bénéficiaire')}
                        </label>
                        <input
                            type="text"
                            id="beneficiary"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder={t('nomDuBénéficiaire')}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="receipt">
                            {t('justificatif')}
                        </label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                            <div className="space-y-1 text-center">
                                <Paperclip className="mx-auto h-12 w-12 text-gray-400" />
                                <div className="flex text-sm text-gray-600">
                                    <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                                        <span>{t('téléchargerUnFichier')}</span>
                                        <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                    </label>
                                    <p className="pl-1">{t('ouGlisserDéposer')}</p>
                                </div>
                                <p className="text-xs text-gray-500">{t('formatsFichiers')}</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={() => setShowExpenseForm(false)}
                            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {t('annuler')}
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {t('enregistrer')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )

    return (
        <div className="bg-gray-100 min-h-screen p-6">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">{t('gestionDesFinances')}</h1>

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
                                {t('importer')}
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors flex items-center"
                            >
                                <Download className="mr-2 h-5 w-5" />
                                {t('exporter')}
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
                            {renderTabContent()}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {activeTab === 'expenses' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="bg-white p-6 rounded-lg shadow-md cursor-pointer"
                        >
                            <h3 className="text-lg font-semibold mb-2">{t('analyseDesDépenses')}</h3>
                            <p className="text-gray-600 mb-4">{t('visualisezRépartitionDépenses')}</p>
                            <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors flex items-center">
                                <PieChart className="mr-2 h-5 w-5" />
                                {t('voirAnalyse')}
                            </button>
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="bg-white p-6 rounded-lg shadow-md cursor-pointer"
                        >
                            <h3 className="text-lg font-semibold mb-2">{t('exporterLesDépenses')}</h3>
                            <p className="text-gray-600 mb-4">{t('téléchargezRapportDépenses')}</p>
                            <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors flex items-center">
                                <Download className="mr-2 h-5 w-5" />
                                {t('exporterRapport')}
                            </button>
                        </motion.div>
                    </div>
                )}
            </div>
            {showExpenseForm && <ExpenseForm />}
        </div>
    )
}

