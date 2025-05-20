import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Building, Mail, Lock } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { fakeUsers } from "../../../services/FakeUsers.js";
import { generateFakeJWT } from "../../../services/FakeAuth.js";
import {AppRoutesPaths} from "../../../router/AppRoutesPaths.js";
import {getRoleFromToken} from "@/services/AccountService.js";
import { useTranslation } from 'react-i18next';


export const AppleID = "P3WHTNR897.gloswitch";

const Input = React.forwardRef(({ icon: Icon, ...props }, ref) => (
    <div className="relative mb-4">
        <input
            {...props}
            ref={ref}
            className="w-full px-4 py-3 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 pl-12"
        />
        <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400" size={20} />
    </div>
));

const Button = ({ children, ...props }) => (
    <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-full px-6 py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        {...props}
    >
        {children}
    </motion.button>
);

const AnimatedText = ({ texts }) => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % texts.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [texts]);

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
    );
};

export const LoginPage = () => {
    const { register, handleSubmit, formState: { errors }, setError } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [isSDKLoaded, setIsSDKLoaded] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);
    const {t} =useTranslation();

    // Configuration Google (si vous l'utilisez)
    const CLIENT_ID = '635685522425-ftpv8h91ho1s9p5h721p2jelm5uad70d.apps.googleusercontent.com';
    const CLIENT_SECRET = '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';

    useEffect(() => {
        console.log('Début du chargement du SDK Apple');
        const script = document.createElement('script');
        script.src = 'https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js';
        script.async = true;
        script.onload = () => {
            console.log('SDK Apple chargé, window.AppleID:', window.AppleID);
            setIsSDKLoaded(true);
        };
        document.body.appendChild(script);

        return () => {
            console.log('Nettoyage : suppression du script Apple');
            document.body.removeChild(script);
        };
    }, []);

    useEffect(() => {
        if (isSDKLoaded) {
            initializeAppleSignIn();
        }
    }, [isSDKLoaded]);

    const initializeAppleSignIn = () => {
        if (window.AppleID && window.AppleID.auth) {
            console.log('Initialisation de Apple Sign In');
            try {
                window.AppleID.auth.init({
                    clientId: 'com.bandesoft.dev-gloswitch',
                    scope: 'name email',
                    redirectURI: 'https://front-syndic-manager-2fmn.vercel.app/login',
                    state: 'origin:web',
                    usePopup: true
                });
                console.log('Apple Sign In initialisé avec succès');
                setIsInitialized(true);
            } catch (error) {
                console.error('Erreur lors de l\'initialisation de Apple Sign In:', error);
            }
        } else {
            console.error("window.AppleID.auth n'est pas disponible lors de l'initialisation");
            setError("Le SDK Apple n'est pas chargé correctement.");
        }
    };

    const handleAppleSignIn = async () => {
        if (!window.AppleID || !window.AppleID.auth) {
            console.error('Apple Sign In SDK not loaded properly');
            setError("Apple Sign In SDK not loaded properly. Please refresh the page.");
            return;
        }
        try {
            const data = await window.AppleID.auth.signIn();
            console.log('Apple Sign In réussi', data);

            console.log('Envoi du code d\'autorisation au backend');

            console.log('data',data);
            console.log('data.authorization',data.authorization);

            console.log('data.authorization.code',data.authorization.code);



            const backendResponse = await axios.post(
                'http://localhost:8001/user/oauth/apple/login',
                {
                    authorizationCode: data.authorization.code,
                    type: "LONG"
                }
            );

            console.log('Backend response:', backendResponse.data);

            if (backendResponse.status === 200) {
                localStorage.setItem('token', backendResponse.data.data["Bearer Infos"].Bearer);
                console.log('bla', backendResponse.data.data["Bearer Infos"].Bearer);
                localStorage.setItem('expiresIn', backendResponse.data.data["Bearer Infos"].ExpireAt);
                localStorage.setItem('refreshToken', backendResponse.data.data["Bearer Infos"].RefreshToken);
                localStorage.setItem('role', backendResponse.data.data.role);

                navigate(AppRoutesPaths.homePage
                );
            } else {
                setError("Échec de l'authentification");
            }
        } catch (error) {
            console.error('Erreur pendant Apple Sign In:', error);
            if (error.error === 'user_trigger_new_signin_flow') {
                console.log("L'utilisateur a déclenché un nouveau flux de connexion.");
            }
        }
    };

    const handleAxiosError = useCallback((error) => {
        if (error.response?.status === 422) {
            const errors = error.response.data.errors;
            Object.keys(errors).forEach(field => {
                setError(field, {
                    type: 'backend',
                    message: errors[field][0]
                });
            });
        }
        return Promise.reject(error);
    }, [setError]);

    useEffect(() => {
        const interceptor = axios.interceptors.response.use(
            response => response,
            handleAxiosError
        );
        return () => {
            axios.interceptors.response.eject(interceptor);
        };
    }, [handleAxiosError]);




    const onSubmit = async (data) => {
        setIsLoading(true);
        try {

            const response = await axios.post(
                '/api/auth-service/auth/login',
                {
                    username: data.email,
                    password: data.password
                }
            );

            console.log('Réponse de l\'API:', response.data);

            // Stockage des données utilisateur et du token
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));

            // Affichage du pop-up de succès et redirection
            Swal.fire({
                icon: 'success',
                title: t("connexion_reussie"),
                text: t("vous_allez_etre_redirige"),
                confirmButtonText: 'Ok',
            }).then(() => {

                navigate('/user/home');
            });
        } catch (error) {
            console.error('Erreur lors de la connexion:', error);

            // Gestion spécifique des erreurs d'API
            const errorMessage = error.response?.data?.message ||
                error.message ||
                'Une erreur est survenue. Veuillez réessayer.';

            Swal.fire({
                icon: 'error',
                title: 'Erreur',
                text: errorMessage,
                confirmButtonText: 'Ok',
            });
        } finally {
            setIsLoading(false);
        }
    };

    const animatedTexts = [
        t("bienvenue_sur_syndic_manager"),
        t("gerez_votre_syndicat_efficacement"),
        t("simplifiez_vos_processus_administratifs"),
        t("restez_connecte_avec_vos_membres"),
        t("prenez_des_decisions_eclairees")
    ];

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
                        {t("connexion_a_syndic_manager")}
                    </h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                            icon={Lock}
                            type="password"
                            placeholder="Mot de passe"
                            {...register("password", {
                                required: "Le mot de passe est requis"
                            })}
                        />
                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}

                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="remember"
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label htmlFor="remember" className="ml-2 block text-sm text-gray-900">
                                    {t("se_souvenir_de_moi")}
                                </label>
                            </div>
                            <div className="text-sm">
                                <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                                    {t("mot_de_passe_oublie")} ?
                                </a>
                            </div>
                        </div>

                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? 'Connexion en cours...' : t("se_connecter")}
                        </Button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-gray-600 mb-4">{t("ou_connectez_vous_avec")}</p>
                        <Button
                            className="bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                            onClick={() => handleAppleSignIn()}>
                            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5 mr-2 inline-block" />
                            {t("se_connecter_avec_google")}
                        </Button>
                    </div>

                    <div className="mt-8 text-center">
                        <p className="text-gray-600">
                            {t("pas_encore_de_compte")}?{' '}
                            <a href="/register" className="text-blue-500 hover:underline">
                                {t("inscrivez_vous_ici")}
                            </a>
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};
