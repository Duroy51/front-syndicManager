import React, { useState, useEffect, useCallback, forwardRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { Building, Mail, Lock, Calendar, User, AlertCircle } from 'lucide-react'
import { useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'

const Alert = ({ children }) => (
    <div className="flex items-center p-2 mt-1 text-sm text-red-800 bg-red-100 rounded-md">
        <AlertCircle className="w-4 h-4 mr-2" />
        <span>{children}</span>
    </div>
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

const PasswordStrengthIndicator = ({ password }) => {
    const getStrength = (pwd) => {
        let strength = 0
        if (pwd.length >= 8) strength++
        if (/[A-Z]/.test(pwd)) strength++
        if (/[0-9]/.test(pwd)) strength++
        if (/[^A-Za-z0-9]/.test(pwd)) strength++
        return strength
    }

    const strength = getStrength(password)
    const width = `${(strength / 4) * 100}%`

    const getColor = () => {
        if (strength <= 1) return 'bg-red-500'
        if (strength <= 2) return 'bg-yellow-500'
        if (strength <= 3) return 'bg-blue-500'
        return 'bg-green-500'
    }

    return (
        <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
            <div
                className={`h-full rounded-full transition-all duration-300 ${getColor()}`}
                style={{ width }}
            />
        </div>
    )
}

const Input = forwardRef(({ icon: Icon, error, ...props }, ref) => (
    <div className="relative mb-4">
        <input
            {...props}
            ref={ref}
            className={`w-full px-4 py-3 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 pl-12 transition-colors ${
                error ? 'border-red-500' : 'border-gray-300'
            }`}
        />
        <Icon className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
            error ? 'text-red-500' : 'text-blue-400'
        }`} size={20} />
        {error && <Alert>{error}</Alert>}
    </div>
))

Input.displayName = 'Input'

const Button = ({ children, variant = 'primary', ...props }) => {
    const baseStyles = "w-full px-6 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all duration-200"
    const variants = {
        primary: "text-white bg-blue-500 hover:bg-blue-600 focus:ring-blue-500 disabled:bg-blue-300 disabled:cursor-not-allowed",
        google: "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-gray-300"
    }

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`${baseStyles} ${variants[variant]}`}
            {...props}
        >
            {children}
        </motion.button>
    )
}

export const RegisterPage = () => {
    const { register, handleSubmit, formState: { errors }, watch, setError } = useForm()
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const password = watch('password', '')

    const CLIENT_ID = '137734019377-nnq12325retn9n23nfnis326j008u2pm.apps.googleusercontent.com'
    const CLIENT_SECRET = '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'

    const handleAxiosError = useCallback((error) => {
        if (error.response?.status === 422) {
            // Erreurs de validation
            const errors = error.response.data.errors
            Object.keys(errors).forEach(field => {
                setError(field, {
                    type: 'backend',
                    message: errors[field][0]
                })
            })
        }
        return Promise.reject(error)
    }, [setError])

    useEffect(() => {
        const interceptor = axios.interceptors.response.use(
            response => response,
            handleAxiosError
        )

        return () => {
            axios.interceptors.response.eject(interceptor)
        }
    }, [handleAxiosError])

    const login = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            console.log('Google login successful', tokenResponse)

            try {
                const tokens = await axios.post('https://oauth2.googleapis.com/token', {
                    code: tokenResponse.code,
                    client_id: CLIENT_ID,
                    client_secret: CLIENT_SECRET,
                    redirect_uri: window.location.origin,
                    grant_type: 'authorization_code',
                })

                console.log('Tokens:', tokens.data)

                const backendResponse = await axios.post('http://localhost:9000/api/google-login', {
                    tokenId: tokens.data.id_token
                })

                console.log('Backend response:', backendResponse.data)

                if (backendResponse.data.token) {
                    saveUserSession(backendResponse.data.user, backendResponse.data.token)
                    toast.success('Connexion réussie ! Redirection...')
                    setTimeout(() => navigate('/dashboard'), 2000)
                }
            } catch (error) {
                console.error('Erreur lors de la connexion Google:', error)
                toast.error('Erreur lors de la connexion Google. Veuillez réessayer.')
            }
        },
        flow: 'auth-code',
    })

    const validatePassword = (value) => {
        const errors = []

        if (value.length < 8)
            errors.push("Au moins 8 caractères")
        if (!/[A-Z]/.test(value))
            errors.push("Au moins une majuscule")
        if (!/[0-9]/.test(value))
            errors.push("Au moins un chiffre")
        if (!/[^A-Za-z0-9]/.test(value))
            errors.push("Au moins un caractère spécial")

        return errors.length === 0 || errors.join(', ')
    }

    const saveUserSession = (userData, token) => {
        const encryptedToken = btoa(token)
        localStorage.setItem('token', encryptedToken)
        localStorage.setItem('user', JSON.stringify({
            id: userData.id,
            email: userData.email,
            firstName: userData.firstName,
            lastName: userData.lastName
        }))
    }

    const onSubmit = async (data) => {
        const toastLoadingId = toast.loading('Inscription en cours...')
        setIsLoading(true)

        try {
            const response = await axios.post('http://localhost:9000/api/register', {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                dateOfBirth: data.dateOfBirth,
                password: data.password,
            })

            if (response.data && response.data.token) {
                saveUserSession(response.data.user, response.data.token)

                toast.success('Inscription réussie ! Redirection...', {
                    id: toastLoadingId,
                })

                setTimeout(() => {
                    navigate('/home')
                }, 2000)
            } else {
                throw new Error('Token non reçu du serveur')
            }
        } catch (error) {
            console.error('Erreur lors de l\'inscription:', error)

            if (error.response?.data?.errors) {
                const backendErrors = error.response.data.errors

                Object.entries(backendErrors).forEach(([field, messages]) => {
                    setError(field, {
                        type: 'backend',
                        message: Array.isArray(messages) ? messages[0] : messages
                    })
                })

                toast.error('Veuillez corriger les erreurs dans le formulaire', {
                    id: toastLoadingId,
                })
            } else {
                toast.error('Une erreur est survenue. Veuillez réessayer.', {
                    id: toastLoadingId,
                })
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex bg-white">
            <Toaster
                position="top-right"
                toastOptions={{
                    success: {
                        className: 'bg-green-50 border border-green-200',
                        iconTheme: {
                            primary: '#10B981',
                            secondary: '#ffffff',
                        },
                    },
                    error: {
                        className: 'bg-red-50 border border-red-200',
                        iconTheme: {
                            primary: '#EF4444',
                            secondary: '#ffffff',
                        },
                    },
                }}
            />

            {/* Left side */}
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
                    <AnimatedText texts={[
                        "Gérez votre syndicat efficacement",
                        "Simplifiez vos processus administratifs",
                        "Restez connecté avec vos membres",
                        "Prenez des décisions éclairées",
                        "Optimisez votre organisation syndicale"
                    ]} />
                </motion.div>
            </div>

            {/* Right side - registration form */}
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
                            error={errors.lastName?.message}
                            {...register("lastName", {
                                required: "Le nom est requis",
                                minLength: {
                                    value: 2,
                                    message: "Le nom doit contenir au moins 2 caractères"
                                }
                            })}
                        />

                        <Input
                            icon={User}
                            type="text"
                            placeholder="Prénom"
                            error={errors.firstName?.message}
                            {...register("firstName", {
                                required: "Le prénom est requis",
                                minLength: {
                                    value: 2,
                                    message: "Le prénom doit contenir au moins 2 caractères"
                                }
                            })}
                        />

                        <Input
                            icon={Mail}
                            type="email"
                            placeholder="Adresse e-mail"
                            error={errors.email?.message}
                            {...register("email", {
                                required: "L'email est requis",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Adresse e-mail invalide"
                                }
                            })}
                        />

                        <Input
                            icon={Calendar}
                            type="date"
                            placeholder="Date de naissance"
                            error={errors.dateOfBirth?.message}
                            {...register("dateOfBirth", {
                                required: "La date de naissance est requise",
                                validate: value => {
                                    const age = new Date().getFullYear() - new Date(value).getFullYear()
                                    return age >= 18 || "Vous devez avoir au moins 18 ans"
                                }
                            })}
                        />

                        <div>
                            <Input
                                icon={Lock}
                                type="password"
                                placeholder="Mot de passe"
                                error={errors.password?.message}
                                {...register("password", {
                                    required: "Le mot de passe est requis",
                                    validate: validatePassword
                                })}
                            />
                            <PasswordStrengthIndicator password={password} />
                        </div>

                        <Input
                            icon={Lock}
                            type="password"
                            placeholder="Confirmer le mot de passe"
                            error={errors.passwordConfirm?.message}
                            {...register("passwordConfirm", {
                                validate: value => value === password || "Les mots de passe ne correspondent pas"
                            })}
                        />

                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? 'Inscription en cours...' : 'S\'inscrire'}
                        </Button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-gray-600 mb-4">Ou inscrivez-vous avec</p>
                        <Button
                            variant="google"
                            onClick={() => login()}
                        >
                            <img
                                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                                alt="Google"
                                className="w-5 h-5 mr-2 inline-block"
                            />
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

