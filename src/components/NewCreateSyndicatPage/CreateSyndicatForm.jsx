"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FileUploader } from "./file-uploader";
import { Palette, TextCursorInput, Building2, LayoutGrid, ImageIcon, Rocket } from "lucide-react";

export const CreateSyndicatForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        type: "professionnel",
        domain: "",
        coverImage: null
    });

    const syndicatTypes = [
        { value: "professionnel", label: "Professionnel" },
        { value: "sectoriel", label: "Sectoriel" },
        { value: "entreprise", label: "Entreprise" },
        { value: "regional", label: "Régional" },
    ];

    const activityDomains = [
        "Technologie",
        "Santé",
        "Éducation",
        "Construction",
        "Transport",
        "Agriculture",
        "Artisanat"
    ];

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Syndicat créé", formData);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-4xl rounded-[2rem] bg-gradient-to-br from-indigo-50 to-pink-50 p-8 shadow-2xl"
        >
            <div className="mb-10 text-center">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">
                    Créer votre syndicat
                </h1>
                <p className="mt-3 text-gray-600">Rassemblez vos collègues en quelques étapes simples</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Section Nom & Description */}
                <div className="grid gap-6 md:grid-cols-2">
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="rounded-2xl bg-white p-6 shadow-lg"
                    >
                        <label className="mb-4 flex items-center text-lg font-semibold">
                            <TextCursorInput className="mr-2 text-indigo-500" />
                            Nom du syndicat
                        </label>
                        <input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-gray-200 p-3 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                            placeholder="Ex: Syndicat des Développeurs"
                            required
                        />
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="rounded-2xl bg-white p-6 shadow-lg"
                    >
                        <label className="mb-4 flex items-center text-lg font-semibold">
                            <Palette className="mr-2 text-pink-500" />
                            Description courte
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-gray-200 p-3 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                            rows={3}
                            placeholder="Décrivez les objectifs de votre syndicat..."
                            required
                        />
                    </motion.div>
                </div>

                {/* Section Type & Domaine */}
                <div className="grid gap-6 md:grid-cols-2">
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="rounded-2xl bg-white p-6 shadow-lg"
                    >
                        <label className="mb-4 flex items-center text-lg font-semibold">
                            <Building2 className="mr-2 text-blue-500" />
                            Type de syndicat
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

                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="rounded-2xl bg-white p-6 shadow-lg"
                    >
                        <label className="mb-4 flex items-center text-lg font-semibold">
                            <LayoutGrid className="mr-2 text-green-500" />
                            Domaine d'activité
                        </label>
                        <input
                            list="domains"
                            name="domain"
                            value={formData.domain}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-gray-200 p-3 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                            placeholder="Sélectionnez ou saisissez un domaine"
                            required
                        />
                        <datalist id="domains">
                            {activityDomains.map((domain) => (
                                <option key={domain} value={domain} />
                            ))}
                        </datalist>
                    </motion.div>
                </div>

                {/* Upload Image de couverture */}
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="rounded-2xl bg-white p-6 shadow-lg"
                >
                    <FileUploader
                        label="Image de couverture"
                        icon={<ImageIcon className="text-purple-500" />}
                        accept="image/*"
                        onFileSelect={(file) => setFormData({ ...formData, coverImage: file })}
                        bgColor="bg-purple-50"
                        borderColor="border-purple-200"
                        preview
                    />
                    <p className="mt-2 text-sm text-gray-500">Recommandé : 1200x400 pixels, format JPG ou PNG</p>
                </motion.div>

                {/* Bouton de soumission */}
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="w-full rounded-xl bg-gradient-to-r from-indigo-500 to-pink-500 p-4 font-bold text-white shadow-lg transition-all hover:shadow-xl"
                >
                    <Rocket className="mr-2 inline-block" />
                    Lancer mon syndicat
                    <span className="ml-2 text-lg">🚀</span>
                </motion.button>
            </form>
        </motion.div>
    );
};