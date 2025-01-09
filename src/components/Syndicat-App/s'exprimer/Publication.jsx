import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    User, ThumbsUp, MessageCircle, Image as ImageIcon,
    Smile, Send, X, Plus, Calendar, Clock, Flag,
    AlertTriangle, Award, Bookmark, Eye, Heart,
    Paperclip, Video, Mic, MapPin, Camera
} from 'lucide-react'
import timeAgo from '../../../utils/timeAgo'
import profile from '../../../images/bproo.png'
import axios from "axios";

// ... (CommentModal Component reste le même)
// CommentModal Component
const CommentModal = ({ post, isOpen, onClose, onAddComment }) => {
    const [newComment, setNewComment] = useState('')
    const [commentImage, setCommentImage] = useState(null)
    const [likedComments, setLikedComments] = useState({});
    const [replyToComment, setReplyToComment] = useState(null)

    const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);
    const fileInputRef = useRef(null)

       // Nouvelle structure pour gérer les états des commentaires
       const [comments, setComments] = useState(post.comments.map(comment => ({
        ...comment,
        liked: false,
        likes: 0,
        replies: [],
        showReplies: false
    })))
    
    const handleSubmitComment = () => {
        if (newComment.trim() || commentImage) {
            const newCommentObj = {
                id: Date.now(), // Identifiant unique
                author: { name: "Vous", avatar: "/placeholder.svg?height=32&width=32" },
                content: newComment,
                image: commentImage,
                timestamp: "À l'instant",
                liked: false,
                likes: 0,
                replies: [],
                showReplies: false
            } 
            if (replyToComment) {
                // Ajouter une réponse à un commentaire existant
                const updatedComments = comments.map(comment => {
                    if (comment.id === replyToComment.id) {
                        return {
                            ...comment,
                            replies: [...comment.replies, {
                                ...newCommentObj,
                                isReply: true
                            }]
                        }
                    }
                    return comment
                })
                setComments(updatedComments)
                setReplyToComment(null)
            } else {
                // Ajouter un nouveau commentaire
                setComments([...comments, newCommentObj])
            }

            onAddComment([...comments, newCommentObj])
            setNewComment('')
            setCommentImage(null)
        }
    }

    const handleImageUpload = (event) => {
        const file = event.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setCommentImage(reader.result)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleLikeComment = (commentId, isReply = false, parentCommentId = null) => {
        setComments(prevComments => 
            prevComments.map(comment => {
                if (isReply && parentCommentId === comment.id) {
                    return {
                        ...comment,
                        replies: comment.replies.map(reply => 
                            reply.id === commentId
                                ? { ...reply, liked: !reply.liked, likes: reply.likes + (reply.liked ? -1 : 1) }
                                : reply
                        )
                    }
                }
                if (!isReply && comment.id === commentId) {
                    return {
                        ...comment,
                        liked: !comment.liked,
                        likes: comment.likes + (comment.liked ? -1 : 1)
                    }
                }
                return comment
            })
        )
    }

    const handleToggleReplies = (commentId) => {
        setComments(prevComments =>
            prevComments.map(comment =>
                comment.id === commentId
                    ? { ...comment, showReplies: !comment.showReplies }
                    : comment
            )
        )
    }
 

    const handleEmojiClick = (emoji) => {
        setNewComment((prev) => prev + emoji);
        setEmojiPickerVisible(false);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
                >
                    <motion.div
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 20 }}
                        className="bg-white rounded-lg w-full max-w-2xl h-[90vh] flex flex-col"
                    >
                        {/* En-tête fixe */}
                        <div className="p-4 border-b flex justify-between items-center">
                            <h2 className="text-xl font-semibold">Publication</h2>
                            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Zone de défilement principale */}
                        <div className="flex-1 overflow-y-auto">
                            {/* Contenu de la publication */}
                            <div className="p-4 border-b">
                                <div className="flex items-center mb-3">
                                    <img src={post.author.avatar} alt={post.author.name} className="w-10 h-10 rounded-full mr-3" />
                                    <div>
                                        <h3 className="font-semibold">{post.author.name}</h3>
                                        <div className="text-sm text-gray-500 flex items-center">
                                            <Clock className="w-4 h-4 mr-1" />
                                            <span>{post.timestamp}</span>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-gray-700">{post.content}</p>
                                {post.image && (
                                    <div className="mt-3">
                                        <img 
                                            src={post.image} 
                                            alt="Post content" 
                                            className="rounded-lg w-full max-h-[50vh] object-contain"
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Commentaires */}
                            <div className="p-4">
                                {comments.map((comment) => (
                                    <div key={comment.id} className="flex mb-4">
                                        <img src={comment.author.avatar} alt={comment.author.name} className="w-8 h-8 rounded-full mr-2" />
                                        <div className="flex-1">
                                            <div className="bg-gray-100 rounded-2xl px-4 py-2">
                                                <p className="font-semibold text-sm">{comment.author.name}</p>
                                                <p className="text-sm">{comment.content}</p>
                                                {comment.image && (
                                                    <img src={comment.image} alt="Comment" className="mt-2 rounded-lg max-w-full h-auto" />
                                                )}
                                            </div>
                                            <div className="flex gap-4 mt-1 text-sm text-gray-500 px-4">
                                                <button 
                                                    className={`hover:text-gray-700 ${comment.liked ? 'text-blue-500' : ''}`}
                                                    onClick={() => handleLikeComment(comment.id)}
                                                >
                                                       J'aime {comment.likes > 0 && `(${comment.likes})`}
                                                </button>
                                                <button 
                                                className="hover:text-gray-700"
                                                onClick={() => setReplyToComment(comment)}
                                                >
                                                    Répondre
                                                </button>
                                                {comment.replies.length > 0 && (
                                                        <button 
                                                            className="hover:text-gray-700"
                                                            onClick={() => handleToggleReplies(comment.id)}
                                                        >
                                                            {comment.showReplies ? 'Masquer les réponses' : `Voir les réponses (${comment.replies.length})`}
                                                        </button>
                                                    )}
                                            </div>

                                                     {/* Affichage des réponses */}
                                                     {comment.showReplies && comment.replies.map((reply) => (
                                                    <div key={reply.id} className="ml-8 mt-2 flex">
                                                        <img src={reply.author.avatar} alt={reply.author.name} className="w-6 h-6 rounded-full mr-2" />
                                                        <div className="flex-1">
                                                            <div className="bg-gray-100 rounded-2xl px-4 py-2">
                                                                <p className="font-semibold text-sm">{reply.author.name}</p>
                                                                <p className="text-sm">{reply.content}</p>
                                                            </div>
                                                            <div className="flex gap-4 mt-1 text-sm text-gray-500 px-4">
                                                                <button 
                                                                    className={`hover:text-gray-700 ${reply.liked ? 'text-blue-500 font-semibold' : ''}`}
                                                                    onClick={() => handleLikeComment(reply.id, true, comment.id)}
                                                                >
                                                                    J'aime {reply.likes > 0 && `(${reply.likes})`}
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                             </div>   
                                        </div>
                                
                                ))}
                            </div>
                        </div>

                        {/* Zone de commentaire fixe en bas */}
                        <div className="p-4 border-t bg-white">
                            {replyToComment && (
                                 <div className="mb-2 text-sm text-gray-500 flex justify-between items-center">
                                    <span>Répondre à {replyToComment.author.name}</span>
                                    <button 
                                        onClick={() => setReplyToComment(null)}
                                        className="text-gray-400 hover:text-gray-600"
                                    >
                                        <X className="w-4 h-4 text-white" />
                                    </button>
                                </div>
                            )}
                            <div className="flex items-center gap-2">
                                <img src="/placeholder.svg?height=32&width=32" alt="Your avatar" className="w-8 h-8 rounded-full" />
                                <div className="flex-1 flex items-center bg-gray-100 rounded-full px-4 py-2">
                                    <input
                                        type="text"
                                        value={newComment}
                                        onChange={(e) => setNewComment(e.target.value)}
                                        placeholder="Écrivez un commentaire..."
                                        className="flex-1 bg-transparent outline-none"
                                        onKeyPress={(e) => {
                                            if (e.key === 'Enter') {
                                                handleSubmitComment()
                                            }
                                        }}
                                    />
                                    <div className="flex gap-2 ml-2">
                                        <button 
                                            className="p-1 hover:bg-gray-200 rounded-full"
                                            onClick={() => setEmojiPickerVisible(!emojiPickerVisible)}
                                        >
                                            <Smile className="w-5 h-5 text-gray-500" />
                                        </button>
                                        <button 
                                            className="p-1 hover:bg-gray-200 rounded-full"
                                            onClick={() => fileInputRef.current?.click()}
                                        >
                                            <ImageIcon className="w-5 h-5 text-gray-500" />
                                        </button>
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            className="hidden"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                        />
                                        <button
                                            className="p-1 hover:bg-gray-200 rounded-full"
                                            onClick={handleSubmitComment}
                                        >
                                            <Send className="w-5 h-5 text-blue-500" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {emojiPickerVisible && (
                                <div className="absolute bottom-16 left-4 bg-white shadow-md rounded-lg p-2">
                                    <button onClick={() => handleEmojiClick("😊")}>😊</button>
                                    <button onClick={() => handleEmojiClick("😂")}>😂</button>
                                    <button onClick={() => handleEmojiClick("❤️")}>❤️</button>
                                    <button onClick={() => handleEmojiClick("👍")}>👍</button>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

const Button = ({ children, onClick, className = "", variant = "default" }) => {
    const baseStyle = "px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2"
    const variantStyles = {
        default: "bg-blue-500 text-white hover:bg-blue-600",
        outline: "border border-gray-300 text-gray-700 hover:bg-gray-50",
        ghost: "text-gray-600 hover:bg-gray-100",
        danger: "bg-red-500 text-white hover:bg-red-600",
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

// ... (Input et TextArea Components restent les mêmes)
const Input = ({ value, onChange, placeholder, className = "" }) => (
    <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-3 py-2 border rounded-md ${className}`}
    />
)

const TextArea = ({ value, onChange, placeholder, className = "" }) => (
    <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-3 py-2 border rounded-md resize-none ${className}`}
    />
)

const Post = ({ post, onUpdatePost }) => {
    const [liked, setLiked] = useState(false)
    const [showCommentModal, setShowCommentModal] = useState(false)
    const [bookmarked, setBookmarked] = useState(false)
    const [currentTimestamp, setCurrentTimestamp] = useState(post.timestamp)

    useEffect(() => {
        const interval = setInterval(() => {
            if (post.createdAt) {
                setCurrentTimestamp(timeAgo(post.createdAt))
            }
        }, 60000) // Mise à jour toutes les minutes

        return () => clearInterval(interval)
    }, [post.createdAt])

    // ... (reste du composant Post reste le même)
    const handleLike = () => {
        setLiked(!liked)
        onUpdatePost({
            ...post,
            likes: post.likes + (liked ? -1 : 1)
        })
    }

    const handleAddComment = (newComment) => {
        onUpdatePost({
            ...post,
            comments: [...post.comments, newComment]
        })
    }

    return (
        <>
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
                        <span>{post.likes} réactions</span>
                    </div>
                    <span>{post.comments.length} commentaires</span>
                </div>
                <div className="flex items-center justify-between text-gray-500 text-sm border-t border-b py-2 mb-2">
                    <Button
                        variant="ghost"
                        onClick={handleLike}
                        className={`flex items-center ${liked ? ' bg-blue-500 text-white' : 'text-gray-700'}`}
                    >
                        <ThumbsUp className={`w-5 h-5 mr-1 ${liked ? 'text-white' : ''}`} />
                        J'aime
                    </Button>
                    <Button
                        variant="ghost"
                        onClick={() => setShowCommentModal(true)}
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
            </motion.div>

            <CommentModal
                post={post}
                isOpen={showCommentModal}
                onClose={() => setShowCommentModal(false)}
                onAddComment={handleAddComment}
            />
        </>
    )
}


const VideoPreview = ({ onClose }) => {
    const videoRef = useRef(null)
    const [stream, setStream] = useState(null)

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                setStream(stream)
                if (videoRef.current) {
                    videoRef.current.srcObject = stream
                }
            })
            .catch(err => console.error("Erreur d'accès à la caméra:", err))

        return () => {
            if (stream) {
                stream.getTracks().forEach(track => track.stop())
            }
        }
    }, [])

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white p-4 rounded-lg max-w-2xl w-full">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Caméra</h3>
                    <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
                        <X className="w-6 h-6" />
                    </button>
                </div>
                <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="w-full rounded-lg"
                />
            </div>
        </div>
    )
}

export const Publications = () => {
    
    const [posts, setPosts] = useState([]);
    const [showNewPostModal, setShowNewPostModal] = useState(false)
    const [showCamera, setShowCamera] = useState(false)
    const [newPostContent, setNewPostContent] = useState('')
    const [newPostImage, setNewPostImage] = useState(null)
    const fileInputRef = useRef(null)

     // Récupérer les publications depuis le backend
     useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get("http://localhost:9000/api/publications/all");
                setPosts(response.data); // Mettre à jour les publications
            } catch (error) {
                console.error("Erreur lors de la récupération des publications :", error);
            }
        };

        fetchPosts();
    }, []);

    const handleNewPost = async() => {
        if (newPostContent.trim() || newPostImage) {
            try {
                const newPost = {
                    content: newPostContent,
                    image: newPostImage, // Ajouter le traitement de l'image côté backend si nécessaire
                };

                const response = await axios.post("http://localhost:9000/api/publications/create", newPost);
                setPosts([response.data, ...posts]); // Ajouter la nouvelle publication
                setNewPostContent('');
                setNewPostImage(null);
                handleCancelPost();
            } catch (error) {
                console.error("Erreur lors de la création de la publication :", error);
            }
        }
    }

    const handleCancelPost = () => {
        setNewPostContent('')
        setNewPostImage(null)
        setShowNewPostModal(false)
        setShowCamera(false)
    }

    // ... handleImageUpload et handleUpdatePost 
    const handleImageUpload = (event) => {
        const file = event.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setNewPostImage(reader.result)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleUpdatePost = (updatedPost) => {
        setPosts(posts.map(post => 
            post.id === updatedPost.id ? updatedPost : post
        ))
    }

    return (
        <div className="container mx-auto p-4 relative min-h-screen bg-gray-100">
            <h1 className="text-3xl font-bold text-blue-600 mb-6 flex items-center justify-center">
                <MessageCircle className="w-8 h-8 mr-2" />
                S'exprimer
            </h1>

            <div className="max-w-2xl mx-auto">
                {posts.map(post => (
                    <Post 
                        key={post.id} 
                        post={post}
                        onUpdatePost={handleUpdatePost}
                    />
                ))}
            </div>

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
                                <Button variant="ghost" onClick={handleCancelPost}>
                                    <X className="w-6 h-6" />
                                </Button>
                            </div>
                            {newPostImage && (
                                <div className="mb-4 relative">
                                    <img src={newPostImage} alt="Upload preview" className="w-full rounded-lg" />
                                    <button
                                        onClick={() => setNewPostImage(null)}
                                        className="absolute top-2 right-2 bg-gray-800 bg-opacity-50 rounded-full p-1 hover:bg-opacity-70"
                                    >
                                        <X className="w-4 h-4 text-white" />
                                    </button>
                                </div>
                            )}
                            <TextArea
                                value={newPostContent}
                                onChange={(e) => setNewPostContent(e.target.value)}
                                placeholder="Que voulez-vous partager ?"
                                className="mb-4 h-32"
                            />
                            <div className="flex justify-between items-center mb-4">
                                <div className="flex space-x-2">
                                    <Button 
                                        variant="ghost"
                                        onClick={() => fileInputRef.current?.click()}
                                    >
                                        <ImageIcon className="w-5 h-5 text-green-500" />
                                    </Button>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                    />
                                    <Button 
                                        variant="ghost"
                                        onClick={() => setShowCamera(true)}
                                    >
                                        <Camera className="w-5 h-5 text-red-500" />
                                    </Button>
                                    <Button variant="ghost">
                                        <Paperclip className="w-5 h-5 text-orange-500" />
                                    </Button>
                                    <Button variant="ghost">
                                        <MapPin className="w-5 h-5 text-blue-500" />
                                    </Button>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="danger" onClick={handleCancelPost}>
                                        Annuler
                                    </Button>
                                    <Button onClick={handleNewPost}>
                                        <Send className="w-5 h-5 mr-2" />
                                        Publier
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
    )
}