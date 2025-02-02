import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    User, ThumbsUp, MessageCircle, Image as ImageIcon,
    Smile, Send, X, Plus, Calendar, Clock, Flag,
    AlertTriangle, Award, Bookmark, Eye, Heart,
    Paperclip, Video, Mic, MapPin, Camera
} from 'lucide-react';
import timeAgo from '../../../utils/timeAgo';
import profile from '../../../images/bproo.png';

const CommentModal = ({ post, isOpen, onClose, onAddComment }) => {
    const [newComment, setNewComment] = useState('');
    const [commentImage, setCommentImage] = useState(null);
    const [likedComments, setLikedComments] = useState({});
    const [replyToComment, setReplyToComment] = useState(null);
    const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);
    const fileInputRef = useRef(null);

    const [comments, setComments] = useState(post.comments.map(comment => ({
        ...comment,
        liked: false,
        likes: 0,
        replies: [],
        showReplies: false
    })));

    const handleSubmitComment = () => {
        if (newComment.trim() || commentImage) {
            const newCommentObj = {
                id: Date.now(),
                author: { 
                    name: "Vous", 
                    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop" 
                },
                content: newComment,
                image: commentImage,
                timestamp: "À l'instant",
                liked: false,
                likes: 0,
                replies: [],
                showReplies: false
            };
            if (replyToComment) {
                const updatedComments = comments.map(comment => {
                    if (comment.id === replyToComment.id) {
                        return {
                            ...comment,
                            replies: [...comment.replies, {
                                ...newCommentObj,
                                isReply: true
                            }]
                        };
                    }
                    return comment;
                });
                setComments(updatedComments);
                setReplyToComment(null);
            } else {
                setComments([...comments, newCommentObj]);
            }
            onAddComment([...comments, newCommentObj]);
            setNewComment('');
            setCommentImage(null);
        }
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setCommentImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

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
                    };
                }
                if (!isReply && comment.id === commentId) {
                    return {
                        ...comment,
                        liked: !comment.liked,
                        likes: comment.likes + (comment.liked ? -1 : 1)
                    };
                }
                return comment;
            })
        );
    };

    const handleToggleReplies = (commentId) => {
        setComments(prevComments =>
            prevComments.map(comment =>
                comment.id === commentId
                    ? { ...comment, showReplies: !comment.showReplies }
                    : comment
            )
        );
    };

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
                    className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 20 }}
                        className="bg-white rounded-2xl w-full max-w-2xl h-[90vh] flex flex-col shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-6 border-b flex justify-between items-center bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-2xl">
                            <h2 className="text-2xl font-bold text-gray-800">Publication</h2>
                            <motion.button 
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={onClose} 
                                className="p-2 hover:bg-white/50 rounded-full transition-colors duration-200"
                            >
                                <X className="w-6 h-6 text-gray-600" />
                            </motion.button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6">
                            <div className="p-6 border-b border-gray-100">
                                <div className="flex items-center mb-4">
                                    <div className="relative">
                                        <img 
                                            src={post.author.avatar} 
                                            alt={post.author.name} 
                                            className="w-12 h-12 rounded-full object-cover ring-4 ring-blue-100"
                                        />
                                        <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></div>
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="font-bold text-lg text-gray-800">{post.author.name}</h3>
                                        <div className="flex items-center text-sm text-gray-500">
                                            <Clock className="w-4 h-4 mr-1 text-blue-500" />
                                            <span>{post.timestamp}</span>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-gray-700 leading-relaxed">{post.content}</p>
                                {post.image && (
                                    <motion.div 
                                        className="mt-4 rounded-xl overflow-hidden shadow-lg"
                                        whileHover={{ scale: 1.02 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <img 
                                            src={post.image} 
                                            alt="Post content" 
                                            className="w-full h-auto object-cover"
                                        />
                                    </motion.div>
                                )}
                            </div>

                            <div className="p-6 space-y-6">
                                {comments.map((comment) => (
                                    <motion.div 
                                        key={comment.id} 
                                        className="flex space-x-4"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                    >
                                        <img 
                                            src={comment.author.avatar} 
                                            alt={comment.author.name} 
                                            className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-100"
                                        />
                                        <div className="flex-1">
                                            <div className="bg-gray-50 rounded-2xl px-6 py-4">
                                                <p className="font-semibold text-gray-800">{comment.author.name}</p>
                                                <p className="text-gray-600 mt-1">{comment.content}</p>
                                                {comment.image && (
                                                    <img 
                                                        src={comment.image} 
                                                        alt="Comment" 
                                                        className="mt-3 rounded-lg max-w-full h-auto"
                                                    />
                                                )}
                                            </div>
                                            <div className="flex gap-6 mt-2 text-sm text-gray-500 px-4">
                                                <motion.button 
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    className={`flex items-center space-x-1 ${comment.liked ? 'text-blue-500 font-medium' : ''}`}
                                                    onClick={() => handleLikeComment(comment.id)}
                                                >
                                                    <Heart className="w-4 h-4" fill={comment.liked ? "currentColor" : "none"} />
                                                    <span>J'aime {comment.likes > 0 && `(${comment.likes})`}</span>
                                                </motion.button>
                                                <motion.button 
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    className="flex items-center space-x-1"
                                                    onClick={() => setReplyToComment(comment)}
                                                >
                                                    <MessageCircle className="w-4 h-4" />
                                                    <span>Répondre</span>
                                                </motion.button>
                                                {comment.replies.length > 0 && (
                                                    <motion.button 
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.9 }}
                                                        className="flex items-center space-x-1"
                                                        onClick={() => handleToggleReplies(comment.id)}
                                                    >
                                                        {comment.showReplies ? (
                                                            <>
                                                                <X className="w-4 h-4" />
                                                                <span>Masquer</span>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <Eye className="w-4 h-4" />
                                                                <span>{comment.replies.length} réponses</span>
                                                            </>
                                                        )}
                                                    </motion.button>
                                                )}
                                            </div>

                                            <AnimatePresence>
                                                {comment.showReplies && (
                                                    <motion.div
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: "auto" }}
                                                        exit={{ opacity: 0, height: 0 }}
                                                        className="ml-8 mt-4 space-y-4"
                                                    >
                                                        {comment.replies.map((reply) => (
                                                            <motion.div
                                                                key={reply.id}
                                                                initial={{ opacity: 0, x: -20 }}
                                                                animate={{ opacity: 1, x: 0 }}
                                                                className="flex space-x-3"
                                                            >
                                                                <img 
                                                                    src={reply.author.avatar} 
                                                                    alt={reply.author.name} 
                                                                    className="w-8 h-8 rounded-full object-cover ring-2 ring-blue-100"
                                                                />
                                                                <div className="flex-1">
                                                                    <div className="bg-gray-50 rounded-2xl px-4 py-3">
                                                                        <p className="font-semibold text-gray-800">{reply.author.name}</p>
                                                                        <p className="text-gray-600 text-sm mt-1">{reply.content}</p>
                                                                    </div>
                                                                    <div className="flex gap-4 mt-1 text-sm text-gray-500 px-4">
                                                                        <motion.button 
                                                                            whileHover={{ scale: 1.1 }}
                                                                            whileTap={{ scale: 0.9 }}
                                                                            className={`flex items-center space-x-1 ${reply.liked ? 'text-blue-500 font-medium' : ''}`}
                                                                            onClick={() => handleLikeComment(reply.id, true, comment.id)}
                                                                        >
                                                                            <Heart className="w-4 h-4" fill={reply.liked ? "currentColor" : "none"} />
                                                                            <span>J'aime {reply.likes > 0 && `(${reply.likes})`}</span>
                                                                        </motion.button>
                                                                    </div>
                                                                </div>
                                                            </motion.div>
                                                        ))}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <div className="p-6 border-t bg-white rounded-b-2xl">
                            {replyToComment && (
                                <motion.div 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mb-4 p-3 bg-blue-50 rounded-lg flex justify-between items-center"
                                >
                                    <span className="text-sm text-blue-600">
                                        Répondre à <strong>{replyToComment.author.name}</strong>
                                    </span>
                                    <motion.button 
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => setReplyToComment(null)}
                                        className="text-blue-400 hover:text-blue-600"
                                    >
                                        <X className="w-4 h-4" />
                                    </motion.button>
                                </motion.div>
                            )}
                            <div className="flex items-center gap-4">
                                <img 
                                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop" 
                                    alt="Your avatar" 
                                    className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-100"
                                />
                                <div className="flex-1 flex items-center bg-gray-50 rounded-full px-6 py-3">
                                    <input
                                        type="text"
                                        value={newComment}
                                        onChange={(e) => setNewComment(e.target.value)}
                                        placeholder="Écrivez un commentaire..."
                                        className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-400"
                                        onKeyPress={(e) => {
                                            if (e.key === 'Enter') {
                                                handleSubmitComment();
                                            }
                                        }}
                                    />
                                    <div className="flex gap-3 ml-4">
                                        <motion.button 
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                                            onClick={() => setEmojiPickerVisible(!emojiPickerVisible)}
                                        >
                                            <Smile className="w-5 h-5 text-yellow-500" />
                                        </motion.button>
                                        <motion.button 
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                                            onClick={() => fileInputRef.current?.click()}
                                        >
                                            <ImageIcon className="w-5 h-5 text-green-500" />
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
                                            className="p-2 hover:bg-blue-100 rounded-full transition-colors duration-200"
                                            onClick={handleSubmitComment}
                                        >
                                            <Send className="w-5 h-5 text-blue-500" />
                                        </motion.button>
                                    </div>
                                </div>
                            </div>

                            {emojiPickerVisible && (
                                <motion.div 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="absolute bottom-24 left-4 bg-white shadow-xl rounded-xl p-4 grid grid-cols-4 gap-2"
                                >
                                    {["😊", "😂", "❤️", "👍", "😍", "🎉", "🔥", "👏"].map((emoji) => (
                                        <motion.button
                                            key={emoji}
                                            whileHover={{ scale: 1.2 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => handleEmojiClick(emoji)}
                                            className="text-2xl hover:bg-gray-100 p-2 rounded-lg"
                                        >
                                            {emoji}
                                        </motion.button>
                                    ))}
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

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

const Input = ({ value, onChange, placeholder, className = "" }) => (
    <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200 ${className}`}
    />
);

const TextArea = ({ value, onChange, placeholder, className = "" }) => (
    <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200 resize-none ${className}`}
    />
);

const Post = ({ post, onUpdatePost }) => {
    const [liked, setLiked] = useState(false);
    const [showCommentModal, setShowCommentModal] = useState(false);
    const [bookmarked, setBookmarked] = useState(false);
    const [currentTimestamp, setCurrentTimestamp] = useState(post.timestamp);

    useEffect(() => {
        const interval = setInterval(() => {
            if (post.createdAt) {
                setCurrentTimestamp(timeAgo(post.createdAt));
            }
        }, 60000);

        return () => clearInterval(interval);
    }, [post.createdAt]);

    const handleLike = () => {
        setLiked(!liked);
        onUpdatePost({
            ...post,
            likes: post.likes + (liked ? -1 : 1),
        });
    };

    const handleAddComment = (newComment) => {
        onUpdatePost({
            ...post,
            comments: [...post.comments, newComment],
        });
    };

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8 hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]"
            >
                <div className="p-6">
                    <div className="flex items-center mb-6">
                        <div className="relative">
                            <img
                                src={post.author.avatar}
                                alt={post.author.name}
                                className="w-12 h-12 rounded-full object-cover ring-4 ring-blue-100"
                            />
                            <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></div>
                        </div>
                        <div className="ml-4 flex-grow">
                            <h3 className="font-bold text-xl text-gray-800 hover:text-blue-600 transition-colors duration-200">
                                {post.author.name}
                            </h3>
                            <div className="flex items-center text-sm text-gray-500">
                                <Clock className="w-4 h-4 mr-1 text-blue-500" />
                                <span>{currentTimestamp}</span>
                            </div>
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setBookmarked(!bookmarked)}
                            className={`p-2 rounded-full ${bookmarked ? 'text-blue-500 bg-blue-50' : 'text-gray-400 hover:text-blue-500 hover:bg-blue-50'} transition-colors duration-200`}
                        >
                            <Bookmark className="w-6 h-6" fill={bookmarked ? "currentColor" : "none"} />
                        </motion.button>
                    </div>

                    <p className="text-gray-700 leading-relaxed mb-6">{post.content}</p>

                    {post.image && (
                        <motion.div 
                            className="rounded-xl overflow-hidden mb-6 shadow-lg"
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.2 }}
                        >
                            <img
                                src={post.image}
                                alt="Post content"
                                className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-500"
                            />
                        </motion.div>
                    )}

                    <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                        <div className="flex items-center space-x-2">
                            <div className="flex -space-x-2">
                                <div className="w-7 h-7 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white text-xs ring-2 ring-white">
                                    {post.likes}
                                </div>
                                <div className="w-7 h-7 rounded-full bg-gradient-to-r from-pink-500 to-red-500 flex items-center justify-center text-white text-xs ring-2 ring-white">
                                    <Heart className="w-3 h-3" />
                                </div>
                            </div>
                            <span className="ml-2">{post.likes} réactions</span>
                        </div>
                        <span>{post.comments.length} commentaires</span>
                    </div>

                    <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleLike}
                            className={`flex items-center px-4 py-2 rounded-xl ${
                                liked 
                                    ? 'bg-blue-500 text-white' 
                                    : 'text-gray-600 hover:bg-gray-50'
                            } transition-all duration-200`}
                        >
                            <Heart className="w-5 h-5 mr-2" fill={liked ? "currentColor" : "none"} />
                            J'aime
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setShowCommentModal(true)}
                            className="flex items-center px-4 py-2 rounded-xl text-gray-600 hover:bg-gray-50 transition-all duration-200"
                        >
                            <MessageCircle className="w-5 h-5 mr-2" />
                            Commenter
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center px-4 py-2 rounded-xl text-gray-600 hover:bg-gray-50 transition-all duration-200"
                        >
                            <Flag className="w-5 h-5 mr-2" />
                            Signaler
                        </motion.button>
                    </div>
                </div>
            </motion.div>

            <CommentModal
                post={post}
                isOpen={showCommentModal}
                onClose={() => setShowCommentModal(false)}
                onAddComment={handleAddComment}
            />
        </>
    );
};

const VideoPreview = ({ onClose }) => {
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

export const Publications = () => {
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

    const handleNewPost = () => {
        if (newPostContent.trim() || newPostImage) {
            const newPost = {
                id: posts.length + 1,
                author: { 
                    name: "Vous", 
                    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop"
                },
                content: newPostContent,
                image: newPostImage,
                timestamp: "À l'instant",
                createdAt: new Date(),
                likes: 0,
                comments: []
            };
            setPosts([newPost, ...posts]);
            handleCancelPost();
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
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewPostImage(reader.result);
            };
            reader.readAsDataURL(file);
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
                        S'exprimer
                    </h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Partagez vos idées, vos expériences et vos réflexions avec la communauté.
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
                                    <h2 className="text-2xl font-bold text-gray-800">Nouvelle publication</h2>
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
                                    placeholder="Que voulez-vous partager ?"
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
        </div>
    );
};