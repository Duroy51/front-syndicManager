import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
    Plus, Users, Calendar
} from 'lucide-react'
import { useTranslation } from 'react-i18next'

export const Cotisations = () => {
    const { t } = useTranslation()
    const [filterMonth, setFilterMonth] = useState('')
    const [filterMember, setFilterMember] = useState('')
    const [, setShowPaymentForm] = useState(false)
    const members = [
        { id: 1, name: 'Jean Dupont', status: 'paid', amount: 100 },
        { id: 2, name: 'Marie Curie', status: 'unpaid', amount: 0 },
        { id: 3, name: 'Pierre Martin', status: 'paid', amount: 100 },
        { id: 4, name: 'Sophie Lefebvre', status: 'partial', amount: 50 },
        { id: 5, name: 'Luc Besson', status: 'unpaid', amount: 0 },
    ]
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
}