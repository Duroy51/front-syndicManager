import { motion } from 'framer-motion';

export const EmojiPicker = ({ onEmojiClick }) => {
    const emojis = ['😊', '😂', '❤️', '👍', '😍', '🎉', '🔥', '👏'];
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-24 left-4 bg-white shadow-xl rounded-xl p-4 grid grid-cols-4 gap-2"
        >
            {emojis.map((emoji) => (
                <motion.button
                    key={emoji}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => onEmojiClick(emoji)}
                    className="text-2xl hover:bg-gray-100 p-2 rounded-lg"
                >
                    {emoji}
                </motion.button>
            ))}
        </motion.div>
    );
};

