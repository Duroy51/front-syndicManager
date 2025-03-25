import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Smile, Image as ImageIcon, Send, X, Clock } from 'lucide-react';
import {Comment} from './Comment';
import {EmojiPicker} from './EmojiPicker';

import { useTranslation } from 'react-i18next';

import i18n from '../../../../i18n';
export const CommentModal = ({ post, isOpen, onClose, onAddComment }) => {
    const [newComment, setNewComment] = useState('');
    const [commentImage, setCommentImage] = useState(null);
    const [replyToComment, setReplyToComment] = useState(null);
    const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);
    const fileInputRef = useRef(null);

    const {t}=useTranslation()

    const [comments, setComments] = useState(
        post.comments.map((comment) => ({
            ...comment,
            liked: false,
            likes: 0,
            replies: [],
            showReplies: false,
        }))
    );

    const handleSubmitComment = () => {
        if (newComment.trim() || commentImage) {
            const newCommentObj = {
                id: Date.now(),
                author: {
                    name: 'Vous',
                    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
                },
                content: newComment,
                image: commentImage,
                timestamp: "À l'instant",
                liked: false,
                likes: 0,
                replies: [],
                showReplies: false,
            };

            if (replyToComment) {
                const updatedComments = comments.map((comment) =>
                    comment.id === replyToComment.id
                        ? { ...comment, replies: [...comment.replies, { ...newCommentObj, isReply: true }] }
                        : comment
                );
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
            reader.onloadend = () => setCommentImage(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleLikeComment = (commentId, isReply = false, parentCommentId = null) => {
        setComments((prevComments) =>
            prevComments.map((comment) => {
                if (isReply && parentCommentId === comment.id) {
                    return {
                        ...comment,
                        replies: comment.replies.map((reply) =>
                            reply.id === commentId
                                ? { ...reply, liked: !reply.liked, likes: reply.likes + (reply.liked ? -1 : 1) }
                                : reply
                        ),
                    };
                }
                if (!isReply && comment.id === commentId) {
                    return {
                        ...comment,
                        liked: !comment.liked,
                        likes: comment.likes + (comment.liked ? -1 : 1),
                    };
                }
                return comment;
            })
        );
    };

    const handleToggleReplies = (commentId) => {
        setComments((prevComments) =>
            prevComments.map((comment) =>
                comment.id === commentId ? { ...comment, showReplies: !comment.showReplies } : comment
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
                                    <Comment
                                        key={comment.id}
                                        comment={comment}
                                        onLike={handleLikeComment}
                                        onReply={setReplyToComment}
                                        onToggleReplies={handleToggleReplies}
                                        showReplies={comment.showReplies}
                                    />
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
                                        placeholder={t("ecrivez_un_commentaire")}
                                        className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-400"
                                        onKeyPress={(e) => e.key === 'Enter' && handleSubmitComment()}
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
                            {emojiPickerVisible && <EmojiPicker onEmojiClick={handleEmojiClick} />}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
