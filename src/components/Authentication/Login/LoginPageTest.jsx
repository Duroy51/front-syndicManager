import { React, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { Building, User, Mail, Lock, ArrowLeft } from 'lucide-react'
import { useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'

const ProfileTypeCard = ({ icon: Icon, title, description, onClick }) => (
    <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex flex-col items-center p-8 bg-white rounded-2xl shadow-xl cursor-pointer border-2 border-transparent hover:border-blue-200 transition-all"
        onClick={onClick}
    >
        <div className="p-4 mb-4 bg-blue-100 rounded-full">
            <Icon className="text-blue-600" size={40} />
        </div>
        <h3 className="text-2xl font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 text-center">{description}</p>
    </motion.div>
)

const LoginPage2 = ({ type, onBack }) => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const navigate = useNavigate()

    const onSubmit = async (data) => {
        try {
            const endpoint = type === 'business'
                ? '/api/business-login'
                : '/api/login'

            const response = await axios.post(endpoint, data)

            toast.success('Connexion réussie !')
            setTimeout(() => navigate(type === 'business' ? '/dashboard' : '/profile'), 1500)
        } catch (error) {
            toast.error(error.response?.data?.message || 'Erreur de connexion')
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full max-w-md"
        >
            <button
                onClick={onBack}
                className="flex items-center mb-8 text-gray-600 hover:text-blue-600 transition-colors"
            >
                <ArrowLeft className="mr-2" /> Retour au choix de profil
            </button>

            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                Connexion {type === 'business' ? 'Professionnelle' : 'Standard'}
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {type === 'business' && (
                    <div className="relative">
                        <input
                            {...register('company', { required: "L'entreprise est requise" })}
                            placeholder="Nom de l'entreprise"
                            className="w-full px-4 py-3 pl-12 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring focus:ring-blue-300 transition-colors"
                        />
                        <Building className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400" />
                        {errors.company && <span className="text-red-500 text-sm">{errors.company.message}</span>}
                    </div>
                )}

                <div className="relative">
                    <input
                        {...register('email', { required: "L'email est requis" })}
                        placeholder="Adresse e-mail"
                        className="w-full px-4 py-3 pl-12 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring focus:ring-blue-300 transition-colors"
                    />
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400" />
                    {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
                </div>

                <div className="relative">
                    <input
                        type="password"
                        {...register('password', { required: "Le mot de passe est requis" })}
                        placeholder="Mot de passe"
                        className="w-full px-4 py-3 pl-12 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring focus:ring-blue-300 transition-colors"
                    />
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400" />
                    {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
                </div>

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 px-6 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                    type="submit"
                >
                    Se connecter
                </motion.button>
            </form>

            <div className="mt-8 text-center">
                <p className="text-gray-600">Pas encore inscrit ?
                    <a href="/register" className="text-blue-600 hover:underline ml-2">
                        Créer un compte
                    </a>
                </p>
            </div>
        </motion.div>
    )
}

export const LoginPage = () => {
    const [selectedType, setSelectedType] = useState(null)

    return (
        <div className="min-h-screen flex bg-white">
            <Toaster position="top-right" />

            {/* Left side */}
            <div className="w-1/2 bg-gradient-to-br from-blue-600 to-blue-800 flex flex-col justify-center items-center p-12 relative overflow-hidden">
                <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-white text-center relative z-10"
                >
                    <h1 className="text-5xl font-bold mb-6">Bienvenue sur SyndicManager</h1>
                    <p className="text-xl font-light max-w-2xl">
                        Gestion syndicale intelligente pour les professionnels et particuliers
                    </p>
                </motion.div>
            </div>

            {/* Right side */}
            <div className="w-1/2 flex items-center justify-center p-12 bg-gray-50">
                <AnimatePresence mode='wait'>
                    {!selectedType ? (
                        <motion.div
                            key="selection"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="w-full max-w-2xl"
                        >
                            <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">
                                Choisissez votre profil
                            </h2>

                            <div className="grid grid-cols-2 gap-8">
                                <ProfileTypeCard
                                    icon={Building}
                                    title="Professionnel"
                                    description="Gestion de syndicats et copropriétés professionnelles"
                                    onClick={() => setSelectedType('business')}
                                />
                                <ProfileTypeCard
                                    icon={User}
                                    title="Particulier"
                                    description="Accès à vos espaces personnels et services résidentiels"
                                    onClick={() => setSelectedType('standard')}
                                />
                            </div>
                        </motion.div>
                    ) : (
                        <LoginForm
                            type={selectedType}
                            onBack={() => setSelectedType(null)}
                        />
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}