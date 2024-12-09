import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { Building, Mail, Lock, Calendar, User } from 'lucide-react'


const Input = ({ icon: Icon, ...props }) => (
    <div className="relative mb-4">
        <input
            {...props}
            className="w-full px-4 py-3 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 pl-12"
        />
        <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400" size={20} />
    </div>
)

const Button = ({ children, ...props }) => (
    <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-full px-6 py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        {...props}
    >
        {children}
    </motion.button>
)

const AnimatedText = ({ texts }) => {
    const [index, setIndex] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % texts.length)
        }, 5000)
        return () => clearInterval(timer)
    }, [texts])

    return (
        <AnimatePresence mode="wait">
            <motion.p
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-2xl font-light text-white text-center"
            >
                {texts[index]}
            </motion.p>
        </AnimatePresence>
    )
}


export const RegisterPage = () => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm()
    const [isLoading, setIsLoading] = useState(false)
    const password = React.useRef({})
    password.current = watch("password", "")

    const onSubmit = async (data) => {
        setIsLoading(true)
        try {
            // Implement your registration logic here
            console.log(data)
            // If successful, redirect to dashboard or show success message
        } catch (error) {
            console.error('Registration error:', error)
            // Handle error (show error message to user)
        } finally {
            setIsLoading(false)
        }
    }

    const handleGoogleSignIn = async () => {
        try {
            // Redirect to the Google OAuth route
            window.location.href = '/api/auth/google'
        } catch (error) {
            console.error('Google sign-in error:', error)
            // Handle error (show error message to user)
        }
    }

    const animatedTexts = [
        "Gérez votre syndicat efficacement",
        "Simplifiez vos processus administratifs",
        "Restez connecté avec vos membres",
        "Prenez des décisions éclairées",
        "Optimisez votre organisation syndicale"
    ]

    return (
        <div className="min-h-screen flex bg-white">
            <div className="w-1/2 bg-gradient-to-br from-blue-600 to-blue-800 flex flex-col justify-center items-center p-12 relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-700 opacity-20">
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path d="M0,0 L100,0 L100,100 L0,100 Z" fill="none" stroke="white" strokeWidth="0.5"/>
                        <path d="M0,50 Q50,0 100,50 Q50,100 0,50 Z" fill="none" stroke="white" strokeWidth="0.5"/>
                    </svg>
                </div>
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-white text-center relative z-10"
                >
                    <div className="flex justify-center mb-8">
                        <Building size={80} className="text-white" />
                    </div>
                    <h1 className="text-5xl font-bold mb-8">SyndicManager</h1>
                    <AnimatedText texts={animatedTexts} />
                </motion.div>
            </div>
            <div className="w-1/2 p-12 overflow-y-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
                        Rejoignez SyndicManager
                    </h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <Input
                            icon={User}
                            type="text"
                            placeholder="Nom"
                            {...register("lastName", { required: "Le nom est requis" })}
                        />
                        {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}

                        <Input
                            icon={User}
                            type="text"
                            placeholder="Prénom"
                            {...register("firstName", { required: "Le prénom est requis" })}
                        />
                        {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}

                        <Input
                            icon={Mail}
                            type="email"
                            placeholder="Adresse e-mail"
                            {...register("email", {
                                required: "L'email est requis",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Adresse e-mail invalide"
                                }
                            })}
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}

                        <Input
                            icon={Calendar}
                            type="date"
                            placeholder="Date de naissance"
                            {...register("birthDate", { required: "La date de naissance est requise" })}
                        />
                        {errors.birthDate && <p className="text-red-500 text-xs mt-1">{errors.birthDate.message}</p>}

                        <Input
                            icon={Lock}
                            type="password"
                            placeholder="Mot de passe"
                            {...register("password", {
                                required: "Le mot de passe est requis",
                                minLength: {
                                    value: 8,
                                    message: "Le mot de passe doit contenir au moins 8 caractères"
                                }
                            })}
                        />
                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}

                        <Input
                            icon={Lock}
                            type="password"
                            placeholder="Confirmer le mot de passe"
                            {...register("passwordConfirm", {
                                validate: value => value === password.current || "Les mots de passe ne correspondent pas"
                            })}
                        />
                        {errors.passwordConfirm && <p className="text-red-500 text-xs mt-1">{errors.passwordConfirm.message}</p>}

                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? 'Inscription en cours...' : 'S\'inscrire'}
                        </Button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-gray-600 mb-4">Ou inscrivez-vous avec</p>
                        <Button onClick={handleGoogleSignIn} className="bg-white text-gray-700 border border-gray-300 hover:bg-gray-50">
                            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5 mr-2 inline-block" />
                            S'inscrire avec Google
                        </Button>
                    </div>

                    <div className="mt-8 text-center">
                        <p className="text-gray-600">
                            Déjà inscrit ?{' '}
                            <a href="/login" className="text-blue-500 hover:underline">
                                Connectez-vous ici
                            </a>
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}