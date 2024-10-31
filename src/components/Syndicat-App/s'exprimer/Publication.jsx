import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    User, ThumbsUp, MessageCircle, Image as ImageIcon,
    Smile, Send, X, Plus, Calendar, Clock, Flag,
    AlertTriangle, Award, Bookmark, Eye, Heart,
    Paperclip, Video, Mic, MapPin
} from 'lucide-react'



// Custom Button component
const Button = ({ children, onClick, className = "", variant = "default" }) => {
    const baseStyle = "px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2"
    const variantStyles = {
        default: "bg-blue-500 text-white hover:bg-blue-600",
        outline: "border border-gray-300 text-gray-700 hover:bg-gray-50",
        ghost: "text-gray-600 hover:bg-gray-100",
    }
    return (
        <button
            onClick={onClick}
            className={`${baseStyle} ${variantStyles[variant]} ${className}`}
        >
            {children}
        </button>
    )
}

// Custom Input component
const Input = ({ value, onChange, placeholder, className = "" }) => (
    <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-3 py-2 border rounded-md ${className}`}
    />
)

// Custom TextArea component
const TextArea = ({ value, onChange, placeholder, className = "" }) => (
    <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-3 py-2 border rounded-md resize-none ${className}`}
    />
)

// Post component
const Post = ({ post }) => {
    const [liked, setLiked] = useState(false)
    const [showComments, setShowComments] = useState(false)
    const [bookmarked, setBookmarked] = useState(false)

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-lg shadow-md p-4 mb-4"
        >
            <div className="flex items-center mb-4">
                <img src={post.author.avatar} alt={post.author.name} className="w-10 h-10 rounded-full mr-3" />
                <div className="flex-grow">
                    <h3 className="font-semibold text-gray-800">{post.author.name}</h3>
                    <div className="flex items-center text-sm text-gray-500">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>{post.timestamp}</span>
                    </div>
                </div>
                <Button
                    variant="ghost"
                    onClick={() => setBookmarked(!bookmarked)}
                    className={`${bookmarked ? 'text-blue-500' : 'text-gray-400'}`}
                >
                    <Bookmark className="w-5 h-5" />
                </Button>
            </div>
            <p className="text-gray-700 mb-4">{post.content}</p>
            {post.image && (
                <img src={post.image} alt="Post image" className="w-full rounded-md mb-4" />
            )}
            <div className="flex items-center justify-between text-gray-500 text-sm mb-2">
                <div className="flex items-center space-x-2">
                    <Heart className="w-4 h-4 text-red-500" />
                    <Eye className="w-4 h-4 text-blue-500" />
                    <span>{post.likes + (liked ? 1 : 0)} réactions</span>
                </div>
                <span>{post.comments.length} commentaires</span>
            </div>
            <div className="flex items-center justify-between text-gray-500 text-sm border-t border-b py-2 mb-2">
                <Button
                    variant="ghost"
                    onClick={() => setLiked(!liked)}
                    className={`flex items-center ${liked ? 'text-blue-500' : ''}`}
                >
                    <ThumbsUp className="w-5 h-5 mr-1" />
                    J'aime
                </Button>
                <Button
                    variant="ghost"
                    onClick={() => setShowComments(!showComments)}
                    className="flex items-center"
                >
                    <MessageCircle className="w-5 h-5 mr-1" />
                    Commenter
                </Button>
                <Button variant="ghost" className="flex items-center">
                    <Flag className="w-5 h-5 mr-1" />
                    Signaler
                </Button>
            </div>
            {showComments && (
                <div className="mt-4 space-y-2">
                    {post.comments.map((comment, index) => (
                        <div key={index} className="flex items-start space-x-2">
                            <img src={comment.author.avatar} alt={comment.author.name} className="w-8 h-8 rounded-full" />
                            <div className="bg-gray-100 rounded-lg p-2 flex-grow">
                                <p className="font-semibold text-sm">{comment.author.name}</p>
                                <p className="text-sm">{comment.content}</p>
                            </div>
                        </div>
                    ))}
                    <div className="flex items-center mt-2">
                        <Input
                            placeholder="Ajouter un commentaire..."
                            className="flex-grow mr-2"
                        />
                        <Button>
                            <Send className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            )}
        </motion.div>
    )
}

