import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Upload, CheckCircle, AlertCircle } from "lucide-react";

export const FileUploader = ({
                                 label,
                                 icon,
                                 accept,
                                 onFileSelect,
                                 bgColor,
                                 borderColor,
                             }) => {
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            if (selectedFile.size > 5 * 1024 * 1024) {
                setError("Le fichier est trop volumineux. Taille maximale : 5 Mo.");
                setFile(null);
                onFileSelect(null);
            } else {
                setFile(selectedFile);
                setError(null);
                onFileSelect(selectedFile);
            }
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile && droppedFile.type.startsWith("image/")) {
            handleFileChange({ target: { files: e.dataTransfer.files } });
        } else {
            setError("Veuillez déposer une image valide.");
        }
    };

    return (
        <div>
            <label className="mb-2 block text-lg font-semibold text-gray-700">
                {icon}
                <span className="ml-2">{label}</span>
            </label>
            <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`${bgColor} ${borderColor} cursor-pointer rounded-lg border-2 border-dashed p-8 text-center transition duration-300 ease-in-out`}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
            >
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept={accept}
                    className="hidden"
                />
                {file ? (
                    <div className="flex items-center justify-center">
                        <CheckCircle className="mr-2 text-green-500" />
                        <span className="font-semibold text-green-600">{file.name}</span>
                    </div>
                ) : (
                    <div>
                        <Upload className="mx-auto mb-4 text-gray-400" size={48} />
                        <p className="text-gray-500">
                           Glissez et déposez votre fichier ici ou cliquez pour sélectionner un fichier.
                        </p>
                    </div>
                )}
            </motion.div>
            {error && (
                <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 flex items-center text-red-500"
                >
                    <AlertCircle className="mr-2" size={16} />
                    {error}
                </motion.p>
            )}
        </div>
    );
};