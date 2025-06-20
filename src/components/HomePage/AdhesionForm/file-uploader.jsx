"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, CheckCircle, AlertCircle, X, FileImage, Eye } from "lucide-react";

export const FileUploader = ({
                                 label,
                                 icon,
                                 accept = "image/*",
                                 onFileSelect,
                                 bgColor = "bg-gray-50",
                                 borderColor = "border-gray-200",
                                 maxSize = 5 * 1024 * 1024, // 5MB par défaut
                                 required = false,
                                 preview = true
                             }) => {
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [showPreview, setShowPreview] = useState(false);
    const fileInputRef = useRef(null);

    // Validation du fichier
    const validateFile = (selectedFile) => {
        if (!selectedFile) return { isValid: false, error: "Aucun fichier sélectionné" };

        // Vérification de la taille
        if (selectedFile.size > maxSize) {
            const maxSizeMB = (maxSize / (1024 * 1024)).toFixed(1);
            return {
                isValid: false,
                error: `Le fichier est trop volumineux. Taille maximale : ${maxSizeMB} Mo.`
            };
        }

        // Vérification du type de fichier
        if (accept && !selectedFile.type.match(accept.replace('*', '.*'))) {
            return {
                isValid: false,
                error: `Format de fichier non supporté. Formats acceptés : ${accept}`
            };
        }

        // Vérification pour les images
        if (accept.includes('image/')) {
            const validImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
            if (!validImageTypes.includes(selectedFile.type)) {
                return {
                    isValid: false,
                    error: "Format d'image non supporté. Utilisez JPG, PNG, GIF ou WebP."
                };
            }
        }

        return { isValid: true, error: null };
    };

    // Gestion de la sélection de fichier
    const handleFileChange = (e) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            processFile(selectedFile);
        }
    };

    // Traitement du fichier
    const processFile = (selectedFile) => {
        const validation = validateFile(selectedFile);

        if (!validation.isValid) {
            setError(validation.error);
            setFile(null);
            setPreviewUrl(null);
            onFileSelect(null);
            return;
        }

        setFile(selectedFile);
        setError(null);
        onFileSelect(selectedFile);

        // Créer l'aperçu pour les images
        if (preview && selectedFile.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setPreviewUrl(e.target.result);
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    // Gestion du drag & drop
    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile) {
            processFile(droppedFile);
        }
    };

    // Supprimer le fichier
    const removeFile = () => {
        setFile(null);
        setPreviewUrl(null);
        setError(null);
        setShowPreview(false);
        onFileSelect(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    // Formater la taille du fichier
    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
        <div className="space-y-3">
            {/* Label */}
            <label className="block text-sm font-medium text-gray-700 flex items-center">
                {icon}
                <span className="ml-2">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </span>
            </label>

            {/* Zone de drop */}
            <motion.div
                className={`relative cursor-pointer rounded-xl border-2 border-dashed transition-all duration-300 ${
                    isDragging
                        ? 'border-blue-400 bg-blue-50 scale-105'
                        : file
                            ? 'border-green-400 bg-green-50'
                            : error
                                ? 'border-red-400 bg-red-50'
                                : `${borderColor} ${bgColor} hover:border-blue-300 hover:bg-blue-50`
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => !file && fileInputRef.current?.click()}
                whileHover={{ scale: file ? 1 : 1.02 }}
                whileTap={{ scale: file ? 1 : 0.98 }}
            >
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept={accept}
                    className="hidden"
                />

                {file ? (
                    /* Affichage du fichier sélectionné */
                    <div className="p-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                    {previewUrl ? (
                                        <img
                                            src={previewUrl}
                                            alt="Preview"
                                            className="w-full h-full object-cover rounded-lg"
                                        />
                                    ) : (
                                        <FileImage className="w-6 h-6 text-green-600" />
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate">
                                        {file.name}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {formatFileSize(file.size)}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-2">
                                {/* Bouton aperçu */}
                                {previewUrl && (
                                    <motion.button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setShowPreview(true);
                                        }}
                                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        <Eye className="w-4 h-4" />
                                    </motion.button>
                                )}

                                {/* Bouton supprimer */}
                                <motion.button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removeFile();
                                    }}
                                    className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <X className="w-4 h-4" />
                                </motion.button>
                            </div>
                        </div>

                        {/* Indicateur de succès */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-3 flex items-center text-green-600"
                        >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            <span className="text-xs">Fichier téléchargé avec succès</span>
                        </motion.div>
                    </div>
                ) : (
                    /* Zone de drop vide */
                    <div className="p-8 text-center">
                        <motion.div
                            animate={{
                                y: isDragging ? -5 : 0,
                                scale: isDragging ? 1.1 : 1
                            }}
                            transition={{ duration: 0.2 }}
                        >
                            <Upload className="mx-auto mb-4 text-gray-400" size={48} />
                        </motion.div>

                        <div className="space-y-2">
                            <p className="text-gray-600 font-medium">
                                {isDragging ?
                                    "Relâchez pour télécharger" :
                                    "Glissez votre fichier ici ou cliquez pour sélectionner"
                                }
                            </p>
                            <p className="text-xs text-gray-500">
                                Formats acceptés: {accept} • Taille max: {(maxSize / (1024 * 1024)).toFixed(1)} Mo
                            </p>
                        </div>
                    </div>
                )}
            </motion.div>

            {/* Message d'erreur */}
            <AnimatePresence>
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: "auto" }}
                        exit={{ opacity: 0, y: -10, height: 0 }}
                        className="flex items-start p-3 bg-red-50 border border-red-200 rounded-lg"
                    >
                        <AlertCircle className="w-4 h-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-red-700">{error}</span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Modal d'aperçu */}
            <AnimatePresence>
                {showPreview && previewUrl && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => setShowPreview(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            className="relative max-w-4xl max-h-[90vh] bg-white rounded-xl overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between p-4 border-b border-gray-200">
                                <div>
                                    <h3 className="font-medium text-gray-900">{file.name}</h3>
                                    <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
                                </div>
                                <button
                                    onClick={() => setShowPreview(false)}
                                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    <X className="w-5 h-5 text-gray-500" />
                                </button>
                            </div>

                            {/* Image */}
                            <div className="p-4">
                                <img
                                    src={previewUrl}
                                    alt="Aperçu"
                                    className="max-w-full max-h-[70vh] mx-auto rounded-lg shadow-lg"
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};