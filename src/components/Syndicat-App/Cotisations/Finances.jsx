import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    DollarSign, PieChart, TrendingUp, FileText, Download, Upload,
    Plus, Search, Filter, ChevronDown
} from 'lucide-react'
import {Apercus} from "./Apercus/Apercus";
import {Cotisations} from "./Cotisations/Cotisations";
import {Depenses} from "./Dépenses/Depenses";
import {FinanceManagement} from "./Dépenses/Depenses2";
import { useTranslation } from 'react-i18next';
export const Finances = () => {
    const [activeTab, setActiveTab] = useState('overview')
    const {t}=useTranslation();

    const tabs = [
        { id: 'overview', label: t('apercu'), icon: PieChart },
        { id: 'income', label: t("revenus"), icon: TrendingUp },
        { id: 'expenses', label: t("depenses"), icon: DollarSign },
        { id: 'reports', label: t("rapports"), icon: FileText },
    ]


    const renderTabContent = () => {
        switch (activeTab) {
            case 'overview':
                return (
                    <Apercus></Apercus>
                )
            case 'income':
                return <Cotisations></Cotisations>
            case 'expenses':
                return <Depenses></Depenses>
            case 'reports':
                return <div>Contenu des rapports</div>
            default:
                return <div>Sélectionnez un onglet</div>
        }
    }

    return (
        <div className="bg-gray-100 min-h-screen p-6">
            <h1 className="text-3xl font-bold mb-6">{t("finances")}</h1>
            <div className="max-w-6xl mx-auto">


                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex space-x-4">
                            {tabs.map(tab => (
                                <motion.button
                                    key={tab.id}
                                    whileHover={{scale: 1.05}}
                                    whileTap={{scale: 0.95}}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center px-4 py-2 rounded-md transition-colors ${
                                        activeTab === tab.id
                                            ? 'bg-blue-600 text-white'
                                            : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                                >
                                    <tab.icon className="mr-2 h-5 w-5"/>
                                    {tab.label}
                                </motion.button>
                            ))}
                        </div>
                        <div className="flex space-x-2">
                            <motion.button
                                whileHover={{scale: 1.05}}
                                whileTap={{scale: 0.95}}
                                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors flex items-center"
                            >
                                <Upload className="mr-2 h-5 w-5"/>
                                {t("importer")}
                            </motion.button>
                            <motion.button
                                whileHover={{scale: 1.05}}
                                whileTap={{scale: 0.95}}
                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors flex items-center"
                            >
                                <Download className="mr-2 h-5 w-5"/>
                                {t("exporter")}
                            </motion.button>
                        </div>
                    </div>

                    <div className="mb-6 flex justify-between items-center">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder={t("rechercher")}
                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"/>
                        </div>
                        <motion.button
                            whileHover={{scale: 1.05}}
                            whileTap={{scale: 0.95}}
                            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors flex items-center"
                        >
                            <Filter className="mr-2 h-5 w-5"/>
                            {t("flitres")}
                            <ChevronDown className="ml-2 h-4 w-4"/>
                        </motion.button>
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            exit={{opacity: 0, y: -20}}
                            transition={{duration: 0.2}}
                        >
                            {renderTabContent()}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/*<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="bg-white p-6 rounded-lg shadow-md cursor-pointer"
                    >
                        <h3 className="text-lg font-semibold mb-2">Ajouter une transaction</h3>
                        <p className="text-gray-600 mb-4">Enregistrez rapidement une nouvelle transaction</p>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors flex items-center">
                            <Plus className="mr-2 h-5 w-5" />
                            Nouvelle transaction
                        </button>
                    </motion.div>
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="bg-white p-6 rounded-lg shadow-md cursor-pointer"
                    >
                        <h3 className="text-lg font-semibold mb-2">Générer un rapport</h3>
                        <p className="text-gray-600 mb-4">Créez un rapport financier détaillé</p>
                        <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors flex items-center">
                            <FileText className="mr-2 h-5 w-5" />
                            Générer un rapport
                        </button>
                    </motion.div>
                </div>*/}
            </div>
        </div>
    )
}

