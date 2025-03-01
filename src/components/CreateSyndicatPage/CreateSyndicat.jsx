import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, ChevronLeft, Upload } from 'lucide-react'
import { useTranslation } from 'react-i18next'//importer le hook useTranslation
export const CreateSyndicat = () => {
    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState({
        nom: '',
        secteurActivite: '',
        objet: '',
        siegeSocial: '',
        conditionsAdhesion: '',
        statuts: null,
        reglementInterieur: null,
        logo: null
    })
    const { t } = useTranslation(); // Initialisation correcte du hook useTranslation


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    
    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (files) {
            setFormData(prev => ({ ...prev, [name]: files[0] }));
        }
    };
    

    const nextStep = () => setStep(prev => Math.min(prev + 1, 3))
    const prevStep = () => setStep(prev => Math.max(prev - 1, 1))

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        className="space-y-4"
                    >
                        <div className="space-y-2">
                            <label htmlFor="nom" className="block text-sm font-medium text-gray-700">{t('nomSyndicat')}</label>
                            <input
                                id="nom"
                                name="nom"
                                type="text"
                                value={formData.nom}
                                onChange={handleInputChange}
                                required
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="secteurActivite" className="block text-sm font-medium text-gray-700">{t('secteurActivite')}</label> 
                            <input
                                id="secteurActivite"
                                name="secteurActivite"
                                type="text"
                                value={formData.secteurActivite}
                                onChange={handleInputChange}
                                required
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="objet" className="block text-sm font-medium text-gray-700">{t('objectSyndicat')}</label>
                            <textarea
                                id="objet"
                                name="objet"
                                value={formData.objet}
                                onChange={handleInputChange}
                                required
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </motion.div>
                )
            case 2:
                return (
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        className="space-y-4"
                    >
                        <div className="space-y-2">
                            <label htmlFor="siegeSocial" className="block text-sm font-medium text-gray-700">{t('siegeSocial')}</label>
                            <input
                                id="siegeSocial"
                                name="siegeSocial"
                                type="text"
                                value={formData.siegeSocial}
                                onChange={handleInputChange}
                                required
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="conditionsAdhesion" className="block text-sm font-medium text-gray-700">{t('conditionsAdhesionMembres')}</label>
                            <textarea
                                id="conditionsAdhesion"
                                name="conditionsAdhesion"
                                value={formData.conditionsAdhesion}
                                onChange={handleInputChange}
                                required
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </motion.div>
                )
            case 3:
                return (
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        className="space-y-4"
                    >
                        <div className="space-y-2">
                            <label htmlFor="statuts" className="block text-sm font-medium text-gray-700">{t('statusSyndicat')}</label>
                            <input
                                id="statuts"
                                name="statuts"
                                type="file"
                                accept=".pdf"
                                onChange={handleFileChange}
                                required
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="reglementInterieur" className="block text-sm font-medium text-gray-700">{t('reglementInterieurOptionel')}</label>
                            <input
                                id="reglementInterieur"
                                name="reglementInterieur"
                                type="file"
                                accept=".pdf"
                                onChange={handleFileChange}
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="logo" className="block text-sm font-medium text-gray-700">{t('logoSyndicatOptionnel)')}</label>
                            <input
                                id="logo"
                                name="logo"
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </motion.div>
                )
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 p-4">
            <div className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-blue-400 p-6">
                    <h2 className="text-2xl font-bold text-center text-white">{t('nouveauSyndicat')}</h2>
                </div>
                <div className="p-6">
                    <div className="mb-6">
                        <div className="flex justify-between items-center">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex flex-col items-center">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= i ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                                        {i}
                                    </div>
                                    <div className={`text-sm mt-1 ${step >= i ? 'text-blue-600' : 'text-gray-600'}`}>
                                        {i === 1 ? t('Informations') : i === 2 ? t('Détails') : t('Documents')}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-2 h-1 bg-gray-200">
                            <motion.div
                                className="h-full bg-blue-600"
                                initial={{ width: '0%' }}
                                animate={{ width: `${((step - 1) / 2) * 100}%` }}
                                transition={{ duration: 0.5 }}
                            />
                        </div>
                    </div>
                    <AnimatePresence mode="wait">
                        {renderStep()}
                    </AnimatePresence>
                </div>
                <div className="bg-gray-50 px-6 py-4 flex justify-between">
                    <button
                        onClick={prevStep}
                        disabled={step === 1}
                        className="px-4 py-2 bg-white text-blue-600 rounded-md border border-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed transition duration-300 ease-in-out"
                    >
                        <ChevronLeft className="inline-block mr-2 h-4 w-4" /> t({'precedent'})
                    </button>
                    {step < 3 ? (
                        <button
                            onClick={nextStep}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
                        >
                            t{('suivant')} <ChevronRight className="inline-block ml-2 h-4 w-4" />
                        </button>
                    ) : (
                        <button
                            type="submit"
                            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
                        >
                            {t('CreerSyndicat')} <Upload className="inline-block ml-2 h-4 w-4" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}