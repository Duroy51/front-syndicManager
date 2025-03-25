import {useEffect, useState} from "react";
import timeAgo from "@/utils/timeAgo.js";
import {motion} from "framer-motion";
import {Bookmark, Clock, Flag, Heart, MessageCircle} from "lucide-react";
import {CommentModal} from "@/components/Syndicat-App/s'exprimer/CommentComponent/Principal_Comment.jsx";

import { useTranslation } from "react-i18next";

import i18n from "../../../../i18n";
export const Post = ({ post, onUpdatePost }) => {
    const [liked, setLiked] = useState(false);
    const [showCommentModal, setShowCommentModal] = useState(false);
    const [bookmarked, setBookmarked] = useState(false);
    const [currentTimestamp, setCurrentTimestamp] = useState(post.timestamp);

    const { t } = useTranslation();
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
                            {t("jaime")}
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setShowCommentModal(true)}
                            className="flex items-center px-4 py-2 rounded-xl text-gray-600 hover:bg-gray-50 transition-all duration-200"
                        >
                            <MessageCircle className="w-5 h-5 mr-2" />
                            {t("commenter")}
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center px-4 py-2 rounded-xl text-gray-600 hover:bg-gray-50 transition-all duration-200"
                        >
                            <Flag className="w-5 h-5 mr-2" />
                            {t("signaler")}
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