// Main component
export const Publications  = () => {
    const [posts, setPosts] = useState([
        {
            id: 1,
            author: { name: "Jean Dupont", avatar: "/placeholder.svg?height=40&width=40" },
            content: "Aujourd'hui, nous avons eu une réunion productive sur les nouvelles mesures de sécurité. Qu'en pensez-vous ?",
            image: `blob?height=300&width=500`,
            timestamp: "Il y a 2 heures",
            likes: 15,
            comments: [
                { author: { name: "Marie Martin", avatar: "/placeholder.svg?height=32&width=32" }, content: "Excellente initiative ! J'ai hâte de voir les résultats." },
                { author: { name: "Luc Dubois", avatar: "/placeholder.svg?height=32&width=32" }, content: "Pouvons-nous avoir plus de détails sur ces mesures ?" }
            ]
        },
        {
            id: 2,
            author: { name: "Sophie Lefebvre", avatar: "/placeholder.svg?height=40&width=40" },
            content: "Rappel : la formation sur les nouveaux outils de communication aura lieu demain à 14h. N'oubliez pas de vous inscrire !",
            timestamp: "Il y a 5 heures",
            likes: 8,
            comments: []
        }
    ])

    const [showNewPostModal, setShowNewPostModal] = useState(false)
    const [newPostContent, setNewPostContent] = useState('')

    const handleNewPost = () => {
        if (newPostContent.trim()) {
            const newPost = {
                id: posts.length + 1,
                author: { name: "Vous", avatar: "/placeholder.svg?height=40&width=40" },
                content: newPostContent,
                timestamp: "À l'instant",
                likes: 0,
                comments: []
            }
            setPosts([newPost, ...posts])
            setNewPostContent('')
            setShowNewPostModal(false)
        }
    }

    return (
        <div className="container mx-auto p-4 relative min-h-screen bg-gray-100">
            <h1 className="text-3xl font-bold text-blue-600 mb-6 flex items-center">
                <MessageCircle className="w-8 h-8 mr-2" />
                S'exprimer
            </h1>

            {posts.map(post => (
                <Post key={post.id} post={post} />
            ))}

            <motion.button
                className="fixed bottom-6 right-6 bg-blue-500 text-white rounded-full p-4 shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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
                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="bg-white rounded-lg p-6 w-full max-w-md"
                        >
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-2xl font-bold">Nouvelle publication</h2>
                                <Button variant="ghost" onClick={() => setShowNewPostModal(false)}>
                                    <X className="w-6 h-6" />
                                </Button>
                            </div>
                            <TextArea
                                value={newPostContent}
                                onChange={(e) => setNewPostContent(e.target.value)}
                                placeholder="Que voulez-vous partager ?"
                                className="mb-4 h-32"
                            />
                            <div className="flex justify-between items-center mb-4">
                                <div className="flex space-x-2">
                                    <Button variant="ghost">
                                        <ImageIcon className="w-5 h-5 text-green-500" />
                                    </Button>
                                    <Button variant="ghost">
                                        <Video className="w-5 h-5 text-red-500" />
                                    </Button>
                                    <Button variant="ghost">
                                        <Paperclip className="w-5 h-5 text-orange-500" />
                                    </Button>
                                    <Button variant="ghost">
                                        <MapPin className="w-5 h-5 text-blue-500" />
                                    </Button>
                                </div>
                                <Button onClick={handleNewPost}>
                                    <Send className="w-5 h-5 mr-2" />
                                    Publier
                                </Button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}