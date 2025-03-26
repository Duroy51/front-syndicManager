import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageCircle, Eye, X } from 'lucide-react';
import {Reply} from './CommentReponse.jsx'

import { useTranslation } from 'react-i18next';

export const Comment = ({ comment, onLike, onReply, onToggleReplies, showReplies }) => {
    const {t} = useTranslation();
    return (
        <motion.div
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
                        onClick={() => onLike(comment.id)}
                    >
                        <Heart className="w-4 h-4" fill={comment.liked ? 'currentColor' : 'none'} />
                        <span>{t("jaime")} {comment.likes > 0 && `(${comment.likes})`}</span>
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="flex items-center space-x-1"
                        onClick={() => onReply(comment)}
                    >
                        <MessageCircle className="w-4 h-4" />
                        <span>Répondre</span>
                    </motion.button>
                    {comment.replies.length > 0 && (
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="flex items-center space-x-1"
                            onClick={() => onToggleReplies(comment.id)}
                        >
                            {showReplies ? (
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
                    {showReplies && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="ml-8 mt-4 space-y-4"
                        >
                            {comment.replies.map((reply) => (
                                <Reply
                                    key={reply.id}
                                    reply={reply}
                                    onLike={(replyId) => onLike(replyId, true, comment.id)}
                                />
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

