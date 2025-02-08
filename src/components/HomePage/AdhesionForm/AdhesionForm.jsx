"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FileUploader } from "./file-uploader";
import { PenLine, Camera, CreditCard, Send, ArrowRight } from "lucide-react";

export const AdhereSyndicatForm = ({ syndicat }) => {
    const [motivation, setMotivation] = useState("");
    const [photoIdentite, setPhotoIdentite] = useState(null);
    const [pieceIdentiteFace, setPieceIdentiteFace] = useState(null);
    const [pieceIdentiteDos, setPieceIdentiteDos] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logique de soumission du formulaire
        console.log("Formulaire soumis", {
            motivation,
            photoIdentite,
            pieceIdentiteFace,
            pieceIdentiteDos,
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-4xl rounded-3xl bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6 shadow-xl"
        >
            <h2 className="mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-center text-3xl font-bold text-transparent">
                Rejoignez {syndicat.name}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-8">
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="rounded-2xl bg-white p-6 shadow-md"
                >
                    <label
                        htmlFor="motivation"
                        className="mb-2 block text-lg font-semibold text-gray-700"
                    >
                        <PenLine className="mr-2 inline-block text-blue-500" />
                        Votre motivation
                    </label>
                    <textarea
                        id="motivation"
                        value={motivation}
                        onChange={(e) => setMotivation(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 p-3 transition duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                        rows={4}
                        placeholder="Expliquez-nous pourquoi vous souhaitez rejoindre notre syndicat..."
                        required
                    />
                </motion.div>

                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="rounded-2xl bg-white p-6 shadow-md"
                >
                    <FileUploader
                        label="Photo d'identité"
                        icon={<Camera className="text-green-500" />}
                        accept="image/*"
                        onFileSelect={setPhotoIdentite}
                        bgColor="bg-green-50"
                        borderColor="border-green-200"
                    />
                </motion.div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="rounded-2xl bg-white p-6 shadow-md"
                    >
                        <FileUploader
                            label="Pièce d'identité (Face)"
                            icon={<CreditCard className="text-orange-500" />}
                            accept="image/*"
                            onFileSelect={setPieceIdentiteFace}
                            bgColor="bg-orange-50"
                            borderColor="border-orange-200"
                        />
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="rounded-2xl bg-white p-6 shadow-md"
                    >
                        <FileUploader
                            label="Pièce d'identité (Dos)"
                            icon={<CreditCard className="text-purple-500" />}
                            accept="image/*"
                            onFileSelect={setPieceIdentiteDos}
                            bgColor="bg-purple-50"
                            borderColor="border-purple-200"
                        />
                    </motion.div>
                </div>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="w-full rounded-full bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-4 font-bold text-white shadow-lg transition duration-300 hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
                >
                    <Send className="mr-2 inline-block" />
                    Envoyer ma demande d'adhésion
                    <ArrowRight className="ml-2 inline-block" />
                </motion.button>
            </form>
        </motion.div>
    );
};