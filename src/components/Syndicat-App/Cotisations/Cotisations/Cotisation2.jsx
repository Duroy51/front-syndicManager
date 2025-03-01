import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    DollarSign, PieChart, FileText, Download, Upload,
    Plus, Search, Filter, ChevronDown, Eye, EyeOff,
    Users, CreditCard, Mail, Calendar, CheckCircle, XCircle
} from 'lucide-react'
import { useTranslation } from 'react-i18next';

const FinanceManagement = () => {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState('overview')
    const [showBalance, setShowBalance] = useState(false)
    const [filterMonth, setFilterMonth] = useState('')
    const [filterMember, setFilterMember] = useState('')
    const [showPaymentForm, setShowPaymentForm] = useState(false)

    const tabs = [
        { id: 'overview', label: t('aperçu'), icon: PieChart },
        { id: 'cotisations', label: t('cotisations'), icon: Users },
        { id: 'expenses', label: t('dépenses'), icon: DollarSign },
        { id: 'reports', label: t('rapports'), icon: FileText },
    ]

    const financialData = {
        balance: 150000,
        cotisations: 45000,
        expenses: 30000,
    }

    const members = [
        { id: 1, name: 'Jean Dupont', status: 'paid', amount: 100 },
        { id: 2, name: 'Marie Curie', status: 'unpaid', amount: 0 },
        { id: 3, name: 'Pierre Martin', status: 'paid', amount: 100 },
        { id: 4, name: 'Sophie Lefebvre', status: 'partial', amount: 50 },
        { id: 5, name: 'Luc Besson', status: 'unpaid', amount: 0 },
    ]

    const renderTabContent = () => {
        switch (activeTab) {
            case 'overview':
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-lg font-semibold mb-4">{t('soldeActuel')}</h3>
                            <div className="flex items-center justify-between">
                                <span className="text-3xl font-bold">
                                    {showBalance
                                        ? `${financialData.balance.toLocaleString()} €`
                                        : '••••••• €'
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
                            <h3 className="text-lg font-semibold mb-4">{t("cotisationsVsDepenses")}</h3>
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
                return (
                    <div>
                        <div className="mb-6 flex justify-between items-center">
                            <div className="flex space-x-4">
                                <div className="relative">
                                    <select
                                        value={filterMonth}
                                        onChange={(e) => setFilterMonth(e.target.value)}
                                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">{t('tousLesMois')}</option>
                                        <option value="01">{t('janvier')}</option>
                                        <option value="02">{t('fevrier')}</option>
                                        {/* Add other months */}
                                    </select>
                                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                </div>
                                <div className="relative">
                                    <select
                                        value={filterMember}
                                        onChange={(e) => setFilterMember(e.target.value)}
                                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">{t('tousLesMembres')}</option>
                                        {members.map(member => (
                                            <option key={member.id} value={member.id}>{member.name}</option>
                                        ))}
                                    </select>
                                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                </div>
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setShowPaymentForm(true)}
                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors flex items-center"
                            >
                                <Plus className="mr-2 h-5 w-5" />
                                {t('enregistrerUnPaiement')}
                            </motion.button>
                        </div>
                        <div className="bg-white rounded-lg shadow-md overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('membre')}</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('statut')}</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('montantPaye')}</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('actions')}</th>
                                </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                {members.map(member => (
                                    <tr key={member.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">{member.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                    member.status === 'paid' ? 'bg-green-100 text-green-800' :
                                                        member.status === 'unpaid' ? 'bg-red-100 text-red-800' :
                                                            'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                    {member.status === 'paid' ? t('paye') :
                                                        member.status === 'unpaid' ? t('nonPaye') : t('partiel')}
                                                </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">{member.amount} €</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <button className="text-blue-600 hover:text-blue-900 mr-4">{t('details')}</button>
                                            {member.status !== 'paid' && (
                                                <button className="text-green-600 hover:text-green-900 mr-4">{t('enregistrerUnPaiement')}</button>
                                            )}
                                            {member.status === 'unpaid' && (
                                                <button className="text-red-600 hover:text-red-900">{t('envoyerUnRappel')}</button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )
            default:
                return null;
        }
    }

    return (
        <div className="bg-gray-100 min-h-screen p-6">
            <h1 className="text-3xl font-bold mb-6">{t('gestionFinancière')}</h1>
            <div className="max-w-6xl mx-auto">
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
                                            : 'text-gray-600 hover:bg-gray-100'
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

                    <div className="mb-6 flex justify-between items-center">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder={t('rechercher')}
                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors flex items-center"
                        >
                            <Filter className="mr-2 h-5 w-5" />
                            {t('filtres')}
                            <ChevronDown className="ml-2 h-4 w-4" />
                        </motion.button>
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
            </div>
        </div>
    )
}

export default FinanceManagement