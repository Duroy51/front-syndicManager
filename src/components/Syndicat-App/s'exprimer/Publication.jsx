import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Image as ImageIcon,
    Send, X, Plus, Paperclip, MapPin, Camera
} from 'lucide-react';
import profile from '../../../images/bproo.png';
import { VideoPreview } from './PublicationComponents/VideoPreview.jsx';
import { Post } from './PublicationComponents/Post.jsx';
import { useTranslation } from 'react-i18next';
// === SERVICES ===
import { createReview, getReviews } from '../../../services/ReviewService';
import { uploadMedia } from '../../../services/MediaService';



import PropTypes from 'prop-types'; // Validation des props en français

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



const TextArea = ({ value, onChange, placeholder, className = "" }) => (
    <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200 resize-none ${className}`}
    />
);




export const Publications = (props) => {
    const{t}=useTranslation()
    const [posts, setPosts] = useState([
        {
            id: 1,
            author: { 
                name: "Jean Dupont", 
                avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop"
            },
            content: "Aujourd'hui, nous avons eu une réunion productive sur les nouvelles mesures de sécurité. Qu'en pensez-vous ?",
            image: profile,
            timestamp: "Il y a 2 heures",
            createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
            likes: 15,
            comments: [
                { 
                    author: { 
                        name: "Marie Martin", 
                        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop"
                    }, 
                    content: "Excellente initiative ! J'ai hâte de voir les résultats." 
                },
                { 
                    author: { 
                        name: "Luc Dubois", 
                        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop"
                    }, 
                    content: "Pouvons-nous avoir plus de détails sur ces mesures ?" 
                }
            ]
        },
        {
            id: 2,
            author: { 
                name: "Sophie Lefebvre", 
                avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop"
            },
            content: "Rappel : la formation sur les nouveaux outils de communication aura lieu demain à 14h. N'oubliez pas de vous inscrire !",
            timestamp: "Il y a 5 heures",
            image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&h=800&fit=crop",
            likes: 8,
            comments: []
        }
    ]);

    const [showNewPostModal, setShowNewPostModal] = useState(false);
    const [showCamera, setShowCamera] = useState(false);
    const [newPostContent, setNewPostContent] = useState('');
    const [newPostImage, setNewPostImage] = useState(null);
    const fileInputRef = useRef(null);

    const handleNewPost = async () => {
        if (!newPostContent.trim() && !newPostImage) return;
        try {
            if (newPostImage) {
                const formData = new FormData();
                formData.append('file', newPostImage);
                await uploadMedia(formData); // Suppression de mediaUrl non utilisé
            }
            // Récupération de l'utilisateur connecté
            const user = JSON.parse(localStorage.getItem('user'));
            // Récupération dynamique de l'identifiant du syndicat cible (exemple via une prop ou un contexte)
            const targe_id = props?.syndicatId || null; // À adapter selon votre logique métier
            const reviewData = {
                user_id: user?.id, // ID utilisateur connecté
                targe_id, // ID du syndicat cible (ou autre cible selon le contexte)
                rating: 0, // Note par défaut, à adapter si besoin
                comment: newPostContent
                // mediaUrl peut être ajouté ici si l'API le permet
            };
            // Création de l'avis via l'API
            await createReview(reviewData);
            // Rafraîchissement des publications depuis l'API
            const res = await getReviews();
            setPosts(res.data);
            handleCancelPost();
        } catch (error) {
            console.error(error);
            alert('Erreur lors de la publication');
        }
    };

    const handleCancelPost = () => {
        setNewPostContent('');
        setNewPostImage(null);
        setShowNewPostModal(false);
        setShowCamera(false);
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setNewPostImage(file);
        }
    };

    const handleUpdatePost = (updatedPost) => {
        setPosts(posts.map(post => 
            post.id === updatedPost.id ? updatedPost : post
        ));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
            <div className="max-w-4xl mx-auto">
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
                        {t("s_exprimer")}
                    </h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        {t("partagez_vos_idees_vos_experiences_et_vos_reflexions_avec_la_communaute")}
                    </p>
                </motion.div>

                {posts.map(post => (
                    <Post 
                        key={post.id} 
                        post={post}
                        onUpdatePost={handleUpdatePost}
                    />
                ))}

                <motion.button
                    className="fixed bottom-8 right-8 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full p-4 shadow-lg hover:shadow-xl transform transition-all duration-200"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowNewPostModal(true)}
                >
                    <Plus className="w-6 h-6" />
                </motion.button>

                <AnimatePresence>
                    {showNewPostModal && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
                        >
                            <motion.div
                                initial={{ scale: 0.9, y: 20 }}
                                animate={{ scale: 1, y: 0 }}
                                exit={{ scale: 0.9, y: 20 }}
                                className="bg-white rounded-2xl p-8 w-full max-w-xl shadow-2xl"
                            >
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-2xl font-bold text-gray-800">{t("nouvelle_publication")}</h2>
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={handleCancelPost}
                                        className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                                    >
                                        <X className="w-6 h-6 text-gray-600" />
                                    </motion.button>
                                </div>

                                {newPostImage && (
                                    <motion.div 
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="mb-6 relative rounded-xl overflow-hidden shadow-lg"
                                    >
                                        <img 
                                            src={newPostImage} 
                                            alt="Preview" 
                                            className="w-full h-64 object-cover"
                                        />
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => setNewPostImage(null)}
                                            className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full backdrop-blur-sm hover:bg-black/70 transition-colors duration-200"
                                        >
                                            <X className="w-5 h-5" />
                                        </motion.button>
                                    </motion.div>
                                )}

                                <TextArea
                                    value={newPostContent}
                                    onChange={(e) => setNewPostContent(e.target.value)}
                                    placeholder={t("que_voulez_vous_partager?")} 
                                    className="mb-6 h-32"
                                />

                                <div className="flex justify-between items-center">
                                    <div className="flex space-x-2">
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            className="p-3 hover:bg-gray-100 rounded-xl transition-colors duration-200"
                                            onClick={() => fileInputRef.current?.click()}
                                        >
                                            <ImageIcon className="w-6 h-6 text-green-500" />
                                        </motion.button>
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            className="hidden"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                        />
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            className="p-3 hover:bg-gray-100 rounded-xl transition-colors duration-200"
                                            onClick={() => setShowCamera(true)}
                                        >
                                            <Camera className="w-6 h-6 text-red-500" />
                                        </motion.button>
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            className="p-3 hover:bg-gray-100 rounded-xl transition-colors duration-200"
                                        >
                                            <MapPin className="w-6 h-6 text-blue-500" />
                                        </motion.button>
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            className="p-3 hover:bg-gray-100 rounded-xl transition-colors duration-200"
                                        >
                                            <Paperclip className="w-6 h-6 text-orange-500" />
                                        </motion.button>
                                    </div>
                                    <div className="flex space-x-4">
                                        <Button variant="outline" onClick={handleCancelPost}>
                                            {t("annuler")}
                                        </Button>
                                        <Button onClick={handleNewPost}>
                                            <Send className="w-5 h-5 mr-2" />
                                            {t("publier")}
                                        </Button>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}

                    {showCamera && (
                        <VideoPreview onClose={() => setShowCamera(false)} />
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};