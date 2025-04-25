import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

import { useTranslation } from 'react-i18next';
import i18n from '../../../../i18n';

export const Reply = ({ reply, onLike }) => {
    const{t}=useTranslation();
    return (
        <motion.div
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
                        onClick={() => onLike(reply.id)}
                    >
                        <Heart className="w-4 h-4" fill={reply.liked ? 'currentColor' : 'none'} />
                        <span>{t("jaime")} {reply.likes > 0 && `(${reply.likes})`}</span>
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
};

