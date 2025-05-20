import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, X } from "lucide-react";

export const Notification = ({
                                 message,
                                 type = "success",
                                 isVisible,
                                 onClose,
                                 autoClose = true,
                                 duration = 5000
                             }) => {
    // État local pour gérer la fermeture automatique
    const [shouldClose, setShouldClose] = useState(false);

    // Gestion de la fermeture automatique
    useEffect(() => {
        let timer;
        if (isVisible && autoClose) {
            timer = setTimeout(() => {
                setShouldClose(true);
                setTimeout(() => {
                    onClose();
                    setShouldClose(false);
                }, 300); // Délai pour l'animation de sortie
            }, duration);
        }

        return () => {
            clearTimeout(timer);
        };
    }, [isVisible, autoClose, duration, onClose]);

    // Styles conditionnels basés sur le type
    const styles = {
        success: {
            bg: "bg-green-50",
            border: "border-green-200",
            text: "text-green-700",
            icon: <CheckCircle className="w-5 h-5" />
        },
        error: {
            bg: "bg-red-50",
            border: "border-red-200",
            text: "text-red-700",
            icon: <XCircle className="w-5 h-5" />
        },
        warning: {
            bg: "bg-yellow-50",
            border: "border-yellow-200",
            text: "text-yellow-700",
            icon: <XCircle className="w-5 h-5" />
        },
        info: {
            bg: "bg-blue-50",
            border: "border-blue-200",
            text: "text-blue-700",
            icon: <CheckCircle className="w-5 h-5" />
        }
    };

    const currentStyle = styles[type] || styles.info;

    return (
        <AnimatePresence>
            {isVisible && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/25">
                    <motion.div
                        initial={{ opacity: 0, y: -50, scale: 0.9 }}
                        animate={{
                            opacity: shouldClose ? 0 : 1,
                            y: shouldClose ? -50 : 0,
                            scale: shouldClose ? 0.9 : 1
                        }}
                        exit={{ opacity: 0, y: -50, scale: 0.9 }}
                        transition={{ type: "spring", damping: 15 }}
                        className={`max-w-md rounded-xl ${currentStyle.bg} ${currentStyle.text} p-4 shadow-xl border ${currentStyle.border} relative`}
                    >
                        <div className="flex items-start">
                            <div className="flex-shrink-0 mr-3">
                                {currentStyle.icon}
                            </div>
                            <div className="flex-1">
                                <p className="font-medium">{message}</p>
                            </div>
                            <button
                                onClick={() => onClose()}
                                className={`ml-4 ${currentStyle.text} hover:opacity-75`}
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};