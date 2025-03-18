import {useEffect, useRef, useState} from "react";
import {motion} from "framer-motion";
import {Camera, Video, X} from "lucide-react";



const Button = ({ children, onClick, className = "", variant = "default" }) => {
    const baseStyle = "px-4 py-2 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200";
    const variantStyles = {
        default: "bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700 shadow-lg hover:shadow-xl",
        outline: "border-2 border-gray-200 text-gray-700 hover:border-blue-500 hover:text-blue-500",
        ghost: "text-gray-600 hover:bg-gray-100",
        danger: "bg-gradient-to-r from-red-500 to-pink-600 text-white hover:from-red-600 hover:to-pink-700 shadow-lg hover:shadow-xl"
    };
    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            className={`${baseStyle} ${variantStyles[variant]} ${className}`}
        >
            {children}
        </motion.button>
    );
};


export const VideoPreview = ({ onClose }) => {
    const videoRef = useRef(null);
    const [stream, setStream] = useState(null);

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                setStream(stream);
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            })
            .catch(err => console.error("Erreur d'accès à la caméra:", err));

        return () => {
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm flex items-center justify-center z-50"
        >
            <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-white rounded-2xl p-8 max-w-2xl w-full mx-4 shadow-2xl"
            >
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-800">Caméra</h3>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                    >
                        <X className="w-6 h-6 text-gray-600" />
                    </motion.button>
                </div>
                <div className="relative rounded-xl overflow-hidden shadow-lg">
                    <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        className="w-full rounded-xl"
                    />
                    <div className="absolute bottom-4 right-4 flex space-x-4">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-colors duration-200"
                        >
                            <Camera className="w-6 h-6 text-blue-500" />
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-colors duration-200"
                        >
                            <Video className="w-6 h-6 text-red-500" />
                        </motion.button>
                    </div> </div>
                <div className="mt-6 flex justify-end space-x-4">
                    <Button variant="outline" onClick={onClose}>
                        Annuler
                    </Button>
                    <Button>
                        Capturer
                    </Button>
                </div>
            </motion.div>
        </motion.div>
    );
};