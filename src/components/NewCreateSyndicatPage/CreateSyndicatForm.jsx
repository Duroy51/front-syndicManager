"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FileUploader } from "./file-uploader";
import axios from "axios";
import {
    Palette,
    TextCursorInput,
    Building2,
    LayoutGrid,
    ImageIcon,
    Rocket,
    AtSign,
    Globe,
    Share2,
    FileDigit,
    Receipt,
    Coins,
    Calendar,
    UserRound,
    Briefcase,
    Type,
    Loader2
} from "lucide-react";
import { Notification } from "../../globalComponent/Notification.jsx"; // Importation du composant Notification

// URL de l'API
const API_URL = "/api/organization-service/organizations"; // À remplacer par l'URL réelle de votre API

export const CreateSyndicatForm = () => {
    const [formData, setFormData] = useState({
        long_name: "",
        short_name: "",
        email: "",
        description: "",
        business_domains: [], // Changed to array for UUIDs
        logo_url: null,
        type: "SOLE_PROPRIETORSHIP", // Updated to match JSON format
        web_site_url: "",
        social_network: "",
        business_registration_number: "",
        tax_number: "",
        capital_share: 0,
        registration_date: new Date().toISOString().split('T')[0],
        ceo_name: "",
        year_founded: new Date().toISOString().split('T')[0]
    });

    // États pour gérer les interactions avec l'API
    const [isLoading, setIsLoading] = useState(false);
    const [apiResponse, setApiResponse] = useState(null);

    // États pour gérer les notifications
    const [notification, setNotification] = useState({
        isVisible: false,
        message: "",
        type: "success"
    });

    // Types de syndicat
    const syndicatTypes = [
        { value: "SOLE_PROPRIETORSHIP", label: "Entreprise individuelle" },
        { value: "LIMITED_LIABILITY_COMPANY", label: "SARL" },
        { value: "CORPORATION", label: "Société anonyme" },
        { value: "COOPERATIVE", label: "Coopérative" },
        { value: "ASSOCIATION", label: "Association" }
    ];

    // Mock domain UUIDs for demo (in real app, these would come from an API)
    const activityDomains = [
        { id: "3fa85f64-5717-4562-b3fc-2c963f66afa6", name: "Technologie" },
        { id: "4fa85f64-5717-4562-b3fc-2c963f66afa7", name: "Santé" },
        { id: "5fa85f64-5717-4562-b3fc-2c963f66afa8", name: "Éducation" },
        { id: "6fa85f64-5717-4562-b3fc-2c963f66afa9", name: "Construction" },
        { id: "7fa85f64-5717-4562-b3fc-2c963f66afaa", name: "Transport" },
        { id: "8fa85f64-5717-4562-b3fc-2c963f66afab", name: "Agriculture" },
        { id: "9fa85f64-5717-4562-b3fc-2c963f66afac", name: "Artisanat" }
    ];

    // Fonction pour afficher une notification
    const showNotification = (message, type = "success") => {
        setNotification({
            isVisible: true,
            message,
            type
        });
    };

    // Fonction pour fermer la notification
    const closeNotification = () => {
        setNotification(prev => ({
            ...prev,
            isVisible: false
        }));
    };

    const handleChange = (e) => {
        const { name, value, type } = e.target;

        if (name === "business_domains") {
            // Gestion du domaine sélectionné (multi-select)
            const selectedDomain = e.target.value;
            if (selectedDomain) {
                setFormData({
                    ...formData,
                    business_domains: [...formData.business_domains, selectedDomain]
                });
            }
        } else if (type === "number") {
            setFormData({
                ...formData,
                [name]: parseFloat(value)
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const handleRemoveDomain = (domainId) => {
        setFormData({
            ...formData,
            business_domains: formData.business_domains.filter(id => id !== domainId)
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setApiResponse(null);

        try {
            // Préparation des données pour l'API
            const apiPayload = {
                ...formData,
                // Convertir les dates au format attendu par l'API (ISO string)
                registration_date: new Date(formData.registration_date).toISOString(),
                year_founded: new Date(formData.year_founded).toISOString(),
                // Renommer web_site_url en website_url pour correspondre à l'API
                website_url: formData.web_site_url,
            };

            // Supprimer web_site_url car nous utilisons website_url pour l'API
            delete apiPayload.web_site_url;

            // Pour le logo, dans un cas réel, vous auriez probablement besoin de l'uploader séparément
            // et d'obtenir une URL avant d'envoyer cette requête

            console.log("Payload envoyé à l'API:", apiPayload);

            // Appel à l'API avec Axios
            const response = await axios.post(API_URL, apiPayload, {
                headers: {
                    'Content-Type': 'application/json',
                    // Ajoutez ici les en-têtes d'authentification si nécessaire
                    // 'Authorization': 'Bearer votre_token'
                }
            });

            console.log("Réponse de l'API:", response.data);
            setApiResponse(response.data);

            // Afficher notification de succès
            showNotification("Syndicat créé avec succès! 🎉", "success");

        } catch (err) {
            console.error("Erreur lors de la création du syndicat:", err);

            // Afficher notification d'erreur
            const errorMessage = err.response?.data?.message ||
                err.message ||
                "Une erreur est survenue lors de la création du syndicat";

            showNotification(errorMessage, "error");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-4xl rounded-[2rem] bg-gradient-to-br from-indigo-50 to-pink-50 p-8 shadow-2xl"
        >
            {/* Composant de notification */}
            <Notification
                message={notification.message}
                type={notification.type}
                isVisible={notification.isVisible}
                onClose={closeNotification}
                autoClose={notification.type === "success"} // Auto-fermeture seulement pour les succès
                duration={5000}
            />

            <div className="mb-10 text-center">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">
                    Créer votre syndicat
                </h1>
                <p className="mt-3 text-gray-600">Rassemblez vos collègues en quelques étapes simples</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Section Informations générales */}
                <div className="grid gap-6 md:grid-cols-2">
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="rounded-2xl bg-white p-6 shadow-lg"
                    >
                        <label className="mb-4 flex items-center text-lg font-semibold">
                            <TextCursorInput className="mr-2 text-indigo-500" />
                            Nom complet du syndicat
                        </label>
                        <input
                            name="long_name"
                            value={formData.long_name}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-gray-200 p-3 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                            placeholder="Ex: Syndicat National des Développeurs"
                            required
                        />
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="rounded-2xl bg-white p-6 shadow-lg"
                    >
                        <label className="mb-4 flex items-center text-lg font-semibold">
                            <Type className="mr-2 text-indigo-500" />
                            Nom court / Acronyme
                        </label>
                        <input
                            name="short_name"
                            value={formData.short_name}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-gray-200 p-3 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                            placeholder="Ex: SND"
                            required
                        />
                    </motion.div>
                </div>

                {/* Section Email & Type */}
                <div className="grid gap-6 md:grid-cols-2">
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="rounded-2xl bg-white p-6 shadow-lg"
                    >
                        <label className="mb-4 flex items-center text-lg font-semibold">
                            <AtSign className="mr-2 text-blue-500" />
                            Email de contact
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-gray-200 p-3 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                            placeholder="contact@syndicat.com"
                            required
                        />
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="rounded-2xl bg-white p-6 shadow-lg"
                    >
                        <label className="mb-4 flex items-center text-lg font-semibold">
                            <Building2 className="mr-2 text-blue-500" />
                            Type d'organisation
                        </label>
                        <select
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-gray-200 bg-white p-3 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                            required
                        >
                            {syndicatTypes.map((type) => (
                                <option key={type.value} value={type.value}>
                                    {type.label}
                                </option>
                            ))}
                        </select>
                    </motion.div>
                </div>

                {/* Section Description */}
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="rounded-2xl bg-white p-6 shadow-lg"
                >
                    <label className="mb-4 flex items-center text-lg font-semibold">
                        <Palette className="mr-2 text-pink-500" />
                        Description
                    </label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-gray-200 p-3 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                        rows={3}
                        placeholder="Décrivez les objectifs et la mission de votre syndicat..."
                        required
                    />
                </motion.div>

                {/* Section Domaines d'activité */}
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="rounded-2xl bg-white p-6 shadow-lg"
                >
                    <label className="mb-4 flex items-center text-lg font-semibold">
                        <LayoutGrid className="mr-2 text-green-500" />
                        Domaines d'activité
                    </label>
                    <select
                        name="business_domains"
                        onChange={handleChange}
                        className="w-full rounded-xl border border-gray-200 p-3 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                        required={formData.business_domains.length === 0}
                    >
                        <option value="">Sélectionnez un domaine à ajouter</option>
                        {activityDomains.map((domain) => (
                            <option key={domain.id} value={domain.id}>
                                {domain.name}
                            </option>
                        ))}
                    </select>

                    {/* Affichage des domaines sélectionnés */}
                    {formData.business_domains.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                            {formData.business_domains.map(domainId => {
                                const domain = activityDomains.find(d => d.id === domainId);
                                return domain ? (
                                    <div key={domainId} className="flex items-center rounded-full bg-green-100 px-3 py-1 text-sm text-green-800">
                                        {domain.name}
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveDomain(domainId)}
                                            className="ml-2 text-green-600 hover:text-green-800"
                                        >
                                            ×
                                        </button>
                                    </div>
                                ) : null;
                            })}
                        </div>
                    )}
                </motion.div>

                {/* Section Présence web */}
                <div className="grid gap-6 md:grid-cols-2">
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="rounded-2xl bg-white p-6 shadow-lg"
                    >
                        <label className="mb-4 flex items-center text-lg font-semibold">
                            <Globe className="mr-2 text-indigo-500" />
                            Site web
                        </label>
                        <input
                            type="url"
                            name="web_site_url"
                            value={formData.web_site_url}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-gray-200 p-3 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                            placeholder="https://www.votresyndicat.com"
                        />
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="rounded-2xl bg-white p-6 shadow-lg"
                    >
                        <label className="mb-4 flex items-center text-lg font-semibold">
                            <Share2 className="mr-2 text-purple-500" />
                            Réseaux sociaux
                        </label>
                        <input
                            name="social_network"
                            value={formData.social_network}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-gray-200 p-3 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                            placeholder="@syndicat_officiel"
                        />
                    </motion.div>
                </div>

                {/* Section Informations légales */}
                <div className="grid gap-6 md:grid-cols-2">
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="rounded-2xl bg-white p-6 shadow-lg"
                    >
                        <label className="mb-4 flex items-center text-lg font-semibold">
                            <FileDigit className="mr-2 text-amber-500" />
                            Numéro d'immatriculation
                        </label>
                        <input
                            name="business_registration_number"
                            value={formData.business_registration_number}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-gray-200 p-3 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                            placeholder="Ex: RCS 123456789"
                            required
                        />
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="rounded-2xl bg-white p-6 shadow-lg"
                    >
                        <label className="mb-4 flex items-center text-lg font-semibold">
                            <Receipt className="mr-2 text-orange-500" />
                            Numéro fiscal
                        </label>
                        <input
                            name="tax_number"
                            value={formData.tax_number}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-gray-200 p-3 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                            placeholder="Ex: TVA FR 12345678901"
                            required
                        />
                    </motion.div>
                </div>

                {/* Section Capital & Dates */}
                <div className="grid gap-6 md:grid-cols-3">
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="rounded-2xl bg-white p-6 shadow-lg"
                    >
                        <label className="mb-4 flex items-center text-lg font-semibold">
                            <Coins className="mr-2 text-yellow-500" />
                            Capital social
                        </label>
                        <input
                            type="number"
                            name="capital_share"
                            value={formData.capital_share}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-gray-200 p-3 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                            placeholder="0"
                        />
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="rounded-2xl bg-white p-6 shadow-lg"
                    >
                        <label className="mb-4 flex items-center text-lg font-semibold">
                            <Calendar className="mr-2 text-red-500" />
                            Date d'immatriculation
                        </label>
                        <input
                            type="date"
                            name="registration_date"
                            value={formData.registration_date}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-gray-200 p-3 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                            required
                        />
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="rounded-2xl bg-white p-6 shadow-lg"
                    >
                        <label className="mb-4 flex items-center text-lg font-semibold">
                            <Briefcase className="mr-2 text-indigo-500" />
                            Année de fondation
                        </label>
                        <input
                            type="date"
                            name="year_founded"
                            value={formData.year_founded}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-gray-200 p-3 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                            required
                        />
                    </motion.div>
                </div>

                {/* Section Direction */}
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="rounded-2xl bg-white p-6 shadow-lg"
                >
                    <label className="mb-4 flex items-center text-lg font-semibold">
                        <UserRound className="mr-2 text-blue-500" />
                        Nom du dirigeant
                    </label>
                    <input
                        name="ceo_name"
                        value={formData.ceo_name}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-gray-200 p-3 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                        placeholder="Prénom et Nom"
                        required
                    />
                </motion.div>

                {/* Upload Logo */}
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="rounded-2xl bg-white p-6 shadow-lg"
                >
                    <FileUploader
                        label="Logo du syndicat"
                        icon={<ImageIcon className="text-purple-500" />}
                        accept="image/*"
                        onFileSelect={(file) => setFormData({ ...formData, logo_url: file })}
                        bgColor="bg-purple-50"
                        borderColor="border-purple-200"
                        preview
                    />
                    <p className="mt-2 text-sm text-gray-500">Recommandé : format carré, 512x512 pixels minimum, JPG ou PNG</p>
                </motion.div>

                {/* Informations de réponse API */}
                {apiResponse && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="rounded-2xl bg-blue-50 p-6 shadow-lg"
                    >
                        <h3 className="mb-2 text-lg font-semibold text-blue-800">Information du syndicat créé</h3>
                        <div className="mt-2 overflow-x-auto rounded-xl bg-white p-4 text-sm">
                            <p><strong>ID Organisation:</strong> {apiResponse.organization_id}</p>
                            <p><strong>Nom:</strong> {apiResponse.long_name}</p>
                            <p><strong>Acronyme:</strong> {apiResponse.short_name}</p>
                            <p><strong>Statut:</strong> {apiResponse.status}</p>
                            <p><strong>Type:</strong> {apiResponse.type}</p>
                        </div>
                    </motion.div>
                )}

                {/* Bouton de soumission */}
                <motion.button
                    whileHover={{ scale: isLoading ? 1 : 1.05 }}
                    whileTap={{ scale: isLoading ? 1 : 0.95 }}
                    type="submit"
                    disabled={isLoading}
                    className={`w-full rounded-xl ${
                        isLoading ? 'bg-gray-400' : 'bg-gradient-to-r from-indigo-500 to-pink-500 hover:shadow-xl'
                    } p-4 font-bold text-white shadow-lg transition-all`}
                >
                    {isLoading ? (
                        <><Loader2 className="mr-2 inline-block animate-spin" /> Création en cours...</>
                    ) : (
                        <><Rocket className="mr-2 inline-block" /> Lancer mon syndicat <span className="ml-2 text-lg">🚀</span></>
                    )}
                </motion.button>
            </form>
        </motion.div>
    );
};